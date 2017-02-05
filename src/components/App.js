import React, { Component } from 'react';
import queryApi from '../utilities/queryApi';
import Chart from './Chart';
import MainContainer from './MainContainer';

class App extends Component {
  constructor(){
    super();
    this.state = {
      loadData: [],
      error: null
    };
  }

  componentDidMount() {
    this.queryServer();
  }

  onSuccessfulLoad = (data) => {
    const collectData = data && data.hourly.data;
    const loadData = [];
    for (const getData of collectData) {
      loadData.push([new Date(getData.time*1000).toJSON(), ((getData.temperature-32)*5/9)])
    }

    this.setState({
      loadData,
      error: null,
    });
  }

  onFailureToLoad = (error) => {
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
    return (
      <MainContainer>
        <div className='app'>
          <h1 className='title'>Weather for Sydney</h1>
          <p className='lead'>Showing the temperature of the city over the next 48 hours</p>
          <hr/>
          <Chart
            loadData={this.state.loadData}
          />
        </div>
      </MainContainer>
    );
  }
}

export default App;
