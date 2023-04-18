//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// router.get('/cases/12/upload_documents_drag_drop', uploadRecallDocuments.get)
// router.post('/cases/12/upload_documents_drag_drop', uploadRecallDocuments.post)

router.get('/cases/13/summary', (req, res, next) => {
  res.locals.progressNotes = req.session.progressNotes || notesDefaults
  res.locals.comments = req.session.comments || commentsDefaults
  next()
})

router.post('/cases/13/summary', (req, res, next) => {
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
