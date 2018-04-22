import React, { Component } from 'react';
import throttle from 'lodash.throttle';
import {
  Navbar,
  NavItem,
  Nav,
  Grid,
  Row,
  Col,
  FormControl
} from 'react-bootstrap';
import 'bootswatch/superhero/bootstrap.css';

import './App.css';
import WeatherDisplay from './weather';

const PLACES = [
  { name: 'Palo Alto' },
  { name: 'San Jose' },
  { name: 'Santa Cruz' },
  { name: 'Honolulu' },
  { name: 'Moscow' },
  { name: 'Zürich' },
  { name: 'Berlin' },
  { name: 'Helsinki' }
];

class App extends Component {
  constructor() {
    super();

    this.state = {
      activePlace: 0,
      cityNameFromInput: ''
    };
  }

  onCityNameChange = e => {
    this.throttledCityNameChange(e.target.value);
  };

  throttledCityNameChange = throttle(
    value =>
      this.setState({
        cityNameFromInput: value
      }),
    300
  );

  render() {
    const { activePlace, cityNameFromInput } = this.state;

    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>React Simple Weather App</Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Select a city</h3>
              <FormControl
                onChange={this.onCityNameChange}
                placeholder="or type city name here"
                style={{ margin: '15px 0' }}
              />
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index, cityNameFromInput: '' });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>
                    {place.name}
                  </NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              {cityNameFromInput.length > 0 ? (
                <WeatherDisplay
                  key={cityNameFromInput}
                  name={cityNameFromInput}
                />
              ) : (
                <WeatherDisplay
                  key={activePlace}
                  name={PLACES[activePlace].name}
                />
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
