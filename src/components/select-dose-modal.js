import clsx from "clsx";
import React from "react";
import AlertBox from "./alert-box";

function SelectDoseModal(props) {
  const { openModal, toggleModal, onSelectDose, firstDoseStatus, secondDoseStatus } = props;

  return (
    <AlertBox
      size={"tiny"}
      open={openModal}
      hideHeader={true}
      close={() => toggleModal(false)}
      showPositive={true}
      hideActions={true}
      showCloseButton={false}>
      <div className="ui centered grid margin-no">
        <div className="fourteen wide column padding-no">
          <h2>Select Dose no.</h2>
          <div className="text-center">
            <div
              className={clsx("ui green basic button", { disabled: firstDoseStatus })}
              onClick={() => onSelectDose(1)}>
              Dose 1
            </div>
            <div
              className={clsx("ui blue basic button", { disabled: secondDoseStatus })}
              onClick={() => onSelectDose(2)}>
              Dose 2
            </div>
          </div>
        </div>
      </div>
    </AlertBox>
  );
}

export default SelectDoseModal;
