/*********************************************************************/
/* License                                                           */
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
const SCREEN_ID = 'LICENSE';

const INITIAL_SCREEN = {
  uri: '#/license/',
  screenId: SCREEN_ID,
  user: null,
  navi: SCREEN_ID,
  title: 'ライセンス',
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
/* [License] License                                                 */
/*********************************************************************/
class License extends React.Component {

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
          <h2>ライセンス</h2>
<pre>
MIT License<br/>
<br/>
Copyright (c) 2017 Peano System Inc.<br/>
<br/>
Permission is hereby granted, free of charge, to any person obtaining a copy<br/>
of this software and associated documentation files (the "Software"), to deal<br/>
in the Software without restriction, including without limitation the rights<br/>
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell<br/>
copies of the Software, and to permit persons to whom the Software is<br/>
furnished to do so, subject to the following conditions:<br/>
<br/>
The above copyright notice and this permission notice shall be included in all<br/>
copies or substantial portions of the Software.<br/>
<br/>
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR<br/>
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,<br/>
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE<br/>
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER<br/>
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,<br/>
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE<br/>
SOFTWARE.<br/>
</pre>
        </article>
      </section>
    );
  }

}

/*********************************************************************/
/* Export                                                            */
/*********************************************************************/
export default License;
