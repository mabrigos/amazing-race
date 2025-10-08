# Amazing Race - Group 1 Challenge 2

## Overview
This project contains the implementation of controllers and utilities for managing users and items. It includes tests to ensure the correctness of the implemented functionality.

### Key Features
- **User Management**: Add and fetch users using the `userController`.
- **Item Management**: Retrieve items with consistent price formatting using the `itemController`.
- **Utilities**: Mathematical operations (`add`, `multiply`) and formatting utilities.

## Project Structure
```
controllers/
  userController.js   # Handles user-related operations
  itemController.js   # Handles item-related operations

test/
  utils.test.js       # Unit tests for utility functions

utils/
  calc.js             # Mathematical utility functions
  format.js           # Formatting utility functions
```

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd amazing-race/group-1/challenge-2
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage
### Running the Application
1. Start the server:
   ```bash
   npm start
   ```
2. Access the endpoints:
   - **Get User**: `GET /user`
   - **Add User**: `POST /user`
   - **Get Items**: `GET /items`

### Running Tests
To run the tests, use the following command:
```bash
npm test
```

## API Endpoints
### User Endpoints
- **GET /user**: Fetch a user by ID.
- **POST /user**: Add a new user.

### Item Endpoints
- **GET /items**: Retrieve a list of items with optional price formatting.

## Utilities
### Mathematical Functions
- **add(a, b)**: Adds two numbers. If inputs are strings, they are converted to numbers before addition.
- **multiply(x, y)**: Multiplies two numbers.

## Contributing
1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License.
