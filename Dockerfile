FROM node:16-alpine as build-node 
WORKDIR /frontend
COPY frontend/ .
RUN npm run build

FROM golang:alpine as build 
RUN apk update && apk add --no-cache git 
ENV GOPATH ""
RUN go env -w GOPROXY=direct
ADD go.mod go.sum ./
RUN go mod download 
ADD . .
RUN go build -o /main 

FROM alpine 
COPY --from=build-node /frontend/build ./frontend/build
COPY --from=build /main /main
# ENV DB_HOST=host.docker.internal
# ENV DB_PORT=8080
# ENV DB_USER=postgres
# ENV DB_PASSWORD=postgres
# ENV DB_NAME=go_api
# ENV SECRET=super_serial_secret
# ENV ENVIRONMENT=production
ENTRYPOINT ["/main"]
