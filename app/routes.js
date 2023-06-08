//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here




// router.get('/cases/12/upload_documents_drag_drop', uploadRecallDocuments.get)
// router.post('/cases/12/upload_documents_drag_drop', uploadRecallDocuments.post)

require('./routes/sprint-14/routes.js')(router);
require('./routes/sprint-16/routes.js')(router);
require('./routes/sprint-17/routes.js')(router);
