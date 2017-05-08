/*********************************************************************/
/* Dropdown Navigation                                               */
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
    TOP_PAGE: {
      item: 'トップページ',
      subItems: {}
    },
    WHAT_IS: {
      item: 'Giuseppeとは',
      subItems: {}
    },
    AAA: {
      item: '●●●管理',
      subItems: {
        AAA_A: 'XXXXX',
        AAA_B: 'YYYYY',
        AAA_C: 'ZZZZZ',
      }
    },
    BBB: {
      item: '○○○管理',
      subItems: {
        BBB_A: 'XXXXX',
        BBB_B: 'YYYYY',
        BBB_C: 'ZZZZZ',
      }
    },
    CCC: {
      item: '●●●管理',
      subItems: {
        CCC_A: 'XXXXX',
        CCC_B: 'YYYYY',
        CCC_C: 'ZZZZZ',
      }
    },
    DDD: {
      item: '○○○管理',
      subItems: {
        DDD_A: 'XXXXX',
        DDD_B: 'YYYYY',
        DDD_C: 'ZZZZZ',
      }
    },
  },
  LOGOUT: {
    TOP_PAGE: {
      item: 'トップページ',
      subItems: {}
    },
    WHAT_IS: {
      item: 'Giuseppeとは',
      subItems: {}
    },
  }
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
/* [DropdownNavi] Dropdown Navigation                                */
/*********************************************************************/
class DropdownNavi extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let func = this.props.state.api.navi;
    return(
      <section className={`band DropdownNavi ${this.props.state.customizer.navi.style}`}>
        {(() => {
          let items = NAVI_ITEMS[this.props.state.api.user != null ? 'LOGIN' : 'LOGOUT'];
          let list = [];
          for (var key in items) {
            let className = func == key ? 'selected' : 'unselected';
            let item = items[key];
            list.push(
              <li className={className} key={key} data-screenId={key} onClick={dispatch.onLoad}>
                <a href="#">{item.item}</a>
                {(() => {
                  if (Object.keys(item.subItems).length > 0) {
                    let list2 = []
                    for (var key2 in item.subItems) {
                      list2.push(
                        <li key={key2} data-screenId={key2} onClick={dispatch.onLoad}>
                          <a href="#">{item.subItems[key2]}</a>
                        </li>
                      );
                    }
                    return <ul>{list2}</ul>;
                  }
                })()}
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
export default DropdownNavi;
