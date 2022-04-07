const express = require('express')
const router = express.Router()
const uploadRecallDocuments = require('./views/cases/12/uploadDocuments/recallUploadDocuments')

// Add your routes here - above the module.exports line

router.get('/cases/12/upload_documents_drag_drop', uploadRecallDocuments.get)
router.post('/cases/12/upload_documents_drag_drop', uploadRecallDocuments.post)

module.exports = router
