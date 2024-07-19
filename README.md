# AI Document Assistant Documentation

An App that helps the Improves user documents.

### API

## User Endpoints

### Create New User (Sign Up)

- **Endpoint**: `POST /api/users/login`

- **Description**: Sign up as a User

- **Request Headers**: None

- **Request Body**

  - `username` (String): a unique user string .
  - `password` (String): Password with at least 8 characters.
  - `email` (String): a valid email address.
  - Sample:

    ```json
    {
      "email": "user@gmail.com",
      "username":"new_user"
      "password": "@ValidPassword123"
    }
    ```

- **Response**

  - **Success**

    - Status: 201 Created

### Login

- **Endpoint**: `POST /api/users/login`

- **Request Body**

  - `email`: user's email
  - `password`: user's password
  - Sample:

  ```json
  {
    "email": "newty@gmail.com",
    "password": "@ValidPassword123"
  }
  ```

- **Response**

  - Status: 200 OK
  - Body: JSON Object with auth token,

### Find User By Id

- **Endpoint**: `GET /api/users/:id`

- **Parameters**

  - `id` (number): found in the 'id' field of each user

- **Response**

  - Status: 200 OK
  - Body: JSON object with the found user

### Logout

- **Endpoint**: `GET /api/users/logout`

- **Response**

  - Status: 200 OK
  - Body: JSON object with the found user

## Document Endpoints

### Create New Document

- **Endpoint**: `POST /api/documents/upload`

- **Request**

  - Body: Multi-type form data with the File

    ```json
    {
      "document": "File"
    }
    ```

- **Response**

  - Status: 201 Created
  - Body: JSON object with the id of the created document and success message
  - Sample:

    ```json
    {
      "message": "document saved successfully",
      "docId": 1 //"id of the interted document "
    }
    ```

### Find all user documents

- **Endpoint**: `GET /api/documents/`

- **Response**

  - Status: 200 OK
  - Body: JSON object with the all found documents their user details and the content

### Delete Document

- **Endpoint**: `DELETE /api/documents/:id/`

- **Parameters**

  - `id` (number): found in the 'id' field of each document entry

- **Response**

  - Status: 200 OK

## Content Endpoints

### Improve Content

- **Endpoint**: `POST /api/content/:contId/improve`

- **Request**

  - Body: json object with content as text,

    ```json
    {
      "content": "sample text "
    }
    ```

- **Response**

  - Status: 200 OK
  - Body: Output of the model in html transformed from markdown to render on the react quill editor if the user want to edit

### Save content

- **Endpoint**: `POST /api/content/:id`

- **Parameters**

  - `id` (number): found in the 'id' field of each content entry

- **Request**

  - Body: JSON Object with the text as string, the original document id and the original content id
  - Sample:

    ```json
    {
      "text": "sample text", //String: required.
      "document_id": 1 // "id of the document the content wa extracted from "
    }
    ```

- **Response**

  - Status: 200 OK
  - Body: success message

### Delete Content

- **Endpoint**: `DELETE /api/content/:id`

- **Parameters**

  - `id` (number): found in the 'id' field of each entry

- **Response**

  - Status: 200 OK
  - Body: success message
  - Sample:

### Get Original document content

- **Endpoint**: `GET /api/content/original/:id`
- **Parameters**
- `id` (number): found in the 'id' field of each entry

- **Response**

  - Status: 200 OK
  - Body: JSON Object with content

### Find Content

- **Endpoint**: `GET /api/content/:id`

- **Parameters**

  - `id` (number): found in the 'id' field of eachentry

- **Response**

  - Status: 200 OK
  - Body: JSON Object with found entry
  - Sample:

### FRONTEND
