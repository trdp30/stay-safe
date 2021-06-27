import React, { useContext, useLayoutEffect } from "react";
import AppContainer from "../components/app-container";
import SpinLoading from "../components/spin-loader";
import { AuthContext } from "../contexts/auth-context";

function Dashboard(props) {
  const { history } = props;
  const { isAdmin, isAuthenticated } = useContext(AuthContext);

  useLayoutEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        history.push("/admin-dashboard");
      } else {
        history.push("/home");
      }
    } else {
      history.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isAdmin]);

  return (
    <AppContainer>
      <div className="twelve wide column text-center">
        <SpinLoading />
      </div>
    </AppContainer>
  );
}

export default Dashboard;
