/*********************************************************************/
/* Utilities                                                         */
/* (c) 2017 Peano System Inc.                                        */
/*********************************************************************/
import deepcopy from 'deepcopy';
import C from './Constant.js';

/*********************************************************************/
/* Action                                                            */
/*********************************************************************/
function createAction(type, action, data) {
  return {
    type: type,
    action: action,
    data: typeof data !== 'undefined' ? data : {},
  };
}

/*********************************************************************/
/* Meta                                                              */
/*********************************************************************/
function updateMeta(state) {
  if (state.api.screenId != 'NF') {
    location.hash = state.api.uri;
  }
  document.title = C.RESOURCE.TITLE + ' | ' + state.api.title;
  return;
}

/*********************************************************************/
/* Export                                                            */
/*********************************************************************/
export default {
  clone: deepcopy,
  createAction: createAction,
  updateMeta: updateMeta,
};
