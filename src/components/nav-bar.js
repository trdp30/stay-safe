import React from "react";
import { connect } from "react-redux";
import { unAuthenticateInitiate } from "../store/actions/session.action";

function NavBar(props) {
  const { logout } = props;
  return (
    <div className="nav-bar-container">
      <div className="ui inverted menu nav-bar border-radius-none">
        <div className="ui item logo">
          <div className="ui tiny image logo-text">StaySafe</div>
        </div>
        <div className="right menu">
          <div className="ui item " onClick={logout}>
            Sign out
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.session.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(unAuthenticateInitiate())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
