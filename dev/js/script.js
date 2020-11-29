var isTouch 
document.addEventListener("DOMContentLoaded", () => {
	//console.log(Modernizr.touchevents)

    isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;
    if (isTouch) {
    	document.body.classList.add("body--touch");
    }

    if (Modernizr.mq('screen and (max-width:500px)') ) {
    	document.body.classList.add("body--mobile");
    }
});

window.addEventListener('resize', function(event){
  	isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;
  	if (isTouch) {
    	document.body.classList.add("body--touch");
    } else {
    	if (document.body.classList.contains('body--touch')) {
    		document.body.classList.remove("body--touch");
    	}
    }

    if (Modernizr.mq('screen and (max-width:500px)') ) {
    	document.body.classList.add("body--mobile");
    } else {
    	if (document.body.classList.contains('body--mobile')) {
    		document.body.classList.remove("body--mobile");
    	}
    }
});