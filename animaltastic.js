var animals = ["duck", "fish", "puppy"];

$('#addAnimal').on('click', function(){
	var thisAnimal = $('#animal-input').val();
	if (thisAnimal.length > 2){
		animals.push(thisAnimal);
	}
	$('#animal-input').val('');
	createButtons();
	return false;
});

function createButtons(){
	$('#animalButtons').empty();
		for (var i = 0; i < animals.length; i++){
			var button = $('<button>', {
				class: 'animalButton btn btn-info',
				attr : {'data-animal-type' : animals[i]},
				text : animals[i]
			})
			$('#animalButtons').append(button);
    }
};

$(document).on('click', '.animalButton', function(){
    $('#animalsPics').empty();
    $('.animalButton').removeClass('active');
    $(this).addClass('active');

    var type = $(this).data('animal-type');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
				var results = response.data;
				for(var i=0; i < results.length; i++){
					var animatedUrl = results[i].images.fixed_height.url;
					var stillUrl = results[i].images.fixed_height_still.url;
					var rating = results[i].rating;
					var animalDiv = $('<div class="pics">')
					var p = $('<p>').text( "Rating: " + rating);
					var animalImg = $('<img>');
					animalImg.attr('src', stillUrl);
					animalImg.attr('data-still', stillUrl);
					animalImg.attr('data-animate', animatedUrl);
					animalImg.attr('data-state', 'still')
					animalImg.addClass('animalImg img-thumbnail');
					animalDiv.append(p);
					animalDiv.append(animalImg);
					$('#animalsPics').append(animalDiv);
				}
    }); 
});
$(document).on('click', '.animalImg', function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

createButtons();