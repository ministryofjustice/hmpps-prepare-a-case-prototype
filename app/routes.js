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
require('./routes/sprint-26/routes.js')(router);
require('./routes/sprint-26/triage.js')(router);
require('./routes/sprint-26/reports.js')(router);
require('./routes/sprint-27/routes.js')(router);
require('./routes/sprint-27/triage.js')(router);
require('./routes/sprint-27/reports.js')(router);
require('./routes/sprint-28/reports.js')(router);
require('./routes/sprint-28/triage.js')(router);
require('./routes/sprint-28/routes.js')(router);
require('./routes/sprint-29/reports.js')(router);
require('./routes/sprint-29/triage.js')(router);
require('./routes/sprint-29/routes.js')(router);
require('./routes/sprint-30/reports.js')(router);
require('./routes/sprint-30/triage.js')(router);
require('./routes/sprint-30/routes.js')(router);
