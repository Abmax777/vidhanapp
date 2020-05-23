const Promise = require('bluebird')
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../helpers/APIError').default

const Schema = mongoose.Schema
const SchemaTypes = mongoose.SchemaTypes

/**
 * Suit Schema
 */

const SentenceSchema = new Schema(
  {
    content: {
      type: SchemaTypes.String,
      required: true,
    },
    type: {
      type: SchemaTypes.String,
      required: true,
      default: null,
    },
  },
  { _id: false }
)

const SuitSchema = new Schema({
  filename: {
    type: SchemaTypes.String,
    required: true,
  },
  docId: {
    type: SchemaTypes.String,
    required: true,
  },
  priors: {
    type: [SchemaTypes.String],
  },
  statutes: {
    type: [SchemaTypes.String],
  },
  title: {
    type: SchemaTypes.String,
  },
  endDate: {
    type: SchemaTypes.Date,
  },
  judge: {
    type: SchemaTypes.String,
  },
  sentences: {
    type: [SentenceSchema],
    required: true,
  },
  summary: {
    type: SchemaTypes.String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
SuitSchema.method({})

/**
 * Statics
 */
SuitSchema.statics = {
  /**
   * Get suit
   * @param {ObjectId} id - The objectId of suit.
   * @returns {Promise<Suit, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((suit) => {
        if (suit) {
          return suit
        }
        const err = new APIError('No such suit exists!', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
  },

  /**
   * List suits in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of suits to be skipped.
   * @param {number} limit - Limit number of suits to be returned.
   * @returns {Promise<Suit[]>}
   */

  list({ skip = 0, limit = 50, queryObj = {} } = {}) {
    return this.find(queryObj)
      .select({ summary: 0, sentences: 0 })
      .sort({ endDate: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
  },

  clear() {
    return this.remove({}).exec()
  },

  insert(queryObj) {
    this.insert(queryObj)
      .exec()
      .then((suit) => {
        if (suit) {
          return suit
        }
        const err = new APIError('Could not create suit!', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
  },
}

/**
 * @typedef Suit
 */
module.exports = mongoose.model('Suit', SuitSchema)
