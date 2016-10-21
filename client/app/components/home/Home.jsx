import React from 'react';
import Packet from '../results/Packet.jsx';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../reducers/dataReducer';

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
  render() {
    return (
      <div>
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