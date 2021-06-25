import React, { useMemo } from "react";
import AlertBox from "./alert-box";
import Dropdown from "./form-helpers/form-dropdown";
import FormBase from "./form-helpers/base";
import { requiredCheck } from "../utils/validations";
import Input from "./form-helpers/input";
import clsx from "clsx";
import Calendar from "./form-helpers/calendar";
import { toastError } from "./toast-helpers";

const fields = [
  {
    type: "dropdown",
    initialValue: { id_proof_type: "" },
    valuePath: "id_proof_type",
    label: "Select Id Proof",
    isRequired: true,
    placeholder: "Select Id Proof",
    Component: Dropdown,
    formGroupClassNames: "padding-md-top",
    labelClassNames: "text-size-normal text-color-black",
    listSource: [
      {
        key: "1",
        value: "1",
        text: "Aadhar Card"
      },
      {
        key: "2",
        value: "2",
        text: "PAN Card"
      },
      {
        key: "3",
        value: "3",
        text: "Voter Card"
      }
    ],
    validate: (values) => requiredCheck(values, "id_proof_type")
  },
  {
    type: "text",
    initialValue: { id_number: "" },
    valuePath: "id_number",
    label: "Enter selected Id Card Number",
    isRequired: true,
    placeholder: "Enter Id card number",
    Component: Input,
    formGroupClassNames: "padding-md-top",
    labelClassNames: "text-size-normal text-color-black",
    validate: (values) => requiredCheck(values, "id_number")
  },
  {
    type: "text",
    initialValue: { name: "" },
    valuePath: "name",
    label: "Name as per given in the ID Proof",
    isRequired: true,
    placeholder: "Enter Name",
    Component: Input,
    formGroupClassNames: "padding-md-top",
    labelClassNames: "text-size-normal text-color-black",
    validate: (values) => requiredCheck(values, "name")
  },
  {
    type: "text",
    initialValue: { dob: "" },
    valuePath: "dob",
    label: "Name as per given in the ID Proof",
    isRequired: true,
    placeholder: "Enter Date of birth as per given in the selected Id Card",
    Component: Calendar,
    formGroupClassNames: "padding-md-top",
    labelClassNames: "text-size-normal text-color-black",
    validate: (values) => requiredCheck(values, "dob")
  }
];

const ButtonView = ({ status, isSubmitting, toggleView }) => (
  <div className="field text-center">
    <p className="text-color-negative margin-bottom-five form-error-block">
      {status ? "Error generating event data. Please try again." : ""}
    </p>
    <button
      className="ui positive basic button button-size-medium margin-right-twenty text-weight-normal"
      onClick={toggleView}
      disabled={isSubmitting}>
      Cancel
    </button>
    <button
      type="submit"
      className={clsx("ui positive button button-size-medium text-weight-normal", {
        loading: isSubmitting
      })}
      disabled={isSubmitting}>
      Add Member
    </button>
  </div>
);

function AddMemberModal(props) {
  const { openModal, toggleModal, addMember } = props;
  const initialValues = useMemo(
    () => ({
      id_proof_type: "",
      id_number: "",
      name: "",
      dob: ""
    }),
    []
  );

  const save = (values, actions) => {
    const onSuccess = () => {
      actions.setSubmitting(false);
      toggleModal(false);
    };

    const onFailed = (error) => {
      actions.setSubmitting(false);
      actions.setStatus(error);
      toastError(error);
    };
    addMember(values, {
      onFailed,
      onSuccess
    });
  };

  const closeModal = () => {
    toggleModal(false);
  };
  return (
    <AlertBox
      size={"tiny"}
      open={openModal}
      headerText={"Add Member"}
      close={() => toggleModal(false)}
      showPositive={true}
      hideActions={true}
      showCloseButton={false}
      // closeOnEscape={!isCreating}
      // closeOnDimmerClick={!isCreating}
      // disabledCloseButton={isCreating}
    >
      <div className="ui centered grid margin-no">
        <div className="fourteen wide column">
          <FormBase
            fields={fields}
            postRequest={save}
            initialValues={initialValues}
            customButtonProps={{
              toggleView: closeModal
            }}
            CustomButton={ButtonView}
            hasCustomButton={true}
            formClassNames={"padding-md-vertical"}
            submitButtonFieldClassNames={"field text-center"}
          />
        </div>
      </div>
    </AlertBox>
  );
}

export default AddMemberModal;
