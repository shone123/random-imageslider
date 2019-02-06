
  (function ($) {
    $.fn.slide = function (settings) {

        var config = $.extend({
            delay: null,
            items: null
        }, settings);

        var slideIndex, arr;
            slideIndex = 1;
            arr = [];
        getData();    
      
    function getData(){

        var baseUrl = "https://picsum.photos/list";
        $.getJSON(baseUrl , initSlide, error);

    }  // fetch image details list call success callback   
        
    function initSlide(data) {
        var  i, dispSlide;
        let randomImageIndex;

        for(var i = 0; i< config.items; i++ ){                           //to get random array list

            randomImageIndex = Math.floor(Math.random() * data.length);
            arr.push(data[randomImageIndex]);
        }
        
        dispSlide = `
                    <div class="mySlides fade">                        
                        <img src="https://picsum.photos/200/300/?image=${arr[slideIndex -1]["id"]}" alt="">
                        <div class="text">${arr[slideIndex -1]["author"]}</div>
                    </div>`
        $(".slidecontent").html(dispSlide);
    }

    function error(jqXHR, textStatus, errorThrown) {

        console.log("error " + textStatus);
        console.log("incoming Text " + jqXHR.responseText);
    } 

    function showSlides(n){ 

       var slides , itemSlide, slideArray;        
        slideArray = arr;
        slides = slideArray.length;
    
        if ( n > slides ) { slideIndex = 1 }    
        if ( n < 1 ) { slideIndex = slides }

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

    setInterval(plusSlides, config.delay, 1);   // call plusSlides on specific interval

    return {                            // return function collection for use outside
        showSlides: showSlides,  
        plusSlides: plusSlides
    }    
} // end slide function
} (jQuery));
