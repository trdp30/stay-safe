import clsx from "clsx";
import moment from "moment";
import React, { useMemo, useState } from "react";
import SelectDoseModal from "./select-dose-modal";

function MemberDetailsCard(props) {
  const { data, onMemberSelect, selectedMembers } = props;
  const [openSelectDoseModal, toggleSelectDoseModal] = useState(false);
  const {
    dob,
    dose_1,
    dose_2,
    id,
    id_number,
    id_proof_type,
    is_deleted,
    name,
    ref_number,
    secret,
    user_id
  } = data;

  const add = (dose) => {
    onMemberSelect({
      dose,
      id: id
    });
    toggleSelectDoseModal(false);
  };

  const isSelected = useMemo(() => {
    const index = selectedMembers.findIndex((m) => m.id === data.id);
    return index !== -1;
  }, [selectedMembers, data]);

  const idCard = useMemo(() => {
    if (id_proof_type === 1) {
      return "Aadhar Card";
    } else if (id_proof_type === 2) {
      return "PAN Card";
    } else {
      return "Voter Card";
    }
  }, [id_proof_type]);

  const onClick = () => {
    if (isSelected) {
      add(1);
    } else {
      toggleSelectDoseModal(true);
    }
  };

  return (
    <div className={clsx("ui segment", isSelected ? "green" : "yellow")}>
      <div className="ui stackable grid margin-no" style={{ minHeight: 74 }}>
        <div className="row padding-no">
          <div className="sixteen wide column text-left text-size-large padding-vertical-vs text-weight-bold">
            {name}
          </div>
        </div>
        <div className="row text-left padding-no">
          <div className="five wide column padding-vertical-vs">
            <span className="text-size-small margin-right-ten">Year of Birth:</span>
            <b>{moment(dob).format("YYYY")}</b>
          </div>
          <div className="five wide column padding-vertical-vs">
            <span className="text-size-small margin-right-ten">ID Card:</span>
            <b>{idCard}</b>
          </div>
          <div className="six wide column padding-vertical-vs">
            <span className="text-size-small margin-right-ten">ID Number:</span>
            <b>{id_number}</b>
          </div>
        </div>
        <div className="row text-left padding-vertical-vs">
          <div className="sixteen wide column text-center book-button">
            <div
              className={clsx("ui positive button", isSelected ? "" : "basic")}
              onClick={onClick}>
              {isSelected ? "Uncheck" : "Book Appointment"}
            </div>
          </div>
        </div>
      </div>
      {openSelectDoseModal ? (
        <SelectDoseModal
          openModal={openSelectDoseModal}
          toggleModal={toggleSelectDoseModal}
          onSelectDose={add}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default MemberDetailsCard;
