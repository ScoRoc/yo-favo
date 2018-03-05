
// makes the nav bar do the mobile thing
$('.button-collapse').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true, // Choose whether you can drag to open on touch screens,
    onOpen: function(el) { }, // A function to be called when sideNav is opened
    onClose: function(el) { }, // A function to be called when sideNav is closed
  }
);

// makes the nav bar do the dropdown thing
$('.dropdown-button').dropdown();

// makes my own mobile nav bar do the dropdown thing
var mobileNavDisplay = function() {
  var msd = $('#mobile-search-drop');
  var darkenBody = $('.darken-body');
  msd.css('display', 'block');
  darkenBody.css('display', 'block');
  darkenBody.removeClass('light-body-animate');
  darkenBody.addClass('dark-body-animate');
  msd.removeClass('mobile-search-away');
  msd.addClass('mobile-search-display');
};

// closes my mobile nav search on touch outside of search
var mobileNavAway = function() {
  var msd = $('#mobile-search-drop');
  var darkenBody = $('.darken-body');
  darkenBody.removeClass('dark-body-animate');
  darkenBody.addClass('light-body-animate');
  msd.removeClass('mobile-search-display');
  msd.addClass('mobile-search-away');
  setTimeout(function() {
    darkenBody.css('display', 'none');
    msd.css('display', 'none');
  }, 500);
};

// calls the mobile nav displays/aways with click and touch
$('#mobile-search-trigger').on('click', mobileNavDisplay);
$('.darken-body').on('click', mobileNavAway);
$('#mobile-search-trigger').on('touchend', mobileNavDisplay);
$('.darken-body').on('touchend', mobileNavAway);

// updates a user's favo order
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

// updates user info
$('#update-user-form').on('submit', function(e) {
  e.preventDefault();
  $.ajax({
    url: $(this).attr('action'),
    method: 'put',
    data: {
      first_name: $('#authFirstName').val(),
      last_name: $('#authLastName').val(),
      email: $('#authEmail').val(),
      success: function() {
        window.location.href = '/users/' + userId + '/profile';
      }
    }
  });
});

// deletes a favo from user's top lists
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

// makes the favos sortable(draggable)
$(function() {
  $('#sortable').sortable({
    update: updateOrder
  });
  $('#sortable').disableSelection();
});
