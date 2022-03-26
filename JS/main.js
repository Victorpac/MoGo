<<<<<<< HEAD
=======
"use strict";

>>>>>>> slt2
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


<<<<<<< HEAD
let slider = document.querySelector('.header_slider'),
    sliderList = slider.querySelector('.viewport'),
    sliderTrack = slider.querySelector('.slide_list'),
    slides = slider.querySelectorAll('.slide_item'),
    arrows = slider.querySelector('.arrows'),
    prev = arrows.children[0],
    next = arrows.children[1],
    slideWidth = slides[0].offsetWidth,
    slideIndex = 0,
    posInit = 0,
    posX1 = 0,
    posX2 = 0,
    posY1 = 0,
    posY2 = 0,
    posFinal = 0,
    isSwipe = false,
    isScroll = false,
    allowSwipe = true,
    transition = true,
    nextTrf = 0,
    prevTrf = 0,
    lastTrf = --slides.length * slideWidth,
    posThreshold = slides[0].offsetWidth * 0.1,
    trfRegExp = /([-0-9.]+(?=px))/,
    getEvent = function() {
      return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    },
    slide = function() {
      if (transition) {
        sliderTrack.style.transition = 'transform .5s';
      }
      sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

      prev.classList.toggle('disabled', slideIndex === 0);
      next.classList.toggle('disabled', slideIndex === --slides.length);
    },
    swipeStart = function() {
      let evt = getEvent();

      if (allowSwipe) {
        transition = true;
        nextTrf = (slideIndex + 1) * -slideWidth;
        prevTrf = (slideIndex - 1) * -slideWidth;
        posInit = posX1 = evt.clientX;
        posY1 = evt.clientY;
        sliderTrack.style.transition = '';
        document.addEventListener('touchmove', swipeAction);
        document.addEventListener('mousemove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mouseup', swipeEnd);

        sliderList.classList.remove('grab');
        sliderList.classList.add('grabbing');
      }
    },
    swipeAction = function() {
      let evt = getEvent(),
        style = sliderTrack.style.transform,
        transform = +style.match(trfRegExp)[0];
      posX2 = posX1 - evt.clientX;
      posX1 = evt.clientX;
      posY2 = posY1 - evt.clientY;
      posY1 = evt.clientY;

      // определение действия свайп или скролл
      if (!isSwipe && !isScroll) {
        let posY = Math.abs(posY2);
        if (posY > 7 || posX2 === 0) {
          isScroll = true;
          allowSwipe = false;
        } else if (posY < 7) {
          isSwipe = true;
        }
      }

      if (isSwipe) {
        // запрет ухода влево на первом слайде
        if (slideIndex === 0) {
          if (posInit < posX1) {
            setTransform(transform, 0);
            return;
          } else {
            allowSwipe = true;
          }
        }

        // запрет ухода вправо на последнем слайде
        if (slideIndex === --slides.length) {
          if (posInit > posX1) {
            setTransform(transform, lastTrf);
            return;
          } else {
            allowSwipe = true;
          }
        }

        // запрет протаскивания дальше одного слайда
        if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
          reachEdge();
          return;
        }

        // двигаем слайд
        sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
      }

    },
    swipeEnd = function() {
      posFinal = posInit - posX1;

      isScroll = false;
      isSwipe = false;

      document.removeEventListener('touchmove', swipeAction);
      document.removeEventListener('mousemove', swipeAction);
      document.removeEventListener('touchend', swipeEnd);
      document.removeEventListener('mouseup', swipeEnd);

      sliderList.classList.add('grab');
      sliderList.classList.remove('grabbing');

      if (allowSwipe) {
        if (Math.abs(posFinal) > posThreshold) {
          if (posInit < posX1) {
            slideIndex--;
          } else if (posInit > posX1) {
            slideIndex++;
          }
        }

        if (posInit !== posX1) {
          allowSwipe = false;
          slide();
        } else {
          allowSwipe = true;
        }

      } else {
        allowSwipe = true;
      }

    },
    setTransform = function(transform, comapreTransform) {
      if (transform >= comapreTransform) {
        if (transform > comapreTransform) {
          sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
        }
      }
      allowSwipe = false;
    },
    reachEdge = function() {
      transition = false;
      swipeEnd();
      allowSwipe = true;
    };

  sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
  sliderList.classList.add('grab');

  sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
  slider.addEventListener('touchstart', swipeStart);
  slider.addEventListener('mousedown', swipeStart);

  arrows.addEventListener('click', function() {
    let target = event.target;

    if (target.classList.contains('next')) {
      slideIndex++;
    } else if (target.classList.contains('prev')) {
      slideIndex--;
    } else {
      return;
    }

    slide();
  });



// let 
// 	top_sliderLst				= document.getElementById('top_slider'),
// 	top_sliNav 					= document.getElementById('top_slider_nav'),
// 	windowWidth 				= window.screen.width,
// 	trfRegExp 					= /[-0-9.]+(?=px)/;


// function showSlide(slider, offset=0) {
// 	// clearTimeout(window.timerId);


// 	let 
// 		sli
// 		vp 					= slider.parentElement,
// 		slItem_count 		= slider.childElementCount,
// 		slideNow 			= math;

// 	if (offset == 0) {
// 		if (slideNow >= slItem_count-1) {
// 			slider.style.transform = 'translate3d';
// 			sliderTimer(slider, 0);
// 		}else {
// 			slider.style.left = '-' + vp.offsetWidth*(slideNow+1) + 'px';
// 			sliderTimer(slider, slideNow+1);
// 		}
// 	}else if (offset == -1) {
// 		if (slideNow <= 0) {
// 			slider.style.left = '-' + (vp.offsetWidth*(slItem_count-1)) + 'px';
// 			sliderTimer(slider, slItem_count-1);
// 		}else {
// 			slider.style.left = '-' + (vp.offsetWidth*(slideNow-1)) + 'px';
// 			sliderTimer(slider, slideNow-1);
// 		}
// 	}else{
// 		slider.style.left = '-' + (vp.offsetWidth*(offset-1)) + 'px';
// 		sliderTimer(slider, offset-1);
// 	}
// }

// function sliderTimer(slider, slideNow, delay=100) {
// 	// Event listening 
// 	let 
// 		viewPort 	= slider.parentElement,
// 		w_width	 	= window.screen.width,
// 		isScrol		= false,
// 		x2			= 0;

	

// 	let timer_count = 0;
// 	if (slider == top_sliderLst) {
// 		var 
// 		  nav 			= slider.nextElementSibling,
// 		  activeTimer 	= nav.getElementsByClassName('slNav__item')[slideNow];
		  
// 		// Delet old value
// 		for (j of nav.getElementsByClassName('slNav__item')) {
// 			j.getElementsByClassName('timer_progress')[0].style.width = '0%';
// 		}
// 	}	
// 	window.timerId = setTimeout(function timer() {
// 		if (timer_count <= 100) {
// 			timer_count++;
// 			if (slider == top_sliderLst) {
// 				activeTimer.getElementsByClassName('timer_progress')[0].style.width = timer_count + '%';
// 			}
// 			window.timerId = setTimeout(timer, delay);
// 		}else {
// 			showSlide(slider, 0);			
// 		}
// 	}, delay);
// }

=======
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

		// Events for navigation menu
		for (let el of this.navMenu) {
			el.addEventListener('click', () => this.showSlide(-el.dataset.slideId));
		}
	}


	swipeStart(event) {
		let start_pos = event.clientX;
		let slider_offset = this.currentSlide*100;

		this.timerPause();
		this.carousel.style.transition = "unset";
		
		this.viewport.addEventListener('pointerup', this.swiperPointerUp = () => {
			if (Math.abs(this.offset) > 30) {
				if (this.offset < 0) {
					this.showSlide(this.currentSlide-1);
				}else {
					this.showSlide(this.currentSlide+1);
				}
				this.offset = undefined;
			}else {
				this.carousel.style.transform = `translate3d(${this.currentSlide * 100}vw, 0, 0)`;
			}
			
			this.viewport.removeEventListener('pointermove', this.swiperPointerMove);
			this.viewport.removeEventListener('pointerup', this.swiperPointerUp);
			this.carousel.transition = 'transform 1s ease-in-out';
			this.timerPlay();
		});

		this.viewport.addEventListener('pointermove', this.swiperPointerMove = (e) => {
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
>>>>>>> slt2


// Slider settings
let header_slider_set = {
	slider_id: 		'header_slider',
	viewport: 		'viewport',
	carousel: 		'slide_list',
	navMenu:			'slider_nav',
	next:					'btn__next_slide',
	prev:					'btn__prev_slide'
}

let slider = new Slider(header_slider_set);





































