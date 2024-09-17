addEventListener('DOMContentLoaded', () => {

  const navOpenBtn = document.querySelector('.nav-bar__open-btn');

  const navDrawer = document.querySelector('.nav-bar__mega-menu');
  const megaMenuWrapper = document.querySelector('.mega-menu__wrapper');

  const backdrop = document.getElementById('backdrop');
  const desktopBackdrop = document.getElementById('desktopBackdrop');

  

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