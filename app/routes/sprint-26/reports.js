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
      res.redirect('confirm-suitability')
  });

  router.get('/' + version + '/reports/verification-report/confirm-suitability', function (req, res) {
    res.render(version + '/reports/verification-report/confirm-suitability')
  });

  router.post('/' + version + '/reports/verification-report/confirm-suitability', function (req, res) {
    const suitableForVerificationReport = req.session.data['suitable-for-verification-report']

    if (suitableForVerificationReport == 'Yes'){
      res.redirect('yes-suitable')
    } else {
      res.redirect('no-not-suitable')
    }
  });

}
