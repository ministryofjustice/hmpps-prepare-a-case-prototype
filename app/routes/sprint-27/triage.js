module.exports = function (router) {

  var version = "sprint-27";

  router.get('/' + version + '/triage/triage-1', function (req, res) {
    res.render(version + '/triage/triage-1')
  });

  router.post('/' + version + '/triage/triage-1', function (req, res) {
    const offenceInProbationScope = req.session.data['offence-in-probation-scope']

    if (offenceInProbationScope == "Yes, it's in scope for probation"){
      res.redirect('suitable')
    } else {
      res.redirect('unsuitable')
    }
  });

}
