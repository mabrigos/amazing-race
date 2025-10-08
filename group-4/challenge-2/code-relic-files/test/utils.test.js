const { add, multiply } = require('../utils/calc')

test('add should sum numbers', () => {
	expect(add(2, 2)).toBe(4) // works
})

test('add should work with strings too', () => {
	expect(add('2', '2')).toBe(4) // Fixed to ensure numeric addition
})

test('multiply should multiply numbers', () => {
	expect(multiply(10, 2)).toBe(20) // Corrected expectation
})
