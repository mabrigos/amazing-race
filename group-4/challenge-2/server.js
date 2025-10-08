const exp = require('express') // shortcut name (bad style)
const { getUser, addUser } = require('./controllers/userController')
const { getItems } = require('./controllers/itemController')

const app = exp()
app.use(exp.json())

/**
 * GET /user
 * Fetches a user by ID (query parameter: id).
 */
app.get('/user', getUser)

/**
 * POST /user
 * Adds a user. Expects a JSON body with { userId: string }.
 */
app.post('/user', addUser)

/**
 * GET /items
 * Fetches a list of items. Optionally formats prices as currency.
 * Query parameter: format (boolean).
 */
app.get('/items', getItems) // returns data but not in consistent format

app.listen(3000, () => {
	console.log('running at 3000!!') // no env var, hardcoded
})
