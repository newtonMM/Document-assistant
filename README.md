AI Document Assistant

Introduction

This project is an AI Document Assistant system built using Node.js and Express and React It provides functionalities for user authentication, content improvements, and document handling.

Installation

To install and run this project, follow these steps:

Clone the repository:
git clone <https://github.com/newtonMM/Document-assistant.git>

cd into the frontend and backend
Set up environment variables:

Create a .env file in the backend and frontend directory and add the necessary environment variables.
For example:
backend

DATABASE_URL=your-database-url
HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=3306
JWT_SECRET_KEY=
PORT=8080
GEMMA_API_KEY=
grab your GEMINI_KEY here = https://ai.google.dev/aistudio

Frontend
VITE_API_URL=http://localhost:8080/api
Run the application:in the backend directory
install typescript globally npm install -g typescript
install dependencies by running npm install
run tsc to generate the dist folder
run npm run dev to start the development server or npm start to start the application

In the Frontend directory
run npm install then npm run dev after adding the base url

Usage


https://github.com/user-attachments/assets/99fd2797-96a9-4a26-a148-1aa6776c5218





