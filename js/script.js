window.onload = initialscript();

function initialscript(){
	window.sessionStorage.setItem("isProfile", 0);
}

var swiper = new Swiper(".mySwiper", {
	effect: "coverflow",
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: "auto",
	coverflowEffect: {
		rotate: 0,
		stretch: 0,
		depth: 300,
		modifier: 1,
		slideShadows: false,
	},
	pagination: {
		el: ".swiper-pagination",
	},
});

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
