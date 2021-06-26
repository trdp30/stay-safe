import { memberActionTypes as types } from "../action-types";

export function storeMember(payload) {
  return {
    type: types.MEMBER_REQUEST_SUCCEED,
    payload
  };
}

export function findByIdMember({ member_id, actions }) {
  return {
    type: types.MEMBER_FIND_BY_ID_REQUEST_INITIATED,
    member_id,
    actions
  };
}

export function createMember({ payload, actions }) {
  return {
    type: types.MEMBER_CREATE_REQUEST_INITIATED,
    payload,
    actions
  };
}

export function findAllMember({ actions }) {
  return {
    type: types.MEMBER_FIND_ALL_REQUEST_INITIATED,
    actions
  };
}

export function memberBookAppointment({ payload, actions }) {
  return {
    type: types.MEMBER_BOOK_APPOINTMENT_REQUEST_INITIATED,
    actions,
    payload
  };
}
