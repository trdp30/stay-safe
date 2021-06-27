import clsx from "clsx";
import React from "react";
import AlertBox from "./alert-box";

function ConfirmModal(props) {
  const { openModal, toggleModal, onConfirmClick, isBooking } = props;

  const closeModal = () => {
    toggleModal(false);
  };

  return (
    <AlertBox
      size={"tiny"}
      open={openModal}
      hideHeader={true}
      close={() => toggleModal(false)}
      showPositive={true}
      hideActions={true}
      showCloseButton={false}
      closeOnEscape={false}
      closeOnDimmerClick={false}>
      <div className="ui centered grid margin-no">
        <div className="fourteen wide column padding-no">
          <h2>Heads up!</h2>
          <p>Once you place the Appointment you cannot update it.</p>
          <p>Vaccination date will be notify you when slot become available.</p>
          <p className="text-center">
            <div
              className={clsx("ui blue basic button", { disabled: isBooking })}
              onClick={closeModal}>
              Cancel
            </div>
            <div
              className={clsx("ui blue button", { loading: isBooking }, { disabled: isBooking })}
              onClick={onConfirmClick}>
              Confirm
            </div>
          </p>
        </div>
      </div>
    </AlertBox>
  );
}

export default ConfirmModal;
