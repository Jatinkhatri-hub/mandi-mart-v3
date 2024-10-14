addEventListener('DOMContentLoaded', () => {

  const navOpenBtn = document.querySelector('.nav-bar__open-btn');

  const navDrawer = document.querySelector('.nav-bar__mega-menu');
  const megaMenuWrapper = document.querySelector('.mega-menu__wrapper');

  const backdrop = document.getElementById('backdrop');
  const desktopBackdrop = document.getElementById('desktopBackdrop');

  const childTwoDropdown = document.querySelectorAll('.categories .child-links');

  


  const productPreviewClass = 'product-preview';

// Function to fetch and render random products
function fetchRandomProducts(collectionHandle, productPreview) {
  // Add fade-out class before changing the products
  productPreview.classList.add('fade-out');

  fetch(`/collections/${collectionHandle}/products.json`)
    .then(response => response.json())
    .then(data => {
      const products = data.products;
      // Shuffle products and select the first 2 for display
      const shuffledProducts = products.sort(() => 0.5 - Math.random());
      const randomProducts = shuffledProducts.slice(0, 2);

      // Small delay to allow fade-out animation to play
      setTimeout(() => {
        renderProductCards(randomProducts, productPreview);
        productPreview.classList.remove('fade-out'); // Remove fade-out after rendering
      }, 10); // Adjust timing as per the fade-out duration
    })
    .catch(error => console.error('Error fetching products:', error));
}

// Function to render product cards
function renderProductCards(products, container) {
  let productHTML = '';
  products.forEach(product => {
    const productImage = product.images.length > 0 ? product.images[0].src : 'default-image.jpg';
    const productURL = `/products/${product.handle}`;
    productHTML += `
      <div href='${productURL}' class="product-card show">
        <a href='${productURL}'>
          <p class="mega-menu__product-title">${product.title}</p>
        </a>
        <a href='${productURL}' class="mega-menu__product-card-container">
          <div class="mega-menu__product-card-info">
            <p>${product.vendor}</p>
            <p class="mega-menu__product-price">$${product.variants[0].price}</p>
          </div>
          <div class="mega-menu__product-img-wrapper">
            <img src="${product.images[0].src}" alt="${product.title}" class="mega-menu__product-image"/>
          </div>
        </a>
        <a href='${productURL}' class="mega-menu__atc-btn" href="#" data-variant-id="${product.variants[0].id}">+ ADD TO CART</a>
      </div>
    `;
  });
  container.innerHTML = productHTML; // Update the product preview container
}

// Event listener for hovering over child links
const childLinks = document.querySelectorAll('.our-top-brands .child-links');
childLinks.forEach(link => {
  link.addEventListener('mouseover', function () {
    const collectionHandle = this.getAttribute('data-collection-handle');
    const previewContainer = this.closest('.mega-menu__child-dropdown').querySelector(`.${productPreviewClass}`);
    fetchRandomProducts(collectionHandle, previewContainer); // Fetch random products for the hovered collection
  });
});

// Ensure the first child element's products are shown initially when the dropdown is opened

  const firstChildLink = document.querySelector('.our-top-brands .child-links');
  if (firstChildLink) {
    const collectionHandle = firstChildLink.getAttribute('data-collection-handle');
    const previewContainer = firstChildLink.closest('.mega-menu__child-dropdown').querySelector(`.${productPreviewClass}`);
    fetchRandomProducts(collectionHandle, previewContainer); // Fetch random products for the first child element
  }

  const subChildLink = document.querySelector('.mega-menu-dropdown__child-dropdown-links')


  navOpenBtn.addEventListener('click', () => {
    navDrawer.classList.add('open');
    navDrawer.classList.remove('close');
    megaMenuWrapper.style.display= "block";
    backdrop.classList.add('show');
    console.log(open);
  })

  

  backdrop.addEventListener('click', () => {
    navDrawer.classList.remove('open');
    navDrawer.classList.add('close');
    megaMenuWrapper.style.display= "none";
    backdrop.classList.remove('show');
  });

  desktopBackdrop.addEventListener('click', () => {
    desktopBackdrop.classList.remove('show')
  });

  const megaMenuItems = document.querySelectorAll('.nav-bar__mega-menu-item');

  // const desktopBackdrop = document.getElementById('desktopBackdrop');

  

  childTwoDropdown.forEach(link => {
    const dropdown = link.querySelector('.mega-menu-dropdown__child-dropdown');
    let closeTimeout; // Variable to store the timeout ID
  
    // Handle mobile click event
    link.addEventListener('click', function(event) {
      if (window.innerWidth < 769) { // Adjust based on your mobile breakpoint
        event.preventDefault(); // Prevent default link behavior
  
        // Toggle the dropdown visibility on mobile
        if (dropdown.classList.contains('open')) {
          dropdown.classList.remove('open'); // Hide dropdown
        } else {
          // Close all other open dropdowns
          document.querySelectorAll('.mega-menu-dropdown__child-dropdown.open').forEach(d => {
            d.classList.remove('open');
          });
          dropdown.classList.add('open'); // Show dropdown
        }
      }
    });
  
    // Handle desktop mouseenter and mouseleave events
    if (window.innerWidth >= 769) { // Adjust based on your desktop breakpoint
      link.addEventListener('mouseenter', function() {
        // Clear any existing close timeout to prevent premature hiding
        clearTimeout(closeTimeout);
        dropdown.classList.add('open'); // Show the dropdown on mouseenter
      });
  
      link.addEventListener('mouseleave', function() {
        // Set a timeout to close the dropdown after a short delay
        closeTimeout = setTimeout(function() {
          dropdown.classList.remove('open'); // Hide the dropdown after delay
        }, 300); // Adjust the delay (300ms) as per your requirement
      });
    }
  });
  
  // Optional: Reset dropdowns on window resize
  window.addEventListener('resize', () => {
    document.querySelectorAll('.mega-menu-dropdown__child-dropdown').forEach(d => {
      d.classList.remove('open'); // Reset all dropdowns when resizing
    });
  });


megaMenuItems.forEach(item => {
  const link = item.querySelector('a');
  const childDropdown = item.querySelector('.mega-menu__child-dropdown');
  const dropdownIndicator = item.querySelector('.arrow-down');
  const icon = item.querySelector('.icon-arrow-down');

  

  // Check if it's a touch device
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (childDropdown) {
    let timeout;

    // Hover behavior for desktop
    if (!isTouchDevice) {
      link.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        openDropdown(childDropdown, dropdownIndicator, icon);
      });

      link.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
          closeDropdown(childDropdown, dropdownIndicator, icon);
        }, 300);  // Slight delay for smoother experience
      });

      childDropdown.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
      });

      childDropdown.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
          closeDropdown(childDropdown, dropdownIndicator, icon);
        }, 300);
      });
    }



    // Click behavior for mobile
    if (isTouchDevice) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDropdown(childDropdown, dropdownIndicator, icon);
      });

      // Close dropdown when clicking outside
      desktopBackdrop.addEventListener('click', () => {
        closeDropdown(childDropdown, dropdownIndicator, icon);
      });
    }
  }
});



// Helper functions
function openDropdown(dropdown, indicator, icon) {
  document.querySelectorAll('.mega-menu__child-dropdown.open').forEach(openDropdown => {
    openDropdown.classList.remove('open');
  //  indicator.style.borderBottom = '30px solid transparent';
    indicator.classList.remove('show');
  });

  dropdown.classList.add('open');
  desktopBackdrop.classList.add('show');
  indicator.classList.add('show');
  icon.style.transform = 'rotate(180deg)';
  indicator.style.borderBottom = '30px solid white';

}

function closeDropdown(dropdown, indicator, icon) {
  dropdown.classList.remove('open');
  desktopBackdrop.classList.remove('show');
  indicator.classList.remove('show');
  icon.style.transform = 'rotate(0deg)';
  indicator.style.borderBottom = '30px solid transparent';
}

function toggleDropdown(dropdown, indicator, icon) {
  const isOpen = dropdown.classList.contains('open');

  if (isOpen) {
    closeDropdown(dropdown, indicator, icon);
  } else {
    openDropdown(dropdown, indicator, icon);
  }
}


  
  // Close dropdown if clicking outside the mega menu
  desktopBackdrop.addEventListener('click', () => {
    document.querySelectorAll('.mega-menu__child-dropdown.open').forEach(openDropdown => {
      openDropdown.classList.remove('open');
    });
    desktopBackdrop.classList.remove('show');
  });
  


});