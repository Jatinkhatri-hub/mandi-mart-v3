

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
    console.log(priceString)
    const cleanPrice = priceString.replace(/[^\d.-]/g, '');
    const price = parseFloat(cleanPrice);
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

