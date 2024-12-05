document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('product-form');
  const variantRadios = document.querySelectorAll('.variant-radio');
  const quantityRadios = document.querySelectorAll('.quantity-radio');
  const currentPriceEl = document.querySelector('.main-product__current-price');
  const compareAtPriceEl = document.querySelector('.main-product__cap');
  const addToCartBtn = document.querySelector('.main-product__atc-btn');

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
    return `$${numericPrice.toFixed(2)}`;
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
        
        // Example quantity-based pricing logic
        switch(selectedQuantity) {
          case 2:
            // 15% off for 2 items
            basePrice = parseFloat(basePrice.replace(/[^0-9.-]+/g, '')) * 0.85;
            break;
          case 3:
            // 20% off for 3 items
            basePrice = parseFloat(basePrice.replace(/[^0-9.-]+/g, '')) * 0.80;
            break;
          default:
            // Ensure it's the original price for quantity 1
            basePrice = parseFloat(basePrice.replace(/[^0-9.-]+/g, ''));
        }
        
        // Update price display
        if (currentPriceEl) {
          currentPriceEl.textContent = formatMoney(basePrice);
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
      alert('Please select a variant');
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

   // Show error message
   showError(message) {
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('error-message');
    errorContainer.style.color = 'red';
    errorContainer.textContent = message;
    
    // Append error message near add to cart button
    if (this.addToCartButton) {
      this.addToCartButton.parentNode.insertBefore(errorContainer, this.addToCartButton.nextSibling);
      
      // Remove error after 3 seconds
      setTimeout(() => {
        errorContainer.remove();
      }, 3000);
    }
  }
  
  // Show success message
  showSuccess(message) {
    const successContainer = document.createElement('div');
    successContainer.classList.add('success-message');
    successContainer.style.color = 'green';
    successContainer.textContent = message;
    
    // Append success message near add to cart button
    if (this.addToCartButton) {
      this.addToCartButton.parentNode.insertBefore(successContainer, this.addToCartButton.nextSibling);
      
      // Remove success message after 3 seconds
      setTimeout(() => {
        successContainer.remove();
      }, 3000);
    }
  }
  

  // Trigger initial price setup
  const initialVariant = document.querySelector('.variant-radio:checked');
  if (initialVariant) {
    initialVariant.dispatchEvent(new Event('change'));
  }
});