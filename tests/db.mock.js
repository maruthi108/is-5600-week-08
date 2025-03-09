// tests/db.mock.js

/**
 * Mock data to be returned by our mock database queries.
 */
const mockProducts = [
    { description: 'Product 1' },
    { description: 'Product 2' }
];

/**
 * Mock Mongoose Query object.
 */
const mockQuery = {
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(mockProducts),
    then: jest.fn((callback) => {
        callback(mockProducts);
        return mockQuery;
    })
};

/**
 * Mock Mongoose Model object.
 */
const mockModel = {
    find: jest.fn().mockReturnValue(mockQuery),
    findById: jest.fn().mockImplementation(id => {
        return Promise.resolve({ _id: id, description: 'Product 1' });
    }),
    deleteOne: jest.fn().mockImplementation(query => {
        return Promise.resolve({ deletedCount: 1 });
    })
};

/**
 * Mock DB object that simulates the mongoose db interface.
 */
const mockDb = {
    model: jest.fn().mockReturnValue(mockModel)
};

module.exports = {
    mockDb,
    mockProducts,
    mockModel,
    mockQuery
};