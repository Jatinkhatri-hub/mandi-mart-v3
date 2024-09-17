addEventListener('DOMContentLoaded', () => {

  const navOpenBtn = document.querySelector('.nav-bar__open-btn');

  const navDrawer = document.querySelector('.nav-bar__mega-menu');
  const megaMenuWrapper = document.querySelector('.mega-menu__wrapper');

  const backdrop = document.getElementById('backdrop');


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

  const megaMenuItems = document.querySelectorAll('.nav-bar__mega-menu-item');

  megaMenuItems.forEach(item => {
    const link = item.querySelector('a');
    const childDropdown = item.querySelector('.mega-menu__child-dropdown');

    // If child links exist
    if (childDropdown) {
      link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        // Toggle the open class to show/hide child links
        childDropdown.classList.toggle('open');
      });
    }
  });



});