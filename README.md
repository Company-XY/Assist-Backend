# Assist-Backend
Updated backend

https://assist-backend.onrender.com/api/v1


User Controller Documentation
This documentation provides an overview of the functions and routes implemented in the userController.js file for user-related operations.
Register a New User
Route
•	POST /api/v1/register
Description
Register a new user as either a freelancer or a client.
Parameters
•	role: User's role ("Freelancer" or "Client")
•	type: User's type
•	email: User's email address
•	name: User's name
•	password: User's password
•	consultation: User's consultation details
Response
•	Returns user information and a token upon successful registration.
________________________________________
Authenticate User and Get Token
Route
•	POST /api/v1/login
Description
Authenticate user credentials and generate a token for authorization.
Parameters
•	email: User's email address
•	password: User's password
Response
•	Returns user information and a token upon successful authentication.
________________________________________
Logout User
Route
•	POST /api/v1/logout
Description
Log out the currently logged-in user.
Access
•	Private (only accessible when logged in)
Response
•	Clears JWT cookie and returns a success message.
________________________________________
Get User Profile
Route
•	GET /api/v1/profile/:id
Description
Fetch the user's profile information.
Parameters
•	id: User's ID
Access
•	Private
Response
•	Returns detailed user profile information, including role, type, name, email, phone, account balance, location, avatar, experience, skills, schedule, tasks, hours, portfolio, sample work, payment method, and payment rate.
________________________________________
Update User Profile
Route
•	PATCH /api/v1/profile/:id
Description
Update the user's profile information, including avatar and sample work files.
Parameters
•	id: User's ID
•	Request body fields for user profile updates
Access
•	Private
File Upload
•	Supports uploading a single avatar image file.
•	Supports uploading up to 10 sample work files of various types (jpeg, png, pdf, excel, word, etc.).
Response
•	Returns the updated user profile information.
________________________________________
View Another User's Profile
Route
•	GET /api/v1/profile/:id/view
Description
View another user's profile information (limited details).
Parameters
•	id: User's ID
Access
•	Public
Response
•	Returns limited user profile information, including role, type, name, email, location, experience, skills, portfolio, sample work, and payment rate.
________________________________________
Test API Status
Route
•	GET /api/v1
Description
Check if the API is up and running.
Access
•	Public
Response
•	Returns a success message indicating the server status.
________________________________________
Get All Users
Route
•	GET /api/v1/public/secured/users
Description
Retrieve a list of all users.
Access
•	Public (secured)
Response
•	Returns an array of user objects containing basic information.
________________________________________
This documentation provides an overview of the functionalities implemented in the userController.js file. For more detailed information, refer to the respective route documentation and the actual code implementation.




Job Controller
Endpoints
•	GET /api/v1/jobs: Retrieve a list of all job postings.
•	GET /api/v1/jobs/:id: Retrieve details of a specific job posting.
•	POST /api/v1/jobs: Create a new job posting.
•	PUT /api/v1/jobs/:id: Update the details of a specific job posting.
•	DELETE /api/v1/jobs/:id: Delete a specific job posting.
Functionalities
Get All Jobs
Request:
bashCopy code
GET /api/v1/jobs 
Save to grepper
Response (200 OK):
perlCopy code
[ { "_id": "job_id", "title": "Job Title", "description": "Job Description", "user_email": "user@example.com", "skills": ["Skill 1", "Skill 2"], "budget": 1000, "duration": 7, "createdAt": "timestamp", "updatedAt": "timestamp" }, // ... more job postings ] 
Save to grepper
Create Job
Request:
bashCopy code
POST /api/v1/jobs 
Save to grepper
Request Body:
perlCopy code
{ "title": "Job Title", "description": "Job Description", "user_email": "user@example.com", "skills": ["Skill 1", "Skill 2"], "budget": 1000, "duration": 7 } 
Save to grepper
Response (201 Created):
perlCopy code
{ "_id": "job_id", "title": "Job Title", "description": "Job Description", "user_email": "user@example.com", "skills": ["Skill 1", "Skill 2"], "budget": 1000, "duration": 7, "createdAt": "timestamp", "updatedAt": "timestamp" } 
Save to grepper
Update Job
Request:
bashCopy code
PUT /api/v1/jobs/:id 
Save to grepper
Request Body:
jsonCopy code
{ "title": "Updated Title", "description": "Updated Description", "skills": ["Updated Skill"], "budget": 1500, "duration": 10 } 
Save to grepper
Response (200 OK):
perlCopy code
{ "_id": "job_id", "title": "Updated Title", "description": "Updated Description", "user_email": "user@example.com", "skills": ["Updated Skill"], "budget": 1500, "duration": 10, "createdAt": "timestamp", "updatedAt": "timestamp" } 
Save to grepper
Delete Job
Request:
bashCopy code
DELETE /api/v1/jobs/:id 
Save to grepper
Response (200 OK):
jsonCopy code
{ "message": "Deleted Successfully" } 
Save to grepper
Bid Controller
Endpoints
•	GET /api/v1/bids/freelancer: Retrieve a list of bids placed by a freelancer.
•	GET /api/v1/bids/:id/status: Retrieve the status of a specific bid.
•	PUT /api/v1/bids/:id/status: Update the status of a specific bid.
Functionalities
Get Freelancer Bids
Request:
bashCopy code
GET /api/v1/bids/freelancer 
Save to grepper
Response (200 OK):
jsonCopy code
[ { "_id": "bid_id", "job": "job_id", "proposal": "Bid Proposal", "price": 500, "status": "pending", "createdAt": "timestamp", "updatedAt": "timestamp" }, // ... more bids ] 
Save to grepper
Get Bid Status
Request:
bashCopy code
GET /api/v1/bids/:id/status 
Save to grepper
Response (200 OK):
jsonCopy code
{ "status": "pending" } 
Save to grepper
Update Bid Status
Request:
bashCopy code
PUT /api/v1/bids/:id/status 
Save to grepper
Request Body:
jsonCopy code
{ "status": "accepted" } 
Save to grepper
Response (200 OK):
jsonCopy code
{ "status": "accepted" } 
Save to grepper
________________________________________
Feel free to copy and paste this documentation into your project documentation or any other relevant location.


Consultation API Documentation
Table of Contents
•	Introduction
•	Authentication
•	Consultation Endpoints
•	Book a Consultation
•	Get User's Consultations
•	Update Consultation Date and Time
•	Error Responses
________________________________________
Introduction
This API documentation outlines the endpoints for managing user consultations. Users can book consultations, view their consultations, and update consultation date and time.
Authentication
All consultation endpoints require authentication. Users need to include their valid JSON Web Token (JWT) in the authorization header of their requests.
Example:
makefileCopy code
Authorization: Bearer <token> 
Save to grepper
________________________________________
Consultation Endpoints
Book a Consultation
•	Endpoint: POST /api/v1/consultations
•	Description: Book a new consultation.
•	Authentication: Required
•	Request Body:
Field	Type	Description
title	String	Title of the consultation
firstName	String	First name of the user
lastName	String	Last name of the user
email	String	Email of the user
phoneNumber	String	Phone number of the user
date	Date	Date of the consultation (ISO 8601 format)
time	String	Time of the consultation (e.g., "09:00 AM")
•	Response:
•	Status Code: 201 (Created)
•	Body: JSON representation of the created consultation
________________________________________
Get User's Consultations
•	Endpoint: GET /api/v1/consultations
•	Description: Get a list of consultations booked by the user.
•	Authentication: Required
•	Response:
•	Status Code: 200 (OK)
•	Body: Array of JSON objects representing user's consultations
________________________________________
Update Consultation Date and Time
•	Endpoint: PUT /api/v1/consultations/:id/update-datetime
•	Description: Update the date and time of a consultation.
•	Authentication: Required
•	Parameters:
•	id (Path parameter): ID of the consultation to update
•	Request Body:
Field	Type	Description
date	Date	New date of the consultation
time	String	New time of the consultation (e.g., "09:00 AM")
•	Response:
•	Status Code: 200 (OK)
•	Body: JSON representation of the updated consultation
________________________________________
Error Responses
•	Status Code: 400 (Bad Request)
•	Body: { "message": "Error message describing the issue" }
•	Status Code: 401 (Unauthorized)
•	Body: { "message": "Unauthorized access" }
•	Status Code: 404 (Not Found)
•	Body: { "message": "Resource not found" }
________________________________________
This documentation provides an overview of the consultation endpoints, request bodies, responses, and error cases. Make sure to integrate this documentation with your API and adjust the base URL and paths based on your application's structure.

