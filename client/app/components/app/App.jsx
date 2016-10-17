import React, { PropTypes } from 'react';

class AppContainer extends React.Component {
  componentWillMount() {
    fetch('/data', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(data => data.text())
    .then((resp) => {
      console.log(resp);
    });
  }
  render() {
    return (
      <div>
        <div>
          {/*<NavBar />*/}
          <Chime />
          {
          React.cloneElement(this.props.children)
          }
        </div>
        {/*<Footer />*/}
      </div>
    );
  }
}
