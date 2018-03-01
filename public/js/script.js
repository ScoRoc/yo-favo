console.log('script.js is working');

var updateOrder = function(event, ui){
    console.log("New sort order!");
};

$(function() {
  $('#sortable').sortable({
    update: updateOrder
  });
  $('#sortable').disableSelection();
});

var listElements = $('#sortable').children();

console.log(listElements);

var listValues = [];

listElement.forEach(function(element) {
    listValues.push(element.innerHTML);
});

console.log(listValues);
