import { includes } from "lodash";
import produce from "immer";

function isValid(action, modelName) {
  const { payload } = action;
  return (
    action &&
    action.type &&
    typeof action.type == "string" &&
    modelName &&
    typeof modelName == "string" &&
    action.type.split("_")[0] === modelName.toUpperCase() &&
    payload &&
    payload.result &&
    payload.entities &&
    payload.entities[modelName]
  );
}

export const getAllIds = (modelName) => {
  return produce((draftState, action) => {
    if (
      action.type &&
      action.type.toLowerCase &&
      action.type.toLowerCase().includes(`${modelName}_reset_data`)
    ) {
      return [];
    } else if (
      action.type &&
      action.type.toLowerCase &&
      action.type.toLowerCase().includes(`${modelName}_delete_succeed`)
    ) {
      const index = draftState.findIndex((data) => data === action.id);
      if (index !== -1) draftState.splice(index, 1);
    } else {
      if (isValid(action, modelName)) {
        if (Array.isArray(action.payload.result) && action.payload.result.length) {
          action.payload.result.forEach((result) => {
            if (!includes(draftState, result)) {
              draftState.push({ id: result });
            }
          });
        } else {
          if (!includes(draftState, action.payload.result)) {
            draftState.push({ id: action.payload.result });
          }
        }
      }
    }
  }, []);
};

export const getById = (modelName) => {
  return produce((draftState, action) => {
    if (
      action.type &&
      action.type.toLowerCase &&
      action.type.toLowerCase().includes(`${modelName}_reset_data`)
    ) {
      return {};
    } else if (
      action.type &&
      action.type.toLowerCase &&
      action.type.toLowerCase().includes(`${modelName}_delete_succeed`)
    ) {
      delete draftState[action.id];
    } else {
      if (isValid(action, modelName)) {
        if (Array.isArray(action.payload.result) && action.payload.result.length) {
          action.payload.result.forEach((id) => {
            if (draftState[id] && Object.keys(draftState[id]).length) {
              draftState[id] = {
                ...draftState[id],
                ...action.payload.entities[modelName][id]
              };
            } else {
              draftState[id] = action.payload.entities[modelName][id];
            }
          });
        } else {
          const id = action.payload.result;
          if (draftState[id] && Object.keys(draftState[id]).length) {
            draftState[id] = {
              ...draftState[id],
              ...action.payload.entities[modelName][id]
            };
          } else {
            draftState[id] = action.payload.entities[modelName][id];
          }
        }
      }
    }
  }, {});
};
