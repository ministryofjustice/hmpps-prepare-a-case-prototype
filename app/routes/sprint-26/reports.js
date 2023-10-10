module.exports = function (router) {

  var version = "sprint-26";

  router.get('/' + version + '/reports/verification-report/case-list', function (req, res) {
    res.render(version + '/reports/verification-report/case-list')
  });

  router.post('/' + version + '/reports/verification-report/case-list', function (req, res) {
      res.redirect('check-suitability')
  });

  router.get('/' + version + '/reports/verification-report/check-suitability', function (req, res) {
    res.render(version + '/reports/verification-report/check-suitability')
  });

  router.post('/' + version + '/reports/verification-report/check-suitability', function (req, res) {
      res.redirect('TODO')
  });

}
