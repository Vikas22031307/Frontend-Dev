// Q9: Shopping Cart Total (Classes + RegExp for Coupon)
class Cart {
  constructor() {
    this.items = []; // {name, price, quantity}
    this.coupon = null;
  }

  addItem(name, price, quantity=1) {
    if (quantity <= 0) throw new Error('Quantity must be > 0');
    this.items.push({ name, price: Number(price), quantity: Number(quantity) });
  }

  getSubtotal() {
    return this.items.reduce((acc,i) => acc + i.price * i.quantity, 0);
  }

  getTotal() {
    const subtotal = this.getSubtotal();
    if (!this.coupon) return +(subtotal.toFixed(2));
    const { percent } = this.coupon;
    const total = +(subtotal * (1 - percent/100)).toFixed(2);
    return total;
  }

  // coupon like SAVE20 or DISC10
  applyCoupon(code) {
    const re = /^(SAVE|DISC)(\d{1,2})$/i;
    const m = re.exec(code.trim());
    if (!m) return { ok:false, msg:'Invalid coupon format' };
    const percent = Number(m[2]);
    if (percent < 1 || percent > 90) return { ok:false, msg:'Unrealistic discount percent' };
    this.coupon = { code: code.toUpperCase(), percent };
    return { ok:true, coupon:this.coupon };
  }
}

// Export for Node/browser
if (typeof module !== 'undefined') module.exports = { Cart };
