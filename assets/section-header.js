addEventListener('DOMContentLoaded', () => {

  const navOpenBtn = document.querySelector('.nav-drawer__open-btn');

  const navDrawer = document.querySelector('.nav-bar__mega-menu');
  const megaMenuWrapper = document.querySelector(.mega)

  navOpenBtn.addEventListener('click', () => {
    navDrawer.classList.add('open');
    navDrawer.classList.remove('close');
    console.log(open);
  })




});