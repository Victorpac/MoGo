"use strict";

function addActive(name, id) {
	i=1
	while (i<4) {
		document.getElementById(name+'_'+i).classList.remove('active');
		i++;
	}
	document.getElementById(name+'_'+id).classList.add('active');
}

function openMenu() {
	a = document.getElementById('menu').classList;
	if (a == 'menu') {
		a.add('active');
	}else {
		a.remove('active');
	}
}

function FullScreenPict(id) {
	document.getElementById('full__bg').classList.add('active');
	document.getElementById('inst__pict_'+id).classList.add('active');
	document.getElementById('full__bg').onclick = function () {
		document.getElementById('full__bg').classList.remove('active');
		document.getElementById('inst__pict_'+id).classList.remove('active');
	}
}


// Slider
class Slider {
	constructor(parrams) {
		this.slider 				= document.querySelector('#' + parrams.slider_id);

		this.viewport 			= document.querySelector(`#${parrams.slider_id} .${parrams.viewport}`);
		this.carousel 			= document.querySelector(`#${parrams.slider_id} .${parrams.carousel}`);
		this.navMenu 				= document.querySelectorAll(`#${parrams.slider_id} .${parrams.navMenu} .slider_nav_item`);
		this.navButtonNext 	= document.querySelector(`#${parrams.slider_id} .${parrams.next}`);
		this.navButtonPrev 	= document.querySelector(`#${parrams.slider_id} .${parrams.prev}`);
		this.currentSlide		= parrams.currentSlide || 0;

		// Start slider
		this.start();
	}


	start() {
		// Removing extra nav-arrows
		if (this.currentSlide >= 0) {
			this.navButtonPrev.style.display = 'none';
		}
		if (this.currentSlide <= -(this.carousel.children.length-1)) {
			this.navButtonNext.style.display = 'none';
		}

		this.startListening();
		this.timerStart();
	}


	showSlide(slide_id) {		
		if (slide_id <= -(this.carousel.children.length-1)) {
			this.navButtonNext.style.display = 'none';

			if (slide_id < -(this.carousel.children.length-1)) {
				this.showSlide(0);
				return;
			}
		} else if (slide_id >= 0) {
			this.navButtonPrev.style.display = 'none';
			
			if (slide_id > 0) {
				this.showSlide(-(this.carousel.children.length-1));
				return;
			}
		} else {
			this.navButtonNext.style.display = '';
			this.navButtonPrev.style.display = '';
		}
		this.carousel.style.transform = `translate3d(${slide_id * 100}vw, 0, 0)`;
		this.currentSlide = slide_id;
		this.timerClear();
		this.timerStart();
	}


	startListening() {
		// Events for navigration buttons
		this.navButtonNext.addEventListener('click', () => {
			this.showSlide(this.currentSlide-1);
		});
		this.navButtonPrev.addEventListener('click', () => {
			this.showSlide(this.currentSlide+1);
		});
		
		// Swiper
		this.viewport.addEventListener('pointerdown', (e) => this.swipeStart(e));

		// this.viewport.addEventListener('click', () => this.carousel.style.transitionDuration = '1s');

		// Events for navigation menu
		for (let el of this.navMenu) {
			el.addEventListener('click', () => this.showSlide(-el.dataset.slideId));
		}
	}


	swipeStart(event) {
		let start_pos = event.clientX;
		let slider_offset = this.currentSlide*100;

		this.timerPause();
		
		this.viewport.addEventListener('pointerup', this.swiperPointerUp = () => {
			if (Math.abs(this.offset) > 30) {
				if ((this.offset < 0) && (this.currentSlide > -(this.carousel.children.length-1))) {
					this.showSlide(this.currentSlide-1);
				}else if ((this.offset > 0) && (this.currentSlide < 0)) {
					this.showSlide(this.currentSlide+1);
				}else {
					this.carousel.style.transform = `translate3d(${this.currentSlide * 100}vw, 0, 0)`;
				}
				this.offset = undefined;
			}else {
				this.carousel.style.transform = `translate3d(${this.currentSlide * 100}vw, 0, 0)`;
			}
			
			this.viewport.removeEventListener('pointermove', this.swiperPointerMove);
			this.viewport.removeEventListener('pointerup', this.swiperPointerUp);
			this.carousel.style.transitionDuration = '.5s';
			setTimeout(() => this.carousel.style.transitionDuration = 'unset', 500);
			this.timerPlay();
		});

		this.viewport.addEventListener('pointermove', this.swiperPointerMove = (e) => {
			this.carousel.style.transitionDuration = "0s";
			this.offset = ((e.clientX - start_pos) / window.innerWidth) * 100;
			this.carousel.style.transform = `translate3d(${(slider_offset + this.offset)}vw, 0vw, 0vw)`;
		});
	}


	timerStart(time=7000) {
		let navigation_element = this.navMenu[Math.abs(this.currentSlide)];
		this.timer_progress = navigation_element.querySelector('.timer_progress');

		let i = 0;
		this.timer = setInterval(() => {
			if (!this.timerIsPaused) {
				if (i >= 100) {
					this.timerClear();
					this.showSlide(this.currentSlide-1);
				}else {
					this.timer_progress.style.width = `${i}%`;
					i++;
				}
			}
		}, time/100)
	}


	timerPause() {
		this.timerIsPaused = true;
	}


	timerPlay() {
		this.timerIsPaused = false;
	}


	timerClear() {
		clearInterval(this.timer);
		this.timer_progress.style.width = "0%";
	}
}


// Slider settings
let header_slider_set = {
	slider_id: 		'header_slider',
	viewport: 		'viewport',
	carousel: 		'slide_list',
	navMenu:			'slider_nav',
	next:					'btn__next_slide',
	prev:					'btn__prev_slide'
}


document.addEventListener('DOMContentLoaded', () => {
	console.log('is Loaded');
	let slider_top = new Slider(header_slider_set);
});
