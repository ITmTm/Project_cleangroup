"use strict";

let time = 10000; //ms
let step = 5;

function  outNum(num, elem) {
    let numberBox = document.querySelector("#" + elem);
    let n = 0;
    let t = Math.round(time / (num / step));
    let interval = setInterval(() => {
        n = n + step;
        if (n >= num) {
            clearInterval(interval);
        } else {
            numberBox.innerHTML = n;
        }
    }, t);
}

outNum(455, 'out-1');
outNum(320, 'out-2');
outNum(190, 'out-3');



        //  Timer
const deadline = '2023-01-30';

function getTimeRemaining(endtime) {
	let days, hours, minutes, seconds;
	const t = Date.parse(endtime) - Date.parse(new Date());

	if (t <= 0) {
		days = 0;
		hours = 0;
		minutes = 0;
		seconds = 0;
	} else {
		days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);
	}

	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

function getZero(num) {
	if (num >= 0 && num < 10) {
		return `0${num}`;
	} else {
		return num;
	}
}

function setClock(selector, endtime) {
	const timer = document.querySelector(selector),
		days = timer.querySelector('#days'),
		hours = timer.querySelector('#hours'),
		minutes = timer.querySelector('#minutes'),
		seconds = timer.querySelector('#seconds'),
		timeInterval = setInterval(updateClock, 1000);

	updateClock();

	function updateClock() {
		const t = getTimeRemaining(endtime);

		days.innerHTML = getZero(t.days);
		hours.innerHTML = getZero(t.hours);
		minutes.innerHTML = getZero(t.minutes);
		seconds.innerHTML = getZero(t.seconds);

		if (t.total <= 0) {
			clearInterval(timeInterval);
		}
	}
}

setClock('.timer', deadline);


const swiper = new Swiper('.swiper-container', {
	grabCursor: true,
	centeredSlides: true,
	freeMode: true,
	slidesPerView: 'auto',
	effect: 'coverflow',
	coverflowEffect: {
		rotate: 50,
		stretch: 0,
		depth: 100,
		modifier: 1,
		slideShadows : true
	},
	pagination: {
		el: '.swiper-pagination',
		dynamicBullets: true
	}
});













































