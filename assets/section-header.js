addEventListener('DOMContentLoaded', () => {

  const navOpenBtn = document.querySelector('.nav-bar__open-btn');

  const navDrawer = document.querySelector('.nav-bar__mega-menu');
  const megaMenuWrapper = document.querySelector('.mega-menu__wrapper');

  const navCloseBtn = document.querySelector('.backdrop');


  navOpenBtn.addEventListener('click', () => {
    navDrawer.classList.add('open');
    navDrawer.classList.remove('close');
    megaMenuWrapper.style.display= "block";
    navCloseBtn.classList.add = 'openBackdrop'
    console.log(open);
  })

  navCloseBtn.addEventListener('click', () => {
    navDrawer.classList.remove('open');
    navDrawer.classList.add('close');
    megaMenuWrapper.style.display = 'none';
    
  });




});