
  (function ($) {

    $.fn.slide = function (settings) {

        var config = $.extend({

            delay: null, //3000

            fadeSpeed: null //1000

        }, settings);
        var slideIndex = 1;
        const numImagesAvailable = 242; 

        //const $slideshowContainer = document.querySelector('#slideshow-container');
        let slideItem = document.createElement('div');

        $.getJSON("https://picsum.photos/list", fetchData);

    function fetchData(data) {

        var arr = [], i;
        let randomImageIndex;
        var dispSlide;

        for(var i = 0; i< 10; i++ ){                           //to get random array list

            randomImageIndex = Math.floor(Math.random() * numImagesAvailable);
            arr.push(data[randomImageIndex]);
        }

        localStorage.setItem("images", JSON.stringify(arr));
        
        dispSlide = `
                    <div class="mySlides fade">                        
                        <img src="https://picsum.photos/200/300/?image=${arr[slideIndex -1]["id"]}" alt="">
                        <div class="text">${arr[slideIndex -1]["author"]}</div>
                    </div>`
        $(".slidecontent").html(dispSlide);  
    }

    function showSlides(n){ 

        var slideArray = JSON.parse(localStorage.getItem("images") || "[]");   
        var  i, slides;
        var itemSlide;
        slides = slideArray.length;
    
        if (n > slides) {slideIndex = 1}    
        if (n < 1) {slideIndex = slides}

        /*$(".mySlides").hide(); *///hide current image
        $(".mySlides").remove();

        itemSlide = `
                    <div class="mySlides fade">                        
                        <img src="https://picsum.photos/200/300/?image=${slideArray[slideIndex -1]["id"]}" alt="">
                        <div class="text">${slideArray[slideIndex -1]["author"]}</div>
                    </div>`
        $(".slidecontent").html(itemSlide);        
    }
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    setInterval(plusSlides, 3000, 1);
    
} // end slide function
} (jQuery));
