
  (function ($) {
    $.fn.slide = function (settings) {
        //here settings object holds the values which have been passed as a parameter
        //in the slide function.
        var config = $.extend({   //extends function replace the default values to the passed values.
            delay: null,
            items: null
        }, settings);  

        var slideIndex, arr;
            slideIndex = 1;   // initial slideindex value.
            arr = [];
        getData();    // it is calling on call slide.
        autoSlide();  // this function is used for autoslide.
      
    function getData() {  // fetch image details list and call success and error callback.
        var baseUrl = "https://picsum.photos/list";  // this is the base url for fetch image details list.
        $.getJSON(baseUrl , initSlide, error);  
    }   
        
    function initSlide(data) {              // initSlide() is a callback function calling for initial slide.
        var  i, dispSlide;
        let randomImageIndex;

        for( i = 0; i< config.items; i++ ){                           //to get random array list.
            randomImageIndex = Math.floor(Math.random() * data.length); // to get random index from data length.
            arr.push(data[randomImageIndex]);                           // push random list in an array.
        }
        
        dispSlide = `
                    <div class="mySlides fade">                        
                        <img src="https://picsum.photos/200/300/?image=${arr[slideIndex -1]["id"]}" alt="">
                        <div class="text">${arr[slideIndex -1]["author"]}</div>
                    </div>`
        $(".slidecontent").html(dispSlide); 
    }

    function error(jqXHR, textStatus, errorThrown) {  // this callback is for if ajax is fail.
        console.log("error " + textStatus);
        console.log("incoming Text " + jqXHR.responseText);
    } 

    function showSlides(n) {           // this function is call for next slide.
       var slides , itemSlide, slideArray;        
        slideArray = arr;                // assign random array list.
        slides = slideArray.length;      // assign how many slide we want to show.
    
        if ( n > slides ) { slideIndex = 1 }    
        if ( n < 1 ) { slideIndex = slides }

        itemSlide = `
                    <div class="mySlides fade">                        
                        <img src="https://picsum.photos/200/300/?image=${slideArray[slideIndex -1]["id"]}" alt="">
                        <div class="text">${slideArray[slideIndex -1]["author"]}</div>
                    </div>`
        $(".slidecontent").html(itemSlide);        
    }

    function plusSlides(n) {   // plusSlides() is call for pass initial value.
        showSlides(slideIndex += n);
    }

    function autoSlide(){
        setInterval(plusSlides, config.delay, 1); // call plusSlides on specific interval
    }  

    return {                            // return collection of methods for use outside.
        showSlides: showSlides,  
        plusSlides: plusSlides
    }    
} // end slide function
} (jQuery));
