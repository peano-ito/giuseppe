/*********************************************************************/
/* Login                                                             */
/* (c) 2017 Peano System Inc.                                        */
/*********************************************************************/
'use strict';
import React from 'react';
import { store, delayExec } from './Reducer.js';
import Utility from './Utility.js';

/*********************************************************************/
/* Constants                                                         */
/*********************************************************************/
const SCREEN_ID = 'LOGIN';
const USER = {
  user_id: 1,
  user_name: 'じゅせっぺ',
};

/*********************************************************************/
/* Dispatch                                                          */
/*********************************************************************/
const dispatch = {
  dispDialog: (e) => {
    e.stopPropagation();
    store.dispatch(Utility.createAction(SCREEN_ID, 'DIALOG'));
    return;
  },
  login: (e) => {
    e.stopPropagation();
    store.dispatch(Utility.createAction(SCREEN_ID, 'LOGIN'));
    return;
  },
  close: (e) => {
    e.stopPropagation();
    store.dispatch(Utility.createAction(SCREEN_ID, 'CLOSE'));
    return;
  },
  logout: (e) => {
    e.stopPropagation();
    store.dispatch(Utility.createAction(SCREEN_ID, 'LOGOUT'));
    return;
  },
  onChangeId: (e) => {
    e.stopPropagation();
    store.dispatch(Utility.createAction(SCREEN_ID, 'CHANGE', { login_id: e.target.value }));
    return;
  },
  onChangePassword: (e) => {
    e.stopPropagation();
    store.dispatch(Utility.createAction(SCREEN_ID, 'CHANGE', { password: e.target.value }));
    return;
  },
};

/*********************************************************************/
/* Reducer                                                           */
/*********************************************************************/
export function reducer(state, action) {
  let ret = Utility.clone(state);
  if (action.action == 'DIALOG') {
    ret.modal.login_dialog = true;
  } else if (action.action == 'CLOSE') {
    ret.modal.login_dialog  = false;
    ret.form.login.login_id = '';
    ret.form.login.password = '';
  } else if (action.action == 'LOGIN') {
    let api = Utility.clone(state.api);
    api.user = USER;
    ret.modal.loading = true;
    delayExec(Utility.createAction('LOADER', 'LOADED', { api: api }));
  } else if (action.action == 'LOGOUT') {
    let api = Utility.clone(state.api);
    api.user = null;
    ret.loading = true;
    delayExec(Utility.createAction('LOADER', 'LOADED', { api: api }));
  } else if (action.action == 'CHANGE') {
    Object.keys(action.data).forEach(function(key) {
      ret.form.login[key] = action.data[key];
    });
  }
  return ret;
}

/*********************************************************************/
/* [Button] Login Button                                             */
/*********************************************************************/
class Button extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="loginControl">
        {(() => {
          return this.props.state.api.user != null ?
            <button type="button" id="btn-logout" onClick={dispatch.logout}>ログアウト</button> :
            <button type="button" id="btn-login" onClick={dispatch.dispDialog}>ログイン</button>;
        })()}
      </div>
    );
  }

}

/*********************************************************************/
/* [Dialog] Login Dialog                                             */
/*********************************************************************/
class Dialog extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let form = this.props.state.form.login;
    return(
      <div id="dlg-login">
        <form>
          <table>
            <tbody>
              <tr>
                <th>ログインID:</th>
                <td><input type="text" onChange={dispatch.onChangeId} value={form.login_id}/></td>
              </tr>
              <tr>
                <th>パスワード:</th>
                <td><input type="password" onChange={dispatch.onChangePassword} value={form.password}/></td>
              </tr>
            </tbody>
          </table>
          <div className="buttons">
            <button type="button" id="btn-login" onClick={dispatch.login}>ログイン</button>
            &nbsp;
            <button type="button" id="btn-close" onClick={dispatch.close}>閉じる</button>
          </div>
        </form>
      </div>
    );
  }

}

/*********************************************************************/
/* Export                                                            */
/*********************************************************************/
export default {
  Button: Button,
  Dialog: Dialog,
};

