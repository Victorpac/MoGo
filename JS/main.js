"use strict";

function addActive(name, id) {
	let i = 1;
	while (i<4) {
		document.getElementById(name+'_'+i).classList.remove('active');
		i++;
	}
	document.getElementById(name+'_'+id).classList.add('active');
}

function openMenu() {
	let top_nav_menu = document.querySelector('#menu');
	let docHeight = document.documentElement.clientHeight;

	top_nav_menu.style.height = `${(docHeight/100)*60}px`;

	if (top_nav_menu.classList.contains('active')) {
		top_nav_menu.classList.remove('active');
		top_nav_menu.style.height = 'unset';
	}else {
		top_nav_menu.classList.add('active');
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

		this.viewport 			= document.querySelector(`#${parrams.slider_id} .viewport`);
		this.carousel 			= document.querySelector(`#${parrams.slider_id} .slide_list`);
		this.navButtonNext 	= document.querySelector(`#${parrams.slider_id} .btn__next_slide`);
		this.navButtonPrev 	= document.querySelector(`#${parrams.slider_id} .btn__prev_slide`);
		this.currentSlide		= parrams.currentSlide || 0;
		if (parrams.navMenu) {
			this.navMenu 			= document.querySelectorAll(`#${parrams.slider_id} .${parrams.navMenu} .slider_nav_item`);
		}
		this.delay					=parrams.delay;

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
		if (this.navMenu) {
			this.timerStart(this.delay);
		}
	}

	showSlide(slide_id) {
		this.navButtonNext.style.display = '';
		this.navButtonPrev.style.display = '';
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
		}
		this.carousel.style.transform = `translate3d(${slide_id * 100}vw, 0, 0)`;
		this.currentSlide = slide_id;
		if (this.navMenu) {
			this.timerClear();
			this.timerStart(this.delay);
		}
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
		if (this.navMenu) {
			for (const el of this.navMenu) {
				el.addEventListener('click', () => this.showSlide(-el.dataset.slideId));
			}
		}
		
	}

	swipeStart(event) {
		let start_pos = event.clientX;
		let slider_offset = this.currentSlide*100;

		this.timerPause();
		
		document.addEventListener('pointerup', this.swiperPointerUp = () => {
			console.log("Pointer is up");
			if (Math.abs(this.offset) > 30) {
				if ((this.offset < 0) && (this.currentSlide > -(this.carousel.children.length-1))) {
					console.log('Condition 1');
					this.showSlide(this.currentSlide-1);
				}else if ((this.offset > 0) && (this.currentSlide < 0)) {
					console.log('Condition 2');
					this.showSlide(this.currentSlide+1);
				}else {
					console.log('Condition 3');
					this.carousel.style.transform = `translate3d(${this.currentSlide * 100}vw, 0, 0)`;
				}
				this.offset = 0;
			}else {
				this.carousel.style.transform = `translate3d(${this.currentSlide * 100}vw, 0, 0)`;
			}
			document.removeEventListener('pointermove', this.swiperPointerMove);
			document.removeEventListener('pointerup', this.swiperPointerUp);
			this.carousel.style.transitionDuration = '.5s';
			setTimeout(() => this.carousel.style.transitionDuration = '1s', 500);
			this.timerPlay();
		});

		document.addEventListener('pointermove', this.swiperPointerMove = (e) => {
			this.carousel.style.transitionDuration = "0s";
			this.offset = ((e.clientX - start_pos) / window.innerWidth) * 100;
			this.carousel.style.transform = `translate3d(${(slider_offset + this.offset)}vw, 0vw, 0vw)`;
		});
	}

	timerStart(time=7000) {	
		let navigation_element = this.navMenu[Math.abs(this.currentSlide)] ?? undefined;
		this.timer_progress = navigation_element?.querySelector('.timer_progress');

		if (time === 0) return;

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
	slider_id: 'header_slider',
	navMenu: 'slider_nav',
	delay: 7000
}

let comments_slider_set = {
	slider_id: 'comments__slider'
}

let testimonial_slider_set = {
	slider_id: 'tcomments__slider'
}


document.addEventListener('ContentLoaded', () => {
	let slider_top 						= new Slider(header_slider_set);
	let comments__slider 			= new Slider(comments_slider_set);
	let testimonial_slider 		= new Slider(testimonial_slider_set);
});
