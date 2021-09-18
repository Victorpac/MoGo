

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
	top_sliderLst				= document.getElementById('top_slider'),
	top_sliNav 					= document.getElementById('top_slider_nav'),
	windowWidth 				= window.screen.width;


function showSlide(slider, offset=0) {
	clearTimeout(window.timerId);
	let 
		vp 					= slider.parentElement,
		slItem_count 		= slider.childElementCount,
		slideNow 			= Math.abs(Math.floor((-slider.offsetLeft / (slider.offsetWidth/slItem_count))));

	if (offset == 0) {
		if (slideNow >= slItem_count-1) {
			slider.style.left = '0px';
			sliderTimer(slider, 0);
		}else {
			slider.style.left = '-' + vp.offsetWidth*(slideNow+1) + 'px';
			sliderTimer(slider, slideNow+1);
		}
	}else if (offset == -1) {
		if (slideNow <= 0) {
			slider.style.left = '-' + (vp.offsetWidth*(slItem_count-1)) + 'px';
			sliderTimer(slider, slItem_count-1);
		}else {
			slider.style.left = '-' + (vp.offsetWidth*(slideNow-1)) + 'px';
			sliderTimer(slider, slideNow-1);
		}
	}else{
		slider.style.left = '-' + (vp.offsetWidth*(offset-1)) + 'px';
		sliderTimer(slider, offset-1);
	}
}

function sliderTimer(slider, slideNow, delay=100) {
	let timer_count = 0;
	if (slider == top_sliderLst) {
		var nav 			= slider.nextElementSibling,
			activeTimer 	= nav.getElementsByClassName('slNav__item')[slideNow];
		// Delet old value
		for (j of nav.getElementsByClassName('slNav__item')) {
			j.getElementsByClassName('timer_progress')[0].style.width = '0%';
		}
	}	
	window.timerId = setTimeout(function timer() {
		if (timer_count <= 100) {
			timer_count++;
			if (slider == top_sliderLst) {
				activeTimer.getElementsByClassName('timer_progress')[0].style.width = timer_count + '%';
			}
			window.timerId = setTimeout(timer, delay);
		}else {
			showSlide(slider, 0);			
		}
	}, delay);
}










