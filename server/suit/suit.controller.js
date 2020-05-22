const Suit = require('./suit.model')
const mongoose = require('mongoose')
/**
 * Load suit and append to req.
 */
function load(req, res, next, id) {
  Suit.get(id)
    .then(suit => {
      req.suit = suit // eslint-disable-line no-param-reassign
      return next()
    })
    .catch(e => next(e))
}

/**
 * Get suit
 * @returns {Suit}
 */
function get(req, res) {
  return res.json({ suit: req.suit })
}

function create(req, res, next) {
  const id = new mongoose.mongo.ObjectId()
  const suit = new Suit({
    ...req.body,
    endDate: new Date(req.body.date),
    docId: req.body.id,
    id,
  })

  suit
    .save()
    .then(savedSuit => res.json({ suit: savedSuit }))
    .catch(e => next(e))
}

async function list(req, res, next) {
  const { limit = 24, skip = 0, queryObj = {} } = req.body
  try {
    const savedQ = { ...queryObj }
    if ('docId' in queryObj) {
      queryObj.docId = new RegExp(queryObj.docId, 'i')
    }
    if ('title' in queryObj) {
      queryObj.title = new RegExp(queryObj.title, 'i')
    }
    if ('judge' in queryObj) {
      queryObj.judge = new RegExp(queryObj.judge, 'i')
    }
    if ('text' in queryObj) {
      queryObj['sentences.content'] = new RegExp(queryObj.text, 'i')
      delete queryObj.text
    }
    const count = await Suit.count(queryObj).exec()
    const suits = await Suit.list({ limit, skip, queryObj })
    res.json({ suits, count, limit, skip, queryObj: savedQ })
  } catch (error) {
    next(error)
  }
}

/**
 * Delete suit.
 * @returns {Suit}
 */
function remove(req, res, next) {
  const suit = req.suit
  suit
    .remove()
    .then(deletedSuit => res.json({ suit: deletedSuit }))
    .catch(e => next(e))
}

/**
 * Delete suit.
 * @returns { Suit }
 */
function clear(req, res, next) {
  Suit.clear()
    .then(deletedSuits => res.json({ deleted: deletedSuits }))
    .catch(e => next(e))
}

module.exports = { load, get, create, list, remove, clear }
