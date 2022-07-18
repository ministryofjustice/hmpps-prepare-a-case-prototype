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
  progress_4: [{
    name: 'Anna Smith',
    date: '14 July 2022 at 9:55am',
    text: 'appears letter sent to Mr.Hart may have had the wrong telephone number on it. Will possibly have to be an on the day report. I am on my own on that date but will try to do the report'
  }],

  progress_5: [{
    name: 'Anna Smith',
    date: '15 July 2022 at 9:55am',
    text: 'Pleaded guilty to the offence. PSR requested all option to be completed'
  }],
}

const commentsDefaults = [
  {
    name: 'Mark Berridge',
    date: '16 June 2022 at 10:15am',
    text: 'Update from OM Mike Hatch: He has been engaging well since February with no unacceptable absences. He has completed 60/80 hours of unpaid work so far. His risk level is stable, he is living with his parents again and away from his partner.'
  },
  {
    name: 'Mark Berridge',
    date: '16 June 2022 at 9:55am',
    text: 'A domestic violence report is needed. Have requested one is completed before we can proceed.'
  }
]

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
  const dateNow = new Date()
  req.session.progressNotes = {
    ...notesDefaults
  }
  req.session.comments = [].concat(commentsDefaults)
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
  next()
})

module.exports = router
