addEventListener('DOMContentLoaded', () => {

  const navOpenBtn = document.querySelector('.nav-bar__open-btn');

  const navDrawer = document.querySelector('.nav-bar__mega-menu');
  const megaMenuWrapper = document.querySelector('.mega-menu__wrapper');

  const backdrop = document.getElementById('backdrop');
  const desktopBackdrop = document.getElementById('desktopBackdrop');
  const productPreview = document.getElementById('product-preview');

  // Function to fetch collection data
  function fetchProducts(collectionHandle) {
    // Add fade-out class before changing the products
    productPreview.classList.add('fade-out');

    fetch(`/collections/${collectionHandle}/products.json?limit=2`)
      .then(response => response.json())
      .then(data => {
        const products = data.products;

        // Small delay to allow fade-out animation to play
        setTimeout(() => {
          renderProductCards(products);
          productPreview.classList.remove('fade-out'); // Remove fade-out after rendering
        }, 300); // Adjust timing as per the fade-out duration
      })
      .catch(error => console.error('Error fetching products:', error));
  }

  // Function to render product cards
  function renderProductCards(products) {
    let productHTML = '';
    products.forEach(product => {
      const productImage = product.images.length > 0 ? product.images[0].src : 'default-image.jpg';
      productHTML += `
        <div class="product-card show">
          <img src="${productImage}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>${(product.variants[0].price)}</p>
        </div>
      `;
    });
    productPreview.innerHTML = productHTML; // Update the product preview area

    // Ensure the fade-in effect starts after the cards are added
    setTimeout(() => {
      const productCards = productPreview.querySelectorAll('.product-card');
      productCards.forEach(card => card.classList.add('show')); // Add the 'show' class to trigger fade-in
    }, 100);
  }

  // Event listener for hovering over child links
  const childLinks = document.querySelectorAll('.our-top-brands .child-links');
  childLinks.forEach(link => {
    link.addEventListener('mouseover', function () {
      const collectionHandle = this.getAttribute('data-collection-handle');
      fetchProducts(collectionHandle); // Fetch products for the hovered collection
    });
  });

  

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
    const childDropdown = item.querySelector('.mega-menu__child-dropdown');

    // If child links exist
    if (childDropdown) {
      link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        // Check if the dropdown is open
        const isOpen = childDropdown.classList.contains('open');

        // Close any other open dropdowns
        document.querySelectorAll('.mega-menu__child-dropdown.open').forEach(openDropdown => {
          openDropdown.classList.remove('open');
        });

        desktopBackdrop.addEventListener('click', () => {
          desktopBackdrop.classList.remove('show');
          childDropdown.classList.remove('open');
        });

        // If it was closed, open it; otherwise, close it
        if (!isOpen) {
          childDropdown.classList.add('open');
          desktopBackdrop.classList.add('show');        
        } else {
          childDropdown.classList.remove('open');
          desktopBackdrop.classList.remove('show');
        }
      });
    }
  });


});