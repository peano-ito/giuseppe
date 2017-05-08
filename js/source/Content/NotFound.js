/*********************************************************************/
/* Not Found                                                         */
/* (c) 2017 Peano System Inc.                                        */
/*********************************************************************/
'use strict';
import React from 'react';
import Utility from '../Utility.js';

/*********************************************************************/
/* [NotFound] Not Found                                              */
/*********************************************************************/
class NotFound extends React.Component {

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
          <h2>ありません</h2>
          <p>お掛けになった電話番号は現在使われておりません。もう一度ご確認の上お掛け直しください。</p>
        </article>
      </section>
    );
  }

}

/*********************************************************************/
/* Export                                                            */
/*********************************************************************/
export default NotFound;
