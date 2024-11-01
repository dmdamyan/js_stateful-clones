'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateCopy = {};

  Object.assign(stateCopy, state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        stateCopy[key] = action.extraData[key];
      }

      stateHistory.push(stateCopy);
    } else if (action.type === 'removeProperties') {
      for (const key in action.keysToRemove) {
        delete stateCopy[key];
      }

      stateHistory.push(stateCopy);
    } else if (action.type === 'clear') {
      for (const key of Object.keys(state)) {
        delete stateCopy[key];
      }

      stateHistory.push(stateCopy);
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
