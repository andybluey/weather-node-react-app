import React from "react";
import classNames from 'classnames';

class Footer extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const copyrightGridSizes = classNames("col-sm-12 text-center");

    const summaryText = classNames("copyright", "navbar-text", "center", copyrightGridSizes);

    return (
      <div className="container">
        <div className="row">
          <div className={ summaryText }>Working with React, Node, Express, Bootstrap & D3</div>
          <div className={ summaryText }>Data sourced from darksky.net</div>
        </div>
      </div>
     );
  }
}

export default Footer;
