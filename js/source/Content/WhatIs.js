/*********************************************************************/
/* What Is Giuseppe                                                  */
/* (c) 2017 Peano System Inc.                                        */
/*********************************************************************/
'use strict';
import React from 'react';
import C, { OPERATION_MODE } from '../Constant.js';
import { store, delayExec } from '../Reducer.js';
import Utility from '../Utility.js';

/*********************************************************************/
/* Constants                                                         */
/*********************************************************************/
const SCREEN_ID = 'WHAT_IS';

const INITIAL_SCREEN = {
  uri: '#/whatis/',
  screenId: SCREEN_ID,
  user: null,
  navi: SCREEN_ID,
  title: 'Giuseppeとは',
  data: {},
};

/*********************************************************************/
/* Reducer                                                           */
/*********************************************************************/
export function reducer(state, action) {
  let ret = Utility.clone(state);
  if (OPERATION_MODE == C.MODE.MOCKUP) {
    ret.modal.loading = true;
    let api = INITIAL_SCREEN;
    api.user = state.api.user;
    delayExec(
      Utility.createAction('LOADER', 'LOADED', { api: api })
    );
  }
  return ret;
}

/*********************************************************************/
/* [WhatIs] What Is                                                  */
/*********************************************************************/
class WhatIs extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Utility.updateMeta(this.props.state);
    return;
  }

  render() {
    return(
      <section className="contents">
        <article>
          <h2>Giuseppeとは</h2>
          <ul>
            <li>ウェブアプリのモックアップデザインパターン。</li>
          </ul>
        </article>
      </section>
    );
  }

}

/*********************************************************************/
/* Export                                                            */
/*********************************************************************/
export default WhatIs;
