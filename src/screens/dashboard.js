import React, { useContext, useMemo } from "react";
import AppContainer from "../components/app-container";
import { AuthContext } from "../contexts/auth-context";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const phoneNumber = useMemo(() => {
    if (!user.isLoading && user.data && user.data.phone) {
      return user.data.phone;
    }
    return "";
  }, [user]);

  return (
    <AppContainer>
      <div className="centered fourteen wide column">
        <div className="ui segment login-wrapper">
          <div className="ui centered stackable grid margin-no height-full">
            <div className="row">
              <div className="twelve wide column">
                <h2>Account Details</h2>
                <h4>
                  Registered Mobile Number: XXXX-XXXX-XXXX-{phoneNumber && phoneNumber.slice(6, 10)}
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column">
                <div className="ui segments">
                  <div className="ui segment text-center">
                    <h4>No Member Registered</h4>
                  </div>
                  <div className="ui segment text-center">
                    <div className="ui positive button">Add Member</div>
                    <p>You can add member upto 4 members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default Dashboard;
