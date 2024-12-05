// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('product-form');
//   const variantRadios = document.querySelectorAll('.variant-radio');
//   const quantityRadios = document.querySelectorAll('.quantity-radio');
//   const currentPriceEl = document.querySelector('.main-product__current-price');
//   const compareAtPriceEl = document.querySelector('.main-product__cap');
//   const addToCartBtn = document.querySelector('.main-product__atc-btn');

//   let selectedVariant = null;
//   let selectedQuantity = 1;

//   // Initialize first variant as selected
//   if (variantRadios.length > 0) {
//     variantRadios[0].checked = true;
//     selectedVariant = variantRadios[0].value;
//   }

//   // Variant selection handler
//   variantRadios.forEach(radio => {
//     radio.addEventListener('change', (e) => {
//       selectedVariant = e.target.value;
      
//       // Update price based on selected variant
//       const price = e.target.getAttribute('data-price');
//       const compareAtPrice = e.target.getAttribute('data-compare-at-price');
      
//       if (currentPriceEl) currentPriceEl.textContent = price;
//       if (compareAtPriceEl) compareAtPriceEl.textContent = compareAtPrice;
//     });
//   });

//   // Quantity selection handler
//   quantityRadios.forEach(radio => {
//     radio.addEventListener('change', (e) => {
//       selectedQuantity = parseInt(e.target.value);
      
//       // Optional: Add logic for quantity-based discounts
//       // You might want to adjust pricing logic here based on quantity
//     });
//   });

//   // Add to Cart Handler
//   addToCartBtn.addEventListener('click', async (e) => {
//     e.preventDefault();

//     // If no variants, use the first product variant
//     const variantIdToAdd = selectedVariant || 
//       (variantRadios.length > 0 ? variantRadios[0].value : null);

//     if (!variantIdToAdd) {
//       alert('Please select a variant');
//       return;
//     }

//     try {
//       const response = await fetch('/cart/add.js', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Requested-With': 'XMLHttpRequest'
//         },
//         body: JSON.stringify({
//           id: variantIdToAdd,
//           quantity: selectedQuantity
//         })
//       });

//       if (response.ok) {
//         // Optional: Open cart drawer or show confirmation
//         window.location.href = '/cart';
//       } else {
//         const errorData = await response.json();
//         throw new Error(errorData.description || 'Failed to add to cart');
//       }
//     } catch (error) {
//       console.error('Add to Cart Error:', error);
//       alert(error.message);
//     }
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('product-form');
  const variantRadios = document.querySelectorAll('.variant-radio');
  const quantityRadios = document.querySelectorAll('.quantity-radio');
  const currentPriceEl = document.querySelector('.main-product__current-price');
  const compareAtPriceEl = document.querySelector('.main-product__cap');
  const addToCartBtn = document.querySelector('.main-product__atc-btn');

  let selectedVariant = null;
  let selectedQuantity = 1;

  // Function to format money (Shopify-like formatting)
  const formatMoney = (price) => {
    // This is a simple implementation. Adjust based on your specific Shopify money formatting
    return `$${parseFloat(price).toFixed(2)}`;
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
      
      // Get price and compare at price directly from data attributes
      const price = e.target.getAttribute('data-price');
      const compareAtPrice = e.target.getAttribute('data-compare-at-price');
      
      // Update price elements
      if (currentPriceEl) {
        currentPriceEl.textContent = price || formatMoney(e.target.dataset.price);
      }
      
      if (compareAtPriceEl && compareAtPrice) {
        compareAtPriceEl.textContent = compareAtPrice;
        compareAtPriceEl.style.display = compareAtPrice ? 'inline' : 'none';
      }
    });
  });

  // Quantity selection handler with potential price adjustment
  quantityRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      selectedQuantity = parseInt(e.target.value);
      
      // Potential quantity-based pricing logic
      // You can add specific pricing adjustments based on quantity here
      const currentVariant = document.querySelector('.variant-radio:checked');
      
      if (currentVariant) {
        let basePrice = currentVariant.getAttribute('data-price');
        
        // Example: 15% off for 2 items, 20% off for 3 items
        switch(selectedQuantity) {
          case 2:
            basePrice = parseFloat(basePrice) * 0.85; // 15% off
            break;
          case 3:
            basePrice = parseFloat(basePrice) * 0.80; // 20% off
            break;
        }
        
        if (currentPriceEl) {
          currentPriceEl.textContent = formatMoney(basePrice);
        }
      }
    });
  });

  // Add to Cart Handler
  addToCartBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    // If no variants, use the first product variant
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
        // Optional: Open cart drawer or show confirmation
        window.location.href = '/cart';
      } else {
        const errorData = await response.json();
        throw new Error(errorData.description || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Add to Cart Error:', error);
      alert(error.message);
    }
  });
});