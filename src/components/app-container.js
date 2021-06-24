import React from "react";

function AppContainer(props) {
  return (
    <div className="ui middle aligned centered stackable grid margin-no app-container">
      <div className="row">{props.children}</div>
    </div>
  );
}

export default AppContainer;
