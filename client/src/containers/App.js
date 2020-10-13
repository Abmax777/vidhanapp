import React from 'react'
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import { Switch, Redirect, Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Suits from './Suits'
import Suit from './Suit'
import Statutes from './Statutes'
import './App.css'
import '../styles/main.css'

function App() {
  return (
    <div className={'App'}>
      <Container>
        <Row>
          <Col>
            <Navbar bg='secondary' variant='dark' expand='lg'>
              <LinkContainer to='/'>
                <Navbar.Brand>Vidhan</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                  <LinkContainer to='/suits'>
                    <Nav.Link>Cases</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/statutes'>
                    <Nav.Link>Statutes</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
      <Switch>
        <Route path='/suits/:suitId' component={Suit} />
        <Route path='/suits' component={Suits} />
        <Route path='/statutes' component={Statutes} />
        <Route exact path='/' render={() => <Redirect to='/suits' />} />
      </Switch>
    </div>
  )
}

export default App
