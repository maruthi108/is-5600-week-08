// tests/products.test.js
const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Mock the db module to use our mockDb
jest.mock('../db', () => mockDb);

describe('Product Module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('list', () => {
        it('should list products', async () => {
            const products = await list();
            // Check that products is defined first
            expect(products).toBeDefined();
            expect(Array.isArray(products)).toBe(true);
            // Since we're mocking, we know exactly what should be returned
            expect(products).toEqual(mockProducts);
            expect(products[0].description).toBe('Product 1');
            expect(products[1].description).toBe('Product 2');
        });
    });

    describe('get', () => {
        it('should get a product by id', async () => {
            // Mock the Product.findById method to return a specific product
            mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

            const productId = '123456789012';
            const product = await get(productId);
            
            expect(product).toBeDefined();
            expect(product.description).toBe('Product 1');
            expect(mockModel.findById).toHaveBeenCalledWith(productId);
        });
    });

    describe('destroy', () => {
        it('should delete a product', async () => {
            // Mock the deleteOne method to simulate successful deletion
            mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
            
            const productId = '123456789012';
            const result = await destroy(productId);
            
            expect(result).toBeDefined();
            expect(result.deletedCount).toBe(1);
            expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: productId });
        });
    });
});