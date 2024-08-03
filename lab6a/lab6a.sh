#!/usr/bin/env bash

#Add your curl statements here

#create restaurants database
curl -i -X PUT http://couchdb:5984/restaurants

#add 3 documents for the restaurants database
curl -i -X PUT http://couchdb:5984/restaurants/curry_mango -H "Content-Type: application/json" -d '{
  "_id": "curry_mango",
  "name": "Curry Mango",
  "food_type": ["Indian", "Indian Fusion"],
  "phonenumber": "123-456-7890",
  "website": "http://currymango.com"
}'

curl -i -X PUT http://couchdb:5984/restaurants/saigon_bistro -H "Content-Type: application/json" -d '{
  "_id": "saigon_bistro",
  "name": "Saigon Bistro",
  "food_type": ["Vietnamese", "Vietnamese Sandwich", "Coffee"],
  "phonenumber": "123-456-7891",
  "website": "http://saigonbistro.com"
}'

curl -i -X PUT http://couchdb:5984/restaurants/seven_guys -H "Content-Type: application/json" -d '{
  "_id": "saigon_bistro",
  "name": "Seven Guys",
  "food_type": ["American"],
  "phonenumber": "123-456-7892",
  "website": "http://7guys.com"
}'


#DO NOT REMOVE
curl -Ssf -X PUT http://couchdb:5984/restaurants/_design/docs -H "Content-Type: application/json" -d '{"views": {"all": {"map": "function(doc) {emit(doc._id, {rev:doc._rev, name:doc.name, food_type:doc.food_type, phonenumber:doc.phonenumber, website:doc.website})}"}}}'
curl -Ssf -X GET http://couchdb:5984/restaurants/_design/docs/_view/all
