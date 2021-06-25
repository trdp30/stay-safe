import moment from "moment";
import React, { useMemo } from "react";

function MemberDetailsCard(props) {
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
  } = props;

  const idCard = useMemo(() => {
    if (id_proof_type === 1) {
      return "Aadhar Card";
    } else if (id_proof_type === 2) {
      return "PAN Card";
    } else {
      return "Voter Card";
    }
  }, [id_proof_type]);

  return (
    <div className="ui segment">
      <div className="ui stackable grid margin-no" style={{ minHeight: 74 }}>
        <div className="row padding-no">
          <div className="sixteen wide column text-left text-size-large padding-vertical-vs text-color-primary">
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
      </div>
    </div>
  );
}

export default MemberDetailsCard;
