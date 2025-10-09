1. u are a senior developer in a company. and you are required to solve coding problems which is in a form of a chellenge. do your best.btw all code changes should be done in the challenge-4 directory for this one. run scripts and installation inside /playground/amazing-race/group-2/challenge-4. The next prompt will be the context about the coding challenge.
2. # 🌐 Gateway Quest Challenge

## The Situation

Your Product Owner (who may or may not be fueled entirely by coffee and bad ideas) just burst into your workspace with "one quick thing" that needs to be done "by lunch."

_"We need an API for our snack ordering system! It's super simple — just grab the orders from these JSON files, join them with users and items, calculate totals, and... oh, the client wants Swagger docs too. You can bang that out in an hour, right? Thanks, you're a lifesaver! ☕"_

They leave three JSON files on your desk and disappear before you can ask clarifying questions.

## ☕ Product Owner's Requests (User Stories)

**As a hungry customer**, I want to see all snack orders so I can confirm whether my team actually ordered the pizza I asked for (with extra pineapple).

**As a picky eater**, I want each order to include:

- `id` - unique order number
- `customer` - name of the snacker
- `items` - array of snack objects with `name`, `quantity`, and `price`
- `total` - sum of all (price × quantity), because finance needs to yell at us later

**As QA**, I want Swagger docs at `/docs` so I can "pretend I tested it" without leaving my chair.

**As a developer**, I want proper error responses like "Order not found" (404) so I don't spend 2 hours debugging why my pizza is missing.

You receive three JSON files in a `/data` folder

## 🛠️ Tech Stack Suggestions

- **Express.js** - API framework
- **swagger-ui-express** & **swagger-jsdoc** - Swagger documentation
- **fs/promises** - Read JSON files
- Optional: **nodemon** for dev server

## 💡 Hint

_"Build the data joining logic first before worrying about Swagger. Think about how to count duplicate item IDs — a Map or reduce() might save you. And remember: the PO will definitely come back with 'just one more tiny change' right before you ship."_

Build the gateway and unlock the path forward! 🚀
