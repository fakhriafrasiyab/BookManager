## Book Manager Application

This repository contains two modules:

- **Backend:** Spring Boot REST API for managing books (CRUD)
- **Frontend:** React TypeScript application for interacting with the API

---

## Backend Module (Spring Boot API)

### Overview

This module provides RESTful endpoints to create, read, update, and delete books stored in a database. Each book has a `title` and an `author`.

### Endpoints

| HTTP Method | Path              | Description               | Request Body          | Response                          |
|-------------|-------------------|---------------------------|-----------------------|----------------------------------|
| GET         | `/api/books`      | Get all books             | None                  | List of all books                |
| GET         | `/api/books/{id}` | Get book by ID            | None                  | Book object or 404 if not found  |
| POST        | `/api/books`      | Create a new book         | `{title, author}`      | Created book                    |
| PUT         | `/api/books/{id}` | Update book by ID         | `{title, author}`      | Updated book or 404 if not found |
| DELETE      | `/api/books/{id}` | Delete book by ID         | None                  | 200 OK with message or 404 if not found |

### Technologies

- Java 17+
- Spring Boot
- Spring Data JPA
- H2/MySQL/PostgreSQL (any JPA compatible DB)

### How to Run

1. Clone the repository  
2. Configure the database in `application.properties`  
3. Run the application using:

   ```bash
   mvn spring-boot:run
````

or run it from your IDE.
4\. API runs on `http://localhost:8080/api/books`

---

## Frontend Module (React TypeScript App)

### Overview

React app to manage books via the backend API. Features include:

* List all books
* Add a new book
* Edit existing book inline
* Delete a book

### Usage

* Add a book using the form
* View the list of books below
* Click "Edit" to update a book inline, then save or cancel
* Click "Delete" to remove a book

### Technologies

* React 18+
* TypeScript
* Axios for HTTP requests
* Functional components with hooks

### How to Run

1. Navigate to the frontend folder

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the app:

   ```bash
   npm start
   ```

4. Open your browser at `http://localhost:3000`

---

## Integration Notes

* Frontend expects backend API at `http://localhost:8080/api/books`
* If backend URL or port changes, update axios URLs in frontend accordingly

---

## Troubleshooting

* Make sure backend is running before using the frontend
* If CORS errors occur, configure CORS in backend Spring Boot app
* Check browser console and backend logs for errors

