/*********************************************************************/
/* Top Page                                                          */
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
const SCREEN_ID = 'TOP_PAGE';

const INITIAL_SCREEN = {
  uri: '#/',
  screenId: SCREEN_ID,
  user: null,
  navi: SCREEN_ID,
  title: 'トップページ',
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
/* [TopPage] Top Page                                                */
/*********************************************************************/
class TopPage extends React.Component {

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
          <h2>新着情報</h2>
          <dl>
            <dt>2017/5/8</dt>
            <dd>ウェブアプリ モックアップ デザイン「Giuseppe」をリリースしました。</dd>
            <dt>1932/4/20</dt>
            <dd>ペアノが永眠しました。</dd>
            <dt>1858/8/27</dt>
            <dd>ペアノが誕生しました。</dd>
          </dl>
        </article>
      </section>
    );
  }

}

/*********************************************************************/
/* Export                                                            */
/*********************************************************************/
export default TopPage;
