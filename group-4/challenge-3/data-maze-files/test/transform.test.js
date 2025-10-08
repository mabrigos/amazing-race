// test/transform.test.js
const {
  normalizeDate,
  extractCustomerName,
  normalizeTotal,
  normalizeItems
} = require('../transform');

describe('Data Transformation', () => {
  test('normalizeDate handles ISO format', () => {
    expect(normalizeDate('2024-01-15')).toMatch(/2024-01-15/);
  });
  
  test('normalizeDate handles US format', () => {
    const result = normalizeDate('01/20/2024');
    expect(result).toMatch(/2024-01-20/);
  });
  
  test('normalizeDate handles timestamp', () => {
    const result = normalizeDate('1706889600000');
    expect(result).toContain('2024');
  });
  
  test('extractCustomerName handles various fields', () => {
    expect(extractCustomerName({ custName: 'Alice' })).toBe('Alice');
    expect(extractCustomerName({ customer_name: 'Bob' })).toBe('Bob');
    expect(extractCustomerName({ client: 'Charlie' })).toBe('Charlie');
    expect(extractCustomerName({ customer: { name: 'Diana' } })).toBe('Diana');
  });
  
  test('normalizeTotal handles strings and numbers', () => {
    expect(normalizeTotal('299.99')).toBe(299.99);
    expect(normalizeTotal(150.50)).toBe(150.50);
    expect(normalizeTotal('null')).toBe(0);
    expect(normalizeTotal('invalid')).toBe(0);
  });
  
  test('normalizeItems handles different structures', () => {
    const order1 = {
      items: [{ product: 'Laptop', qty: '1', price: '299.99' }]
    };
    const items1 = normalizeItems(order1);
    expect(items1).toHaveLength(1);
    expect(items1[0]).toHaveProperty('product');
    expect(items1[0]).toHaveProperty('quantity');
    expect(items1[0]).toHaveProperty('price');
  });
});