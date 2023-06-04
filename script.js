document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slidertrack = document.querySelector('.slidetrack');
    const slides = document.querySelectorAll('.slide');
    const dotes = document.querySelectorAll('.dote');
    const slide = document.querySelector('.slide');
    const style = window.getComputedStyle(slide);
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    const wid = slide.offsetWidth + margin;
    let i = 0;
    let pos1;
    let pos2;
    let dif = 0;
    let shift = wid * i;;


    function getPositionX(e) {
        return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
    }

    let timer = setInterval(() => {
        changeSlide();
    }, 5000);


    slidertrack.addEventListener('mousedown', (e) => {
        startSlide(e);
    })

    slidertrack.addEventListener('touchstart', (e) => {
        startSlide(e);
    })

    function startSlide(e) {
        clearInterval(timer);
        pos1 = getPositionX(e);
        console.log(pos1);
        slidertrack.addEventListener('mousemove', move);
        slidertrack.addEventListener('touchmove', move);
        window.addEventListener('mouseup', up);
        slidertrack.addEventListener('touchend', up);
    }


    function move(e) {
        pos2 = getPositionX(e);
        console.log(pos2);
        dif = pos2 - pos1;
        slidertrack.style = `transform: translateX(${-shift + dif}px)`;
        console.log(shift);
    }

    function up() {
        translate();
        setTimer();
        slidertrack.removeEventListener('mousemove', move);
        slidertrack.removeEventListener('touchmove', move);
        window.removeEventListener('mouseup', up);
        slidertrack.removeEventListener('touchend', up);
    }

    function translate() {
        let slideWidth = wid - dif;

        if (dif < -wid / 20) {
            slidertrack.animate([{
                transform: `translateX(${dif-shift}px)`
            }, {
                transform: `translateX(${-dif-slideWidth-shift}px)`
            }], 500);
            i++;
            if (i >= slides.length) {
                i = 0;
                slidertrack.animate([{
                    transform: `translateX(${wid}px)`
                }, {
                    transform: `translateX(${0}px)`
                }], 500);
            };
            shift = wid * i;
            slidertrack.style = `transform: translateX(${-shift}px)`;


        } else if (dif > wid / 20) {
            slidertrack.animate([{
                transform: `translateX(${dif-shift}px)`
            }, {
                transform: `translateX(${dif+slideWidth-shift}px)`
            }], 500);
            i--;
            if (i < 0) {
                i = slides.length - 1;
                slidertrack.animate([{
                    transform: `translateX(${-wid * slides.length}px)`
                }, {
                    transform: `translateX(${-wid * slides.length + wid}px)`
                }], 500);
            }
            shift = wid * i;
            slidertrack.style = `transform: translateX(${-shift}px)`;
            console.log(shift);


        } else if (dif < wid / 20) {
            noswipe();
        } else if (dif > -wid / 20) {
            noswipe();
        }
        activeDote();
    }


    function changeSlide() {
        toright();
        activeDote();
    }


    function activeDote() {
        dotes.forEach((item) => {
            item.classList.remove('active');
            if (item.dataset.id == i) {
                item.classList.add('active');
            }
        })
    }
    slideArrow();

    function slideArrow() {
        slider.addEventListener('click', (e) => {
            const left = e.target.closest('.arrow-left');
            const right = e.target.closest('.arrow-right');

            if (left) {
                clearInterval(timer);
                toleft();
                setTimer();
            }

            if (right) {
                clearInterval(timer);
                toright();
                setTimer();
            }
            activeDote();
        })
    }

    function toleft() {
        shift = wid * i;
        slidertrack.animate([{
            transform: `translateX(${-shift}px)`
        }, {
            transform: `translateX(${-shift + wid}px)`
        }], 500);
        i--;
        if (i < 0) {
            i = slides.length - 1
        };
        shift = wid * i;
        console.log(i);
        slidertrack.style = `transform: translateX(${-shift}px)`;
    }

    function toright() {
        slidertrack.animate([{
            transform: `translateX(${-shift}px)`
        }, {
            transform: `translateX(${-shift - wid}px)`
        }], 500);
        i++;
        if (i > slides.length - 1) {
            i = 0
        };
        shift = wid * i;
        console.log(i);
        slidertrack.style = `transform: translateX(${-shift}px)`;
    }

    function noswipe() {
        slidertrack.animate([{
            transform: `translateX(${dif-shift}px)`
        }, {
            transform: `translateX(${-shift}px)`
        }], 200);
        slidertrack.style = `transform: translateX(${-shift}px)`;
    }

    function setTimer() {
        timer = setInterval(() => {
            changeSlide();
        }, 5000);
    }

    slidertrack.ondragstart = function () {
        return false;
    };

    slidertrack.onselectstart = function () {
        return false;
    };
})