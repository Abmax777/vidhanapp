import _superagent from 'superagent'
import superagentPromise from 'superagent-promise'

const superagent = superagentPromise(_superagent, global.Promise)

// const API_ROOT = 'http://localhost:4040/api'
const API_ROOT = '/api'

const responseBody = (res) => res.body

let token = null
const tokenPlugin = (req) => {
  if (token) {
    req.set('authorization', `Token ${token}`)
  }
}

const requests = {
  del: (url) =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
}

const Suits = {
  getSuits: ({ limit = 24, skip = 0, queryObj = {} }) =>
    requests.post('/suits/search', { limit, skip, queryObj }),
  getSuit: ({ _id }) => requests.get(`/suits/${_id}`),
}

const Statutes = {
  getStatutes: ({ limit = 24, skip = 0, queryObj = {} }) =>
    requests.post('/statutes/search', { limit, skip, queryObj }),
  getStatute: ({ _id }) => requests.get(`/statutes/${_id}`),
}

export default {
  Suits,
  Statutes,
  setToken: (_token) => {
    token = _token
  },
}
