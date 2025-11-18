// Q1: E-Commerce Product Manager (Classes + Objects)
// Save as Q1_product_manager.js
class Product {
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  applyDiscount(percent) {
    if (percent < 0 || percent > 100) throw new Error('Invalid discount percent');
    this.price = +(this.price * (1 - percent / 100)).toFixed(2);
  }

  details() {
    return `Product [ID: ${this.id}] ${this.name} - ₹${this.price} (${this.category})`;
  }
}

// Example usage:
const products = [
  new Product(1, 'Laptop Pro', 85000, 'Electronics'),
  new Product(2, 'Leather Wallet', 1200, 'Accessories'),
  new Product(3, 'Bluetooth Headset', 2500, 'Electronics'),
  new Product(4, 'Notebook', 150, 'Stationery')
];

// Apply a 10% discount to first product
products[0].applyDiscount(10);

// Display details
products.forEach(p => console.log(p.details()));

// Display products with price > 1000
console.log('\nProducts with price > 1000:');
products.filter(p => p.price > 1000).forEach(p => console.log(p.details()));

// Export for Node/browser usage
if (typeof module !== 'undefined') module.exports = { Product, products };
