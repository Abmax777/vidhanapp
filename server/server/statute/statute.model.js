const Promise = require('bluebird')
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../helpers/APIError').default

const Schema = mongoose.Schema
const SchemaTypes = mongoose.SchemaTypes

/**
 * Statute Schema
 */

const StatuteSchema = new Schema({
  docId: {
    type: SchemaTypes.String,
    required: true,
  },
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  title: {
    type: SchemaTypes.String,
    required: true,
  },
  body: {
    type: [SchemaTypes.String],
    required: true,
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
StatuteSchema.method({})

/**
 * Statics
 */
StatuteSchema.statics = {
  /**
   * Get statute
   * @param {ObjectId} id - The objectId of statute.
   * @returns {Promise<Statute, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then(statute => {
        if (statute) {
          return statute
        }
        const err = new APIError(
          'No such statute exists!',
          httpStatus.NOT_FOUND
        )
        return Promise.reject(err)
      })
  },

  /**
   * List statutes in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of statutes to be skipped.
   * @param {number} limit - Limit number of statutes to be returned.
   * @returns {Promise<Statute[]>}
   */

  list({ skip = 0, limit = 50, queryObj = {} } = {}) {
    return this.find(queryObj)
      .select()
      .sort({ docId: 1 })
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
      .then(statute => {
        if (statute) {
          return statute
        }
        const err = new APIError(
          'Could not create statute!',
          httpStatus.NOT_FOUND
        )
        return Promise.reject(err)
      })
  },
}

/**
 * @typedef Statute
 */
module.exports = mongoose.model('Statute', StatuteSchema)
