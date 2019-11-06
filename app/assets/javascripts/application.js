/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

  new MOJFrontend.SearchToggle({
    toggleButton: {
      container: $('.moj-search-toggle__toggle'),
      text: 'Find case'
    },
    search: {
      container: $('.moj-search')
    }
  });

new MOJFrontend.SortableTable({
table: $('table')[0]
});