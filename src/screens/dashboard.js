import React, { useContext, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import AddMemberModal from "../components/add-member-modal";
import AppContainer from "../components/app-container";
import ConfirmModal from "../components/confirm-modal";
import MemberDetailsCard from "../components/member-details-card";
import { AuthContext } from "../contexts/auth-context";
import { createMember, findAllMember } from "../store/actions/member.action";
import { getListData } from "../store/selectors/data.selector";

function Dashboard(props) {
  const { members, fetchAllMember, addMember } = props;
  const { user } = useContext(AuthContext);
  const [isMemberLoading, toggleMemberLoading] = useState(false);
  const [openAddMemberModal, toggleAddMemberModal] = useState(false);
  const [selectedMembers, updateSelectedMember] = useState([]);
  const [openConfirmModal, toggleConfirmModal] = useState(false);

  const phoneNumber = useMemo(() => {
    if (!user.isLoading && user.data && user.data.phone) {
      return user.data.phone;
    }
    return "";
  }, [user]);

  const shouldAddMemberButton = useMemo(() => {
    return !isMemberLoading && members && members.length < 4;
  }, [members, isMemberLoading]);

  useEffect(() => {
    if (user && user.data && user.data.id) {
      toggleMemberLoading(true);
      fetchAllMember({
        onSuccess: () => toggleMemberLoading(false),
        onFailed: () => toggleMemberLoading(false)
      });
    }
  }, [user, fetchAllMember]);

  const onMemberSelect = (value) => {
    updateSelectedMember((prev) => {
      const index = prev.findIndex((m) => m.id === value.id);
      if (index === -1) {
        return prev.concat(value);
      } else {
        return prev.filter((m) => m.id !== value.id);
      }
    });
  };

  const onConfirmClick = () => {};

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
                  <div>XXXXX-X{phoneNumber ? phoneNumber.slice(6, 10) : "----"}</div>
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column">
                <div className="ui segment text-center">
                  {!isMemberLoading && members && members.length ? (
                    <>
                      {members.map((member) => (
                        <MemberDetailsCard
                          key={member.id}
                          data={member}
                          selectedMembers={selectedMembers}
                          onMemberSelect={onMemberSelect}
                        />
                      ))}
                    </>
                  ) : (
                    <h4>No Member Registered</h4>
                  )}
                </div>
                {shouldAddMemberButton ? (
                  <div className="ui segment text-center border-none box-shadow-none">
                    <div className="ui positive button" onClick={() => toggleAddMemberModal(true)}>
                      Add Member
                    </div>
                    <p className="margin-top-ten">You can add member upto 4</p>
                  </div>
                ) : (
                  <></>
                )}
                {selectedMembers.length ? (
                  <div className="ui segment text-center border-none box-shadow-none">
                    <div
                      className="ui blue button padding-vertical-bg"
                      onClick={() => toggleConfirmModal(true)}>
                      Schedule Appointment
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openAddMemberModal ? (
        <AddMemberModal
          openModal={openAddMemberModal}
          toggleModal={toggleAddMemberModal}
          addMember={addMember}
        />
      ) : (
        <></>
      )}
      {openConfirmModal ? (
        <ConfirmModal
          openModal={openConfirmModal}
          toggleModal={toggleConfirmModal}
          onConfirmClick={onConfirmClick}
        />
      ) : (
        <></>
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
