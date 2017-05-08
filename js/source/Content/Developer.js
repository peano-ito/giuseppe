/*********************************************************************/
/* Developer                                                         */
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
const SCREEN_ID = 'DEVELOPER';

const INITIAL_SCREEN = {
  uri: '#/developer/',
  screenId: SCREEN_ID,
  user: null,
  navi: SCREEN_ID,
  title: '開発者',
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
/* [Developer] Developer                                             */
/*********************************************************************/
class Developer extends React.Component {

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
          <h2>開発者</h2>
          <dl>
            <dt><a href="https://twitter.com/peano_ito" target="blank">＠peano_ito</a></dt>
            <dd>株式会社ぺあのしすてむ 代表取締役 伊藤昭浩</dd>
          </dl>
        </article>
      </section>
    );
  }

}

/*********************************************************************/
/* Export                                                            */
/*********************************************************************/
export default Developer;
