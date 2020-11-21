package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/twinj/uuid"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mgo.v2/bson"
)

//Connection mongoDB with helper class
var collectionUser, collectionAccessToken  = ConnectDB()
const ACCESS_SECRET = "jdnfkkmfuyqwasdf"
const REFRESH_SECRET = "mcasdfwefasdsasdfasdf"

func hashAndSalt(pwd []byte) string {
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if err != nil {
			log.Println(err)
	}

	return string(hash)
}

func createUser(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint Hit: /signup")
	w.Header().Set("Content-Type", "application/json")

	reqBody, _ := ioutil.ReadAll(r.Body)
  var user, userRes User 
	json.Unmarshal(reqBody, &user)

	filter := bson.M{"email": user.Email}
	err := collectionUser.FindOne(context.TODO(), filter).Decode(&userRes)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}

	if (userRes.Email == user.Email) {
		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(map[string]string{"message":   "Email already exist"})
	} else {
		user.Password = hashAndSalt([]byte(user.Password))

		result, err := collectionUser.InsertOne(context.TODO(), user)
	
		if err != nil {
			GetError(err, w)
			return
		}
	
		json.NewEncoder(w).Encode(result)
	}
	
}

func comparePasswords(hashedPwd string, plainPwd []byte) bool {
	byteHash := []byte(hashedPwd)
	err := bcrypt.CompareHashAndPassword(byteHash, plainPwd)
	if err != nil {
		log.Println(err)
		return false
	}
	
	return true
}

func login(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint Hit: /login")
	w.Header().Set("Content-Type", "application/json")

	reqBody, _ := ioutil.ReadAll(r.Body)
  var user, userRes User 
	json.Unmarshal(reqBody, &user)

	filter := bson.M{"email": user.Email}
	err := collectionUser.FindOne(context.TODO(), filter).Decode(&userRes)

	if err != nil {
		GetError(err, w)
		return
	}

	equalPassword := comparePasswords(userRes.Password, []byte(user.Password))

	if equalPassword {
		token, err := createToken(userRes.ID)

		if err != nil {
			return
		}
	
		_, errtoken := collectionAccessToken.InsertOne(context.TODO(), token)
	
		if errtoken != nil {
			GetError(errtoken, w)
			return
		}
	
		json.NewEncoder(w).Encode(token)
	} 

	w.WriteHeader(http.StatusUnauthorized)
}

func logout(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	authHeader := strings.Split(r.Header.Get("Authorization"), "Bearer ")
	jwtToken := authHeader[1]

	fmt.Println("Endpoint Hit: /logout")

	filter := bson.M{"accesstoken": jwtToken}
	_, err := collectionAccessToken.DeleteOne(context.TODO(), filter)

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusNoContent)
}

func tokenAuthMiddleware(next http.HandlerFunc) http.HandlerFunc {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := strings.Split(r.Header.Get("Authorization"), "Bearer ")
		if len(authHeader) != 2 {
			fmt.Println("Malformed token")
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Malformed Token"))
		} else {
			jwtToken := authHeader[1]
			token, err := jwt.Parse(jwtToken, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
				}
				return []byte("jdnfkkmfuyqwasdf"), nil
			})

			var accessTokenRes TokenDetails
			filter := bson.M{"accesstoken": jwtToken}
			err = collectionAccessToken.FindOne(context.TODO(), filter).Decode(&accessTokenRes)

			if err != nil {
				fmt.Println(err)
				w.WriteHeader(http.StatusInternalServerError)
			}

			if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid  && accessTokenRes.AccessToken == jwtToken {
				ctx := context.WithValue(r.Context(), "props", claims)
			  fmt.Println(jwtToken)
				next.ServeHTTP(w, r.WithContext(ctx))
			} else {
				fmt.Println(err)
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte("Unauthorized"))
			}
		}
	})
}

func createToken(userid primitive.ObjectID) (*TokenDetails, error) {
	td := &TokenDetails{}
	td.AtExpires = time.Now().Add(time.Minute * 15).Unix()
	td.AccessUuid = uuid.NewV4().String()
	td.UserID = userid

	td.RtExpires = time.Now().Add(time.Hour * 24 * 7).Unix()
	td.RefreshUuid = td.AccessUuid


	var err error
	os.Setenv("ACCESS_SECRET", ACCESS_SECRET) 
	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = true
	atClaims["access_uuid"] = td.AccessUuid
	atClaims["user_id"] = userid
	atClaims["exp"] = td.AtExpires
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	td.AccessToken, err = at.SignedString([]byte(os.Getenv("ACCESS_SECRET")))
	if err != nil {
		return nil, err
	}
	//Creating Refresh Token
	os.Setenv("REFRESH_SECRET", REFRESH_SECRET) 
	rtClaims := jwt.MapClaims{}
	rtClaims["refresh_uuid"] = td.RefreshUuid
	rtClaims["user_id"] = userid
	rtClaims["exp"] = td.RtExpires
	rt := jwt.NewWithClaims(jwt.SigningMethodHS256, rtClaims)
	td.RefreshToken, err = rt.SignedString([]byte(os.Getenv("REFRESH_SECRET")))
	if err != nil {
		return nil, err
	}
	return td, nil
}

func homePage(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "Welcome to the Login Service")
	fmt.Println("Endpoint Hit: /")
}

func handleRequests() {
	  router := mux.NewRouter().StrictSlash(true)
	  router.HandleFunc("/", homePage)
    router.HandleFunc("/signup", createUser).Methods("POST")
		router.HandleFunc("/login", login).Methods("POST")
		
		finalHandler := http.HandlerFunc(logout)
		router.HandleFunc("/logout", tokenAuthMiddleware(finalHandler)).Methods("POST")

		newCors := cors.New(cors.Options{
			AllowedOrigins: []string{"http://*"},
			AllowedHeaders: []string{"Authorization", "Content-Type"},
			AllowCredentials: true,
			Debug: true,
	  })

	  handler := newCors.Handler(router)
		
    log.Fatal(http.ListenAndServe(":10000", handler))
}
 
func main() {
	
	handleRequests()
}