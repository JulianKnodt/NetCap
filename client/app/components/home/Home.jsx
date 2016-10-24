import React from 'react';
import Packet from '../results/Packet.jsx';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../reducers/dataReducer';

const sendData = (urls) => {
  fetch('/api/verifyMany', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({urls: urls})
  });
};
const verify = (url) => {
  url = url.slice(url.indexOf(' ') + 1);
  return url;
};

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentWillMount() {
    this.props.updateData();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data.data});
  }
  captureAll() {
    let urls = [];
    this.state.data.forEach(httpPacket => {
      console.log(httpPacket);
      urls.push(verify(httpPacket.url));
    });
    sendData(urls);
  }
  render() {
    return (
      <div>
      <center>
      {
        this.state.data.length > 1 ? 
          (<div className="jumbotron">
              <h2>Capture Packets</h2>
              <p>Take a picture of all your packets!</p>
              <p><a className="btn btn-primary btn-lg" role="button" onClick={this.captureAll.bind(this)}>Capture All</a></p>
            </div>)
          :
          (<div className="jumbotron">
            <h2>No Packets Captured</h2>
            <p>Start browsing to capture packets<br/>
            and see what's happening on your network</p>
          </div>)
      }
      </center>
        {this.state.data.map((httpPacket, index) => {
          return (
            <Packet key={index}
                    src={httpPacket.src}
                    dest={httpPacket.dest}
                    url={httpPacket.url}
                    response={httpPacket.response}
                    time={httpPacket.when}/>
          )
        })}
      </div>
    )
  }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

export default Home;