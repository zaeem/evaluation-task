var timeout;
$(document).ready(function(){
  loadFilters();
})

//-------------- load check Box filters -----------------//
function loadFilters() {
  $('.ajax-loading').show();
  
  $.ajax({
    url: 'http://ziggeo-app.herokuapp.com/items/item_names', 
    type: "GET",
    dataType: "json",
    success: function(data){
      populateCheckBoxFilter(data);
      $('.ajax-loading').hide();
    },
    error: function(){
      $('.ajax-loading').hide();
      alert("Load to failed.");
    } 
  })
 
}

//-------------- papulates check Box filters -----------------//
function populateCheckBoxFilter(filters_names){
  var html = ""
  if (filters_names){
    $.each(filters_names, function( i, v ) {
      html += "<div class='checkbox'>";
        html += "<label>";
          html += "<input type='checkbox' id='" + v.id +"' onchange='filterNameByCheckBoxes()'>" + v.name;
        html += "</label>";
      html += "</div>";
    });
    $('#checkbox-filter-holder').html(html);
    
  }
}

//-------------- filter items on check Boxes -----------------//
function filterNameByCheckBoxes() {
  $('.ajax-loading').show();
  var ids_arr = [];
  $( ":checkbox:checked" ).each(function(){
    ids_arr.push($(this).attr('id')); 
  });

  $.ajax({
    url: 'http://ziggeo-app.herokuapp.com/items/filtered_items', 
    type: "GET",
    dataType: "json",
    data: {ids: ids_arr},
    success: function(data){
      populate_data(data);
      $('.ajax-loading').hide();
    },
    error: function(){
      $('.ajax-loading').hide();
      alert("Load to failed.");
    } 
  })
 
}

//-------------- filter items on serach text -----------------//
function filterByText(){
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    $('.ajax-loading').show();
    $.ajax({
      url: 'http://ziggeo-app.herokuapp.com/items/filtered_items', 
      type: "GET",
      dataType: "json",
      data: {search_name: $('#fiter-field').val()},
      success: function(data){
        console.log(data)
        populate_data(data);
        $('.ajax-loading').hide();
      },
      error: function(){
        $('.ajax-loading').hide();
        alert("Load to failed.");
      } 
    });
  }, 500);//Called after half second when user stops typing.
    
}

//-------------- populate items -----------------//
function populate_data(items){
  var html = "";
  $.each(items, function( i, v ) {
    html += "<h1>" + v.name + "</h1>";
    html += "<div><img src='" + v.image +"' /></div>";
    html += "<p>" + v.description + "</p>"
  });
  $('#items-holder').html(html);
}
