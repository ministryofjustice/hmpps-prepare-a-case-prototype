const express = require('express')
const router = express.Router()
const uploadRecallDocuments = require('./views/cases/12/uploadDocuments/recallUploadDocuments')

const notesDefaults = {
  progress_1: [],
  progress_2: [{
    name: 'Liam Taylor',
    date: '18 July 2022 at 9:55am',
    text: 'Pleaded guilty'
  }],
  progress_3: [{
    name: 'Paul Smith',
    date: '15 July 2022 at 9:40am',
    text: 'Needs a spanish translator'
  }],
}

const commentsDefaults = []
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Add your routes here - above the module.exports line

router.get('/cases/12/upload_documents_drag_drop', uploadRecallDocuments.get)
router.post('/cases/12/upload_documents_drag_drop', uploadRecallDocuments.post)

router.get('/cases/13/summary', (req, res, next) => {
  res.locals.progressNotes = req.session.progressNotes || notesDefaults
  res.locals.comments = req.session.comments || commentsDefaults
  next()
})

router.post('/cases/13/summary', (req, res, next) => {
  if (!Object.keys(req.body).length) {
    req.session.progressNotes = { ...notesDefaults }
    req.session.comments = [].concat(commentsDefaults)
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

module.exports = router
