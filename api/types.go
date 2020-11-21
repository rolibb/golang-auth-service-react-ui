package main

import "go.mongodb.org/mongo-driver/bson/primitive"

type  User struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Email   string `json:"email,omitempty" bson:"email,omitempty"`
  Password   string `json:"password,omitempty" bson:"password,omitempty"`
}

type TokenDetails struct {
	UserID       primitive.ObjectID
	AccessToken  string
	RefreshToken string
	AccessUuid   string
	RefreshUuid  string
	AtExpires    int64
	RtExpires    int64
}