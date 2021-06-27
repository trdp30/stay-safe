import React, { useContext, useLayoutEffect } from "react";
import { AuthContext } from "../../contexts/auth-context";

function AdminDashboard(props) {
  const { history } = props;
  const { isAdmin } = useContext(AuthContext);

  useLayoutEffect(() => {
    if (!isAdmin) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  return <div>AdminDashboard</div>;
}

export default AdminDashboard;
