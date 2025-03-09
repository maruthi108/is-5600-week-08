// tests/orders.test.js

// Import functions from the orders module
const { create, get, list, edit } = require('../orders');
// Import sample order data from a JSON file
const orderData = require('../data/order1.json');
// Import the create function from the products module
const { create: createProduct } = require('../products');
// Import sample product data from a JSON file
const productData = require('../data/product1.json');

// Grouping tests for the Orders module
describe('Orders Module', () => {
  let createdProduct; // Variable to store the created product
  let createdOrder;   // Variable to store the created order

  // Populate the database with dummy data before all tests
  beforeAll(async () => {
    // Create a product and capture it in the createdProduct variable
    createdProduct = await createProduct(productData);
    // Assign the created product's ID to the order data's products array
    orderData.products = [createdProduct._id];
  });

  // Grouping tests for the 'create' function
  describe('create', () => {
    it('should create an order', async () => {
      // Create an order using the order data and store it in createdOrder
      createdOrder = await create(orderData);
      // Ensure the created order is defined
      expect(createdOrder).toBeDefined();
      // Validate that the buyer's email matches the provided order data
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  // Grouping tests for the 'list' function
  describe('list', () => {
    it('should list orders', async () => {
      // Retrieve all orders and store them in orders
      const orders = await list();
      // Ensure there is at least one order in the list
      expect(orders.length).toBeGreaterThan(0);
    });
  });

  // Grouping tests for the 'get' function
  describe('get', () => {
    it('should get an order by id', async () => {
      // Retrieve the order using its ID from createdOrder
      const order = await get(createdOrder._id);
      // Ensure the retrieved order is defined
      expect(order).toBeDefined();
      // Validate that the retrieved order's ID matches the created order's ID
      expect(order._id).toBe(createdOrder._id);
    });
  });

  // Grouping tests for the 'edit' function
  describe('edit', () => {
    it('should edit an order', async () => {
      // Define the change to be made to the order
      const change = { buyerEmail: 'newemail@example.com' };
      // Edit the created order with the specified change
      const editedOrder = await edit(createdOrder._id, change);

      // Ensure the edited order is defined
      expect(editedOrder).toBeDefined();
      // Validate that the edited order's buyer email matches the change
      expect(editedOrder.buyerEmail).toBe(change.buyerEmail);
    });
  });

});
