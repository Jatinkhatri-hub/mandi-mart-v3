document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('product-form');
  const variantRadios = document.querySelectorAll('.variant-radio');
  const quantityRadios = document.querySelectorAll('.quantity-radio');
  const currentPriceEl = document.querySelector('.main-product__current-price');
  const compareAtPriceEl = document.querySelector('.main-product__cap');
  const addToCartBtn = document.querySelector('.main-product__atc-btn');

  // Create message container
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('add-to-cart-message');
  messageContainer.style.cssText = `
    margin-top: 10px;
    padding: 10px;
    text-align: center;
    display: none;
  `;
  addToCartBtn.parentNode.insertBefore(messageContainer, addToCartBtn.nextSibling);

  // Function to show message
  const showMessage = (message, isSuccess) => {
    messageContainer.textContent = message;
    messageContainer.style.display = 'block';
    messageContainer.style.color = isSuccess ? 'green' : 'red';
    
    // Auto-hide message after 3 seconds
    setTimeout(() => {
      messageContainer.style.display = 'none';
    }, 3000);
  };

  let selectedVariant = null;
  let selectedQuantity = 1;

  // Improved money formatting function
  const formatMoney = (price) => {
    // Remove currency symbol and convert to number
    const numericPrice = typeof price === 'string' 
      ? parseFloat(price.replace(/[^0-9.-]+/g, ''))
      : price;
    
    // Check if it's a valid number
    if (isNaN(numericPrice)) {
      console.error('Invalid price:', price);
      return '$0.00'; // Fallback price
    }

    // Format with two decimal places
    return `Rs. ${numericPrice.toFixed(2)}`;
  };

  // Initialize first variant as selected
  if (variantRadios.length > 0) {
    variantRadios[0].checked = true;
    selectedVariant = variantRadios[0].value;
  }

  // Variant selection handler
  variantRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      selectedVariant = e.target.value;
      
      // Get price and compare at price
      const price = e.target.getAttribute('data-price');
      const compareAtPrice = e.target.getAttribute('data-compare-at-price');
      
      // Update price elements with safe formatting
      if (currentPriceEl) {
        currentPriceEl.textContent = formatMoney(price);
      }
      
      if (compareAtPriceEl) {
        compareAtPriceEl.textContent = compareAtPrice ? formatMoney(compareAtPrice) : '';
        compareAtPriceEl.style.display = compareAtPrice ? 'inline' : 'none';
      }
    });
  });

  // Quantity selection handler
  quantityRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      selectedQuantity = parseInt(e.target.value);
      
      // Find the currently selected variant
      const currentVariant = document.querySelector('.variant-radio:checked');
      
      if (currentVariant) {
        let basePrice = currentVariant.getAttribute('data-price');
        let compareAtPrice = currentVariant.getAttribute('data-compare-at-price');
        
        // Example quantity-based pricing logic
        switch(selectedQuantity) {
          case 2:
            // 15% off for 2 items
            basePrice = parseFloat(basePrice.replace(/[^0-9.-]+/g, '')) * 0.85 * 2;
            compareAtPrice = parseFloat(compareAtPrice) * 2;
            console.log(currentVariant);
            break;
          case 3:
            // 20% off for 3 items
            basePrice = parseFloat(basePrice.replace(/[^0-9.-]+/g, '')) * 0.80 * 3;
            compareAtPrice = parseFloat(compareAtPrice) * 3;
            console.log(compareAtPrice);

            break;
          default:
            // Ensure it's the original price for quantity 1
            basePrice = parseFloat(basePrice.replace(/[^0-9.-]+/g, ''));
            compareAtPrice = parseFloat(compareAtPrice);

        }
        
        // Update price display
        if (currentPriceEl) {
          currentPriceEl.textContent = formatMoney(basePrice);
          compareAtPriceEl.textContent = formatMoney(compareAtPrice);
        }
      }
    });
  });

  // Add to Cart Handler (remains the same as previous script)
  addToCartBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const variantIdToAdd = selectedVariant || 
      (variantRadios.length > 0 ? variantRadios[0].value : null);

    if (!variantIdToAdd) {
      showMessage('Please select a variant', false);
      addToCartBtn.disabled = false;
      addToCartBtn.textContent = 'Add to Cart';
      return;
    }

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          id: variantIdToAdd,
          quantity: selectedQuantity
        })
      });

      if (response.ok) {
        showMessage('Item successfully added to cart!', true);

        // window.location.href = '/cart';
      } else {
        const errorData = await response.json();
        throw new Error(errorData.description || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Add to Cart Error:', error);
      alert(error.message);
    }

    

  });

  

  // Trigger initial price setup
  const initialVariant = document.querySelector('.variant-radio:checked');
  if (initialVariant) {
    initialVariant.dispatchEvent(new Event('change'));
  }
});