
  (function ($) {
    $.fn.slide = function (settings) {

        var config = $.extend({
            delay: null
        }, settings);

        var slideIndex = 1;
        getData();    
      
    function getData(){

        var baseUrl = "https://picsum.photos/list";
        $.getJSON(baseUrl , initSlide);

    }  // fetch image details list call success callback   
        
    function initSlide(data) {
        var arr = [], i;
        let randomImageIndex;
        var dispSlide;

        for(var i = 0; i< 10; i++ ){                           //to get random array list

            randomImageIndex = Math.floor(Math.random() * data.length);
            arr.push(data[randomImageIndex]);
        }

        if ( Modernizr.localstorage || typeof(Storage) !== "undefined" ) {

           localStorage.setItem("images", JSON.stringify(arr));    //store random array list in a webstorage. 
        } else {
           console.log("Sorry! No Web Storage support.."); 
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

        var slideArray = JSON.parse(localStorage.getItem("images") || "[]"); // get 10 random array list from webstorage  
        var slides , itemSlide;
        slides = slideArray.length;
    
        if ( n > slides ) { slideIndex = 1 }    
        if ( n < 1 ) { slideIndex = slides }

        $(".mySlides").remove();  // remove existing div from dom

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

    setInterval(plusSlides, 3000, 1);   // call plusSlides on specific interval

    return {                            // return function collection for use outside
        showSlides: showSlides,  
        plusSlides: plusSlides
    }    
} // end slide function
} (jQuery));
