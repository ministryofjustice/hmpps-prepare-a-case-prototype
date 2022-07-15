const express = require('express')
const router = express.Router()
const uploadRecallDocuments = require('./views/cases/12/uploadDocuments/recallUploadDocuments')

const notesDefaults = {
  progress_1: [],
  progress_2: [{
    name: 'Mark Berridge',
    date: '16 June 2022 at 9:55am',
    text: 'A note that you\'ve typed about this hearing'
  }],
  progress_3: [],
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Add your routes here - above the module.exports line

router.get('/cases/12/upload_documents_drag_drop', uploadRecallDocuments.get)
router.post('/cases/12/upload_documents_drag_drop', uploadRecallDocuments.post)

router.get('/cases/13/summary', (req, res, next) => {
  res.locals.progressNotes = req.session.progressNotes || notesDefaults
  next()
})

router.post('/cases/13/summary', (req, res, next) => {
  const dateNow = new Date()
  req.session.progressNotes = {
    ...notesDefaults
  }
  for (let i in req.body) {
    req.session.progressNotes[i].push({
      name: 'Mark Berridge',
      date: `${dateNow.getDate()} ${monthNames[dateNow.getMonth()]} ${dateNow.getFullYear()} at ${dateNow.getHours()}:${dateNow.getMinutes()}`,
      text: req.body[i]
    })
  }
  next()
})

module.exports = router
