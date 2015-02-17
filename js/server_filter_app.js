$(document).ready(function(){
  loadFilters();
})

function loadFilters() {
  $('.ajax-loading').show();
  
  $.ajax({
    url: 'http://ziggeo-app.herokuapp.com/items/item_names', 
    type: "GET",
    dataType: "json",
    success: function(data){
      populateCheckBoxFilter();
      populateCheckBoxFilter(data);
      $('.ajax-loading').hide();
    },
    error: function(){
      $('.ajax-loading').hide();
      alert("Load to failed.");
    } 
  })
 
}

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
      console.log(data)
      populate_data(data);
      $('.ajax-loading').hide();
    },
    error: function(){
      $('.ajax-loading').hide();
      alert("Load to failed.");
    } 
  })
 
}

function populate_data(items){
  var html = "";
  $.each(items, function( i, v ) {
    html += "<h1>" + v.name + "</h1>";
    html += "<div><img src='" + v.image +"' /></div>";
    html += "<p>" + v.description + "</p>"
  });
  $('#items-holder').html(html);
}

function filterByText(){
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
}
