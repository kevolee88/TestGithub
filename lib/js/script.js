jQuery(document).ready(function($){

	var nav = $('nav.nav-cont');
    var list = $('section.one .left .nav-cont ul li');

    nav.hide();

    $('section.one .menu').click(function(){
    	nav.toggle('slide',{
    		direction: 'right',
    		easing: 'easeOutBounce'
    	}, 1000);
    	$('section.one .menu').toggleClass('white',500);
	});

	var imageOne = "url('lib/images/image-1.jpg')";
	var imageTwo = "url('lib/images/image-2.jpg')";

	var imageSlides = [imageOne, imageTwo];
	var imageLength = imageSlides.length;
	var imageCurrent = 0;

	function doSlider() {
		if(imageCurrent >= imageLength) {
	 		imageCurrent = 0;
	 	}
	 	var slide = imageSlides[imageCurrent];
	 	imageCurrent++;
	 	return slide;
	 	
	};

	 function setImage() {
	 	var sliderOne = doSlider();
	 	var sliderTwo = sliderOne;
	 	document.getElementById('slider').style.backgroundImage = sliderOne;
	 	document.getElementById('slider-2').style.backgroundImage = sliderTwo;
	 };
	 setImage();
	 setInterval(function() {
      // Do something every 5 seconds
	 }, 5000);
	var myArray = [ "chocolate", "vanilla", "strawberry", "caramel" ];
	var arrayLength = myArray.length;

	for (var i = 0; i < arrayLength; i++) {
		console.log ("I like" + " " + myArray[i] + " "+ "cake"); 
	};

	function showArray() {
		console.log(i);
	};

	showArray();
});