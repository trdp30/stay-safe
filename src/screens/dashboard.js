import React, { useContext, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import AddMemberModal from "../components/add-member-modal";
import AppContainer from "../components/app-container";
import MemberDetailsCard from "../components/member-details-card";
import { AuthContext } from "../contexts/auth-context";
import { createMember, findAllMember } from "../store/actions/member.action";
import { getListData } from "../store/selectors/data.selector";

function Dashboard(props) {
  const { members, fetchAllMember, addMember } = props;
  const { user } = useContext(AuthContext);
  const [isMemberLoading, toggleMemberLoading] = useState(false);
  const [openAddMemberModal, toggleAddMemberModal] = useState(false);

  const phoneNumber = useMemo(() => {
    if (!user.isLoading && user.data && user.data.phone) {
      return user.data.phone;
    }
    return "";
  }, [user]);

  const shouldAddMemberButton = useMemo(() => {
    return !isMemberLoading && members && members.length && members.length <= 4;
  });

  useEffect(() => {
    if (user && user.data && user.data.id) {
      toggleMemberLoading(true);
      fetchAllMember({
        onSuccess: () => toggleMemberLoading(false),
        onFailed: () => toggleMemberLoading(false)
      });
    }
  }, [user, fetchAllMember]);

  return (
    <AppContainer>
      <div className="centered fourteen wide column">
        <div className="ui segment dashboard-container">
          <div className="ui centered stackable grid margin-no height-full">
            <div className="row">
              <div className="twelve wide column">
                <h2>Account Details</h2>
                <h4>
                  Registered Mobile Number:
                  <div>XXXXX-X{phoneNumber && phoneNumber.slice(6, 10)}</div>
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column">
                <div className="ui segment text-center">
                  {!isMemberLoading && members && members.length ? (
                    <div>
                      {members.map((member) => (
                        <MemberDetailsCard key={member.id} {...member} />
                      ))}
                    </div>
                  ) : (
                    <h4>No Member Registered</h4>
                  )}
                </div>
                {shouldAddMemberButton && (
                  <div className="ui segment text-center">
                    <div className="ui positive button" onClick={() => toggleAddMemberModal(true)}>
                      Add Member
                    </div>
                    <p className="margin-top-ten">You can add member upto 4 members</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openAddMemberModal && (
        <AddMemberModal
          openModal={openAddMemberModal}
          toggleModal={toggleAddMemberModal}
          addMember={addMember}
        />
      )}
    </AppContainer>
  );
}

const mapStateToProps = () => {
  const getData = getListData();
  return (state) => ({
    members: getData(state, "member")
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllMember: (actions = {}) => dispatch(findAllMember({ actions })),
  addMember: (payload, actions = {}) => dispatch(createMember({ payload, actions }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
