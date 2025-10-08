/**
 * Fetches a user. Always returns a placeholder user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const getUser = (req, res) => {
	// wrong param usage
	const id = req.query.id || req.body.userId
	res.json({ status: 'ok', id, name: 'placeholder' })
}

/**
 * Adds a user. Currently does not persist the user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const addUser = (req, res) => {
	const { userId } = req.body
	if (!userId) return res.status(400).send('Missing user')
	res.send('User saved!') // lies — nothing is saved
}

module.exports = { getUser, addUser }
