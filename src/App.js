import React, { Component } from 'react';
import './App.css';
import WeatherDisplay from './weather';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, NavItem, Nav, Grid, Row, Col } from 'react-bootstrap';
import 'bootswatch/superhero/bootstrap.css';

const PLACES = [
  { name: "Palo Alto", zip: "94303" },
  { name: "San Jose", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" },
  { name: "Moscow", zip:"101000"},
  { name: "Zürich", zip:"8001"},
  { name: "Belrin", zip:"10117"},
  { name: "Helsinki", zip:"00100"}
];

class App extends Component {
  constructor () {
    super();
    this.state = {
      activePlace: 0,
    };

  }

  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        React Simple Weather App
      </Navbar.Brand>
    </Navbar.Header>
  </Navbar>
  <Grid>
    <Row>
      <Col md={4} sm={4}>
        <h3>Select a city</h3>
        <Nav
          bsStyle="pills"
          stacked
          activeKey={activePlace}
          onSelect={index => {
            this.setState({ activePlace: index });
          }}
        >
          {PLACES.map((place, index) => (
            <NavItem key={index} eventKey={index}>{place.name}</NavItem>
          ))}
        </Nav>
      </Col>
      <Col md={8} sm={8}>
        <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
      </Col>
    </Row>
  </Grid>
</div>
    );
  }
}

export default App;
