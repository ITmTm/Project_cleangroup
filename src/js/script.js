window.addEventListener('DOMContentLoaded', () => {


	let time = 15000; //ms
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
	const deadline = '2023-01-20';

	function getTimeRemaining(runtime) {
		let days, hours, minutes, seconds;
		const t = Date.parse(runtime) - Date.parse(new Date());

		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
				hours = Math.floor((t / (1000 * 60 * 60) % 24)),
				minutes = Math.floor((t / 1000 / 60) % 60),
				seconds = Math.floor((t / 1000) % 60)
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

	function setClock(selector, runtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(runtime);

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

	// Burger

	const openMobileMenuBtn = document.querySelector(".device-menu");
	const headerMenu = document.querySelector(".header-nav");

	openMobileMenuBtn.addEventListener("click", () => {
		if(openMobileMenuBtn.classList.contains("open")) {
			openMobileMenuBtn.classList.remove("open");
			headerMenu.classList.remove("active");
		} else {
			headerMenu.classList.add("active");
			openMobileMenuBtn.classList.add("open");
		}
	})


	// Swiper

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

	// Mask

	let selector = document.querySelector('#phone');
	let im = new Inputmask('+7 (999) 999 - 99 - 99');
	im.mask(selector);


	// Modal

	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.popup');


	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
	}

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal)
	});


	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') === '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});


	// Validation

	document.querySelector('.modal__btn').addEventListener('click', () => {
		let name = document.querySelector('#name');
		if (name.value.trim() === '') {
			setErrorFor(name, 'Введите имя')
		} else  {
			setSuccessFor(name)
		}
		let phone = document.querySelector('#phone')
		if (phone.value.trim() === '') {
			setErrorFor(phone,'Введите номер')
		} else {
			setSuccessFor(phone)
		}

	});

	function setErrorFor(input,phone) {
		input.nextElementSibling.innerHTML = phone;
		input.style.borderColor = '#dee845';
		input.parentElement.querySelector('.fa-exclamation-circle').style.visibility='visible';
		input.parentElement.querySelector('.fa-check-circle').style.visibility='visible'
	}
	function setSuccessFor(input) {
		input.style.borderColor = 'rgba(218,60,60,0.8)';
		input.parentElement.querySelector('.fa-check-circle').style.visibility='visible'
		input.parentElement.querySelector('.fa-exclamation-circle').style.visibility='hidden';
		input.nextElementSibling.innerHTML = "";
	}


	// Scroll and pageup

	window.addEventListener('scroll', () => {
		const scrollElem = document.querySelector('.pageup');
		if (scrollY > 1600) {
			scrollElem.style.display = 'block';
		} else {
			scrollElem.style.display = 'none';
		}
	});

	// Form

	const form = document.querySelector('form');

	const message = {
		loading: 'image/form/spinner.svg',
		success: 'Спасибо, Скоро мы с Вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	bindPostData(form);

	const postData = async (url, data) => {
		let res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: data
		});

		return await res.json();
	};

	function  bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');

			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
			display: block;
			margin: 0px auto;
			padding-top: 5px;
		`;

			form.append(statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));


			axios.post('server.php', json, postData)
			.then(() => {
				showThanksModal(message.success);
				statusMessage.remove();
			}).catch(()=> {
				showThanksModal(message.failure);
			}).finally(() => {
				form.reset();
			});
		})
	}

	function showThanksModal(message) {
		const prevModalWrapper = document.querySelector('.popup__wrapper');


		prevModalWrapper.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('popup__wrapper');
		thanksModal.innerHTML = `
		<div class="popup__content">
			<div data-close class="popup__close"></div>
			<div class="popup__title">${message}</div>
		</div>
	`;

		document.querySelector('.popup').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalWrapper.classList.add('show');
			prevModalWrapper.classList.remove('hide');
			closeModal();
		}, 4000);
	}

	// Cookie

	class CookieConsent {
		constructor({cookiesPopup, btnAccept, btnCancel, activeClass = ''} = {}) {
			this.cookiesPopup = document.querySelector(cookiesPopup);
			this.btnAccept = document.querySelector(btnAccept);
			this.btnCancel = document.querySelector(btnCancel);
			this.activeClass = activeClass;
			this.consentPropertyType = 'site_consent';
		}

		getItem = (key) => {
			const cookies = document.cookie
								.split(';')
								.map(cookie => cookie.split('='))
								.reduce((acc, [key, value]) => ({...acc,
																[key.trim()] : value}), {});

			return cookies[key];
		}

		setItem = (key, value) => {
			document.cookie = `${key}=${value};expires=Sun, 30 Dec 2023 12:00:00 GMT`;
		}

		hasConsented = () => {
			if (this.getItem(this.consentPropertyType) === 'true') {
				return true;
			} else {
				return false;
			}
			// storageType.getItem(consentPropertyType) === 'true' ? true : false;
		}

		changeStatus = (prop) => {
			this.setItem(this.consentPropertyType, prop);
			if (this.hasConsented()) {
				// Подписка метрик
				myScripts();
			} else {

			}
		}

		bindTriggers = () => {
			this.btnAccept.addEventListener('click' , () => {
				this.changeStatus(true);
				this.cookiesPopup.classList.remove(this.activeClass);
			});

			this.btnCancel.addEventListener('click' , () => {
				this.changeStatus(false);
				this.cookiesPopup.classList.remove(this.activeClass);
			});
		}

		init = () => {
			try {
				if (this.hasConsented()) {
					myScripts();
				} else {
					this.cookiesPopup.classList.add(this.activeClass);
				}

				this.bindTriggers();
			} catch (e) {
				console.error('Переданы не все данные');
			}
		}
	}

	new CookieConsent({
		activeClass: 'cookies_active',
		cookiesPopup: '.cookies',
		btnAccept: '[data-accept]',
		btnCancel: '[data-cancel]'
	}).init();

	function myScripts() {
		console.log('Loading....');
	}
});