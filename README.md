# API-Contract-nutech

## Features
- **User Registration & Login**: Allows users to create accounts and securely log in.
- **Balance Check**: Users can check their current balance.
- **Top-Up**: Users can top-up their account balance.
- **Transaction History**: View a list of all transactions, including top-ups and other operations.
- **JWT Authentication**: Secures API endpoints, ensuring only authenticated users can access them.
- **Profile Image Upload**: Users can upload a profile image (supports only JPG, JPEG, and PNG formats).

## Technologies Used
- **Node.js**: JavaScript runtime used to build the backend.
- **Express.js**: Web framework for Node.js used to create the RESTful API.
- **PostgreSQL**: SQL database for storing user data, balances, and transaction history.
- **Pg**: PostgreSQL client for Node.js used to manage database connections efficiently.
- **Knex.js**: SQL query builder for database migrations and seeder.
- **Multer**: Middleware for handling file uploads.
- **Joi**: Library for input validation (used for validating registration, login, and file uploads).
- **JWT (JSON Web Tokens)**: Used for user authentication and securing API routes.
- **Dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **Imagekit**: Cloud-based image optimization and storage service used for uploading and managing profile images.
- **Morgan**: HTTP request logger middleware used for logging requests to the server for debugging and monitoring.
- **Swagger**: API documentation tool that allows you to describe your RESTful API and provides an interactive UI to test the endpoints.

## Installation

To set up and run the API locally, ensure you have **Node.js** and **PostgreSQL** installed, then follow these steps:

### Clone the Repository:
```bash
git clone https://github.com/MyWhySaputra/API-Contract-nutech
cd API-Contract-nutech
```

### Install Dependencies:
```bash
npm install
```

### Set Up Environment Variables:
Create a `.env` file in the root directory and add your database credentials and JWT secret:
```bash
PORT=
BASE_URL='http://localhost:8080'
SALT_ROUND=
SECRET_KEY=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
DATABASE_URL=
```

### Migrate the Database:
Run the following command to create the necessary database tables:
```bash
npm run migrate
```

### Seed the Database:
Run the following command to seed :
``` bash
npm run seed
```

### Run the Project:
```bash
npm run dev
```
The server will be running at `http://localhost:8080`.

## API Endpoints

### User Endpoints:
- **POST api/v1/registration**: Register a new user.
  - Body: `{ "email": "user@example.com", "first_name": "wahyu", "last_name":"saputra", "password": "yourpassword" }`
- **POST api/v1/login**: Log in an existing user.
  - Body: `{ "email": "user@example.com", "password": "yourpassword" }`
- **PUT api/v1/profile/image**: Upload a profile image.
  - Header: `Authorization: Bearer <token>`
  - File: `form-data` (file field)

### Transaction Endpoints:
- **GET /balance**: Check the current balance.
  - Header: `Authorization: Bearer <token>`
- **POST /topup**: Top up the user’s balance.
  - Header: `Authorization: Bearer <token>`
  - Body: `{ "top_up_amount": 100 }`
- **GET /transactions**: View the user’s transaction history.
  - Header: `Authorization: Bearer <token>`

## Business Logic
- **Registration**: Validates user input using `Joi`, encrypts the password using `bcrypt`, and stores the user in the database.
- **Login**: Verifies the user's credentials and returns a JWT for subsequent requests.
- **Top-Up**: Allows users to increase their balance and logs the transaction in the `transaction_history` table.
- **JWT Authentication**: Ensures that sensitive routes (e.g., balance check, top-up) are only accessible to authenticated users.
- **Profile Image Upload**: Users can upload profile images (only `jpg`, `jpeg`, and `png` formats allowed).

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request if you'd like to improve the project.

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, feel free to reach out via email at [wahyusaputra222000@gmail.com].

---

Let me know if you'd like any further adjustments!