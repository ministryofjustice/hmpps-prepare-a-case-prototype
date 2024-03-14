module.exports = function (router) {

  var version = "sprint-36";

  const notesDefaults = {
    progress_1: [],
    progress_2: [],
    progress_3: [],
  }
  const commentsDefaults = []
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  router.get('/' + version + '/cases/13/summary', (req, res, next) => {
    res.locals.progressNotes = req.session.progressNotes || notesDefaults
    res.locals.comments = req.session.comments || commentsDefaults
    next()
  })

  router.post('/' + version + '/cases/13/summary', (req, res, next) => {
    if (!Object.keys(req.body).length) {
      req.session.progressNotes = { ...notesDefaults }
      req.session.comments = [].concat(commentsDefaults)
      res.locals.progressNotes = req.session.progressNotes
      res.locals.comments = req.session.comments
    } else {
      req.session.progressNotes = {
        ...notesDefaults,
        ...req.session.progressNotes
      }
      req.session.comments = (req.session.comments || []).concat(commentsDefaults)
      const dateNow = new Date()
      for (let i in req.body) {
        const updateObj = {
          name: 'Jo Wade',
          date: `${dateNow.getDate()} ${monthNames[dateNow.getMonth()]} ${dateNow.getFullYear()} at ${dateNow.getHours()}:${dateNow.getMinutes()}`,
          text: req.body[i]
        }
        if (i.includes('progress')) {
          req.session.progressNotes[i].unshift(updateObj)
        } else {
          req.session.comments.unshift(updateObj)
        }
      }
    }
    next()
  })

  router.get('/' + version + '/cases/13/anticipated-plea', function (req, res) {
    if (req.session.data['banner-anticipated-plea-visible'] == 'True'){
      req.session.data['banner-anticipated-plea-visible'] = 'False'
    }

    res.render(version + '/cases/13/anticipated-plea')
  });

  router.post('/' + version + '/cases/13/anticipated-plea', function (req, res) {
    const dylanAnticipatedPlea = req.session.data['dylan-anticipated-plea']
    if (dylanAnticipatedPlea){
      req.session.data['banner-anticipated-plea-visible'] = 'True'
    }

    res.redirect('anticipated-plea')
  });


  router.get('/' + version + '/cases/13/interpretation-needs', function (req, res) {
    const preferredLanguagesList = [
      'Choose preferred language',
      'British Sign Language',
      'Estonian',
      'Japanese'
    ].map(item => {
      return {
        value: item,
        text: item,
        selected: item === req.session.data['preferred-languages-list']
      }
    })

    res.render(version + '/cases/13/interpretation-needs' , {preferredLanguagesList})
  });

  router.post('/' + version + '/cases/13/interpretation-needs', function (req, res) {

    res.redirect('case-summary')
  });
}
