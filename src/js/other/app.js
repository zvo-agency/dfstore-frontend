$( document ).ready(function() {

  $('.jsMainSlider').slick({
    "autoplay": true,
    "autoplaySpeed": 5000,
    dots: true,
    fade: true, 
    infinite: true,
    speed: 600,
    cssEase: 'linear'
  })
  
});


function overExtendedItem() {
  var extendedNav = document.querySelector('.c-extendedNav');
  extendedNav.classList.add('is-active');
}
function outExtendedItem() {
  var extendedNav = document.querySelector('.c-extendedNav');

  extendedNav.classList.remove('is-active');
  extendedNav.onmouseenter = function() {
    
    extendedNav.classList.add('is-active');
    if (extendedNav.classList.contains('is-active')) {
      return true;
    }
    extendedNav.classList.remove('is-active');
  }
  extendedNav.onmouseleave = function() {
    extendedNav.classList.remove('is-active');
  }
}
function setExtendedNavLinks() {
  var navItemsList = document.querySelectorAll('#jsDataImagesList a');
  var extendedNavImage = document.querySelector('#jsExtendedNavImg');

  navItemsList.forEach(function(item) {
    item.onmouseover = function() {
      var dataImg = item.getAttribute('data-img');
      if (dataImg) {
        extendedNavImage.style.backgroundColor = '#e1e6e6';
        extendedNavImage.style.backgroundImage = 'url(' + dataImg + ')';      
      } 
    }
  }) 
}
setExtendedNavLinks();














