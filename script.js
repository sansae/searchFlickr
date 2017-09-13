var userInput, api;
var page = 1;

$("input").keyup(function() {
  $("#results").empty();
  page = 1;//must reset page num everytime #results empty
  userInput = $("input").val();
  api = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e1dc435f246930fe0e8bef843fa19ad3&format=json&tags=" + userInput + "&page=" + page;

  $.ajax({
    url: api,
    dataType: "jsonp",
    jsonp: "jsoncallback",
    success:
    function processJson(json){
      for (var i = 0; i < json.photos.photo.length; i++){
        var jsonObj = json.photos.photo[i];
        var imgUrl = "https://farm" + json.photos.photo[i].farm + ".staticflickr.com/" + json.photos.photo[i].server + "/" + json.photos.photo[i].id + "_" + json.photos.photo[i].secret + ".jpg";
        $("#results").append("<a href=" + imgUrl + " target=_blank>" + "<img src = " + imgUrl + " width = 200px height = 200px style = \"margin: 20px 20px\"/></a>");
      }//end for
    },//end processJson
    error:
    function(XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus); alert("Error: " + errorThrown);
    }
  });//end .ajax
});

//implement custom infinite scroll fn
$(window).on("scroll", function(){
  var docHeight = $(document).height();
  var viewportHeight = $(window).height();
  var scrollTop = $(window).scrollTop();
  var difference = docHeight - viewportHeight;
  if (difference <= scrollTop) {
    page++;
    api = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e1dc435f246930fe0e8bef843fa19ad3&format=json&tags=" + userInput + "&page=" + page;
    $.ajax({
      url: api,
      dataType: "jsonp",
      jsonp: "jsoncallback",
      success:
      function processJson(json){
        for (var i = 0; i < json.photos.photo.length; i++){
          var jsonObj = json.photos.photo[i];
          var imgUrl = "https://farm" + json.photos.photo[i].farm + ".staticflickr.com/" + json.photos.photo[i].server + "/" + json.photos.photo[i].id + "_" + json.photos.photo[i].secret + ".jpg";
          $("#results").append("<a href=" + imgUrl + " target=_blank>" + "<img src = " + imgUrl + " width = 200px height = 200px style = \"margin: 20px 20px\"/></a>");
        }
      }
    });
  }
});//end .scroll

/*note about .scroll; we need to use scroll event handler so that the docHeight, viewportHeight, and scrollTop can be evaluated every time user scrolls*/
