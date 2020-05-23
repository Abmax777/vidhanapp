const express = require('express')
const statuteCtrl = require('./statute.controller')

const router = express.Router() // eslint-disable-line new-cap

router
  .route('/')
  /** POST /api/statutes - Create new statute */
  .post(statuteCtrl.create)

  /** POST /api/statutes - Delete statute */
  .delete(statuteCtrl.clear)

router
  .route('/:statuteId')
  /** GET /api/statutes/:statuteId - Get statute */
  .get(statuteCtrl.get)

  /** DELETE /api/statutes/:statuteId - Delete statute */
  .delete(statuteCtrl.remove)

router
  .route('/search')
  /** POST /api/statutes/search - Search for statutes */
  .post(statuteCtrl.list)

/** Load statute when API with statuteId route parameter is hit */
router.param('statuteId', statuteCtrl.load)

module.exports = router
