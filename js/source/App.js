/*********************************************************************/
/* Application                                                       */
/* (c) 2017 Peano System Inc.                                        */
/*********************************************************************/
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import C, { OPERATION_MODE } from './Constant.js';
import { store, dispatchFirstAction } from './Reducer.js';
import Utility from './Utility.js';
import Customizer from './Customizer.js';
import Login from './Login.js';
import SingleNavi from './Navigation/SingleNavi.js';
import DropdownNavi from './Navigation/DropdownNavi.js';
import StaticPages from './Navigation/StaticPages.js';
import NotFound from './Content/NotFound.js';
import TopPage from  './Content/TopPage.js';
import WhatIs from  './Content/WhatIs.js';
import Developer from './Content/Developer.js';
import License from './Content/License.js';

/*********************************************************************/
/* Constants                                                         */
/*********************************************************************/

/*********************************************************************/
/* Components                                                        */
/*********************************************************************/
class Application extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <section>
        <header>
          <Customizer state={this.props.state}/>
          <TitleBar state={this.props.state}/>
        </header>
        <nav>
          {(() => {
            switch (this.props.state.customizer.navi.design) {
            case 'a':
              return <SingleNavi state={this.props.state}/>;
            case 'b':
              return <DropdownNavi state={this.props.state}/>;
            default:
              return null;
            }
          })()}
        </nav>
        <main>
          <div>
            {(() => {
              switch (this.props.state.api.screenId) {
              case 'TOP_PAGE':
                return <TopPage state={this.props.state}/>;
              case 'WHAT_IS':
                return <WhatIs state={this.props.state}/>;
              case 'DEVELOPER':
                return <Developer state={this.props.state}/>;
              case 'LICENSE':
                return <License state={this.props.state}/>;
              default:
                return <NotFound state={this.props.state}/>;
              }
            })()}
          </div>
        </main>
        <footer>
          <StaticPages state={this.props.state}/>
          {(() => { 
            if (OPERATION_MODE == C.MODE.MOCKUP) {
              return <Credit state={this.props.state}/>
            }        
          })()}
          <Copyright/>
        </footer>
        {(() => {
          if (this.props.state.modal.loading) {
            return <div id="loading"><div></div></div>
          }
        })()}
        {(() => { 
          if (this.props.state.modal.login_dialog) {
            return <Login.Dialog state={this.props.state}/>
          }        
        })()}
      </section>
    );
  }

}

/*********************************************************************/
/* [TitleBar] Application Title Bar                                  */
/*********************************************************************/
class TitleBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <section className="band TitleBar">
        <h1>{C.RESOURCE.TITLE}</h1>
        <Login.Button state={this.props.state}/>
        <div>{C.RESOURCE.CATCH_PHRASE}</div>
      </section>
    );
  }

}

/*********************************************************************/
/* [Credit] Copyright                                             */
/*********************************************************************/
class Credit extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <section className="band Credit">
        <div>{C.RESOURCE.CREDIT}</div>
      </section>
    );
  }

}

/*********************************************************************/
/* [Copyright] Copyright                                             */
/*********************************************************************/
class Copyright extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <section className="band Copyright">
        <div>{C.RESOURCE.COPYRIGHT}</div>
      </section>
    );
  }

}

/*********************************************************************/
/* Connect View To Redux                                             */
/*********************************************************************/
const ApplicationContainer = connect(
  (state) => { return { state: state };  }
)(Application);

ReactDOM.render(
  <Provider store={store}>
    <ApplicationContainer/>
  </Provider>,
  document.getElementById('app')
);

dispatchFirstAction();

