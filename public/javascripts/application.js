/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

// Filters functionality
function resetFilterUI () {
  var filterButtons = document.getElementsByClassName('app-filter-button')
  var filterSections = document.getElementsByClassName('app-filter-selection')
  for (var i = 0, len = filterButtons.length; i < len; i++) {
    filterButtons[i].classList.remove('app-filter-button--open')
  }
  for (var i2 = 0, len2 = filterSections.length; i2 < len2; i2++) {
    filterSections[i2].classList.add('govuk-visually-hidden')
  }
}

function openFilter ($el) {
  resetFilterUI()
  $el.classList.add('app-filter-button--open')
  document.getElementById($el.dataset['controls']).classList.remove('govuk-visually-hidden')
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
document.getElementById('date').innerHTML = days[x] + ',' + ' ' + ' ' + d + ' ' + months[m] + ' ' + y
