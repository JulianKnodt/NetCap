import React from 'react';
import { connect } from 'react-redux';

import VerifiedUrl from './VerifiedUrl.jsx';
import { mapStateToPropsV, mapDispatchToPropsV} from '../../reducers/dataReducer';

class VerifyViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data.data,
      emptyUrls: 0
    };
  }
  componentWillMount() {
    this.props.updateVerified();
  }
  componentWillReceiveProps(newProps) {
    this.setState({data: newProps.data.data});
  }
  render() {
    return (
      <div>
        <div className="alert alert-info" role="alert">Loading images takes some time...</div>
        {
        this.state.data.map((verified, key) => {
          return (<VerifiedUrl time={verified.when}
                               url={verified.url}
                               base64={verified.base64}
                               key={key}/>)
          }
        )}
      </div>
    )
  }
}

const VerifyView = connect(mapStateToPropsV, mapDispatchToPropsV)(VerifyViewContainer);

export default VerifyView;