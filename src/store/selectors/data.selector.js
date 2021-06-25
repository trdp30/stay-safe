import { createSelector } from "reselect";

const generateList = (state, modelName) => {
  if (
    state &&
    state[String(modelName)] &&
    state[String(modelName)].data &&
    state[String(modelName)].data.byId &&
    Object.keys(state[String(modelName)].data.byId).length
  ) {
    return Object.values(state[String(modelName)].data.byId);
  }
};

export const getListData = () =>
  createSelector(generateList, (result) => {
    if (result && Array.isArray(result) && result.length) {
      return result;
    } else {
      return [];
    }
  });
