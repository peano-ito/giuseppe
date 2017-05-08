/*********************************************************************/
/* Customizer                                                        */
/* (c) 2017 Peano System Inc.                                        */
/*********************************************************************/
'use strict';
import React from 'react';
import { store } from './Reducer.js';
import Utility from './Utility.js';

/*********************************************************************/
/* Constants                                                         */
/*********************************************************************/
const THEME_COLOR = {
  A: {
    '--text-color':              '#000000',
    '--background-color':        '#FFFFFF',
    '--main-color':              '#008000',
    '--main-assoc-color':        '#FFFFFF',
    '--sub-color':               '#00EE00',
    '--sub-assoc-color':         '#FFFFFF',
    '--accent-color':            '#3333FF',
    '--accent-assoc-color':      '#FFFFFF',
    '--highlighted-color':       '#FF33FF',
    '--highlighted-assoc-color': '#FFFFFF',
    '--ok-color':                '#0000FF',
    '--ng-color':                '#FF0000',
  },
  B: {
    '--text-color':              '#000000',
    '--background-color':        '#FFFFFF',
    '--main-color':              '#FF0000',
    '--main-assoc-color':        '#FFFFFF',
    '--sub-color':               '#000000',
    '--sub-assoc-color':         '#FFFFFF',
    '--accent-color':            '#008000',
    '--accent-assoc-color':      '#FFFFFF',
    '--highlighted-color':       '#0000FF',
    '--highlighted-assoc-color': '#FFFFFF',
    '--ok-color':                '#0000FF',
    '--ng-color':                '#FF0000',
  },
  C: {
    '--text-color':              '#333333',
    '--background-color':        '#FAF1F2',
    '--main-color':              '#7A3849',
    '--main-assoc-color':        '#EEEEEE',
    '--sub-color':               '#666666',
    '--sub-assoc-color':         '#EEEEEE',
    '--accent-color':            '#305C37',
    '--accent-assoc-color':      '#EEEEEE',
    '--highlighted-color':       '#B66BB6',
    '--highlighted-assoc-color': '#EEEEEE',
    '--ok-color':                '#244077',
    '--ng-color':                '#875548',
  },
  D: {
    '--text-color':              '#333333',
    '--background-color':        '#FCFCF6',
    '--main-color':              '#4B4238',
    '--main-assoc-color':        '#FFFFFF',
    '--sub-color':               '#BAB7A3',
    '--sub-assoc-color':         '#FFFFFF',
    '--accent-color':            '#DB7093',
    '--accent-assoc-color':      '#FFFFFF',
    '--highlighted-color':       '#82B340',
    '--highlighted-assoc-color': '#FFFFFF',
    '--ok-color':                '#0000FF',
    '--ng-color':                '#FF0000',
  },
};

/*********************************************************************/
/* Switch Theme Color                                                */
/*********************************************************************/
function switchThemeColor(key) {
  let color = THEME_COLOR[key];
  for (var variable in color) {
    document.documentElement.style.setProperty(variable, color[variable]);
  }
  return;
}
// Initialize
switchThemeColor('A');

/*********************************************************************/
/* Dispatch                                                          */
/*********************************************************************/
const dispatch = {
  selectThemeColor: (e) => {
    e.stopPropagation();
    store.dispatch(Utility.createAction('CUSTOMIZER', 'COLOR', { color: e.target.value }));
    return;
  },
  selectNaviDesign: (e) => {
    e.stopPropagation();
    store.dispatch(Utility.createAction('CUSTOMIZER', 'NAV_DESIGN', { design: e.target.value }));
    return;
  },
  selectNaviStyle: (e) => {
    e.stopPropagation();
    store.dispatch(Utility.createAction('CUSTOMIZER', 'NAV_STYLE', { style: e.target.value }));
    return;
  },
};

/*********************************************************************/
/* Reducer                                                           */
/*********************************************************************/
export function reducer(state, action) {
  var ret = state;
  if (action.action == 'COLOR') {
    ret = Utility.clone(state);
    ret.customizer.color = action.data.color;
    switchThemeColor(action.data.color);
  } else if (action.action == 'NAV_DESIGN') {
    ret = Utility.clone(state);
    ret.customizer.navi.design = action.data.design;
    ret.customizer.navi.style  = state.customizer.navi.old[action.data.design];
  } else if (action.action == 'NAV_STYLE') {
    ret = Utility.clone(state);
    ret.customizer.navi.style = action.data.style;
    ret.customizer.navi.old[state.customizer.navi.design] = action.data.style;
  }
  return ret;
}

/*********************************************************************/
/* [Customizer] Customizer                                           */
/*********************************************************************/
class Customizer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <section className="band Customizer">
        <div>
          <span>
            <span>テーマカラー:</span>
            <select value={this.props.state.customizer.color} onChange={dispatch.selectThemeColor.bind(this)}>
              <option value="A">A案: 新緑</option>
              <option value="B">B案: 情熱</option>
              <option value="C">C案: あずき</option>
              <option value="D">D案: ノスタルジー</option>
            </select>
          </span>
          <span>
            <span>ナビ設計:</span>
            <select value={this.props.state.customizer.navi.design} onChange={dispatch.selectNaviDesign.bind(this)}>
              <option value="a">(a)案: シングルナビゲーション</option>
              <option value="b">(b)案: ドロップダウン</option>
            </select>
          </span>
          <span>
            <span>ナビスタイル:</span>
            {(() => {
              if (this.props.state.customizer.navi.design == 'a') {
                return(
                  <select value={this.props.state.customizer.navi.style} onChange={dispatch.selectNaviStyle.bind(this)}>
                    <option value="D1">(a)-①案:</option>
                    <option value="D2">(a)-②案:</option>
                  </select>
                );
              } else {
                return(
                  <select value={this.props.state.customizer.navi.style} onChange={dispatch.selectNaviStyle.bind(this)}>
                    <option value="D1">(b)-①案:</option>
                    <option value="D2">(b)-②案:</option>
                    <option value="D3">(b)-③案:</option>
                  </select>
                );
              }
            })()}
          </span>
        </div>
      </section>
    );
  }

}

/*********************************************************************/
/* Export                                                            */
/*********************************************************************/
export default Customizer;
