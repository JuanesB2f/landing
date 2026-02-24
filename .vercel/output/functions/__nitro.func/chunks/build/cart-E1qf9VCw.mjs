import { defineStore } from 'pinia';

const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    taxAmount: 0,
    shippingAmount: 0
  }),
  getters: {
    subtotal: (state) => state.items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    total: (state) => state.items.reduce((sum, it) => sum + it.price * it.quantity, 0) + state.taxAmount + state.shippingAmount,
    count: (state) => state.items.reduce((sum, it) => sum + it.quantity, 0)
  },
  actions: {
    addItem(item, quantity = 1) {
      const existing = this.items.find((i) => i.product_id === item.product_id);
      if (existing) existing.quantity += quantity;
      else this.items.push({ ...item, quantity });
    },
    removeOne(product_id) {
      const it = this.items.find((i) => i.product_id === product_id);
      if (!it) return;
      it.quantity -= 1;
      if (it.quantity <= 0) this.removeItem(product_id);
    },
    removeItem(product_id) {
      this.items = this.items.filter((i) => i.product_id !== product_id);
    },
    updateQuantity(product_id, quantity) {
      const it = this.items.find((i) => i.product_id === product_id);
      if (!it) return;
      it.quantity = Math.max(1, quantity);
    },
    clear() {
      this.items = [];
    },
    setTax(amount) {
      this.taxAmount = Math.max(0, Number(amount) || 0);
    },
    setShipping(amount) {
      this.shippingAmount = Math.max(0, Number(amount) || 0);
    }
  }
});

export { useCartStore as u };
//# sourceMappingURL=cart-E1qf9VCw.mjs.map
