/*********************************************************************/
/* Static Pages                                                      */
/* (c) 2017 Peano System Inc.                                        */
/*********************************************************************/
'use strict';
import React from 'react';
import { store } from '../Reducer.js';
import Utility from '../Utility.js';

/*********************************************************************/
/* Constants                                                         */
/*********************************************************************/
const SCREEN_ID = 'STATIC';

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
/* [StaticPages] Static Pages                                        */
/*********************************************************************/
class StaticPages extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <section className="band StaticPages">
        <ul>
          <li data-screenId="GITHUB"><a href="https://github.com/peano-ito/giuseppe" target="_blank">GitHub</a></li>
          <li data-screenId="DEVELOPER" onClick={dispatch.onLoad}><a href="#">開発者</a></li>
          <li data-screenId="LICENSE" onClick={dispatch.onLoad}><a href="#">ライセンス</a></li>
        </ul>
      </section>
    );
  }

}

/*********************************************************************/
/* Export                                                            */
/*********************************************************************/
export default StaticPages;
