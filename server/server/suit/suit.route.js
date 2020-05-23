const express = require('express')
const suitCtrl = require('./suit.controller')

const router = express.Router() // eslint-disable-line new-cap

router
  .route('/')
  /** POST /api/suits - Create new suit */
  .post(suitCtrl.create)

  /** POST /api/suits - Delete suit */
  .delete(suitCtrl.clear)

router
  .route('/:suitId')
  /** GET /api/suits/:suitId - Get suit */
  .get(suitCtrl.get)

  /** DELETE /api/suits/:suitId - Delete suit */
  .delete(suitCtrl.remove)

router
  .route('/search')
  /** POST /api/suits/search - Search for suits */
  .post(suitCtrl.list)

/** Load suit when API with suitId route parameter is hit */
router.param('suitId', suitCtrl.load)

module.exports = router
