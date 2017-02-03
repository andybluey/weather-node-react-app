import React, { Component } from 'react';
import { Grid, Navbar, Jumbotron, Button } from 'react-bootstrap';
import queryApi from './queryApi';

class App extends Component {
  constructor(){
    super();
    this.state = {
      hours: [],
      hourlyTemps: [],
      error: null
    };
  }

  componentDidMount() {
    this.queryServer();
  }

  onSuccessfulLoad = (data) => {
    console.log('load succeeded');
    const collectData = data && data.hourly.data;
    const hours = [];
    const hourlyTemps = [];
    for (const getData of collectData) {
      hours.push(new Date(getData.time*1000).toLocaleString());
      hourlyTemps.push((getData.temperature-32)*5/9);
    }
    this.setState({
      hours,
      hourlyTemps,
      error: null,
    });
  }

  onFailureToLoad = (error) => {
    console.log('load failed');
    this.setState({
      error
    });
  }

// Setup
  queryServer = (data) => {
    const latitude = '-33.8700308';
    const longitude = '151.2116687';
    const url = `/api/darksky?latitude=`+latitude+`&longitude=`+longitude;
    queryApi(url, null, this.onSuccessfulLoad, this.onFailureToLoad);
  }

  render() {
    const hourlyTemps = this.state.hourlyTemps || 'hourly temperatures';
    return (
      <div className="App">
        <h1>Weather for Sydney</h1>
        <h2>Time</h2>
        <p>{this.state.hours}</p>
        <h2>Temp</h2>
        <p>{hourlyTemps}</p>
      </div>
    );
  }
}

export default App;
