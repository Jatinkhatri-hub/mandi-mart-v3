// class SellingPlansWidget {
//   constructor(container) {
//     this.container = container;
    
//     // Elements
//     this.currentVariantId = null;
    
//     // Selling plans specific elements
//     this.oneTimePurchaseRadios = container.querySelectorAll('input[data-radio-type="one_time_purchase"]');
//     this.subscribeAndSaveRadios = container.querySelectorAll('input[data-radio-type="subscribe_and_save"]');
//     this.subscribeOptionsDropdowns = container.querySelectorAll('#subscribe-options-dropdown');
//     this.sellingPlanOptionsSelects = container.querySelectorAll('#selling-plan-options');
//     this.selectedSellingPlanInputs = container.querySelectorAll('.selected-selling-plan-id');
    
//     // Variant-specific sections
//     this.variantSellingPlanSections = container.querySelectorAll('.selling_plan_theme_integration');
    
//     // Product price and cart elements
//     this.priceElement = document.querySelector('.main-product__current-price');
//     this.comparePriceElement = document.querySelector('.main-product__cap');
//     this.variantRadios = document.querySelectorAll('input[name="variant"]');
//     this.quantityRadios = document.querySelectorAll('input[name="quantity"]');
//     this.addToCartButton = document.querySelector('.main-product__atc-btn');
    
//     this.currentQuantity = 1;
    
//     this.bindEvents();
//     this.initialSetup();
//   }
  
//   bindEvents() {
//     // One-time purchase radio events
//     this.oneTimePurchaseRadios.forEach(radio => {
//       radio.addEventListener('change', () => this.handlePurchaseTypeChange(radio, false));
//     });
    
//     // Subscribe and save radio events
//     this.subscribeAndSaveRadios.forEach(radio => {
//       radio.addEventListener('change', () => this.handlePurchaseTypeChange(radio, true));
//     });
    
//     // Selling plan select events
//     this.sellingPlanOptionsSelects.forEach(select => {
//       select.addEventListener('change', () => this.handleSellingPlanChange(select));
//     });
    
//     // Variant change events
//     this.variantRadios.forEach(radio => {
//       radio.addEventListener('change', () => {
//         this.currentVariantId = radio.value;
//         this.updateVariantSpecificContent();
//         this.updatePrice();
//       });
//     });
    
//     // Quantity change events
//     this.quantityRadios.forEach(radio => {
//       radio.addEventListener('change', () => {
//         this.currentQuantity = parseInt(radio.value);
//         this.updatePrice();
//       });
//     });
    
//     // Add to cart button
//     if (this.addToCartButton) {
//       this.addToCartButton.addEventListener('click', (event) => {
//         event.preventDefault();
//         this.addToCart();
//       });
//     }
    
//     // Fallback global event listeners
//     document.addEventListener('variant:change', () => this.updatePrice());
//     document.addEventListener('quantity:change', () => this.updatePrice());
//   }
  
//   initialSetup() {
//     try {
//       // Ensure first variant radio is selected
//       const firstVariantRadio = document.querySelector('input[name="variant"]');
//       if (firstVariantRadio) {
//         firstVariantRadio.checked = true;
//         this.currentVariantId = firstVariantRadio.value;
//       }
      
//       // Ensure first quantity radio is selected
//       const firstQuantityRadio = document.querySelector('input[name="quantity"]');
//       if (firstQuantityRadio) {
//         firstQuantityRadio.checked = true;
//         this.currentQuantity = parseInt(firstQuantityRadio.value);
//       }
      
//       // Initial variant setup
//       this.updateVariantSpecificContent();
//       this.updatePrice();
//     } catch (error) {
//       console.error('Initial Setup Error:', error);
//     }
//   }
  
//   handlePurchaseTypeChange(radio, isSubscription) {
//     try {
//       // Find the associated variant section
//       const variantSection = radio.closest('.selling_plan_theme_integration');
      
//       if (!variantSection) {
//         console.warn('No variant section found for purchase type change');
//         return;
//       }
      
//       // Find dropdown within this section
//       const dropdown = variantSection.querySelector('#subscribe-options-dropdown');
      
//       // Toggle dropdown visibility
//       if (dropdown) {
//         dropdown.style.display = isSubscription ? 'block' : 'none';
//       }
      
//       // Handle selling plan input
//       const sellingPlanInput = variantSection.querySelector('.selected-selling-plan-id');
//       const sellingPlanSelect = variantSection.querySelector('#selling-plan-options');
      
//       if (sellingPlanInput) {
//         sellingPlanInput.value = isSubscription && sellingPlanSelect
//           ? sellingPlanSelect.value 
//           : '';
//       }
      
//       // Update price
//       this.updatePrice();
      
//       console.log('Purchase Type Changed:', {
//         isSubscription,
//         variantId: this.currentVariantId,
//         sellingPlanValue: sellingPlanInput ? sellingPlanInput.value : 'None'
//       });
//     } catch (error) {
//       console.error('Purchase Type Change Error:', error);
//     }
//   }
  
//   handleSellingPlanChange(select) {
//     try {
//       // Find the associated variant section
//       const variantSection = select.closest('.selling_plan_theme_integration');
      
//       if (!variantSection) {
//         console.warn('No variant section found for selling plan change');
//         return;
//       }
      
//       // Update hidden input with selected selling plan
//       const sellingPlanInput = variantSection.querySelector('.selected-selling-plan-id');
//       if (sellingPlanInput) {
//         sellingPlanInput.value = select.value;
//       }
      
//       // Update price
//       this.updatePrice();
      
//       console.log('Selling Plan Selected:', {
//         sellingPlanId: select.value,
//         selectedOption: select.options[select.selectedIndex].text
//       });
//     } catch (error) {
//       console.error('Selling Plan Change Error:', error);
//     }
//   }
  
//   updateVariantSpecificContent() {
//     try {
//       // Validate variant selling plan sections
//       if (!this.variantSellingPlanSections || this.variantSellingPlanSections.length === 0) {
//         console.warn('No variant selling plan sections found');
//         return;
//       }
      
//       // Hide all selling plan sections by default
//       this.variantSellingPlanSections.forEach(section => {
//         section.classList.add('selling_plan_theme_integration--hidden');
//       });
      
//       // Find the current variant selling plan section
//       const visibleSection = Array.from(this.variantSellingPlanSections).find(
//         section => section.dataset.variantId === this.currentVariantId
//       );
      
//       // Show the section for the current variant
//       if (visibleSection) {
//         visibleSection.classList.remove('selling_plan_theme_integration--hidden');
        
//         // Reset to one-time purchase
//         const oneTimePurchaseRadio = visibleSection.querySelector('input[data-radio-type="one_time_purchase"]');
//         if (oneTimePurchaseRadio) {
//           oneTimePurchaseRadio.checked = true;
//           this.handlePurchaseTypeChange(oneTimePurchaseRadio, false);
//         }
//       } else {
//         console.warn(`No selling plan section found for variant ${this.currentVariantId}`);
//       }
//     } catch (error) {
//       console.error('Update Variant Specific Content Error:', error);
//     }
//   }
  
//   updatePrice() {
//     try {
//       console.group('Price Update Debug');
      
//       // Get current variant radio
//       const currentVariantRadio = document.querySelector('input[name="variant"]:checked');
//       if (!currentVariantRadio) {
//         console.warn('No variant radio selected');
//         return;
//       }

//       // Base prices from variant data attributes
//       let basePrice = this.parsePrice(currentVariantRadio.dataset.price);
//       let compareAtPrice = this.parsePrice(currentVariantRadio.dataset.compareAtPrice);

//       console.log('Base Prices:', {
//         basePrice, 
//         compareAtPrice, 
//         variantPriceAttr: currentVariantRadio.dataset.price,
//         variantCompareAtAttr: currentVariantRadio.dataset.compareAtPrice
//       });

//       // Check if subscription is selected
//       const visibleSection = document.querySelector('.selling_plan_theme_integration:not(.selling_plan_theme_integration--hidden)');
//       const isSubscription = visibleSection && visibleSection.querySelector('input[data-radio-type="subscribe_and_save"]:checked');
      
//       // Override prices if subscription is selected and a plan is chosen
//       if (isSubscription) {
//         const sellingPlanSelect = visibleSection.querySelector('#selling-plan-options');
//         if (sellingPlanSelect) {
//           const selectedOption = sellingPlanSelect.options[sellingPlanSelect.selectedIndex];
//           if (selectedOption) {
//             // Use data attribute for more reliable price extraction
//             const subscriptionPrice = parseFloat(selectedOption.dataset.sellingPlanPrice);
            
//             if (!isNaN(subscriptionPrice)) {
//               basePrice = subscriptionPrice;
//               console.log('Updated Subscription Price:', basePrice);
//             } else {
//               console.warn('Could not parse subscription price from data attribute');
//             }
//           }
//         }
//       }

//       // Apply quantity discounts
//       let adjustedPrice = basePrice;
//       switch (this.currentQuantity) {
//         case 2:
//           adjustedPrice *= 0.85; // 15% off
//           break;
//         case 3:
//           adjustedPrice *= 0.80; // 20% off
//           break;
//       }

//       // Calculate total prices
//       const totalPrice = adjustedPrice * this.currentQuantity;
//       const totalCompareAtPrice = compareAtPrice * this.currentQuantity;

//       console.log('Final Prices:', {
//         totalPrice, 
//         totalCompareAtPrice, 
//         quantity: this.currentQuantity,
//         isSubscription: !!isSubscription
//       });

//       // Update price elements with error handling
//       if (this.priceElement) {
//         this.priceElement.textContent = this.formatPrice(totalPrice);
//       } else {
//         console.warn('Price element not found');
//       }

//       // Update compare at price if exists
//       if (this.comparePriceElement) {
//         this.comparePriceElement.textContent = this.formatPrice(totalCompareAtPrice);
//         this.comparePriceElement.style.display = totalPrice < totalCompareAtPrice ? 'inline' : 'none';
//       } else {
//         console.warn('Compare price element not found');
//       }
      
//       console.groupEnd();
//     } catch (error) {
//       console.error('Comprehensive Price Update Error:', error);
//       console.groupEnd();
//     }
//   }
  
//   // Rest of the methods remain the same as in the previous implementation...
  
//   // Utility methods
//   parsePrice(priceString) {
//     if (!priceString) return 0;
//     const cleanPrice = priceString.replace(/[^\d.-]/g, '');
//     const price = parseFloat(cleanPrice);
//     return isNaN(price) ? 0 : price;
//   }
  
//   formatPrice(price) {
//     return '$' + price.toFixed(2);
//   }
  

//   addToCart() {
//     try {
//       // Get selected variant
//       const selectedVariantRadio = document.querySelector('input[name="variant"]:checked');
//       if (!selectedVariantRadio) {
//         this.showError('Please select a variant');
//         return;
//       }

//       const variantId = selectedVariantRadio.value;
//       const quantity = this.currentQuantity;
      
//       // Prepare form data
//       const formData = new FormData();
//       formData.append('id', variantId);
//       formData.append('quantity', quantity);
      
//       // Find the visible selling plan section
//       const visibleSection = document.querySelector('.selling_plan_theme_integration:not(.selling_plan_theme_integration--hidden)');
      
//       // Add selling plan if subscription is selected
//       if (visibleSection && visibleSection.querySelector('input[data-radio-type="subscribe_and_save"]:checked')) {
//         const sellingPlanInput = visibleSection.querySelector('.selected-selling-plan-id');
//         if (sellingPlanInput && sellingPlanInput.value) {
//           formData.append('selling_plan', sellingPlanInput.value);
//         }
//       }

//       // Perform AJAX cart add
//       fetch('/cart/add.js', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'X-Requested-With': 'XMLHttpRequest'
//         }
//       })
//       .then(response => {
//         if (!response.ok) {
//           return response.json().then(err => { throw new Error(err.description || 'Failed to add item to cart'); });
//         }
//         return response.json();
//       })
//       .then(addedItem => {
//         this.showSuccess(`Added ${quantity} item(s) to cart`);
//         this.updateCartDrawer(addedItem);
//       })
//       .catch(error => {
//         console.error('Add to Cart Error:', error);
//         this.showError(error.message);
//       });
//     } catch (error) {
//       console.error('Add to Cart Error:', error);
//       this.showError(error.message);
//     }
//   }
  
//   // Utility methods
//   parsePrice(priceString) {
//     if (!priceString) return 0;
//     const cleanPrice = priceString.replace(/[^\d.-]/g, '');
//     const price = parseFloat(cleanPrice);
//     return isNaN(price) ? 0 : price;
//   }
  
//   formatPrice(price) {
//     // Fallback price formatting
//     return '$' + price.toFixed(2);
//   }
  
//   showError(message) {
//     const errorContainer = document.createElement('div');
//     errorContainer.classList.add('error-message');
//     errorContainer.style.color = 'red';
//     errorContainer.textContent = message;
    
//     // Append error message near add to cart button
//     if (this.addToCartButton) {
//       this.addToCartButton.parentNode.insertBefore(errorContainer, this.addToCartButton.nextSibling);
      
//       // Remove error after 3 seconds
//       setTimeout(() => {
//         errorContainer.remove();
//       }, 3000);
//     }
//   }
  
//   showSuccess(message) {
//     const successContainer = document.createElement('div');
//     successContainer.classList.add('success-message');
//     successContainer.style.color = 'green';
//     successContainer.textContent = message;
    
//     // Append success message near add to cart button
//     if (this.addToCartButton) {
//       this.addToCartButton.parentNode.insertBefore(successContainer, this.addToCartButton.nextSibling);
      
//       // Remove success message after 3 seconds
//       setTimeout(() => {
//         successContainer.remove();
//       }, 3000);
//     }
//   }
  
//   updateCartDrawer(addedItem) {
//     // Placeholder for cart drawer update
//     console.log('Item added to cart:', addedItem);
    
//     // Dispatch custom event for potential cart drawer update
//     const cartUpdateEvent = new CustomEvent('cart:update', { 
//       detail: { item: addedItem } 
//     });
//     document.dispatchEvent(cartUpdateEvent);
//   }
//   // ... (other methods like addToCart, showError, etc. remain the same)
// }

class SellingPlansWidget {
  constructor(container) {
    this.container = container;
    
    // Elements
    this.currentVariantId = null;
    
    // Selling plans specific elements
    this.oneTimePurchaseRadios = container.querySelectorAll('input[data-radio-type="one_time_purchase"]');
    this.subscribeAndSaveRadios = container.querySelectorAll('input[data-radio-type="subscribe_and_save"]');
    this.subscribeOptionsDropdowns = container.querySelectorAll('#subscribe-options-dropdown');
    this.sellingPlanOptionsSelects = container.querySelectorAll('#selling-plan-options');
    this.selectedSellingPlanInputs = container.querySelectorAll('.selected-selling-plan-id');
    
    // Variant-specific sections
    this.variantSellingPlanSections = container.querySelectorAll('.selling_plan_theme_integration');
    
    // Product price and cart elements
    this.priceElement = document.querySelector('.main-product__current-price');
    this.comparePriceElement = document.querySelector('.main-product__cap');
    this.variantRadios = document.querySelectorAll('input[name="variant"]');
    this.quantityRadios = document.querySelectorAll('input[name="quantity"]');
    this.addToCartButton = document.querySelector('.main-product__atc-btn');
    
    this.currentQuantity = 1;
    this.currentSellingPlanId = null;
    
    this.bindEvents();
    this.initialSetup();
  }
  
  // Bind all event listeners
  bindEvents() {
    // One-time purchase radio events
    this.oneTimePurchaseRadios.forEach(radio => {
      radio.addEventListener('change', () => this.handlePurchaseTypeChange(radio, false));
    });
    
    // Subscribe and save radio events
    this.subscribeAndSaveRadios.forEach(radio => {
      radio.addEventListener('change', () => this.handlePurchaseTypeChange(radio, true));
    });
    
    // Selling plan select events
    this.sellingPlanOptionsSelects.forEach(select => {
      select.addEventListener('change', () => this.handleSellingPlanChange(select));
    });
    
    // Variant change events
    this.variantRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        this.currentVariantId = radio.value;
        this.updateVariantSpecificContent();
        this.updatePrice();
      });
    });
    
    // Quantity change events
    this.quantityRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        this.currentQuantity = parseInt(radio.value);
        this.updatePrice();
      });
    });
    
    // Add to cart button
    if (this.addToCartButton) {
      this.addToCartButton.addEventListener('click', (event) => {
        event.preventDefault();
        this.addToCart();
      });
    }
    
    // Global event listeners for fallback
    document.addEventListener('variant:change', () => this.updatePrice());
    document.addEventListener('quantity:change', () => this.updatePrice());
  }
  
  // Initial setup when page loads
  initialSetup() {
    try {
      // Ensure first variant radio is selected
      const firstVariantRadio = document.querySelector('input[name="variant"]');
      if (firstVariantRadio) {
        firstVariantRadio.checked = true;
        this.currentVariantId = firstVariantRadio.value;
      }
      
      // Ensure first quantity radio is selected
      const firstQuantityRadio = document.querySelector('input[name="quantity"]');
      if (firstQuantityRadio) {
        firstQuantityRadio.checked = true;
        this.currentQuantity = parseInt(firstQuantityRadio.value);
      }
      
      // Initial variant setup
      this.updateVariantSpecificContent();
      this.updatePrice();
    } catch (error) {
      console.error('Initial Setup Error:', error);
    }
  }
  
  // Handle purchase type change (one-time vs subscription)
  handlePurchaseTypeChange(radio, isSubscription) {
    try {
      // Find the associated variant section
      const variantSection = radio.closest('.selling_plan_theme_integration');
      
      if (!variantSection) {
        console.warn('No variant section found for purchase type change');
        return;
      }
      
      // Find dropdown within this section
      const dropdown = variantSection.querySelector('#subscribe-options-dropdown');
      
      // Toggle dropdown visibility
      if (dropdown) {
        dropdown.style.display = isSubscription ? 'block' : 'none';
      }
      
      // Handle selling plan input
      const sellingPlanInput = variantSection.querySelector('.selected-selling-plan-id');
      const sellingPlanSelect = variantSection.querySelector('#selling-plan-options');
      
      if (sellingPlanInput) {
        // Reset or set selling plan based on subscription status
        sellingPlanInput.value = isSubscription && sellingPlanSelect
          ? sellingPlanSelect.value 
          : '';
        
        // Update current selling plan
        this.currentSellingPlanId = isSubscription ? sellingPlanSelect.value : null;
      }
      
      // Update price
      this.updatePrice();
      
      console.log('Purchase Type Changed:', {
        isSubscription,
        variantId: this.currentVariantId,
        sellingPlanValue: sellingPlanInput ? sellingPlanInput.value : 'None'
      });
    } catch (error) {
      console.error('Purchase Type Change Error:', error);
    }
  }
  
  // Handle selling plan selection change
  handleSellingPlanChange(select) {
    try {
      // Find the associated variant section
      const variantSection = select.closest('.selling_plan_theme_integration');
      
      if (!variantSection) {
        console.warn('No variant section found for selling plan change');
        return;
      }
      
      // Update hidden input with selected selling plan
      const sellingPlanInput = variantSection.querySelector('.selected-selling-plan-id');
      if (sellingPlanInput) {
        sellingPlanInput.value = select.value;
        this.currentSellingPlanId = select.value;
      }
      
      // Update price
      this.updatePrice();
      
      console.log('Selling Plan Selected:', {
        sellingPlanId: select.value,
        selectedOption: select.options[select.selectedIndex].text
      });
    } catch (error) {
      console.error('Selling Plan Change Error:', error);
    }
  }
  
  // Update variant-specific content when variant changes
  updateVariantSpecificContent() {
    try {
      // Validate variant selling plan sections
      if (!this.variantSellingPlanSections || this.variantSellingPlanSections.length === 0) {
        console.warn('No variant selling plan sections found');
        return;
      }
      
      // Hide all selling plan sections by default
      this.variantSellingPlanSections.forEach(section => {
        section.classList.add('selling_plan_theme_integration--hidden');
      });
      
      // Find the current variant selling plan section
      const visibleSection = Array.from(this.variantSellingPlanSections).find(
        section => section.dataset.variantId === this.currentVariantId
      );
      
      // Show the section for the current variant
      if (visibleSection) {
        visibleSection.classList.remove('selling_plan_theme_integration--hidden');
        
        // Reset to one-time purchase
        const oneTimePurchaseRadio = visibleSection.querySelector('input[data-radio-type="one_time_purchase"]');
        if (oneTimePurchaseRadio) {
          oneTimePurchaseRadio.checked = true;
          this.handlePurchaseTypeChange(oneTimePurchaseRadio, false);
        }
      } else {
        console.warn(`No selling plan section found for variant ${this.currentVariantId}`);
      }
    } catch (error) {
      console.error('Update Variant Specific Content Error:', error);
    }
  }
  
  // Update pricing based on variant, quantity, and selling plan
  updatePrice() {
    try {
      console.group('Price Update Debug');
      
      // Get current variant radio
      const currentVariantRadio = document.querySelector('input[name="variant"]:checked');
      if (!currentVariantRadio) {
        console.warn('No variant radio selected');
        return;
      }

      // Base prices from variant data attributes
      let basePrice = this.parsePrice(currentVariantRadio.dataset.price);
      let compareAtPrice = this.parsePrice(currentVariantRadio.dataset.compareAtPrice);

      console.log('Base Prices:', {
        basePrice, 
        compareAtPrice, 
        variantPriceAttr: currentVariantRadio.dataset.price,
        variantCompareAtAttr: currentVariantRadio.dataset.compareAtPrice
      });

      // Check if subscription is selected
      const visibleSection = document.querySelector('.selling_plan_theme_integration:not(.selling_plan_theme_integration--hidden)');
      const isSubscription = visibleSection && visibleSection.querySelector('input[data-radio-type="subscribe_and_save"]:checked');
      
      // Override prices if subscription is selected and a plan is chosen
      if (isSubscription) {
        const sellingPlanSelect = visibleSection.querySelector('#selling-plan-options');
        if (sellingPlanSelect) {
          const selectedOption = sellingPlanSelect.options[sellingPlanSelect.selectedIndex];
          if (selectedOption) {
            // Use data attribute for more reliable price extraction
            const subscriptionPrice = parseFloat(selectedOption.dataset.sellingPlanPrice);
            
            if (!isNaN(subscriptionPrice)) {
              basePrice = subscriptionPrice;
              console.log('Updated Subscription Price:', basePrice);
            } else {
              console.warn('Could not parse subscription price from data attribute');
            }
          }
        }
      }

      // Apply quantity discounts
      let adjustedPrice = basePrice;
      switch (this.currentQuantity) {
        case 2:
          adjustedPrice *= 0.85; // 15% off
          break;
        case 3:
          adjustedPrice *= 0.80; // 20% off
          break;
      }

      // Calculate total prices
      const totalPrice = adjustedPrice * this.currentQuantity;
      const totalCompareAtPrice = compareAtPrice * this.currentQuantity;

      console.log('Final Prices:', {
        totalPrice, 
        totalCompareAtPrice, 
        quantity: this.currentQuantity,
        isSubscription: !!isSubscription
      });

      // Update price elements with error handling
      if (this.priceElement) {
        this.priceElement.textContent = this.formatPrice(totalPrice);
      } else {
        console.warn('Price element not found');
      }

      // Update compare at price if exists
      if (this.comparePriceElement) {
        this.comparePriceElement.textContent = this.formatPrice(totalCompareAtPrice);
        this.comparePriceElement.style.display = totalPrice < totalCompareAtPrice ? 'inline' : 'none';
      } else {
        console.warn('Compare price element not found');
      }
      
      console.groupEnd();
    } catch (error) {
      console.error('Comprehensive Price Update Error:', error);
      console.groupEnd();
    }
  }
  
  // Add to cart functionality
  addToCart() {
    try {
      // Get selected variant
      const selectedVariantRadio = document.querySelector('input[name="variant"]:checked');
      if (!selectedVariantRadio) {
        this.showError('Please select a variant');
        return;
      }

      const variantId = selectedVariantRadio.value;
      const quantity = this.currentQuantity;
      
      // Prepare form data
      const formData = new FormData();
      formData.append('id', variantId);
      formData.append('quantity', quantity);

      console.log('Add to Cart Triggered', {
        selectedVariantRadio: document.querySelector('input[name="variant"]:checked'),
        subscribeRadio: document.querySelector('input[data-radio-type="subscribe_and_save"]:checked'),
        sellingPlanSelect: document.querySelector('#selling-plan-options')
      });
      
      // Find the visible selling plan section
      const visibleSection = document.querySelector('.selling_plan_theme_integration:not(.selling_plan_theme_integration--hidden)');
      
      // // Add selling plan if subscription is selected
      // if (visibleSection && visibleSection.querySelector('input[data-radio-type="subscribe_and_save"]:checked')) {
      //   const sellingPlanInput = visibleSection.querySelector('.selected-selling-plan-id');
      //   if (sellingPlanInput && sellingPlanInput.value) {
      //     formData.append('selling_plan', sellingPlanInput.value);
      //   }
      // }


    // Add selling plan if subscription is selected
    if (visibleSection && visibleSection.querySelector('input[data-radio-type="subscribe_and_save"]:checked')) {
      const sellingPlanSelect = visibleSection.querySelector('#selling-plan-options');
      const sellingPlanInput = visibleSection.querySelector('.selected-selling-plan-id');
      
      console.log('Subscription Selected Debug:', {
        sellingPlanSelect: sellingPlanSelect,
        sellingPlanInput: sellingPlanInput,
        selectedOption: sellingPlanSelect ? sellingPlanSelect.value : null,
        selectedPlanId: sellingPlanInput ? sellingPlanInput.value : null
      });
      
      if (sellingPlanInput && sellingPlanInput.value) {
        formData.append('selling_plan', sellingPlanInput.value);
        console.log('Appending Selling Plan:', sellingPlanInput.value);
      } else if (sellingPlanSelect && sellingPlanSelect.value) {
        // Fallback: use select value directly
        formData.append('selling_plan', sellingPlanSelect.value);
        console.log('Falling back to select value:', sellingPlanSelect.value);
      }
    }

      // Perform AJAX cart add
      fetch('/cart/add.js', {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.description || 'Failed to add item to cart'); });
        }
        return response.json();
      })
      .then(addedItem => {
        this.showSuccess(`Added ${quantity} item(s) to cart`);
        this.updateCartDrawer(addedItem);
      })
      .catch(error => {
        console.error('Add to Cart Error:', error);
        this.showError(error.message);
      });
    } catch (error) {
      console.error('Add to Cart Error:', error);
      this.showError(error.message);
    }
  }
  
  // Utility method to parse price strings
  parsePrice(priceString) {
    if (!priceString) return 0;
    const cleanPrice = priceString.replace(/[^\d.-]/g, '');
    const price = parseFloat();
    return isNaN(price) ? 0 : price;
  }
  
  // Format price to currency
  formatPrice(price) {
    return '$' + price.toFixed(2);
  }
  
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
  
  // Update cart drawer or trigger cart update event
  updateCartDrawer(addedItem) {
    // Placeholder for cart drawer update
    console.log('Item added to cart:', addedItem);
    
    // Dispatch custom event for potential cart drawer update
    const cartUpdateEvent = new CustomEvent('cart:update', { 
      detail: { item: addedItem } 
    });
    document.dispatchEvent(cartUpdateEvent);
  }
}

// Global function for compatibility

// Global function for compatibility with existing Liquid template
function toggleSubscribeDropdown(show) {
  const dropdowns = document.querySelectorAll('#subscribe-options-dropdown');
  dropdowns.forEach(dropdown => {
    dropdown.style.display = show ? 'block' : 'none';
  });
}

// Initialize the widget
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.selling_plan_app_container');
  containers.forEach(container => {
    new SellingPlansWidget(container);
  });
});

// class SellingPlansWidget {
//   constructor(container) {
//     this.container = container;
    
//     // Elements
//     this.currentVariantId = null;
    
//     // Selling plans specific elements
//     this.oneTimePurchaseRadios = container.querySelectorAll('input[data-radio-type="one_time_purchase"]');
//     this.subscribeAndSaveRadios = container.querySelectorAll('input[data-radio-type="subscribe_and_save"]');
//     this.subscribeOptionsDropdowns = container.querySelectorAll('#subscribe-options-dropdown');
//     this.sellingPlanOptionsSelects = container.querySelectorAll('#selling-plan-options');
//     this.selectedSellingPlanInputs = container.querySelectorAll('.selected-selling-plan-id');
    
//     // Variant-specific sections
//     this.variantSellingPlanSections = container.querySelectorAll('.selling_plan_theme_integration');
    
//     // Product price and cart elements
//     this.priceElement = document.querySelector('.main-product__current-price');
//     this.comparePriceElement = document.querySelector('.main-product__cap');
//     this.variantRadios = document.querySelectorAll('input[name="variant"]');
//     this.quantityRadios = document.querySelectorAll('input[name="quantity"]');
//     this.addToCartButton = document.querySelector('.main-product__atc-btn');
    
//     this.currentQuantity = 1;
    
//     this.bindEvents();
//     this.initialSetup();
//   }
  
//   bindEvents() {
//     // One-time purchase radio events
//     this.oneTimePurchaseRadios.forEach(radio => {
//       radio.addEventListener('change', () => this.handlePurchaseTypeChange(radio, false));
//     });
    
//     // Subscribe and save radio events
//     this.subscribeAndSaveRadios.forEach(radio => {
//       radio.addEventListener('change', () => this.handlePurchaseTypeChange(radio, true));
//     });
    
//     // Selling plan select events
//     this.sellingPlanOptionsSelects.forEach(select => {
//       select.addEventListener('change', () => this.handleSellingPlanChange(select));
//     });
    
//     // Variant change events
//     this.variantRadios.forEach(radio => {
//       radio.addEventListener('change', () => {
//         this.currentVariantId = radio.value;
//         this.updateVariantSpecificContent();
//         this.updatePrice();
//       });
//     });
    
//     // Quantity change events
//     this.quantityRadios.forEach(radio => {
//       radio.addEventListener('change', () => {
//         this.currentQuantity = parseInt(radio.value);
//         this.updatePrice();
//       });
//     });
    
//     // Add to cart button
//     if (this.addToCartButton) {
//       this.addToCartButton.addEventListener('click', (event) => {
//         event.preventDefault();
//         this.addToCart();
//       });
//     }
//   }
  
//   initialSetup() {
//     // Ensure first variant radio is selected
//     const firstVariantRadio = document.querySelector('input[name="variant"]');
//     if (firstVariantRadio) {
//       firstVariantRadio.checked = true;
//       this.currentVariantId = firstVariantRadio.value;
//     }
    
//     // Ensure first quantity radio is selected
//     const firstQuantityRadio = document.querySelector('input[name="quantity"]');
//     if (firstQuantityRadio) {
//       firstQuantityRadio.checked = true;
//     }
    
//     // Initial variant setup
//     this.updateVariantSpecificContent();
//     this.updatePrice();
//   }
  
//   handlePurchaseTypeChange(radio, isSubscription) {
//     // Find the associated variant section
//     const variantSection = radio.closest('.selling_plan_theme_integration');
    
//     // Find dropdown within this section
//     const dropdown = variantSection.querySelector('#subscribe-options-dropdown');
    
//     // Toggle dropdown visibility
//     if (dropdown) {
//       dropdown.style.display = isSubscription ? 'block' : 'none';
//     }
    
//     // Handle selling plan input
//     const sellingPlanInput = variantSection.querySelector('.selected-selling-plan-id');
//     const sellingPlanSelect = variantSection.querySelector('#selling-plan-options');
    
//     if (sellingPlanInput) {
//       sellingPlanInput.value = isSubscription && sellingPlanSelect
//         ? sellingPlanSelect.value 
//         : '';
//     }
    
//     // Update price
//     this.updatePrice();
//   }
  
//   handleSellingPlanChange(select) {
//     // Find the associated variant section
//     const variantSection = select.closest('.selling_plan_theme_integration');
    
//     // Update hidden input with selected selling plan
//     const sellingPlanInput = variantSection.querySelector('.selected-selling-plan-id');
//     if (sellingPlanInput) {
//       sellingPlanInput.value = select.value;
//     }
    
//     // Update price
//     this.updatePrice();
//     console.log('Selected Selling Plan:', sellingPlanInput ? sellingPlanInput.value : 'None');

//   }
  
//   updateVariantSpecificContent() {
//     // Hide all selling plan sections by default
//     this.variantSellingPlanSections.forEach(section => {
//       section.classList.add('selling_plan_theme_integration--hidden');
//     });
    
//     // Find the current variant selling plan section
//     const visibleSection = Array.from(this.variantSellingPlanSections).find(
//       section => section.dataset.variantId === this.currentVariantId
//     );
    
//     // Show the section for the current variant
//     if (visibleSection) {
//       visibleSection.classList.remove('selling_plan_theme_integration--hidden');
      
//       // Reset to one-time purchase
//       const oneTimePurchaseRadio = visibleSection.querySelector('input[data-radio-type="one_time_purchase"]');
//       if (oneTimePurchaseRadio) {
//         oneTimePurchaseRadio.checked = true;
//         this.handlePurchaseTypeChange(oneTimePurchaseRadio, false);
//       }
//     }
//   }
  
//   updatePrice() {
//     try {
//       // Get current variant radio
//       const currentVariantRadio = document.querySelector('input[name="variant"]:checked');
//       if (!currentVariantRadio) {
//         console.warn('No variant radio selected');
//         return;
//       }

//       // Base prices from variant data attributes
//       let basePrice = this.parsePrice(currentVariantRadio.dataset.price);
//       let compareAtPrice = this.parsePrice(currentVariantRadio.dataset.compareAtPrice);

//       console.log('Base Prices:', {
//         basePrice, 
//         compareAtPrice, 
//         variantPriceAttr: currentVariantRadio.dataset.price,
//         variantCompareAtAttr: currentVariantRadio.dataset.compareAtPrice
//       });

//       // Check if subscription is selected
//       const visibleSection = document.querySelector('.selling_plan_theme_integration:not(.selling_plan_theme_integration--hidden)');
//       const isSubscription = visibleSection && visibleSection.querySelector('input[data-radio-type="subscribe_and_save"]:checked');
      
//       // Override prices if subscription is selected and a plan is chosen
//       if (isSubscription) {
//         const sellingPlanSelect = visibleSection.querySelector('#selling-plan-options');
//         if (sellingPlanSelect) {
//           const selectedOption = sellingPlanSelect.options[sellingPlanSelect.selectedIndex];
//           if (selectedOption) {
//             // Extract price from option text
//             const priceMatch = selectedOption.textContent.match(/\$[\d.]+/);
//             if (priceMatch) {
//               basePrice = this.parsePrice(priceMatch[0]);
//               console.log('Updated Subscription Price:', basePrice);
//             }
//           }
//         }
//       }

//       // Apply quantity discounts
//       let adjustedPrice = basePrice;
//       switch (this.currentQuantity) {
//         case 2:
//           adjustedPrice *= 0.85; // 15% off
//           break;
//         case 3:
//           adjustedPrice *= 0.80; // 20% off
//           break;
//       }

//       // Calculate total prices
//       const totalPrice = adjustedPrice * this.currentQuantity;
//       const totalCompareAtPrice = compareAtPrice * this.currentQuantity;

//       console.log('Final Prices:', {
//         totalPrice, 
//         totalCompareAtPrice, 
//         quantity: this.currentQuantity
//       });

//       // Update price elements
//       if (this.priceElement) {
//         this.priceElement.textContent = this.formatPrice(totalPrice);
//       }

//       // Update compare at price if exists
//       if (this.comparePriceElement) {
//         this.comparePriceElement.textContent = this.formatPrice(totalCompareAtPrice);
//         this.comparePriceElement.style.display = totalPrice < totalCompareAtPrice ? 'inline' : 'none';
//       }
//     } catch (error) {
//       console.error('Error updating price:', error);
//     }
//   }
  
//   addToCart() {
//     try {
//       // Get selected variant
//       const selectedVariantRadio = document.querySelector('input[name="variant"]:checked');
//       if (!selectedVariantRadio) {
//         this.showError('Please select a variant');
//         return;
//       }

//       const variantId = selectedVariantRadio.value;
//       const quantity = this.currentQuantity;
      
//       // Prepare form data
//       const formData = new FormData();
//       formData.append('id', variantId);
//       formData.append('quantity', quantity);
      
//       // Find the visible selling plan section
//       const visibleSection = document.querySelector('.selling_plan_theme_integration:not(.selling_plan_theme_integration--hidden)');
      
//       // Add selling plan if subscription is selected
//       if (visibleSection && visibleSection.querySelector('input[data-radio-type="subscribe_and_save"]:checked')) {
//         const sellingPlanInput = visibleSection.querySelector('.selected-selling-plan-id');
//         if (sellingPlanInput && sellingPlanInput.value) {
//           formData.append('selling_plan', sellingPlanInput.value);
//         }
//       }

//       // Perform AJAX cart add
//       fetch('/cart/add.js', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'X-Requested-With': 'XMLHttpRequest'
//         }
//       })
//       .then(response => {
//         if (!response.ok) {
//           return response.json().then(err => { throw new Error(err.description || 'Failed to add item to cart'); });
//         }
//         return response.json();
//       })
//       .then(addedItem => {
//         this.showSuccess(`Added ${quantity} item(s) to cart`);
//         this.updateCartDrawer(addedItem);
//       })
//       .catch(error => {
//         console.error('Add to Cart Error:', error);
//         this.showError(error.message);
//       });
//     } catch (error) {
//       console.error('Add to Cart Error:', error);
//       this.showError(error.message);
//     }
//   }
  
//   // Utility methods
//   parsePrice(priceString) {
//     if (!priceString) return 0;
//     const cleanPrice = priceString.replace(/[^\d.-]/g, '');
//     const price = parseFloat(cleanPrice);
//     return isNaN(price) ? 0 : price;
//   }
  
//   formatPrice(price) {
//     // Fallback price formatting
//     return '$' + price.toFixed(2);
//   }
  
//   showError(message) {
//     const errorContainer = document.createElement('div');
//     errorContainer.classList.add('error-message');
//     errorContainer.style.color = 'red';
//     errorContainer.textContent = message;
    
//     // Append error message near add to cart button
//     if (this.addToCartButton) {
//       this.addToCartButton.parentNode.insertBefore(errorContainer, this.addToCartButton.nextSibling);
      
//       // Remove error after 3 seconds
//       setTimeout(() => {
//         errorContainer.remove();
//       }, 3000);
//     }
//   }
  
//   showSuccess(message) {
//     const successContainer = document.createElement('div');
//     successContainer.classList.add('success-message');
//     successContainer.style.color = 'green';
//     successContainer.textContent = message;
    
//     // Append success message near add to cart button
//     if (this.addToCartButton) {
//       this.addToCartButton.parentNode.insertBefore(successContainer, this.addToCartButton.nextSibling);
      
//       // Remove success message after 3 seconds
//       setTimeout(() => {
//         successContainer.remove();
//       }, 3000);
//     }
//   }
  
//   updateCartDrawer(addedItem) {
//     // Placeholder for cart drawer update
//     console.log('Item added to cart:', addedItem);
    
//     // Dispatch custom event for potential cart drawer update
//     const cartUpdateEvent = new CustomEvent('cart:update', { 
//       detail: { item: addedItem } 
//     });
//     document.dispatchEvent(cartUpdateEvent);
//   }
// }

// // Global function for compatibility with existing Liquid template
// function toggleSubscribeDropdown(show) {
//   const dropdowns = document.querySelectorAll('#subscribe-options-dropdown');
//   dropdowns.forEach(dropdown => {
//     dropdown.style.display = show ? 'block' : 'none';
//   });
// }

// // Initialize the widget
// document.addEventListener('DOMContentLoaded', () => {
//   const containers = document.querySelectorAll('.selling_plan_app_container');
//   containers.forEach(container => {
//     new SellingPlansWidget(container);
//   });
// });


// class SellingPlansWidget {
//   constructor(container) {
//     this.container = container;
    
//     // Elements
//     this.oneTimePurchaseRadio = document.querySelector('input[data-radio-type="one_time_purchase"]');
//     this.subscribeAndSaveRadio = document.querySelector('input[data-radio-type="subscribe_and_save"]');
//     this.subscribeOptionsDropdown = document.getElementById('subscribe-options-dropdown');
//     this.sellingPlanOptionsSelect = document.getElementById('selling-plan-options');
//     this.selectedSellingPlanInput = document.querySelector('.selected-selling-plan-id');
    
//     this.priceElement = document.querySelector('.main-product__current-price');
//     this.comparePriceElement = document.querySelector('.main-product__cap');
//     this.variantRadios = document.querySelectorAll('input[name="variant"]');
//     this.quantityRadios = document.querySelectorAll('input[name="quantity"]');
//     this.addToCartButton = document.querySelector('.main-product__atc-btn');
    
//     this.currentQuantity = 1;
    
//     this.bindEvents();
//     this.initialSetup();
//   }
  
//   bindEvents() {
//     // Purchase type radio events
//     if (this.oneTimePurchaseRadio) {
//       this.oneTimePurchaseRadio.addEventListener('change', () => this.handlePurchaseTypeChange(false));
//     }
    
//     if (this.subscribeAndSaveRadio) {
//       this.subscribeAndSaveRadio.addEventListener('change', () => this.handlePurchaseTypeChange(true));
//     }
    
//     // Selling plan select events
//     if (this.sellingPlanOptionsSelect) {
//       this.sellingPlanOptionsSelect.addEventListener('change', () => this.handleSellingPlanChange());
//     }
    
//     // Variant change events
//     this.variantRadios.forEach(radio => {
//       radio.addEventListener('change', () => this.updateVariantSpecificContent());
//     });
    
//     // Quantity change events
//     this.quantityRadios.forEach(radio => {
//       radio.addEventListener('change', () => {
//         this.currentQuantity = parseInt(radio.value);
//         this.updatePrice();
//       });
//     });
    
//     // Add to cart button
//     if (this.addToCartButton) {
//       this.addToCartButton.addEventListener('click', (event) => {
//         event.preventDefault();
//         this.addToCart();
//       });
//     }
//   }
  
//   initialSetup() {
//     // Ensure first variant radio is selected
//     const firstVariantRadio = document.querySelector('input[name="variant"]');
//     if (firstVariantRadio) {
//       firstVariantRadio.checked = true;
//     }
    
//     // Ensure first quantity radio is selected
//     const firstQuantityRadio = document.querySelector('input[name="quantity"]');
//     if (firstQuantityRadio) {
//       firstQuantityRadio.checked = true;
//     }
    
//     // Initial variant setup
//     this.updateVariantSpecificContent();
//     this.updatePrice();
//   }
  
//   handlePurchaseTypeChange(isSubscription) {
//     // Debug logging
//     console.log('Purchase Type Changed:', isSubscription ? 'Subscription' : 'One-Time');
    
//     // Toggle dropdown visibility
//     if (this.subscribeOptionsDropdown) {
//       this.subscribeOptionsDropdown.style.display = isSubscription ? 'block' : 'none';
//     }
    
//     // Reset selling plan input
//     if (this.selectedSellingPlanInput) {
//       this.selectedSellingPlanInput.value = isSubscription && this.sellingPlanOptionsSelect 
//         ? this.sellingPlanOptionsSelect.value 
//         : '';
//     }
    
//     // Update price
//     this.updatePrice();
//   }
  
//   handleSellingPlanChange() {
//     // Debug logging
//     console.log('Selling Plan Changed:', this.sellingPlanOptionsSelect.value);
    
//     // Update hidden input with selected selling plan
//     if (this.selectedSellingPlanInput && this.sellingPlanOptionsSelect) {
//       this.selectedSellingPlanInput.value = this.sellingPlanOptionsSelect.value;
//     }
    
//     // Update price
//     this.updatePrice();
//   }
  
//   updateVariantSpecificContent() {
//     // Get current variant
//     const currentVariantRadio = document.querySelector('input[name="variant"]:checked');
//     if (!currentVariantRadio) {
//       console.warn('No variant selected');
//       return;
//     }
    
//     const currentVariantId = currentVariantRadio.value.toString();
//     console.log('Current Variant ID:', currentVariantId, typeof currentVariantId);
    
//     // Show/hide selling plan sections based on current variant
//     const sellingPlanSections = document.querySelectorAll('.selling_plan_theme_integration');
//     console.log('Total Selling Plan Sections:', sellingPlanSections.length);
    
//     sellingPlanSections.forEach(section => {
//       const sectionVariantId = section.dataset.variantId.toString();
//       console.log('Comparing Variant IDs:', currentVariantId, sectionVariantId);
      
//       if (sectionVariantId === currentVariantId) {
//         section.classList.remove('selling_plan_theme_integration--hidden');
//         console.log('Showing section for variant', sectionVariantId);
//       } else {
//         section.classList.add('selling_plan_theme_integration--hidden');
//         console.log('Hiding section for variant', sectionVariantId);
//       }
//     });
    
//     // Reset purchase type to one-time
//     if (this.oneTimePurchaseRadio) {
//       this.oneTimePurchaseRadio.checked = true;
//       this.handlePurchaseTypeChange(false);
//     }
    
//     // Update price
//     this.updatePrice();
//   }
  
//   updatePrice() {
//     try {
//       // Get current variant radio
//       const currentVariantRadio = document.querySelector('input[name="variant"]:checked');
//       if (!currentVariantRadio) {
//         console.warn('No variant radio selected');
//         return;
//       }

//       // Base prices from variant data attributes
//       let basePrice = this.parsePrice(currentVariantRadio.dataset.price);
//       let compareAtPrice = this.parsePrice(currentVariantRadio.dataset.compareAtPrice);

//       console.log('Base Prices:', {
//         basePrice, 
//         compareAtPrice, 
//         variantPriceAttr: currentVariantRadio.dataset.price,
//         variantCompareAtAttr: currentVariantRadio.dataset.compareAtPrice
//       });

//       // Check if subscription is selected
//       const isSubscription = this.subscribeAndSaveRadio && this.subscribeAndSaveRadio.checked;
      
//       // Override prices if subscription is selected and a plan is chosen
//       if (isSubscription && this.sellingPlanOptionsSelect) {
//         const selectedOption = this.sellingPlanOptionsSelect.options[this.sellingPlanOptionsSelect.selectedIndex];
//         if (selectedOption) {
//           // Extract price from option text
//           const priceMatch = selectedOption.textContent.match(/\$[\d.]+/);
//           if (priceMatch) {
//             basePrice = this.parsePrice(priceMatch[0]);
//             console.log('Updated Subscription Price:', basePrice);
//           }
//         }
//       }

//       // Apply quantity discounts
//       let adjustedPrice = basePrice;
//       switch (this.currentQuantity) {
//         case 2:
//           adjustedPrice *= 0.85; // 15% off
//           break;
//         case 3:
//           adjustedPrice *= 0.80; // 20% off
//           break;
//       }

//       // Calculate total prices
//       const totalPrice = adjustedPrice * this.currentQuantity;
//       const totalCompareAtPrice = compareAtPrice * this.currentQuantity;

//       console.log('Final Prices:', {
//         totalPrice, 
//         totalCompareAtPrice, 
//         quantity: this.currentQuantity
//       });

//       // Update price elements
//       if (this.priceElement) {
//         this.priceElement.textContent = this.formatPrice(totalPrice);
//       }

//       // Update compare at price if exists
//       if (this.comparePriceElement) {
//         this.comparePriceElement.textContent = this.formatPrice(totalCompareAtPrice);
//         this.comparePriceElement.style.display = totalPrice < totalCompareAtPrice ? 'inline' : 'none';
//       }
//     } catch (error) {
//       console.error('Error updating price:', error);
//     }
//   }
  
//   addToCart() {
//     try {
//       // Get selected variant
//       const selectedVariantRadio = document.querySelector('input[name="variant"]:checked');
//       if (!selectedVariantRadio) {
//         this.showError('Please select a variant');
//         return;
//       }

//       const variantId = selectedVariantRadio.value;
//       const quantity = this.currentQuantity;
      
//       // Prepare form data
//       const formData = new FormData();
//       formData.append('id', variantId);
//       formData.append('quantity', quantity);
      
//       // Add selling plan if subscription is selected
//       if (this.subscribeAndSaveRadio && this.subscribeAndSaveRadio.checked) {
//         const sellingPlanId = this.selectedSellingPlanInput.value;
//         if (sellingPlanId) {
//           formData.append('selling_plan', sellingPlanId);
//         }
//       }

//       // Perform AJAX cart add
//       fetch('/cart/add.js', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'X-Requested-With': 'XMLHttpRequest'
//         }
//       })
//       .then(response => {
//         if (!response.ok) {
//           return response.json().then(err => { throw new Error(err.description || 'Failed to add item to cart'); });
//         }
//         return response.json();
//       })
//       .then(addedItem => {
//         this.showSuccess(`Added ${quantity} item(s) to cart`);
//         this.updateCartDrawer(addedItem);
//       })
//       .catch(error => {
//         console.error('Add to Cart Error:', error);
//         this.showError(error.message);
//       });
//     } catch (error) {
//       console.error('Add to Cart Error:', error);
//       this.showError(error.message);
//     }
//   }
  
//   // Utility methods
//   parsePrice(priceString) {
//     if (!priceString) return 0;
//     const cleanPrice = priceString.replace(/[^\d.-]/g, '');
//     const price = parseFloat(cleanPrice);
//     return isNaN(price) ? 0 : price;
//   }
  
//   formatPrice(price) {
//     // Fallback price formatting
//     return '$' + price.toFixed(2);
//   }
  
//   showError(message) {
//     const errorContainer = document.createElement('div');
//     errorContainer.classList.add('error-message');
//     errorContainer.style.color = 'red';
//     errorContainer.textContent = message;
    
//     // Append error message near add to cart button
//     if (this.addToCartButton) {
//       this.addToCartButton.parentNode.insertBefore(errorContainer, this.addToCartButton.nextSibling);
      
//       // Remove error after 3 seconds
//       setTimeout(() => {
//         errorContainer.remove();
//       }, 3000);
//     }
//   }
  
//   showSuccess(message) {
//     const successContainer = document.createElement('div');
//     successContainer.classList.add('success-message');
//     successContainer.style.color = 'green';
//     successContainer.textContent = message;
    
//     // Append success message near add to cart button
//     if (this.addToCartButton) {
//       this.addToCartButton.parentNode.insertBefore(successContainer, this.addToCartButton.nextSibling);
      
//       // Remove success message after 3 seconds
//       setTimeout(() => {
//         successContainer.remove();
//       }, 3000);
//     }
//   }
  
//   updateCartDrawer(addedItem) {
//     // Placeholder for cart drawer update
//     console.log('Item added to cart:', addedItem);
    
//     // Dispatch custom event for potential cart drawer update
//     const cartUpdateEvent = new CustomEvent('cart:update', { 
//       detail: { item: addedItem } 
//     });
//     document.dispatchEvent(cartUpdateEvent);
//   }
// }

// // Global function for compatibility with existing Liquid template
// function toggleSubscribeDropdown(show) {
//   const dropdown = document.getElementById('subscribe-options-dropdown');
//   if (dropdown) {
//     dropdown.style.display = show ? 'block' : 'none';
//   }
// }

// // Initialize the widget
// document.addEventListener('DOMContentLoaded', () => {
//   const container = document.querySelector('.selling_plan_app_container');
//   if (container) {
//     new SellingPlansWidget(container);
//   }
// });

// class SellingPlansWidget {
//   constructor(container) {
//     this.container = container;
    
//     // Elements
//     this.oneTimePurchaseRadio = document.querySelector('input[data-radio-type="one_time_purchase"]');
//     this.subscribeAndSaveRadio = document.querySelector('input[data-radio-type="subscribe_and_save"]');
//     this.subscribeOptionsDropdown = document.getElementById('subscribe-options-dropdown');
//     this.sellingPlanOptionsSelect = document.getElementById('selling-plan-options');
//     this.selectedSellingPlanInput = document.querySelector('.selected-selling-plan-id');
    
//     this.priceElement = document.querySelector('.main-product__current-price');
//     this.comparePriceElement = document.querySelector('.main-product__cap');
//     this.variantRadios = document.querySelectorAll('input[name="variant"]');
//     this.quantityRadios = document.querySelectorAll('input[name="quantity"]');
//     this.addToCartButton = document.querySelector('.main-product__atc-btn');
    
//     this.currentQuantity = 1;
    
//     this.bindEvents();
//     this.initialSetup();
//   }
  
//   bindEvents() {
//     // Purchase type radio events
//     if (this.oneTimePurchaseRadio) {
//       this.oneTimePurchaseRadio.addEventListener('change', () => this.handlePurchaseTypeChange(false));
//     }
    
//     if (this.subscribeAndSaveRadio) {
//       this.subscribeAndSaveRadio.addEventListener('change', () => this.handlePurchaseTypeChange(true));
//     }
    
//     // Selling plan select events
//     if (this.sellingPlanOptionsSelect) {
//       this.sellingPlanOptionsSelect.addEventListener('change', () => this.handleSellingPlanChange());
//     }
    
//     // Variant change events
//     this.variantRadios.forEach(radio => {
//       radio.addEventListener('change', () => this.updateVariantSpecificContent());
//     });
    
//     // Quantity change events
//     this.quantityRadios.forEach(radio => {
//       radio.addEventListener('change', () => {
//         this.currentQuantity = parseInt(radio.value);
//         this.updatePrice();
//       });
//     });
    
//     // Add to cart button
//     if (this.addToCartButton) {
//       this.addToCartButton.addEventListener('click', (event) => {
//         event.preventDefault();
//         this.addToCart();
//       });
//     }
//   }
  
//   initialSetup() {
//     // Initial variant setup
//     this.updateVariantSpecificContent();
//   }
  
//   handlePurchaseTypeChange(isSubscription) {
//     // Toggle dropdown visibility
//     if (this.subscribeOptionsDropdown) {
//       this.subscribeOptionsDropdown.style.display = isSubscription ? 'block' : 'none';
//     }
    
//     // Reset selling plan input
//     if (this.selectedSellingPlanInput) {
//       this.selectedSellingPlanInput.value = isSubscription && this.sellingPlanOptionsSelect 
//         ? this.sellingPlanOptionsSelect.value 
//         : '';
//     }
    
//     // Update price
//     this.updatePrice();
//   }
  
//   handleSellingPlanChange() {
//     // Update hidden input with selected selling plan
//     if (this.selectedSellingPlanInput && this.sellingPlanOptionsSelect) {
//       this.selectedSellingPlanInput.value = this.sellingPlanOptionsSelect.value;
//     }
    
//     // Update price
//     this.updatePrice();
//   }
  
//   updateVariantSpecificContent() {
//     // Get current variant
//     const currentVariantRadio = document.querySelector('input[name="variant"]:checked');
//     if (!currentVariantRadio) return;
    
//     const currentVariantId = currentVariantRadio.value;
    
//     // Show/hide selling plan sections based on current variant
//     const sellingPlanSections = document.querySelectorAll('.selling_plan_theme_integration');
//     sellingPlanSections.forEach(section => {
//       if (section.dataset.variantId === currentVariantId) {
//         section.classList.remove('selling_plan_theme_integration--hidden');
//       } else {
//         section.classList.add('selling_plan_theme_integration--hidden');
//       }
//     });
    
//     // Reset purchase type to one-time
//     if (this.oneTimePurchaseRadio) {
//       this.oneTimePurchaseRadio.checked = true;
//       this.handlePurchaseTypeChange(false);
//     }
    
//     // Update price
//     this.updatePrice();
//   }
  
//   updatePrice() {
//     try {
//       // Get current variant radio
//       const currentVariantRadio = document.querySelector('input[name="variant"]:checked');
//       if (!currentVariantRadio) {
//         console.warn('No variant radio selected');
//         return;
//       }

//       // Base prices from variant
//       let basePrice = this.parsePrice(currentVariantRadio.dataset.price);
//       let compareAtPrice = this.parsePrice(currentVariantRadio.dataset.compareAtPrice);

//       // Check if subscription is selected
//       const isSubscription = this.subscribeAndSaveRadio && this.subscribeAndSaveRadio.checked;
      
//       // Override prices if subscription is selected and a plan is chosen
//       if (isSubscription && this.sellingPlanOptionsSelect) {
//         const selectedOption = this.sellingPlanOptionsSelect.options[this.sellingPlanOptionsSelect.selectedIndex];
//         if (selectedOption) {
//           // You might need to adjust this based on how your selling plans are structured
//           basePrice = this.parsePrice(selectedOption.textContent.split('-')[1].trim());
//           // Note: You may want to add logic to get compare at price for subscription
//         }
//       }

//       // Apply quantity discounts
//       let adjustedPrice = basePrice;
//       switch (this.currentQuantity) {
//         case 2:
//           adjustedPrice *= 0.85; // 15% off
//           break;
//         case 3:
//           adjustedPrice *= 0.80; // 20% off
//           break;
//       }

//       // Calculate total prices
//       const totalPrice = adjustedPrice * this.currentQuantity;
//       const totalCompareAtPrice = compareAtPrice * this.currentQuantity;

//       // Update price elements
//       if (this.priceElement) {
//         this.priceElement.textContent = this.formatPrice(totalPrice);
//       }

//       // Update compare at price if exists
//       if (this.comparePriceElement) {
//         this.comparePriceElement.textContent = this.formatPrice(totalCompareAtPrice);
//         this.comparePriceElement.style.display = totalPrice < totalCompareAtPrice ? 'inline' : 'none';
//       }
//     } catch (error) {
//       console.error('Error updating price:', error);
//     }
//   }
  
//   addToCart() {
//     try {
//       // Get selected variant
//       const selectedVariantRadio = document.querySelector('input[name="variant"]:checked');
//       if (!selectedVariantRadio) {
//         this.showError('Please select a variant');
//         return;
//       }

//       const variantId = selectedVariantRadio.value;
//       const quantity = this.currentQuantity;
      
//       // Prepare form data
//       const formData = new FormData();
//       formData.append('id', variantId);
//       formData.append('quantity', quantity);
      
//       // Add selling plan if subscription is selected
//       if (this.subscribeAndSaveRadio && this.subscribeAndSaveRadio.checked) {
//         const sellingPlanId = this.selectedSellingPlanInput.value;
//         if (sellingPlanId) {
//           formData.append('selling_plan', sellingPlanId);
//         }
//       }

//       // Perform AJAX cart add
//       fetch('/cart/add.js', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'X-Requested-With': 'XMLHttpRequest'
//         }
//       })
//       .then(response => {
//         if (!response.ok) {
//           return response.json().then(err => { throw new Error(err.description || 'Failed to add item to cart'); });
//         }
//         return response.json();
//       })
//       .then(addedItem => {
//         this.showSuccess(`Added ${quantity} item(s) to cart`);
//         // this.updateCartDrawer(addedItem);
//       })
//       .catch(error => {
//         console.error('Add to Cart Error:', error);
//         this.showError(error.message);
//       });
//     } catch (error) {
//       console.error('Add to Cart Error:', error);
//       this.showError(error.message);
//     }
//   }
  
//   // Utility methods
//   parsePrice(priceString) {
//     if (!priceString) return 0;
//     const cleanPrice = priceString.replace(/[^\d.-]/g, '');
//     const price = parseFloat(cleanPrice);
//     return isNaN(price) ? 0 : price;
//   }
  
//   formatPrice(price) {
//     // Fallback price formatting
//     return '$' + price.toFixed(2);
//   }
  
//   showError(message) {
//     const errorContainer = document.createElement('div');
//     errorContainer.classList.add('error-message');
//     errorContainer.style.color = 'red';
//     errorContainer.textContent = message;
    
//     // Append error message near add to cart button
//     if (this.addToCartButton) {
//       this.addToCartButton.parentNode.insertBefore(errorContainer, this.addToCartButton.nextSibling);
      
//       // Remove error after 3 seconds
//       setTimeout(() => {
//         errorContainer.remove();
//       }, 3000);
//     }
//   }
  
//   showSuccess(message) {
//     const successContainer = document.createElement('div');
//     successContainer.classList.add('success-message');
//     successContainer.style.color = 'green';
//     successContainer.textContent = message;
    
//     // Append success message near add to cart button
//     if (this.addToCartButton) {
//       this.addToCartButton.parentNode.insertBefore(successContainer, this.addToCartButton.nextSibling);
      
//       // Remove success message after 3 seconds
//       setTimeout(() => {
//         successContainer.remove();
//       }, 3000);
//     }
//   }
  
//   // updateCartDrawer(addedItem) {
//   //   // Placeholder for cart drawer update
//   //   console.log('Item added to cart:', addedItem);
    
//   //   // Dispatch custom event for potential cart drawer update
//   //   const cartUpdateEvent = new CustomEvent('cart:update', { 
//   //     detail: { item: addedItem } 
//   //   });
//   //   document.dispatchEvent(cartUpdateEvent);
//   // }
// }

// // Global function for compatibility with existing Liquid template
// function toggleSubscribeDropdown(show) {
//   const dropdown = document.getElementById('subscribe-options-dropdown');
//   if (dropdown) {
//     dropdown.style.display = show ? 'block' : 'none';
//   }
// }

// // Initialize the widget
// document.addEventListener('DOMContentLoaded', () => {
//   const container = document.querySelector('.selling_plan_app_container');
//   if (container) {
//     new SellingPlansWidget(container);
//   }
// });

// class SellingPlansWidget {
//   constructor(sellingPlansWidgetContainer) {
//     this.sellingPlansWidgetContainer = sellingPlansWidgetContainer;
//     this.currentVariant = null;
//     this.currentQuantity = 1;
//     this.currentSellingPlan = null;
    
//     this.addToCartButton = document.querySelector('.main-product__atc-btn');
//     this.productForm = document.getElementById('product-form');
    
//     this.initializeAddToCartEvent();
//     this.initializeElements();
//     this.bindEvents();
//     this.initialSetup();

//   }

//   initializeElements() {
//     // Current page elements
//     this.priceElement = document.querySelector('.main-product__current-price');
//     this.comparePriceElement = document.querySelector('.main-product__cap');
//     this.variantRadios = document.querySelectorAll('input[name="variant"]');
//     this.quantityRadios = document.querySelectorAll('input[name="quantity"]');
//     this.sellingPlanRadios = this.getSellingPlanRadios();
//     this.sellingPlanContainer = document.querySelector('.selling_plan_app_container');
//     this.sellingPlanInput = document.querySelector('.selected-selling-plan-id');
    
//   }

//   initializeAddToCartEvent() {
//     if (this.addToCartButton && this.productForm) {
//       this.addToCartButton.addEventListener('click', (event) => {
//         event.preventDefault();
//         this.addToCart();
//       });
//     }
//   }

//   async addToCart() {
//     try {
//       // Get selected variant
//       const selectedVariantRadio = document.querySelector('input[name="variant"]:checked');
//       if (!selectedVariantRadio) {
//         this.showError('Please select a variant');
//         return;
//       }

//       const variantId = selectedVariantRadio.value;
//       const quantity = this.currentQuantity;
//       const sellingPlanId = this.sellingPlanInput?.value || null;

//       // Prepare form data
//       const formData = new FormData();
//       formData.append('id', variantId);
//       formData.append('quantity', quantity);
      
//       // Add selling plan if selected
//       if (sellingPlanId) {
//         formData.append('selling_plan', sellingPlanId);
//       }

//       // Perform AJAX cart add
//       const response = await fetch('/cart/add.js', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'X-Requested-With': 'XMLHttpRequest'
//         }
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.description || 'Failed to add item to cart');
//       }

//       const addedItem = await response.json();
//       this.showSuccess(`Added ${quantity} item(s) to cart`);

//       // Optional: Update cart drawer or redirect
//       // this.updateCartDrawer(addedItem);
//     } catch (error) {
//       console.error('Add to Cart Error:', error);
//       this.showError(error.message);
//     }
//   }

//   showError(message) {
//     // Create or update error message element
//     let errorEl = document.querySelector('.cart-error-message');
//     if (!errorEl) {
//       errorEl = document.createElement('div');
//       errorEl.classList.add('cart-error-message');
//       this.addToCartButton.parentNode.insertBefore(errorEl, this.addToCartButton.nextSibling);
//     }
    
//     errorEl.textContent = message;
//     errorEl.style.color = 'red';
//     errorEl.style.marginTop = '10px';
//   }

//   showSuccess(message) {
//     // Create or update success message element
//     let successEl = document.querySelector('.cart-success-message');
//     if (!successEl) {
//       successEl = document.createElement('div');
//       successEl.classList.add('cart-success-message');
//       this.addToCartButton.parentNode.insertBefore(successEl, this.addToCartButton.nextSibling);
//     }
    
//     successEl.textContent = message;
//     successEl.style.color = 'green';
//     successEl.style.marginTop = '10px';

//     // Optional: Remove success message after 3 seconds
//     setTimeout(() => {
//       successEl.textContent = '';
//     }, 3000);
//   }

//   getSellingPlanRadios() {
//     const currentVariantId = this.getCurrentVariantId();
//     return document.querySelectorAll(`input[name="purchaseOption_${this.getSectionId()}_${currentVariantId}"]`);
//   }

//   getSectionId() {
//     return this.sellingPlanContainer?.getAttribute('data-section-id') || '';
//   }

//   getCurrentVariantId() {
//     const selectedVariantRadio = document.querySelector('input[name="variant"]:checked');
//     return selectedVariantRadio ? selectedVariantRadio.value : null;
//   }

//   bindEvents() {
//     // Variant selection events
//     this.variantRadios.forEach(radio => {
//       radio.addEventListener('change', () => this.handleVariantChange());
//     });

//     // Quantity selection events
//     this.quantityRadios.forEach(radio => {
//       radio.addEventListener('change', () => {
//         this.currentQuantity = parseInt(radio.value);
//         this.updatePrice();
//       });
//     });

//     // Selling plan selection events
//     this.bindSellingPlanEvents();
//   }

//   bindSellingPlanEvents() {
//     // Refresh selling plan radios each time (as they might change with variant)
//     this.sellingPlanRadios = this.getSellingPlanRadios();
    
//     this.sellingPlanRadios.forEach(radio => {
//       radio.addEventListener('change', (event) => {
//         this.handleSellingPlanChange(event.target);
//       });
//     });
//   }

//   handleVariantChange() {
//     // Update visible selling plan sections
//     this.updateSellingPlanVisibility();
//     // Rebind selling plan events for new variant
//     this.bindSellingPlanEvents();
//     // Update price for new variant
//     this.updatePrice();
//   }

//   updateSellingPlanVisibility() {
//     const currentVariantId = this.getCurrentVariantId();
//     const sellingPlanSections = document.querySelectorAll('.selling_plan_theme_integration');
    
//     sellingPlanSections.forEach(section => {
//       if (section.dataset.variantId === currentVariantId) {
//         section.classList.remove('selling_plan_theme_integration--hidden');
//       } else {
//         section.classList.add('selling_plan_theme_integration--hidden');
//       }
//     });
//   }

//   handleSellingPlanChange(selectedRadio) {
//     // Determine if it's a one-time purchase or subscription
//     const isOneTimePurchase = selectedRadio.dataset.radioType === 'one_time_purchase';
    
//     // Update hidden input for selling plan
//     if (this.sellingPlanInput) {
//       this.sellingPlanInput.value = isOneTimePurchase ? '' : selectedRadio.dataset.sellingPlanId;
//     }

//     // Store current selling plan details
//     this.currentSellingPlan = {
//       type: selectedRadio.dataset.radioType,
//       price: selectedRadio.dataset.variantPrice,
//       compareAtPrice: selectedRadio.dataset.variantCompareAtPrice
//     };

//     // Update price
//     this.updatePrice();
//   }

//   updatePrice() {
//     try {
//       // Get current variant radio
//       const currentVariantRadio = document.querySelector('input[name="variant"]:checked');
//       if (!currentVariantRadio) {
//         console.warn('No variant radio selected');
//         return;
//       }

//       // Base prices from variant
//       let basePrice = this.parsePrice(currentVariantRadio.dataset.price);
//       let compareAtPrice = this.parsePrice(currentVariantRadio.dataset.compareAtPrice);

//       // Override prices if selling plan is selected
//       if (this.currentSellingPlan && this.currentSellingPlan.type !== 'one_time_purchase') {
//         basePrice = this.parsePrice(this.currentSellingPlan.price);
//         compareAtPrice = this.parsePrice(this.currentSellingPlan.compareAtPrice);
//       }

//       // Apply quantity discounts
//       let adjustedPrice = basePrice;
//       switch (this.currentQuantity) {
//         case 2:
//           adjustedPrice *= 0.85; // 15% off
//           break;
//         case 3:
//           adjustedPrice *= 0.80; // 20% off
//           break;
//       }

//       // Calculate total prices
//       const totalPrice = adjustedPrice * this.currentQuantity;
//       const totalCompareAtPrice = compareAtPrice * this.currentQuantity;

//       // Update price elements
//       if (this.priceElement) {
//         this.priceElement.textContent = this.formatPrice(totalPrice);
//       }

//       // Update compare at price if exists
//       if (this.comparePriceElement) {
//         this.comparePriceElement.textContent = this.formatPrice(totalCompareAtPrice);
//         this.comparePriceElement.style.display = totalPrice < totalCompareAtPrice ? 'inline' : 'none';
//       }
//     } catch (error) {
//       console.error('Error updating price:', error);
//     }
//   }

//   // Helper method to parse price safely
//   parsePrice(priceString) {
//     if (!priceString) {
//       console.warn('Price string is undefined or empty');
//       return 0;
//     }
    
//     // Remove currency symbols and convert to number
//     const cleanPrice = priceString.replace(/[^\d.-]/g, '');
//     const price = parseFloat(cleanPrice);
    
//     return isNaN(price) ? 0 : price;
//   }

//   // Helper method to format price (fallback if Shopify.formatMoney is not available)
//   formatPrice(price) {
//     // Check if Shopify.formatMoney exists
//     if (typeof Shopify !== 'undefined' && Shopify.formatMoney) {
//       return Shopify.formatMoney(price);
//     }
    
//     // Fallback formatting
//     return 'Rs. ' + (price * 100).toFixed(2);
//   }
// }

// // Initialize the widget for each selling plans container
// document.addEventListener('DOMContentLoaded', () => {
//   const containers = document.querySelectorAll('.selling_plan_app_container');
  
//   if (containers.length === 0) {
//     console.warn('No selling plan containers found');
//   }
  
//   containers.forEach(container => {
//     try {
//       new SellingPlansWidget(container);
//     } catch (error) {
//       console.error('Failed to initialize SellingPlansWidget:', error);
//     }
//   });
// });

// class SellingPlansWidget {
//   constructor(sellingPlansWidgetContainer) {
//     this.sellingPlansWidgetContainer = sellingPlansWidgetContainer;
//     this.currentVariant = null;
//     this.currentQuantity = 1;
    
//     this.initializeElements();
//     this.bindEvents();
//     this.initialSetup();
//   }

//   initializeElements() {
//     // Current page elements
//     this.priceElement = document.querySelector('.main-product__current-price');
//     this.comparePriceElement = document.querySelector('.main-product__cap');
//     this.variantRadios = document.querySelectorAll('input[name="variant"]');
//     this.quantityRadios = document.querySelectorAll('input[name="quantity"]');
//     this.sellingPlanContainer = document.querySelector('.selling_plan_app_container');
//   }

//   bindEvents() {
//     // Variant selection events
//     this.variantRadios.forEach(radio => {
//       radio.addEventListener('change', () => this.handleVariantChange());
//     });

//     // Quantity selection events
//     this.quantityRadios.forEach(radio => {
//       radio.addEventListener('change', () => {
//         this.currentQuantity = parseInt(radio.value);
//         this.updatePrice();
//       });
//     });
//   }

//   initialSetup() {
//     // Initial variant selection
//     this.handleVariantChange();
//     // Initial price update
//     this.updatePrice();
//   }

//   handleVariantChange() {
//     // Update visible selling plan sections
//     this.updateSellingPlanVisibility();
//     // Update price for new variant
//     this.updatePrice();
//   }

//   updateSellingPlanVisibility() {
//     const currentVariantId = this.getCurrentVariantId();
//     const sellingPlanSections = document.querySelectorAll('.selling_plan_theme_integration');
    
//     sellingPlanSections.forEach(section => {
//       if (section.dataset.variantId === currentVariantId) {
//         section.classList.remove('selling_plan_theme_integration--hidden');
//       } else {
//         section.classList.add('selling_plan_theme_integration--hidden');
//       }
//     });
//   }

//   getCurrentVariantId() {
//     const selectedVariantRadio = document.querySelector('input[name="variant"]:checked');
//     return selectedVariantRadio ? selectedVariantRadio.value : null;
//   }

//   updatePrice() {
//     try {
//       // Get current variant radio
//       const currentVariantRadio = document.querySelector('input[name="variant"]:checked');
//       if (!currentVariantRadio) {
//         console.warn('No variant radio selected');
//         return;
//       }

//       // Debug logging
//       console.log('Current Variant Radio:', currentVariantRadio);
//       console.log('Variant Radio Dataset:', currentVariantRadio.dataset);

//       // Get variant prices safely
//       const basePrice = this.parsePrice(currentVariantRadio.dataset.price);
//       const compareAtPrice = this.parsePrice(currentVariantRadio.dataset.compareAtPrice);

//       // Apply quantity discounts
//       let adjustedPrice = basePrice;
//       switch (this.currentQuantity) {
//         case 2:
//           adjustedPrice *= 0.85; // 15% off
//           break;
//         case 3:
//           adjustedPrice *= 0.80; // 20% off
//           break;
//       }

//       // Calculate total prices
//       const totalPrice = adjustedPrice * this.currentQuantity;
//       const totalCompareAtPrice = compareAtPrice * this.currentQuantity;

//       // Update price elements
//       if (this.priceElement) {
//         this.priceElement.textContent = this.formatPrice(totalPrice);
//       }

//       // Update compare at price if exists
//       if (this.comparePriceElement) {
//         this.comparePriceElement.textContent = this.formatPrice(totalCompareAtPrice);
//         this.comparePriceElement.style.display = totalPrice < totalCompareAtPrice ? 'inline' : 'none';
//       }
//     } catch (error) {
//       console.error('Error updating price:', error);
//       console.log('Current variant radio:', document.querySelector('input[name="variant"]:checked'));
//     }
//   }

//   // Helper method to parse price safely
//   parsePrice(priceString) {
//     if (!priceString) {
//       console.warn('Price string is undefined or empty');
//       return 0;
//     }
    
//     // Remove currency symbols and convert to number
//     const cleanPrice = priceString.replace(/[^\d.-]/g, '');
//     const price = parseFloat(cleanPrice);
    
//     return isNaN(price) ? 0 : price;
//   }

//   // Helper method to format price (fallback if Shopify.formatMoney is not available)
//   formatPrice(price) {
//     // Check if Shopify.formatMoney exists
//     if (typeof Shopify !== 'undefined' && Shopify.formatMoney) {
//       return Shopify.formatMoney(price);
//     }
    
//     // Fallback formatting
//     return '$' + price.toFixed(2);
//   }
// }

// // Initialize the widget for each selling plans container
// document.addEventListener('DOMContentLoaded', () => {
//   const containers = document.querySelectorAll('.selling_plan_app_container');
  
//   if (containers.length === 0) {
//     console.warn('No selling plan containers found');
//   }
  
//   containers.forEach(container => {
//     try {
//       new SellingPlansWidget(container);
//     } catch (error) {
//       console.error('Failed to initialize SellingPlansWidget:', error);
//     }
//   });
// });

// class SellingPlansWidget {
//   constructor(sellingPlansWidgetContainer) {
//     this.sellingPlansWidgetContainer = sellingPlansWidgetContainer;
//     this.currentVariant = null;
//     this.currentQuantity = 1;
    
//     this.initializeElements();
//     this.bindEvents();
//     this.initialSetup();
//   }

//   initializeElements() {
//     // Current page elements
//     this.priceElement = document.querySelector('.main-product__current-price');
//     this.comparePriceElement = document.querySelector('.main-product__cap');
//     this.variantRadios = document.querySelectorAll('input[name="variant"]');
//     this.quantityRadios = document.querySelectorAll('input[name="quantity"]');
//     this.sellingPlanRadios = document.querySelectorAll('input[name="purchaseOption_' + this.getSectionId() + '_' + this.getCurrentVariantId() + '"]');
//     this.sellingPlanContainer = document.querySelector('.selling_plan_app_container');
//   }

//   getSectionId() {
//     return this.sellingPlanContainer?.getAttribute('data-section-id') || '';
//   }

//   getCurrentVariantId() {
//     const selectedVariantRadio = document.querySelector('input[name="variant"]:checked');
//     return selectedVariantRadio ? selectedVariantRadio.value : null;
//   }

//   bindEvents() {
//     // Variant selection events
//     this.variantRadios.forEach(radio => {
//       radio.addEventListener('change', () => this.handleVariantChange());
//     });

//     // Quantity selection events
//     this.quantityRadios.forEach(radio => {
//       radio.addEventListener('change', () => {
//         this.currentQuantity = parseInt(radio.value);
//         this.updatePrice();
//       });
//     });

//     // Selling plan selection events
//     if (this.sellingPlanRadios) {
//       this.sellingPlanRadios.forEach(radio => {
//         radio.addEventListener('change', () => this.handleSellingPlanChange(radio));
//       });
//     }
//   }

//   initialSetup() {
//     // Initial variant selection
//     this.handleVariantChange();
//     // Initial price update
//     this.updatePrice();
//   }

//   handleVariantChange() {
//     // Update visible selling plan sections
//     this.updateSellingPlanVisibility();
//     // Update price for new variant
//     this.updatePrice();
//   }

//   updateSellingPlanVisibility() {
//     const currentVariantId = this.getCurrentVariantId();
//     const sellingPlanSections = document.querySelectorAll('.selling_plan_theme_integration');
    
//     sellingPlanSections.forEach(section => {
//       if (section.dataset.variantId === currentVariantId) {
//         section.classList.remove('selling_plan_theme_integration--hidden');
//       } else {
//         section.classList.add('selling_plan_theme_integration--hidden');
//       }
//     });
//   }

//   handleSellingPlanChange(selectedRadio) {
//     // Determine if it's a one-time purchase or subscription
//     const isOneTimePurchase = selectedRadio.dataset.radioType === 'one_time_purchase';
    
//     // Update hidden input for selling plan
//     const hiddenInput = document.querySelector('.selected-selling-plan-id');
//     if (hiddenInput) {
//       hiddenInput.value = isOneTimePurchase ? '' : selectedRadio.dataset.sellingPlanId;
//     }

//     // Update price
//     this.updatePrice();
//   }

//   updatePrice() {
//     // Get current variant and selected selling plan
//     const currentVariantRadio = document.querySelector('input[name="variant"]:checked');
//     const selectedSellingPlanRadio = document.querySelector('input[name="purchaseOption_' + this.getSectionId() + '_' + this.getCurrentVariantId() + '"]:checked');
    
//     if (!currentVariantRadio) return;

//     // Base price from variant
//     let basePrice = parseFloat(currentVariantRadio.dataset.variantPrice.replace(/[^0-9.-]+/g,""));
//     let compareAtPrice = parseFloat(currentVariantRadio.dataset.variantCompareAtPrice.replace(/[^0-9.-]+/g,""));

//     // Apply quantity discounts
//     switch (this.currentQuantity) {
//       case 2:
//         basePrice *= 0.85; // 15% off
//         break;
//       case 3:
//         basePrice *= 0.80; // 20% off
//         break;
//     }

//     // Apply selling plan price adjustments if applicable
//     if (selectedSellingPlanRadio && selectedSellingPlanRadio.dataset.radioType === 'selling_plan') {
//       const sellingPlanAdjustment = parseInt(selectedSellingPlanRadio.dataset.sellingPlanAdjustment);
//       const variantPrice = parseFloat(selectedSellingPlanRadio.dataset.variantPrice.replace(/[^0-9.-]+/g,""));
      
//       // Adjust price based on selling plan
//       basePrice = variantPrice;
//     }

//     // Calculate total price based on quantity
//     const totalPrice = basePrice * this.currentQuantity;
//     const totalCompareAtPrice = compareAtPrice * this.currentQuantity;

//     // Update price elements
//     if (this.priceElement) {
//       this.priceElement.textContent = Shopify.formatMoney(totalPrice);
//     }

//     // Update compare at price if exists
//     if (this.comparePriceElement) {
//       this.comparePriceElement.textContent = Shopify.formatMoney(totalCompareAtPrice);
//       this.comparePriceElement.style.display = totalPrice < totalCompareAtPrice ? 'inline' : 'none';
//     }
//   }
// }

// // Initialize the widget for each selling plans container
// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('.selling_plan_app_container').forEach(container => {
//     new SellingPlansWidget(container);
//   });
// });

// const hiddenClass = 'selling_plan_theme_integration--hidden';

// class SellingPlansWidget {
//   constructor(sellingPlansWidgetContainer) {
//     this.enablePerformanceObserver();
//     this.sellingPlansWidgetContainer = sellingPlansWidgetContainer;
//     this.appendSellingPlanInputs();
//     this.updateSellingPlanInputsValues();
//     this.listenToVariantChange();
//     this.listenToSellingPlanFormRadioButtonChange();
//     this.updatePrice();
//   }

//   get sectionId() {
//     return this.sellingPlansWidgetContainer.getAttribute('data-section-id');
//   }

//   get shopifySection() {
//     return document.querySelector(`#shopify-section-${this.sectionId}`);
//   }

//   /*
//     We are careful to target the correct form, as there are instances when we encounter an installment form that we specifically aim to avoid interacting with.
//   */
//   get variantIdInput() {
//     return (
//       this.addToCartForms[1]?.querySelector(`input[name="id"]`) ||
//       this.addToCartForms[1]?.querySelector(`select[name="id"]`) ||
//       this.addToCartForms[0].querySelector(`input[name="id"]`) ||
//       this.addToCartForms[0].querySelector(`select[name="id"]`)
//     );
//   }

//   get priceElement() {
//     return this.shopifySection.querySelector('.main-product__current-price');
//   }

//   get comparedAtPrice() {
//     return this.shopifySection.querySelector('.main-product__cap');
//   }

//   get visibleSellingPlanForm() {
//     return this.shopifySection.querySelector(
//       `section[data-variant-id^="${this.variantIdInput.value}"]`,
//     );
//   }

//   get isVariantAvailable() {
//     return this.selectedPurchaseOption.getAttributeNames().includes('disabled');
//   }

//   get sellingPlanInput() {
//     return this.shopifySection.querySelector('.selected-selling-plan-id');
//   }

//   get addToCartForms() {
//     return this.shopifySection.querySelectorAll('[action*="/cart/add"]');
//   }

//   /*
//     To enable the addition of a selling plan to a cart, it's necessary to include an input with the name "selling_plan", which will carry the selling ID as its value. When a buyer clicks on 'add to cart', the appropriate selling plan ID is added to their cart.
//   */
//   appendSellingPlanInputs() {
//     this.addToCartForms.forEach((addToCartForm) => {
//       addToCartForm.appendChild(this.sellingPlanInput.cloneNode());
//     });
//   }

//   showSellingPlanForm(sellingPlanFormForSelectedVariant) {
//     sellingPlanFormForSelectedVariant?.classList?.remove(hiddenClass);
//   }

//   hideSellingPlanForms(sellingPlanFormsForUnselectedVariants) {
//     sellingPlanFormsForUnselectedVariants.forEach((element) => {
//       element.classList.add(hiddenClass);
//     });
//   }

//   /*
//     Each product variant comes with a selling plan selection box that the buyer can interact with.
//     When a buyer chooses a different variant, we ensure that only the relevant selling plan selection box is displayed.
//     This guarantees that only the selling plan associated with the selected variant is shown.
//   */
//   handleSellingPlanFormVisibility() {
//     const sellingPlanFormForSelectedVariant = this.shopifySection.querySelector(
//       `section[data-variant-id="${this.variantIdInput.value}"]`,
//     );
//     const sellingPlanFormsForUnselectedVariants =
//       this.shopifySection.querySelectorAll(
//         `.selling_plan_theme_integration:not([data-variant-id="${this.variantIdInput.value}"])`,
//       );
//     this.showSellingPlanForm(sellingPlanFormForSelectedVariant);
//     this.hideSellingPlanForms(sellingPlanFormsForUnselectedVariants);
//   }

//   handleVariantChange() {
//     this.handleSellingPlanFormVisibility();
//     this.updateSellingPlanInputsValues();
//     this.listenToSellingPlanFormRadioButtonChange();
//   }

//   /*
//     The functions listenToVariantChange() and listenToAddToCartForms() are implemented to track when a product variant is altered or when the product form is updated.
//     The identification of the variant is crucial as it dictates which selling plan box should be displayed.
//   */
//   listenToVariantChange() {
//     this.listenToAddToCartForms();
//     if (this.variantIdInput.tagName === 'INPUT') {
//       const variantIdObserver = new MutationObserver((mutationList) => {
//         mutationList.forEach((mutationRecord) => {
//           this.handleVariantChange(mutationRecord.target.value);
//         });
//       });

//       variantIdObserver.observe(this.variantIdInput, {
//         attributes: true,
//       });
//     }
//   }

//   listenToAddToCartForms() {
//     this.addToCartForms.forEach((addToCartForm) => {
//       addToCartForm.addEventListener('change', () => {
//         this.handleVariantChange();
//       });
//     });
//   }

//   get regularPriceElement() {
//     return this.shopifySection.querySelector('.main-product__price-wrapper');
//   }

//   get salePriceElement() {
//     return this.shopifySection.querySelector('.main-product__current-price');
//   }

//   get salePriceValue() {
//     return this.salePriceElement.querySelector('.price-item--sale');
//   }

//   get regularPriceValue() {
//     return this.salePriceElement.querySelector('.price-item--regular');
//   }

//   get sellingPlanAllocationPrice() {
//     return document.getElementById(
//       `${this.selectedPurchaseOption.dataset.sellingPlanGroupId}_allocation_price`,
//     );
//   }

//   get selectedPurchaseOptionPrice() {
//     return this.selectedPurchaseOption.dataset.variantPrice;
//   }

//   get selectedPurchaseOptionComparedAtPrice() {
//     return this.selectedPurchaseOption.dataset.variantCompareAtPrice;
//   }

//   get price() {
//     return this.sellingPlanAllocationPrices.price ?? null;
//   }

//   /*
//     We aim to ascertain whether a compared price exists, which would indicate that the currently selected input has a discount applied to it.
//     If a discount is detected, the discounted price is displayed; otherwise, the regular price is shown.
//   */
//   updatePrice() {
//     if (
//       !this.selectedPurchaseOptionComparedAtPrice ||
//       this.selectedPurchaseOptionComparedAtPrice ===
//         this.selectedPurchaseOptionPrice
//     ) {
//       this.showRegularPrice();
//       this.hideSalePrice();
//       this.priceElement.classList.remove('price--on-sale');
//     } else {
//       this.showSalePrice();
//       this.hideRegularPrice();
//       this.priceElement.classList.add('price--on-sale');
//     }
//   }

//   hideSalePrice() {
//     this.salePriceElement.style.display = 'none';
//   }

//   hideRegularPrice() {
//     this.regularPriceElement.style.display = 'none';
//   }

//   showRegularPrice() {
//     this.regularPriceElement.style.display = 'block';
//     this.shopifySection.querySelector('.price__sale').style.display = 'none';
//   }

//   showSalePrice() {
//     this.salePriceElement.style.display = 'block';
//     this.regularPriceValue.innerHTML =
//       this.selectedPurchaseOptionComparedAtPrice;
//     this.salePriceValue.innerHTML = this.selectedPurchaseOptionPrice;
//   }

//   get sellingPlanInputs() {
//     return this.shopifySection.querySelectorAll('.selected-selling-plan-id');
//   }

//   updateSellingPlanInputsValues() {
//     this.sellingPlanInputs.forEach((sellingPlanInput) => {
//       sellingPlanInput.value = this.sellingPlanInputValue;
//     });
//   }

//   get sellingPlanInputValue() {
//     return this.selectedPurchaseOption?.dataset.sellingPlanId ?? null;
//   }

//   get selectedPurchaseOption() {
//     return this.visibleSellingPlanForm?.querySelector(
//       'input[type="radio"]:checked',
//     );
//   }

//   set selectedPurchaseOption(selectedPurchaseOption) {
//     this._selectedPurchaseOption = selectedPurchaseOption;
//   }

//   handleRadioButtonChange(selectedPurchaseOption) {
//     this.selectedPurchaseOption = selectedPurchaseOption;
//     this.updateSellingPlanInputsValues();
//     this.updatePrice();
//   }

//   listenToSellingPlanFormRadioButtonChange() {
//     this.visibleSellingPlanForm
//       ?.querySelectorAll('input[type="radio"]')
//       .forEach((radio) => {
//         radio.addEventListener('change', (event) => {
//           this.handleRadioButtonChange(event.target);
//         });
//       });
//   }

//   enablePerformanceObserver() {
//     const performanceObserver = new PerformanceObserver((list) => {
//       list.getEntries().forEach((entry) => {
//         if (entry.initiatorType !== 'fetch') return;

//         const url = new URL(entry.name);
//         /*
//           When a buyer selects a product variant, a fetch request is initiated.
//           Upon completion of this fetch request, we update the price to reflect the correct value.
//         */
//         if (url.search.includes('variant') || url.search.includes('variants')) {
//           this.updatePrice();
//         }
//       });
//     });

//     performanceObserver.observe({entryTypes: ['resource']});
//   }
// }

// document
//   .querySelectorAll('.selling_plan_app_container')
//   .forEach((sellingPlansWidgetContainer) => {
//     new SellingPlansWidget(sellingPlansWidgetContainer);
//   });