document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.product-card__atc-btn');

  buttons.forEach(button => {
    button.addEventListener('click', async function(event) {
      event.preventDefault();
      
      const variantId = this.getAttribute('data-variant-id');

      if (variantId) {
        await addToCart(variantId, this);
      }
    });
  });

  async function addToCart(variantId, button) {
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: [{
            id: variantId,
            quantity: 1
          }]
        })
      });

      const data = await response.json();
      console.log('Product added to cart:', data);
      // Optionally update the cart UI here
    } catch (error) {
      console.error('Error adding product to cart:', error);
    } finally {
      const originalText = button.textContent;
      button.textContent = 'Added!';
      
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    }
  }
});
