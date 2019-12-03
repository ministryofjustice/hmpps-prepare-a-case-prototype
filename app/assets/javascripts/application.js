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

  function checkboxClick (e) {
    e.stopPropagation()
    var button = document.getElementById(`button-${e.target.name.substring(e.target.name.indexOf('-') + 1)}`)
    var anySelected = false
    var checkboxesInGroup = document.querySelectorAll(`[id^="${e.target.name}"]`)
    for (var i = 0, len = checkboxesInGroup.length; i < len; i++) {
      anySelected = anySelected || checkboxesInGroup[i].checked
    }
    anySelected ? button.classList.add('app-filter-button--selected') : button.classList.remove('app-filter-button--selected')
  }

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
    if (!$el || !$el.active) { filterButtons[i].active = false }
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
