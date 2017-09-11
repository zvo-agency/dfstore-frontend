function toggleNav() {
  var bodyEl = document.querySelector('body');
  if(bodyEl.classList.contains('is-active')) {
    bodyEl.classList.remove('is-active'); 
  } else {
    bodyEl.classList.add('is-active');
  }
}
