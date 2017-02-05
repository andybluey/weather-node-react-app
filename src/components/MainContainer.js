import React from 'react';
import style from '../styles';
import Footer from './Footer';

class MainContainer extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="jumbotron col-sm-12 text-center" style={style.transparentBg}>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default MainContainer;
