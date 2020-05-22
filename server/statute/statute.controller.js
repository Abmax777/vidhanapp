const Statute = require('./statute.model')
const mongoose = require('mongoose')
/**
 * Load statute and append to req.
 */
function load(req, res, next, id) {
  Statute.get(id)
    .then(statute => {
      req.statute = statute // eslint-disable-line no-param-reassign
      return next()
    })
    .catch(e => next(e))
}

/**
 * Get statute
 * @returns {Statute}
 */
function get(req, res) {
  return res.json({ statute: req.statute })
}

function create(req, res, next) {
  const id = new mongoose.mongo.ObjectId()
  const statute = new Statute({
    ...req.body,
    endDate: new Date(req.body.date),
    docId: req.body.id,
    id,
  })

  statute
    .save()
    .then(savedStatute => res.json({ statute: savedStatute }))
    .catch(e => next(e))
}

async function list(req, res, next) {
  const { limit = 24, skip = 0, queryObj = {} } = req.body
  try {
    const savedQ = { ...queryObj }
    if ('title' in queryObj) {
      queryObj.title = new RegExp(queryObj.title, 'i')
    }
    if ('name' in queryObj) {
      queryObj.name = new RegExp(queryObj.name, 'i')
    }
    if ('docId' in queryObj) {
      queryObj.docId = new RegExp(queryObj.docId, 'i')
    }
    if ('body' in queryObj) {
      queryObj.body = new RegExp(queryObj.body, 'i')
    }
    const count = await Statute.count(queryObj).exec()
    const statutes = await Statute.list({ limit, skip, queryObj })
    res.json({ statutes, count, limit, skip, queryObj: savedQ })
  } catch (error) {
    next(error)
  }
}

/**
 * Delete statute.
 * @returns {Statute}
 */
function remove(req, res, next) {
  const statute = req.statute
  statute
    .remove()
    .then(deletedStatute => res.json({ statute: deletedStatute }))
    .catch(e => next(e))
}

/**
 * Delete statute.
 * @returns { Statute }
 */
function clear(req, res, next) {
  Statute.clear()
    .then(deletedStatutes => res.json({ deleted: deletedStatutes }))
    .catch(e => next(e))
}

module.exports = { load, get, create, list, remove, clear }
