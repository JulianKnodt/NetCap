import React from 'react';

const VerifiedUrl = (props) => {
  return (
  <div className="col-sm-5 col-md-4">
    <div className="panel panel-primary">
      <div className="panel-body" style={{height: 500, overflow:'scroll'}}>
        <pre>
          {props.url}
          <br/>
          {(new Date(props.time)).toLocaleTimeString()}
        </pre>
        <img src={`data:image/png;base64, ${props.base64}`} alt="Screenshot"/>
      </div>
    </div>
  </div>
  );
};

export default VerifiedUrl;