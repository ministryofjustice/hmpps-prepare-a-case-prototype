/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()

  $(window).click(function () {
    toggleFilter()
  })

  var checkboxes = document.getElementsByClassName('govuk-checkboxes__input')
  for (var i = 0, len = checkboxes.length; i < len; i++) {
    checkboxes[i].addEventListener('click', checkboxClick)
  }

  var labelElems = document.getElementsByTagName('LABEL')
  for (var j = 0, len2 = labelElems.length; j < len2; j++) {
    labelElems[j].addEventListener('click', function (e) { e.stopPropagation()})
  }

  var filterSections = document.getElementsByClassName('app-filter-selection')
  for (var k = 0, len3 = labelElems.length; k < len3; k++) {
    filterSections[k].addEventListener('click', function (e) { e.stopPropagation()})
  }
})

function checkboxClick (e) {
  e.stopPropagation()
  var button = document.getElementById('button-' + e.target.name.substring(e.target.name.indexOf('-') + 1))
  var anySelected = false
  var checkboxesInGroup = document.querySelectorAll('[id^="' + e.target.name + '"]')
  for (var i = 0, len = checkboxesInGroup.length; i < len; i++) {
    anySelected = anySelected || checkboxesInGroup[i].checked
  }
  anySelected ? button.classList.add('app-filter-button--selected') : button.classList.remove('app-filter-button--selected')
}

function clearFilter ($id) {
  var checkbox = document.getElementById($id)
  checkbox.click()
}

function applyFilters ($reset) {
  var label
  var anySelected = false
  var container = document.querySelector('.app-filters-applied')
  container.innerHTML = ''

  var allCheckboxes = document.querySelectorAll('.govuk-checkboxes__input')
  for (var i = 0, len = allCheckboxes.length; i < len; i++) {
    if ($reset && allCheckboxes[i].checked) {
      clearFilter(allCheckboxes[i].id)
    }
    anySelected = anySelected || allCheckboxes[i].checked
    if (allCheckboxes[i].checked) {
      label = document.querySelector('label[for="' + allCheckboxes[i].id + '"]')
      container.innerHTML = container.innerHTML + '<div class="moj-filter__tag app-filter__tag" onclick="clearFilter(\'' + allCheckboxes[i].id + '\'); applyFilters()">' + label.innerText + '</div>'
    }
  }
  var selectedFilters = document.querySelector('.selected-filters')
  anySelected ? selectedFilters.classList.remove('govuk-visually-hidden') : selectedFilters.classList.add('govuk-visually-hidden')
}

// Filters functionality
function toggleFilter ($el) {
  var current
  if ($el) {
    current = !$el.active && $el.dataset['controls']
  }

  var filterButtons = document.getElementsByClassName('app-filter-button')
  var filterSections = document.getElementsByClassName('app-filter-selection')
  for (var i = 0, len = filterButtons.length; i < len; i++) {
    current === filterButtons[i].dataset['controls'] ? filterButtons[i].classList.add('app-filter-button--open') : filterButtons[i].classList.remove('app-filter-button--open')
    if (!$el || !$el.active) {
      filterButtons[i].active = false
    }
  }
  for (var i2 = 0, len2 = filterSections.length; i2 < len2; i2++) {
    current === filterSections[i2].id ? filterSections[i2].classList.remove('govuk-visually-hidden') : filterSections[i2].classList.add('govuk-visually-hidden')
  }
  if ($el) {
    $el.active = !$el.active
  }
}

new MOJFrontend.SearchToggle({
  toggleButton: {
    container: $('.moj-search-toggle__toggle'),
    text: 'Find case'
  },
  search: {
    container: $('.moj-search')
  }
})

new MOJFrontend.FilterToggleButton({
  bigModeMediaQuery: '(min-width: 48.063em)',
  startHidden: true,
  toggleButton: {
    container: $('.moj-action-bar__filter'),
    showText: 'Show filter',
    hideText: 'Hide filter',
    classes: 'govuk-button--secondary'
  },
  closeButton: {
    container: $('.moj-filter__header-action'),
    text: 'Close'
  },
  filter: {
    container: $('.moj-filter')
  }
})

new MOJFrontend.AddAnother($('.moj-add-another'))

// new MOJFrontend.SortableTable({
// table: $('table')[0]
// });

var days = ['Sunday', 'Monday', 'Teusday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var n = new Date()
var y = n.getFullYear()
var m = n.getMonth()
var d = n.getDate()
var x = n.getDay()
if (document.getElementById('date')) {
  document.getElementById('date').innerHTML = days[x] + ',' + ' ' + ' ' + d + ' ' + months[m] + ' ' + y
}

// Toggle menu button
new MOJFrontend.ButtonMenu({
    container: $('.moj-button-menu'),
    mq: '(min-width: 200em)',
    buttonText: 'Add new',
    buttonClasses: 'govuk-button--secondary moj-button-menu__toggle-button--secondary moj-button-menu__wrapper--right'
  });


  // Comment history show more show less
  $(document).ready(function() {
    var showChar = 175;
    var ellipsestext = "...";
    var moretext = "Show more";
    var lesstext = "Show less";
    $('.more').each(function() {
      var content = $(this).html();
  
      if(content.length > showChar) {
  
        var c = content.substr(0, showChar);
        var h = content.substr(showChar, content.length - showChar);
  
        var html = c + '<span class="moreellipses">'+ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
  
        $(this).html(html);
      }
  
    });
  
    $(".morelink").click(function(){
      if($(this).hasClass("less")) {
        $(this).removeClass("less");
        $(this).html(moretext);
      } else {
        $(this).addClass("less");
        $(this).html(lesstext);
      }
      $(this).parent().prev().toggle();
      $(this).prev().toggle();
      return false;
    });
  });
