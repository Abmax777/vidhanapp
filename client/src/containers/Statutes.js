import React, { Component } from 'react'
import {
  Card,
  Container,
  InputGroup,
  FormControl,
  Button,
  Modal,
} from 'react-bootstrap'
import Pagination from 'react-js-pagination'

import agent from '../agent'
import { connect } from 'react-redux'

import { GET_STATUTES } from '../store/constants/actionTypes'

const mapStateToProps = (state) => ({ ...state.statutes })

const mapDispatchToProps = (dispatch) => ({
  onGetStatutes: ({ limit = 10, skip = 0, queryObj = {} } = {}) =>
    dispatch({
      type: GET_STATUTES,
      payload: agent.Statutes.getStatutes({ limit, skip, queryObj }),
    }),
})
const MyVerticallyCenteredModal = (props) => {
  const { statute } = props
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {statute.docId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='text-2xl'>Name : {statute.name}</div>
        <br />
        <div className='text-xl'>Title : {statute.title}</div>
        <br />
        <p>{statute.body[0]}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

class Statutes extends Component {
  state = {
    title: '',
    name: '',
    docId: '',
    text: '',
    modalIdx: -1,
    // loading: false,
  }

  async componentDidMount() {
    if (!this.props.statutes.length) {
      await this.props.onGetStatutes()
    }
  }

  hc = (k, v) => {
    this.setState({ [k]: v })
  }

  onSearch = async (filter) => {
    const {
      state: { title, name, text, docId },
      hc,
    } = this
    let queryObj = {}
    if (!filter) {
      hc('title', '')
      hc('name', '')
      hc('docId', '')
      hc('text', '')
    }
    if (filter) {
      if (title) {
        queryObj.title = title
      }
      if (name) {
        queryObj.name = name
      }
      if (docId) {
        queryObj.docId = docId
      }
      if (text) {
        queryObj.body = text
      }
    }
    console.log(queryObj)
    await this.props.onGetStatutes({ queryObj })
  }

  onPageChange = (pageNo) => {
    const {
      props: { limit, queryObj, onGetStatutes },
    } = this
    const skip = limit * (pageNo - 1)
    onGetStatutes({ limit, skip, queryObj })
  }

  render() {
    const {
      props: { statutes, count, limit, skip },
      state: { title, name, docId, text, modalIdx },
      onPageChange,
      hc,
      onSearch,
    } = this
    return (
      <Container>
        <div>
          <div>
            <div>
              <div className='d-flex justify-between'>
                <div
                  className='py-4 flex flex-col md:flex-row justify-center'
                  lg='8'
                  sm='10'
                >
                  <div className='pr-4 flex justify-center my-2 md:my-0'>
                    <InputGroup>
                      <FormControl
                        placeholder='Doc Id'
                        aria-label='docId'
                        aria-describedby='option-1'
                        value={docId}
                        onChange={(e) => hc('docId', e.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <div className='pr-4 flex justify-center my-2 md:my-0'>
                    <InputGroup>
                      <FormControl
                        placeholder='Title'
                        aria-label='title'
                        aria-describedby='option-2'
                        value={title}
                        onChange={(e) => hc('title', e.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <div className='pr-4 flex justify-center my-2 md:my-0'>
                    <InputGroup>
                      <FormControl
                        placeholder='Name'
                        aria-label='name'
                        aria-describedby='option-3'
                        value={name}
                        onChange={(e) => hc('name', e.target.value)}
                      />
                    </InputGroup>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='pb-4'>
                <InputGroup>
                  <FormControl
                    placeholder='Text'
                    aria-label='text'
                    aria-describedby='option-4'
                    value={text}
                    onChange={(e) => hc('text', e.target.value)}
                  />
                </InputGroup>
              </div>
            </div>
            <div className='flex justify-center' lg='2' sm='2'>
              <div className='mx-2'>
                <Button
                  variant='primary'
                  type='submit'
                  onClick={() => onSearch(true)}
                >
                  Search
                </Button>
              </div>
              <div className='mx-2'>
                <Button
                  variant='primary'
                  type='submit'
                  onClick={() => onSearch(false)}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
            <div className='m-4'>
              <div className='d-flex justify-center'>
                <Pagination
                  itemClass='page-item'
                  linkClass='page-link'
                  activePage={~~(skip / limit + 1)}
                  itemsCountPerPage={limit}
                  totalItemsCount={count}
                  pageRangeDisplayed={5}
                  onChange={onPageChange}
                />
              </div>
            </div>
            <div>
              <div>
                {statutes.map((statute, idx) => (
                  <div
                    key={idx}
                    className='cursor-pointer'
                    onClick={() => hc('modalIdx', idx)}
                  >
                    <Card className={'statute-card mb-4'}>
                      <Card.Body>
                        <Card.Title>Doc ID: {statute.docId}</Card.Title>
                        <Card.Text>Name: {statute.name}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className='text-muted'>
                          Title: {statute.title}
                        </small>
                      </Card.Footer>
                    </Card>
                  </div>
                ))}
              </div>
              {statutes[modalIdx] ? (
                <MyVerticallyCenteredModal
                  show={modalIdx >= 0}
                  statute={statutes[modalIdx]}
                  onHide={() => hc('modalIdx', -1)}
                />
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Statutes)
