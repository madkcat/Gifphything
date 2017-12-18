const gifkey = "JFlbvY7o0WgDcLH8D9vc7jlFL5hMW2Dl";
$(document).ready(function() {
  $('button').on('click', function() {
    var disGif = $(this).data('name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + disGif + "&api_key=" + gifkey + "&limit=4";
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response)
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var disGifDiv = $('<div/>');
        var p = $('<p/>');
        p.text(results[i].rating);
        var disGifImage = $('<img/>');
        disGifImage.addClass('anImg')
        disGifImage.attr('src', results[i].images.fixed_height_still.url);
        disGifImage.attr('data-still', results[i].images.fixed_height_still.url)
        disGifImage.attr('data-animate', results[i].images.fixed_height.url).attr('data-state', 'still');
        // .attr('style','float:left');
        disGifDiv.prepend(p);
        disGifDiv.append(disGifImage);
        disGifDiv.prependTo($('#gifs'));
      }
      $('.anImg').on('click', function() {
        var state = $(this).attr('data-state');
        console.log(this);
        if (state == 'still') {
          $(this).attr('src', $(this).data('animate'));
          $(this).attr('data-state', 'animate');
        } else {
          $(this).attr('src', $(this).data('still'));
          $(this).attr('data-state', 'still');
        }
      });
    });
  });
  var disGifs = [''];
  $('#theButton').on('click', function() {
    var disGifButton = $("#gif-input").val();
    var dName = "Disney " + disGifButton;
    var newDisGif = $("<button/>").addClass("btn btn-info disney").attr('data-name', dName).html(disGifButton).css({
      'margin': '5px'
    });
    $("#disneybuttons").append(newDisGif);
    console.log(newDisGif)
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dName + "&api_key=" + gifkey + "&limit=4";
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var disGifDiv = $('<div/>');
        var p = $('<p/>');
        p.text(results[i].rating);
        var disGifImage = $('<img/>');
        disGifImage.addClass('anImg')
        disGifImage.attr('src', results[i].images.fixed_height_still.url);
        disGifImage.attr('data-still', results[i].images.fixed_height_still.url)
        disGifImage.attr('data-animate', results[i].images.fixed_height.url).attr('data-state', 'still');
        disGifDiv.append(p);
        disGifDiv.append(disGifImage);
        disGifDiv.prependTo($('#gifs'));
      }
      $('.anImg').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
          $(this).attr('src', $(this).data('animate'));
          $(this).attr('data-state', 'animate');
        } else {
          $(this).attr('src', $(this).data('still'));
          $(this).attr('data-state', 'still');
        }
      });
    });
    $("#gif-input").val("");
    return false;
  })
});