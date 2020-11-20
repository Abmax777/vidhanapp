import React, { Component } from 'react'
import { Container, Card, OverlayTrigger, Tooltip } from 'react-bootstrap'

import agent from '../agent'
import { connect } from 'react-redux'

import { GET_SUIT } from '../store/constants/actionTypes'

const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16))
  return `rgba(${r},${g},${b},${alpha})`
}

const colors = [
  { light: '#ffcdd2', dark: '#f44336' },
  { light: '#e1bee7', dark: '#9c27b0' },
  { light: '#c5cae9', dark: '#3f51b5' },
  { light: '#b3e5fc', dark: '#03a9f4' },
  { light: '#b2dfdb', dark: '#009688' },
  { light: '#dcedc8', dark: '#8bc34a' },
  { light: '#fff9c4', dark: '#ffeb3b' },
  { light: '#ffe0b2', dark: '#ff9800' },
  { light: '#d7ccc8', dark: '#795548' },
  { light: '#f5f5f5', dark: '#9e9e9e' },
  { light: '#cfd8dc', dark: '#607d8b' },
  { light: '#f8bbd0', dark: '#e91e63' },
  { light: '#d1c4e9', dark: '#673ab7' },
  { light: '#bbdefb', dark: '#2196f3' },
  { light: '#b2ebf2', dark: '#80deea' },
  { light: '#c8e6c9', dark: '#4caf50' },
  { light: '#f0f4c3', dark: '#cddc39' },
  { light: '#ffecb3', dark: '#ffc107' },
  { light: '#ffccbc', dark: '#ff5722' },
]

const mapStateToProps = (state) => ({ ...state.suit })

const mapDispatchToProps = (dispatch) => ({
  onGetSuit: ({ _id }) =>
    dispatch({
      type: GET_SUIT,
      payload: agent.Suits.getSuit({ _id }),
    }),
})

class Suit extends Component {
  componentWillMount() {
    if (this.props.match.params.suitId) {
      this.props.onGetSuit({ _id: this.props.match.params.suitId })
    }
  }
  render() {
    const {
      props: { suit },
    } = this
    let roles = []
    if (suit) {
      roles = Array.from(
        new Set(suit.sentences.map((sent) => sent.type))
      ).sort()
    }
    return suit ? (
      <Container>
        <Card className='my-4' text='dark' style={{backgroundColor: "lightblue"}}>
          <Card.Header>Info</Card.Header>
          <Card.Body>
            <Card.Title>Document ID</Card.Title>
            <Card.Text>{suit.docId}</Card.Text>
          </Card.Body>
          <Card.Body>
            <Card.Title>Title</Card.Title>
            <Card.Text>{suit.title}</Card.Text>
          </Card.Body>
          <Card.Body>
            <Card.Title>Date</Card.Title>
            <Card.Text>{new Date(suit.endDate).toDateString()}</Card.Text>
          </Card.Body>
          <Card.Body>
            <Card.Title>Judge</Card.Title>
            <Card.Text>{suit.judge}</Card.Text>
          </Card.Body>
          {suit.priors ? (
            <Card.Body>
              <Card.Title>Priors</Card.Title>
              <Card.Text>
                <div className='flex flex-wrap'>
                  {suit.priors.map((prior, idx) => (
                    <div
                      key={idx}
                      variant='dark'
                      className='px-2 m-2 border-solid border-2 border-blue-600 bg-blue-100'
                    >
                      {prior}
                    </div>
                  ))}
                </div>
              </Card.Text>
            </Card.Body>
          ) : null}
          {roles.length > 0 ? (
            <Card.Body>
              <Card.Title>Roles</Card.Title>
              <Card.Text>
                <div className='flex flex-col items-baseline'>
                  {roles.map((role, i) => (
                    <div
                      className='my-1 px-1 border-solid border-2'
                      style={{
                        backgroundColor: hex2rgba(
                          colors[i % colors.length].light,
                          0.3
                        ),
                        borderColor: colors[i % colors.length].dark,
                      }}
                      key={i}
                    >
                      {role}
                    </div>
                  ))}
                </div>
              </Card.Text>
            </Card.Body>
          ) : null}
        </Card>
        <Card border='primary'>
          <Card.Header>Legal Text</Card.Header>
          <Card.Body>
            {suit.sentences.map((sent, idx) => (
              <OverlayTrigger
                placement='top'
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id='button-tooltip'>{sent.type}</Tooltip>}
                key={idx}
              >
                <span
                  style={{
                    backgroundColor: hex2rgba(
                      colors[roles.indexOf(sent.type) % colors.length].light,
                      0.3
                    ),
                    fontSize: '1.2rem',
                  }}
                >
                  {sent.content}
                  <br />
                </span>
              </OverlayTrigger>
            ))}
          </Card.Body>
        </Card>
        <Card className='my-4' bg='light' text='dark'>
          <Card.Header>Summary</Card.Header>
          <Card.Body>{suit.summary}</Card.Body>
        </Card>
      </Container>
    ) : null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suit)
