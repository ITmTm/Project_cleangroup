"use strict";

let time = 7000; //ms
let step = 5;

function  outNum(num, elem) {
    let l = document.querySelector("#" + elem);
    let n = 0;
    let t = Math.round(time / (num / step));
    let interval = setInterval(() => {
        n = n + step;
        if (n >= num) {
            clearInterval(interval);
        } else {
            l.innerHTML = n;
        }
    }, t);
}

outNum(455, 'out-1');
outNum(320, 'out-2');
outNum(190, 'out-3');

// window.addEventListener('load', () => {
//     const countBox = document.querySelector('.proposal__count');
//     const animationNumbers = document.querySelector('.proposal__number');
//     let show = true;
//     window.addEventListener('scroll', function () {
//         if (!show) return false;
//         let w_top = window.scrollBy,
//             e_top = countBox.offset.top,
//             w_height = window.offsetHeight,
//             d_height = document.offsetHeight,
//             e_height = countBox.outerHeight;
//         if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
//             animationNumbers.style.opacity = '1';
//         }
//         show = false;
//     });
//
// });

// const number = document.querySelectorAll('.proposal__number'),
//     numberTop = number.getBoundingClientRect().top,
//     start = +number.innerHTML, end = +number.dataset.max;
//
// window.addEventListener("scroll", function onScroll () {
//     if (number.length > 0) {
//         if (window.scrollY > numberTop - window.innerHeight / 30) {
//             this.removeEventListener('scroll', onScroll);
//             const interval = setInterval(function () {
//                 number.innerHTML = start;
//                 if (start === end) {
//                     clearInterval(interval);
//                 }
//             }, 5);
//         }
//     }
//
// });












































