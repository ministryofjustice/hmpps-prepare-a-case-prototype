const documentTypes = require('./documentTypes')
const multer = require('multer')
const nunjucks = require('nunjucks')

const storage = multer.memoryStorage()
const uploadStorage = multer({ storage })
const uploadStorageArray = (fieldName) => uploadStorage.array(fieldName)

const mandatoryDocs = () =>
  documentTypes.filter(doc => doc.type === 'document' && doc.required)


const makeFileDataFromArray = (files) => {
  return files ? files.map(file => {
    const documentType = documentTypes.find(doc => doc.category === 'UNCLASSIFIED')
    return {
      originalFileName: file.originalname,
      fileName: documentType.category === 'UNCLASSIFIED' ? file.originalname : `${documentType.label} - ${file.originalname}`,
      label: documentType.label,
      category: documentType.category,
    }
  }) : []
}

const uploadsDefaults = {
  files: [],
  allMandatoryUploaded: false
}

module.exports = {
  post: (req, res) => {
    uploadStorageArray('documents')(req, res, () => {

      const uploads = req.session.data.uploads || uploadsDefaults;

      const addUpdateRecallDocuments = (fileData, body) => {
        fileData.forEach(file => {
          const alreadyUploaded = file.category !== 'UNCLASSIFIED' && uploads.files.find(up => up.category === file.category)
          if (!alreadyUploaded) {
            uploads.files.push(file)
          }
        })
        uploads.files = uploads.files.map((file, idx) => {
          let copy = file
          const docType = body[`${idx}-type`]
          if (docType) {
            copy = {...documentTypes.find(doc => doc.category === docType)}
            if (docType === 'OTHER') {
              copy.fileName = file.originalFileName
            }
          }
          return { ...copy, id: idx.toString() }
        })
      }

      const deleteRecallDocument = body => {
        const idx = uploads.files.findIndex(file => file.id === body.delete)
        uploads.deletedFile = uploads.files[idx]
        uploads.files.splice(idx, 1)
      }

      const { files, body } = req
      const fileData = makeFileDataFromArray(files)
      if (req.body.delete) {
        deleteRecallDocument(body)
      } else {
        addUpdateRecallDocuments(fileData, body)
      }
      res.locals.uploads = uploads
      if (req.body.continue) {
        return res.redirect(req.body.redirectPage)
      }
      if (req.xhr) {
        nunjucks.configure('app/views/cases/12')
        try {
          const html = nunjucks.render('uploadedDocumentsStatus.njk', res.locals)
          return res.json({
            success: html
          })
        } catch (err) {
          console.log(err)
        }
      }
      res.redirect(303, req.originalUrl)
    })
  },
  get: (req, res, next) => {
    req.session.data.uploads = req.session.data.uploads || uploadsDefaults
    res.locals.uploads = req.session.data.uploads
    res.locals.uploads.deletedFile = null
    next()
  }
}
