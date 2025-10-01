const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) { // FIXED Bug: <= should be <
      total += cartItems[i].price; // FIXED Bug: cartItems[i] is undefined on the last iteration
  }
  return total;
}

function applyDiscount(total, discountRate) {
  if (typeof discountRate != "number") { // ADDED: validation for "discountRate" variable
    return;
  }
  if (discountRate > 0 && discountRate < 1) {
    return total - total * discountRate; // FIXED Bug: Missing validation for discountRate
  }
}

function generateReceipt(cartItems, total) {
  let receipt = "Items:\n";
  cartItems.forEach(item => {
      let discountedPrice = applyDiscount(item.price, 0.2); // ADDED: display discounted price of each item on receipt
      receipt += `${item.name}: ` + "$" + discountedPrice + "\n";
  });
  if (typeof total != "number") { // ADDED: validation for "total" variable
    return;
  }
  receipt += `Total: $${total.toFixed(2)}`; // FIXED Bug: total may not be a number
  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;


/* --- COMMENTS ---
Dev Tools Console: 
  Helped find uncaught TypeError, cannot read properties of undefined
  It's referencing the variable "price" in line 10, and also line 30 when the function is called
  SOLUTION: change <= to < in line 9, now calculateTotal() can complete its loop properly 
  No more errors appear in console
Breakpoints: 
  Identified that prices for individual items are being logged without including 20% discount 
  Receipt total still includes 20% discount 
Validation: 
  Added validation for variables in lines 16 and 29
UX: 
  Added discountedPrice variable to show consumer discounted price of each item 
*/