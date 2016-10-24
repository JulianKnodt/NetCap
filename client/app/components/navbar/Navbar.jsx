import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../reducers/dataReducer';
import { Link } from 'react-router';

const onSubmit = (e) => {
  e.preventDefault();
};

const onClearClick = (props) => {
  props.clearData();
}



const NavbarContainer = props => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <form className="navbar-form navbar-left" role="search" onSubmit={onSubmit}>
          <button type="submit" className="btn btn-default" onClick={() => {onClearClick(props)}}>Clear</button>
          <div className="form-group">
            <input type="number" className="form-control" name="Size Limit" placeholder="Limit #" min='20' max='200' style={{width:100}}/>
          </div>
          <button className="btn btn-default" onClick={props.updateData}>Update</button>
        </form>
        <ul className="nav navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/verified">Verified</Link></li>
          <li><Link to="/about">About<span className="sr-only">(current)</span></Link></li>
        </ul>
        <div className="navbar-header navbar-right">
          {/*https://assets.materialup.com/uploads/48c40118-e207-4289-a125-b5c0ebfdf60e/thumbnail.png*/}
          <img className="navbar-brand" alt="Safety Net" src="https://d30y9cdsu7xlg0.cloudfront.net/png/14589-200.png" style={{width:50, height:'auto', padding:0, margin:0}}/>
        </div>
      </div>
    </nav>
  );
};

const Navbar = connect(null, mapDispatchToProps)(NavbarContainer);

export default Navbar;