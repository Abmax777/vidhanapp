import React, { Component } from 'react'
import {
  CardColumns,
  Card,
  Container,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

import agent from '../agent'
import { connect } from 'react-redux'

import { GET_SUITS } from '../store/constants/actionTypes'
import { LinkContainer } from 'react-router-bootstrap'

const mapStateToProps = (state) => ({ ...state.suits })

const mapDispatchToProps = (dispatch) => ({
  onGetSuits: ({ limit = 24, skip = 0, queryObj = {} } = {}) =>
    dispatch({
      type: GET_SUITS,
      payload: agent.Suits.getSuits({ limit, skip, queryObj }),
    }),
})

class Suits extends Component {
  state = {
    title: '',
    judge: '',
    text: '',
    docId: '',
    endDate: null,
  }

  componentDidMount() {
    if (!this.props.suits.length) this.props.onGetSuits()
  }

  hc = (k, v) => {
    this.setState({ [k]: v })
  }

  onSearch = (filter) => {
    const {
      state: { title, judge, text, endDate, docId },
      hc,
    } = this
    let queryObj = {}
    if (!filter) {
      hc('title', '')
      hc('judge', '')
      hc('text', '')
      hc('docId', '')
      hc('endDate', null)
    }
    if (filter) {
      if (title) {
        queryObj.title = title
      }
      if (judge) {
        queryObj.judge = judge
      }
      if (text) {
        queryObj.text = text
      }
      if (docId) {
        queryObj.docId = docId
      }
      if (endDate) {
        queryObj.endDate = {
          $gte: endDate[0],
          $lte: endDate[1],
        }
      }
    }
    console.log(queryObj)
    this.props.onGetSuits({ queryObj })
  }

  onPageChange = (pageNo) => {
    const {
      props: { limit, queryObj, onGetSuits },
    } = this
    const skip = limit * (pageNo - 1)
    onGetSuits({ limit, skip, queryObj })
  }

  render() {
    const {
      props: { suits, count, limit, skip },
      state: { title, judge, text, endDate, docId },
      onPageChange,
      hc,
      onSearch,
    } = this
    return (
      <div style={{backgroundColor: "beige"}}> 
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
                        placeholder='Doc ID'
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
                        placeholder='Judge'
                        aria-label='judge'
                        aria-describedby='option-3'
                        value={judge}
                        onChange={(e) => hc('judge', e.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <div className='flex justify-center my-2 md:my-0'>
                    <DateRangePicker
                      value={endDate}
                      onChange={(endDate) => hc('endDate', endDate)}
                    />
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
                  variant='info'
                  type='submit'
                  onClick={() => onSearch(true)}
                >
                  Search
                </Button>
              </div>
              <div className='mx-2'>
                <Button
                  variant='info'
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
              <CardColumns>
                {suits.map((suit, idx) => (
                  <LinkContainer to={`/suits/${suit._id}`} key={`${idx}`}>
                    <Card className={'suit-card'} style={{backgroundColor: "cornsilk"}}>
                      <Card.Body>
                        <Card.Title className='text-base'>Doc ID</Card.Title>
                        <Card.Text className='text-lg'>{suit.docId}</Card.Text>
                      </Card.Body>
                      <Card.Body>
                        <Card.Title className='text-base'>Title</Card.Title>
                        <Card.Text className='text-lg'>{suit.title}</Card.Text>
                      </Card.Body>
                      <Card.Body>
                        <Card.Title className='text-base'>Judge</Card.Title>
                        <Card.Text className='text-lg'>{suit.judge}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className='text-muted'>
                          {new Date(suit.endDate).toDateString()}
                        </small>
                      </Card.Footer>
                    </Card>
                  </LinkContainer>
                ))}
              </CardColumns>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suits)
