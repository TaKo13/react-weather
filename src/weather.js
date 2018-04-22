import React, { Component } from 'react';

export default class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      cityNotFound: false,
      netWorkError: false,
      errorMesssage: ''
    };
  }

  componentDidMount() {
    const name = this.props.name;
    const URL =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      name +
      '&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric';
    fetch(URL)
      .then(res => res.json())
      .then(json => {
        if (json.cod === '404') {
          return this.setState({
            cityNotFound: true,
            errorMesssage: json.message
          });
        }

        this.setState({ weatherData: json });
      })
      .catch(e =>
        this.setState({
          netWorkError: true,
          errorMesssage: e.message
        })
      );
  }

  render() {
    const {
      weatherData,
      errorMesssage,
      cityNotFound,
      netWorkError
    } = this.state;

    if (netWorkError)
      return <div style={{ margin: '15px' }}>{errorMesssage}</div>;
    if (cityNotFound)
      return <div style={{ margin: '15px' }}>{errorMesssage}</div>;
    if (!weatherData) return <div style={{ margin: '15px' }}>Loading</div>;

    const weather = weatherData.weather[0];
    const iconUrl = 'http://openweathermap.org/img/w/' + weather.icon + '.png';

    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    );
  }
}
