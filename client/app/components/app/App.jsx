import React, { PropTypes } from 'react';
import Navbar from '../navbar/Navbar.jsx'

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div>
          {
          React.cloneElement(this.props.children)
          }
        </div>
        {/*<Footer />*/}
      </div>
    );
  }
}

export default App;