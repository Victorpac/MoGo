

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
let 
  top_slider 					= document.querySelectorAll('[class^="slider_item"]'),
  quote_slider				= document.getElementsByClassName('quote')[0].getElementsByClassName('quote_item'),
  slider_nav 					= document.querySelectorAll('[class^="slider_progress"]'),
  delay 							= 7;					// lead time (time / 1000)


function sliderTimer(slides=top_slider) {
	let timer_count = 0;

	// timer progress
	window.timerId = setTimeout(function timer() {	
		timer_count++;
		if (timer_count <= 1000) {
			if (slides == top_slider) {
				document.querySelector('[class^="slider_progress_item"].active .timer_progress').style.width = timer_count/10 + '%';
			}
			window.timerId = setTimeout(timer, delay);
		}else {
			for (let i = 0; i < slides.length; i++) {
				if ( slides[i].classList.contains('next') ) {
					var slNewActive_id = i;
					break;
				}
			}
			showSlide(slNewActive_id, slides);
		}
	}, delay);

	// remove old value
	if ( timer_count == 0 ) {
		slider_nav.forEach(function(item, i, arr) {
			slider_nav[i].getElementsByClassName('timer_progress')[0].style.width = '0%';
		});
	}
}


function showSlide(slide_id, slides=top_slider, dire=0) {
	if (dire == 0) {
		clearTimeout(window.timerId);
		let 
		  slide_active 			= slides[slide_id],
		  slide_back 				= (slide_id-1 < 0) ? slides[slides.length-1] : slides[slide_id-1],
		  slide_next 				= slide_id+1 >= slides.length ? slides[0] : slides[slide_id+1];

		// remove old classes
	  for (let i = 0; i < slides.length; i++) {
			slides[i].classList.remove('back', 'active', 'next');
			slider_nav[i].classList.remove('active');
		}

		// add new classes
		slider_nav[slide_id].classList.add('active');
	  slide_active.classList.add('active');
		slide_back.classList.add('back');
		slide_next.classList.add('next');

		sliderTimer(slides);
	}else { 
		if (dire == -1) {
			for (var i = 0; i < slides.length; i++) {
				if (slides[i].classList.contains('back')) {
					var newSlideId = i;
					break;
				}
			}
			showSlide(newSlideId, slides);
		}else if (dire == 1) {
			for (var i = 0; i < slides.length; i++) {
				if (slides[i].classList.contains('next')) {
					var newSlideId = i;
					break;
				}
			}
			showSlide(newSlideId, slides);
		}
	}
}

sliderTimer();








