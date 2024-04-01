# social-network-api

<h1> Description </h1>
The Social Netowrk API is a RESTful API built with Express.js and MongoDB that allows users to create, retrieve, update, and delete thoughts, manage friends, and react to thoughts.

## User Story
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## Acceptance Criteria
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Walk-through Link:

## Installation
- Clone the repository
- Install dependencies: npm install
- Set up environment variables: Create .env
- Start the server: npm start

## Usage
# Endpoints
# Users
- GET /api/users: Get all users
- GET /api/users/:id: Get a user by ID
- POST /api/users: Create a new user
- PUT /api/users/:id: Update a user by ID
- DELETE /api/users/:id: Delete a user by ID
# Thoughts
- GET /api/thoughts: Get all thoughts
- GET /api/thoughts/:id: Get a thought by ID
- POST /api/thoughts: Create a new thought
- PUT /api/thoughts/:id: Update a thought by ID
- DELETE /api/thoughts/:id: Delete a thought by ID
# Friends
- POST /api/users/:userId/friends: Add a friend to a user
- DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user
# Reactions
- POST /api/thoughts/:thoughtId/reactions: Add a reaction to a thought
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Remove a reaction from a thought

# Technologies Used
Node.js
Express.js
MongoDB
Mongoose

# License
This project is licensed under the MIT License.

