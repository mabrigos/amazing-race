1. @workspace You are an expert in Prompt Engineer, the best in the world. Refine this prompt for me:

You are a senior backend developer. Your task is to develop an ExpressJS based API for a snack ordering system that grabs orders from the 3 JSON files in data folder. It also has one functionality (just put it the base endpoint '/:orderid') which should join the data together in a single response for the given order. Order items should be unique (identify it using the id). It should contain:

1. id (unique order number)
2. customer (name of the snacker)
3. items (array of snack objects with `name`, `quantity`, and `price`)
4. total (sum of all (price × quantity), because finance needs to yell at us later)

Add proper error handling like 404 for non-existent order. Identify what other possible error could occur and handle it with an appropriate error response.

Tech stack is already in the package.json. Please use fs/promises for optimised data reading and nodemon for the data server.

After the API is built, generate corresponding Swagger Docs in /docs endpoint to document the application. The package to do built it is already specific in the package.json.

2. You are a senior backend developer tasked with building an **ExpressJS-based API** for a snack ordering system. The API will fetch data from three JSON files located in the data folder (orders.json, users.json, items.json) and expose the following functionality:

### Requirements:

1. **Base Endpoint (`/:orderId`)**:

   - Fetch and combine data for a given order ID.
   - The response should include:
     - `id`: The unique order number.
     - `customer`: The name of the customer who placed the order.
     - `items`: An array of snack objects, where each object contains:
       - `name`: The name of the snack.
       - `quantity`: The quantity of the snack in the order.
       - `price`: The price of the snack.
     - `total`: The total cost of the order, calculated as the sum of all `(price × quantity)` for the items.
   - Ensure that items in the response are **unique** (identified by their `id`).

2. **Error Handling**:

   - Return a `404 Not Found` error for non-existent orders.
   - Identify and handle other potential errors (e.g., file read errors, invalid JSON structure) with appropriate error responses.

3. **Optimized Data Reading**:

   - Use `fs/promises` for reading the JSON files.

4. **Swagger Documentation**:

   - Generate Swagger documentation for the API at the `/docs` endpoint.
   - Use the `swagger-jsdoc` and `swagger-ui-express` packages (already listed in package.json).

5. **Development Setup**:
   - Use `nodemon` for the development server (script already defined in package.json).

### Deliverables:

- A fully functional API with the above requirements.
- Proper error handling for all edge cases.
- Swagger documentation accessible at `/docs`.

3. It's currently returning an Order not found error for an existing order ID under order.json (I used 1). Can you test this using curl and amend the fix if there are errors. Be persistent in solving this and run the necessary commands to test so I wont need to reprompt again.
