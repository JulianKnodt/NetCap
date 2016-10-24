import React from 'react';
import * as parse from 'url';
import * as noescape from 'unescape';

const sendData = (url) => {
  fetch('/api/verified', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({url: url})
  });
};
const textStyle = () => {fontSize: '.8vw'};
const verify = (url) => {
  url = url.slice(url.indexOf(' ') + 1);
  return url;
};

const Packet = (props) => {
  let data = parse.parse(props.url.slice(props.url.indexOf(' ')));
  return(
  <div className="col-sm-3 col-md-3">
    <div className="panel panel-info">
      <div className="panel-heading">
        <h3 className="panel-title" style={{overflow:'hidden', paddingBottom:5, height:40}}>{data.hostname ? data.hostname : 'UNKNOWN'}</h3>
      </div>
      <div className="panel-body" style={{height:300, overflow:'scroll'}}>
          <span style={textStyle()}>
            {props.response}
          </span>
          <br/>
          <span style={textStyle()}>
            Auth: {data.Auth}
          </span>
          <br/>
          <span style={textStyle()}>
            Url: {noescape.default(data.href)}
          </span>
          <br/>
          <span style={textStyle()}>
            Path: {data.pathname}
          </span>
          <br/>
          <span style={textStyle()}>
          Query: {noescape.default(data.query)}
          </span>
      </div>
      {/*<div className="thumbnail">
        <div className="caption">
          <p>{(new Date(props.time)).toLocaleString()}</p>
        </div>
      </div>*/}
      <div className="panel-footer">
        <h4>{props.src}</h4>
        <p><a className="btn btn-primary" role="button" onClick={() => {sendData(verify(props.url))}}>Screenshot</a>{/*<a className="btn btn-default" role="button">Delete</a>*/}</p>
      </div>
    </div>
  </div>
  );
}


export default Packet;