1. 
# context
you are tasked to create an api for a snack ordering system.
tech stack to use: 
- express
- swagger
- fs/promises


# end goal
Api endpoints:
- GET /api/orders/:id
  - response:
    - Status Code: 200
      - ```
        [
          {
            id: number
            customer: string
            items: [
              { 
                name: string, 
                price: number,
                quantity: number
              },
            ],
            total: number // total of item price
          }
        ]
        ```
     - Status Code: 400 // for invalid order id

# actor
act as a software engineer

2. 

check this endpoint and fix it

http://localhost:3000/api/orders/1

3. use `npm run dev`

4. 
upon running this endpoint `http://localhost:3000/api/orders/1`
it returns 
```
{
  "id": 1,
  "customer": "Alice the Snack Queen",
  "items": [
    {
      "name": "Unknown",
      "price": 0
    },
    {
      "name": "Unknown",
      "price": 0
    }
  ],
  "total": null
}
```

5.
Upong running this endpoint `http://localhost:3000/api/orders/2`
we get 
```
{
  "id": 2,
  "customer": "Bob the Pizza Hoarder",
  "items": [
    {
      "name": "Chips",
      "price": 5,
      "quantity": 1
    },
    {
      "name": "Chips",
      "price": 5,
      "quantity": 1
    },
    {
      "name": "Energy Drink",
      "price": 3,
      "quantity": 1
    }
  ],
  "total": 13
}
```
it returned to chips which seems redundant. 

6. 
make the error return 404 for not found instead of 400

7. 
implement a swagger docs.

8.
change to /docs instead of /api-docs