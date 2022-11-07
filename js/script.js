window.onload = initialscript();

function initialscript(){
	window.sessionStorage.setItem("isProfile", 0);
}

function menuToggle() {
	const toggleMenu = document.querySelector('.menu');
	toggleMenu.classList.toggle('active')

}
function hideProfile() {
	let x = window.sessionStorage.getItem('isProfile');
	if (x == 0) {
		 window.sessionStorage.setItem('isProfile', 1);
		 document.getElementById("htmProfile").style.display = "none";
	}
	else {
		 window.sessionStorage.setItem('isProfile', 0);
		 document.getElementById("htmProfile").style.removeProperty("display");
	}
 }
  
 var Swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints:{
      0: {
          slidesPerView: 1,
      },
      520: {
          slidesPerView: 2,
      },
      950: {
          slidesPerView: 3,
      },
  },
});

 