module.exports = function (router) {

  var version = "sprint-27";

  router.get('/' + version + '/reports/unassigned-verification-reports', function (req, res) {
    res.render(version + '/reports/unassigned-verification-reports')
  });

  router.post('/' + version + '/reports/unassigned-verification-reports', function (req, res) {
      res.redirect('verification-report/check-suitability')
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

    if (suitableForVerificationReport == 'Verification report'){
      req.session.data.dylanAdamArmstrongReport = 'Verification report'
      res.redirect('assign-user')
    } else {
      res.redirect('what-other-advice')
    }
  });

  router.get('/' + version + '/reports/verification-report/assign-user', function (req, res) {
    res.render(version + '/reports/verification-report/assign-user')
  });

  router.post('/' + version + '/reports/verification-report/assign-user', function (req, res) {
      res.redirect('../unassigned-verification-reports')
  });

  router.get('/' + version + '/reports/verification-report/what-other-advice', function (req, res) {
    res.render(version + '/reports/verification-report/what-other-advice')
  });

  router.post('/' + version + '/reports/verification-report/what-other-advice', function (req, res) {
    const whatOtherAdvice = req.session.data['what-other-advice']

    if (whatOtherAdvice == 'Pre-sentence report'){
      req.session.data.dylanAdamArmstrongReport = 'Pre-sentence report'
    } else if (whatOtherAdvice == 'No advice needed') {
      req.session.data.dylanAdamArmstrongReport = 'No advice needed'
    }
    res.redirect('../unassigned-verification-reports')
  });

  router.get('/' + version + '/reports/no-advice-needed', function (req, res) {
    res.render(version + '/reports/no-advice-needed')
  });

  router.post('/' + version + '/reports/no-advice-needed', function (req, res) {
      res.redirect('request-advice')
  });

  router.get('/' + version + '/reports/request-advice', function (req, res) {
    res.render(version + '/reports/request-advice')
  });

  router.post('/' + version + '/reports/request-advice', function (req, res) {
      res.redirect('no-advice-needed')
  });
}
