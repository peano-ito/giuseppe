/*********************************************************************/
/* Single Navigation                                                 */
/* (c) 2017 Peano System Inc.                                        */
/*********************************************************************/
'use strict';
import React from 'react';
import { store } from '../Reducer.js';
import Utility from '../Utility.js';


/*********************************************************************/
/* Constants                                                         */
/*********************************************************************/
const NAVI_ITEMS = {
  LOGIN: {
    TOP_PAGE: 'トップページ',
    WHAT_IS:  'Giuseppeとは',
    AAA: '●●●管理',
    BBB: '○○○管理',
    CCC: '●●●管理',
    DDD: '○○○管理',
  },
  LOGOUT: {
    TOP_PAGE: 'トップページ',
    WHAT_IS:  'Giuseppeとは',
  },
};

/*********************************************************************/
/* Dispatch                                                          */
/*********************************************************************/
const dispatch = {
  onLoad: (e) => {
    e.stopPropagation();
    let screenId = e.currentTarget.getAttribute('data-screenId');
    store.dispatch(
      Utility.createAction(screenId, 'LOAD')
    );
    return;
  },
};

/*********************************************************************/
/* [SingleNavi] Single Navigation                                    */
/*********************************************************************/
class SingleNavi extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    let func = this.props.state.api.navi;
    return(
      <section className={`band SingleNavi ${this.props.state.customizer.navi.style}`}>
        {(() => {
          let items = NAVI_ITEMS[this.props.state.api.user != null ? 'LOGIN' : 'LOGOUT'];
          let list = [];
          for (var key in items) {
            let className = func == key ? 'selected' : 'unselected';
            list.push(
              <li className={className} key={key} data-screenId={key} onClick={dispatch.onLoad}>
                <a href="#">{items[key]}</a>
              </li>
            );
          }
          return <ul>{list}</ul>;
        })()}
      </section>
    );
  }

}

/*********************************************************************/
/* Export                                                            */
/*********************************************************************/
export default SingleNavi;
