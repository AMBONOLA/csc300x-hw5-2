# _Jokebook_ API Documentation

##Endpoint 1 -Retrieve Categories
**Request Format**: No Request body needed for this endpoint
**Request Type:**: GET
**Returned Data Format**: JSON
**Description**: Retreives categories available in the jokebook
**Example Request**: http://localhost:3000/jokebook/categories
**Example Response**:
{
"categories": ["funnyJoke", "lameJoke"]
}
**Error Handling**: Try/catch. If there are no categories found we return a 404. If some other error happens we return a 500.

##Endpoint 2 - Retrieve Jokes by category
**Request Format**: Request parameters
**Request Type:**: GET
**Returned Data Format**: JSON
**Description**: Retrieves jokes from the specified category
**Example Request**: http://localhost:3000/jokebook/joke/funnyJoke
**Example Response**:
[ {
"joke": "Why did the student eat his homework?",
"response": "Because the teacher told him it was a piece of cake!" },
{ "joke": "What kind of tree fits in your hand?",
"response": "A palm tree" }]
**Error Handling**: try/catch. If the specified category doesn't exist we send back a 404 along with the appropriate response for not finding that specific category. If any other error happens we send a 500 and an error JSON.

##Endpoint 3 -
**Request Format**: Json/multi-part form-data
**Request Type:**: POST
**Returned Data Format**: JSON
**Description**: Will add a new joke ot our joke book! For the specified category.
**Example Request**:
http://localhost:3000/jokebook/joke/new
{
"category": "funnyJoke",
"joke": "Why don't scientists trust atoms?",
"response": "Because they make up everything!"
}
**Example Response**:
[
{ "joke": "Why did the student eat his homework?",
"response": "Because the teacher told him it was a piece of cake!" },
{ "joke": "What kind of tree fits in your hand?",
"response": "A palm tree" },
{ "joke": "Why don't scientists trust atoms?",
"response": "Because they make up everything!" }]
**Error Handling**: try/catch. If any of the parameters are missing we let the user know. If anything else goes wrong we send a 500 error and JSON message.
