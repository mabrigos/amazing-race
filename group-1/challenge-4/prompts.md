1. AGENT - i have 3 json files that contains these data:

- items.json for items
- users.json for users
- orders.json for orders where userId is the id in users and items is an array of ids in items

using express, i need two endpoints
- get all the orders with this response (array):
    id - unique order number
    customer - name of the snacker
    items - array of snack objects with name, quantity, and price
    total - sum of all (price × quantity), because finance needs to yell at us later
- get an order using the id
  return the same object containing id, customer, items, total
  response should be 404 if order is not existing or 200 for success

moreover, using the swagger packages, create the docs for the two endpoints
