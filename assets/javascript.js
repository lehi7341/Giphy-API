// Loads the initial buttons in the array when page loads
$(function(){
  populateButtons(searchArray,'searchButton','#buttonsArea');
})

// Initial array of topics
var searchArray = ['Car Accidents', 'Truck Accidents', 'Motorcycle Accidents', 'Train Accidents'];

// displayTopicInfo function re-renders the HTML to display the appropriate content
function populateButtons(searchArray,classToAdd,areaToAddTo) {
$(areaToAddTo).empty();

// Looping through the array of topics
  for (var i = 0; i < searchArray.length; i++) {

      // Then dynamicaly generating buttons for each topic in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $('<button>');
      // Adding a class of searchButton to our button
      a.addClass(classToAdd);
      // Adding a data-attribute
      a.attr('data-type',searchArray[i]);
      // Providing the initial button text
      a.text(searchArray[i]);
      // Adding the button to the buttonsArea div
      $(areaToAddTo).append(a);
  }
}


// Adding a click event listener to all elements with a class of "searchButton"
$(document).on('click','.searchButton',function(){
  $('#searches').empty();
    var type = $(this).data('type');
  


      var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=ip9p2Dwr1NrWKv5T5xBuSxp4c24ONPNK&limit=14';

        // Creating an AJAX call for the specific search button being clicked
        $.ajax({url:queryURL,method:'GET'}).done(function(response) {
            for(var i = 0; i < response.data.length; i++) {
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $('<p>').text('Rating: '+rating);
                var animated = response.data[i].images.fixed_height_small.url;
                var still = response.data[i].images.fixed_height_small_still.url;
                var image = $('<img>');
                image.attr('src',still);
                image.attr('data-still',still);
                image.attr('data-animated',animated);
                image.attr('data-state','still');
                image.addClass('searchImage');
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').append(searchDiv);
            }
        })
})

// Changes the state of the GIF from still to animated when it is clicked
$(document).on('click','.searchImage',function(){
  var state = $(this).attr('data-state');
  if(state == 'still'){
    $(this).attr('src',$(this).data('animated'));
    $(this).attr('data-state','animated');
  } else {
    $(this).attr('src',$(this).data('still'));
    $(this).attr('data-state','still');
  }
})

// Adds a new search button to the array to be searched and clears out the previous search
$('#addSearch').on('click',function(){  
var newSearch = $('input').eq(0).val();
searchArray.push(newSearch);
populateButtons(searchArray,'searchButton','#buttonsArea');
return false;
})