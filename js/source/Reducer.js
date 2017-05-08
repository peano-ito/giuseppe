/*********************************************************************/
/* Reducer                                                           */
/* (c) 2017 Peano System Inc.                                        */
/*********************************************************************/
'use strict';
import { createStore } from 'redux';
import C, { OPERATION_MODE } from './Constant.js';
import Customizer from './Customizer.js';
import Utility from './Utility.js';
import { reducer as customizerReducer } from './Customizer.js';
import { reducer as loginReducer } from './Login.js';
import { reducer as topPageReducer } from './Content/TopPage.js';
import { reducer as whatIsReducer } from './Content/WhatIs.js';
import { reducer as developerReducer } from './Content/Developer.js';
import { reducer as licenseReducer } from './Content/License.js';

/*********************************************************************/
/* Constants                                                         */
/*********************************************************************/
const NOT_FOUND = {
  uri: '#/notfound',
  user: null,
  screenId: 'NF',
  navi: 'NF',
  title: 'Not Found',
  data: {},
};

const INITIAL_STATE = {
  customizer: {
    color: 'A',
    navi: {
      design: 'a',
      style: 'D1',
      old: {
        a: 'D1',
        b: 'D1',
      }
    }
  },
  api: NOT_FOUND, // TODO: default
  modal: {
    loading: false,
    login_dialog: false,
  },
  form: {
    login: {
      login_id: '',
      password: '',
    },
  }
};

const SCREEN_REDUCER_MAP = {
  CUSTOMIZER: customizerReducer,
  LOGIN:      loginReducer,
  TOP_PAGE:   topPageReducer,
  WHAT_IS:    whatIsReducer,
  DEVELOPER:  developerReducer,
  LICENSE:    licenseReducer,
};

const SCREEN_ID_MAP = {
  '#/':           'TOP_PAGE',
  '#/whatis/':    'WHAT_IS',
  '#/developer/': 'DEVELOPER', 
  '#/license/':   'LICENSE', 
};

/*********************************************************************/
/* First Action                                                      */
/*********************************************************************/
export function dispatchFirstAction() {
  let hash = location.hash.startsWith('#') ? location.hash : '#' + location.hash;
  let uri = hash.endsWith('/') ? hash : hash + '/';
  let screenId = uri in SCREEN_ID_MAP ? SCREEN_ID_MAP[uri] : 'NF';
  store.dispatch({
    type: screenId,
    action: 'LOAD',
    data: {}
  });
  return;
}

/*********************************************************************/
/* [Mockup Function] Delay Execution                                 */
/*********************************************************************/
export function delayExec(action, msec) {
  if (OPERATION_MODE == C.MODE.MOCKUP) {
    setTimeout(() => {
      store.dispatch(action);
      return;
    }, typeof msec !== 'undefined' ? msec : 500);
  }
  return;
}

/*********************************************************************/
/* [Mockup Function] mockupReducer                                   */
/*********************************************************************/
function mockupReducer(state, action) {
  let ret = Utility.clone(state);
  if (OPERATION_MODE == C.MODE.MOCKUP) {
    if (action.type == 'LOADER') {
      if (action.action == 'LOADED') {
        ret.modal.loading = false;
        ret.modal.login_dialog = false;
        ret.api = action.data.api;
      }
    } else {
      if (action.action == 'LOAD') {
        let api = NOT_FOUND
        api.user = state.api.user;
        ret.modal.loading = true;
        delayExec(Utility.createAction('LOADER', 'LOADED', { api: api }));
      }
    }
  }
  return ret;
}

/*********************************************************************/
/* couplingReducer                                                   */
/*********************************************************************/
function couplingReducer(state, action) {
  // TODO: 
  return state;
}

/*********************************************************************/
/* Reducer                                                           */
/*********************************************************************/
function reducer(state, action) {
  var ret = null;
  if (action.type in SCREEN_REDUCER_MAP) {
    ret = SCREEN_REDUCER_MAP[action.type](state, action);
  } else {
    ret = OPERATION_MODE == C.MODE.MOCKUP ?
      mockupReducer(state, action) :
      couplingReducer(state, action);
  }
  return ret;
}

/*********************************************************************/
/* Store                                                             */
/*********************************************************************/
export const store = createStore(reducer, INITIAL_STATE);

/*********************************************************************/
/* Export                                                            */
/*********************************************************************/

