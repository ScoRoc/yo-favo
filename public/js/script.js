
$('.button-collapse').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true, // Choose whether you can drag to open on touch screens,
    onOpen: function(el) { }, // A function to be called when sideNav is opened
    onClose: function(el) { }, // A function to be called when sideNav is closed
  }
);

$(".dropdown-button").dropdown();

var updateOrder = function(event, ui) {
    var stringArray = $('#sortable').sortable('toArray');
    var numberArray = stringArray.map(function(str) {
      return parseInt(str);
    });
    console.log(numberArray);
    numberArray.forEach(function(number) {
      $.ajax({
        method: 'put',
        url: '/favos/order',
        data: {
          favoId: number,
          order: numberArray.indexOf(number)
        }
      });
    });
};

$('.delete-link').on('click', function(e) {
  e.preventDefault();
  var parent = $(this).parent();
  var deleteUrl = $(this).attr('href');
  var favoType = $(this).attr('data-type');
  $.ajax({
    method: 'delete',
    url: deleteUrl
  }).done(function(data) {
    console.log($(this));
    parent.remove();
  });
});

$(function() {
  $('#sortable').sortable({
    update: updateOrder
  });
  $('#sortable').disableSelection();
});
