# Add movies to the 'movies' bucket
curl -X PUT -H "Content-Type: application/json" -d '{"releasedate": "2019", "runningtime": "2:02", "genre": "action"}' http://riak:8098/riak/movies/AlitaBattleAngel
curl -X PUT -H "Content-Type: application/json" -d '{"releasedate": "2014", "runningtime": "1:57", "genre": "comedy"}' http://riak:8098/riak/movies/Blended
curl -X PUT -H "Content-Type: application/json" -d '{"releasedate": "2023", "runningtime": "3:00", "genre": "drama"}' http://riak:8098/riak/movies/Oppenheimer
curl -X PUT -H "Content-Type: application/json" -d '{"releasedate": "2019", "runningtime": "2:12", "genre": "drama"}' http://riak:8098/riak/movies/Parasite
curl -X PUT -H "Content-Type: application/json" -d '{"releasedate": "2013", "runningtime": "1:52", "genre": "horror"}' http://riak:8098/riak/movies/TheConjuring
curl -X PUT -H "Content-Type: application/json" -d '{"releasedate": "2016", "runningtime": "1:57", "genre": "horror"}' http://riak:8098/riak/movies/Split

# Delete a movie from the 'movies' bucket
curl -X DELETE http://riak:8098/riak/movies/TheConjuring

# Create branches in the 'branches' bucket
curl -X PUT -H "Content-Type: application/json" -d '{"name": "East"}' http://riak:8098/riak/branches/East
curl -X PUT -H "Content-Type: application/json" -d '{"name": "West"}' http://riak:8098/riak/branches/West
curl -X PUT -H "Content-Type: application/json" -d '{"name": "South"}' http://riak:8098/riak/branches/South

# Link movies to branches
curl -X PUT -H "Content-Type: application/json" -H 'Link: </riak/branches/West>; riaktag="holds", </riak/branches/South>; riaktag="holds"' -d '{"releasedate": "2014", "runningtime": "1:57", "genre": "comedy"}' http://riak:8098/riak/movies/Blended
curl -X PUT -H "Content-Type: application/json" -H 'Link: </riak/branches/East>; riaktag="holds"' -d '{"releasedate": "2019", "runningtime": "2:02", "genre": "action"}' http://riak:8098/riak/movies/AlitaBattleAngel
curl -X PUT -H "Content-Type: application/json" -H 'Link: </riak/branches/West>; riaktag="holds"' -d '{"releasedate": "2023", "runningtime": "3:00", "genre": "drama"}' http://riak:8098/riak/movies/Oppenheimer
curl -X PUT -H "Content-Type: application/json" -H 'Link: </riak/branches/South>; riaktag="holds"' -d '{"releasedate": "2019", "runningtime": "2:12", "genre": "drama"}' http://riak:8098/riak/movies/Parasite
curl -X PUT -H "Content-Type: application/json" -H 'Link: </riak/branches/South>; riaktag="holds"' -d '{"releasedate": "2016", "runningtime": "1:57", "genre": "horror"}' http://riak:8098/riak/movies/Split

# Add an image to the 'images' bucket
curl -X PUT --data-binary @alita.jpeg -H "Content-Type: image/jpeg" http://riak:8098/riak/images/alita.jpeg

# Link the image to a movie
curl -X PUT -H "Content-Type: application/json" -H 'Link: </riak/images/alita.jpeg>; riaktag="image"' -d '{"releasedate": "2019", "runningtime": "2:02", "genre": "action"}' http://riak:8098/riak/movies/AlitaBattleAngel

# List all buckets
curl -X GET http://riak:8098/riak?buckets=true

# List all movies found in each branch
curl -X GET http://riak:8098/riak/branches/East?keys=true
curl -X GET http://riak:8098/riak/branches/West?keys=true
curl -X GET http://riak:8098/riak/branches/South?keys=true

# List the movie with the picture and its branch
curl -X GET http://riak:8098/riak/movies/AlitaBattleAngel