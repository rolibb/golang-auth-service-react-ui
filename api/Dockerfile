FROM golang:1.14-alpine
RUN mkdir /app
# Set the Current Working Directory inside the container
WORKDIR /app

# We want to populate the module cache based on the go.{mod,sum} files.
COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . /app

# Build the Go app
RUN go build *.go 


# This container exposes port 8080 to the outside world
EXPOSE 10000

# Run the binary program produced by `go install`
CMD ["./main"]