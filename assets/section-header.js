addEventListener('DOMContentLoaded', () => {

  const navOpenBtn = document.querySelector('.nav-bar__open-btn');

  const navDrawer = document.querySelector('.nav-bar__mega-menu');
  const megaMenuWrapper = document.querySelector('.mega-menu__wrapper');

  const backdrop = document.getElementById('backdrop');
  const desktopBackdrop = document.getElementById('desktopBackdrop');


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

  megaMenuItems.forEach(item => {
    const link = item.querySelector('a');
    const icon = item.querySelector('.icon-arrow-down');
    const childDropdown = item.querySelector('.mega-menu__child-dropdown');
    let closeTimeout; // Variable to store the timeout for delay
  
    console.log(icon);

    if (childDropdown) {
      // Handle mouseenter for the entire item (link + dropdown)
      item.addEventListener('mouseenter', function (e) {
        e.preventDefault();
  
        // Clear any existing timeout to prevent accidental closing
        clearTimeout(closeTimeout);
  
        // Close any other open dropdowns
        document.querySelectorAll('.mega-menu__child-dropdown.open').forEach(openDropdown => {
          openDropdown.classList.remove('open');
        });
  
        // Open this dropdown
        childDropdown.classList.add('open');
        desktopBackdrop.classList.add('show');
        icon.style.transform = 'rotate(180deg)';
      });
  
      // Handle mouseleave for the entire item (link + dropdown)
      item.addEventListener('mouseleave', function (e) {
        e.preventDefault();
  
        // Add a delay before closing the dropdown
        closeTimeout = setTimeout(() => {
          childDropdown.classList.remove('open');
          desktopBackdrop.classList.remove('show');
          
        }, 100); // Adjust the delay duration (in milliseconds) as needed
      });
    }
  });
  
  // Close dropdown if clicking outside the mega menu
  desktopBackdrop.addEventListener('click', () => {
    document.querySelectorAll('.mega-menu__child-dropdown.open').forEach(openDropdown => {
      openDropdown.classList.remove('open');
    });
    desktopBackdrop.classList.remove('show');
  });
  // megaMenuItems.forEach(item => {
  //   const link = item.querySelector('a');
  //   const childDropdown = item.querySelector('.mega-menu__child-dropdown');

  //   // If child links exist
  //   if (childDropdown) {
  //     link.addEventListener('mouseenter', function (e) {
  //       e.preventDefault(); // Prevent default anchor behavior

  //       // Check if the dropdown is open
  //       const isOpen = childDropdown.classList.contains('open');

  //       // Close any other open dropdowns
  //       document.querySelectorAll('.mega-menu__child-dropdown.open').forEach(openDropdown => {
  //         openDropdown.classList.remove('open');
  //       });

  //       desktopBackdrop.addEventListener('click', () => {
  //         desktopBackdrop.classList.remove('show');
  //         childDropdown.classList.remove('open');
  //       });

  //       // If it was closed, open it; otherwise, close it
  //       if (!isOpen) {
  //         childDropdown.classList.add('open');
  //         desktopBackdrop.classList.add('show');        
  //       } else {
  //         childDropdown.classList.remove('open');
  //         desktopBackdrop.classList.remove('show');
  //       }
  //     });
  //   }

  //   if (childDropdown) {
  //     link.addEventListener('mouseleave', function (e) {
  //       e.preventDefault(); // Prevent default anchor behavior

  //       // Check if the dropdown is open
  //       const isOpen = childDropdown.classList.contains('open');

  //       // Close any other open dropdowns
  //       document.querySelectorAll('.mega-menu__child-dropdown.open').forEach(openDropdown => {
  //         openDropdown.classList.remove('open');
  //       });

  //       desktopBackdrop.addEventListener('click', () => {
  //         desktopBackdrop.classList.remove('show');
  //         childDropdown.classList.remove('open');
  //       });

  //       // If it was closed, open it; otherwise, close it
  //       if (isOpen) {
  //         childDropdown.classList.remove('open');
  //         desktopBackdrop.classList.remove('show');        
  //       }
  //     });
  //   }

  // });


});