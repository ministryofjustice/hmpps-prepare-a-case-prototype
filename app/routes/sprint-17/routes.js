module.exports = function (router) {

  var version = "sprint-17";

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
          name: 'Mark Berridge',
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
}
