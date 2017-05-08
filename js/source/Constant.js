/*********************************************************************/
/* Global Constants                                                  */
/* (c) 2017 Peano System Inc.                                        */
/*********************************************************************/
/*********************************************************************/
/* (1) Server IF Constants                                           */
/*********************************************************************/
/*********************************************************************/
/* (1-1) Operation Mode                                              */
/*********************************************************************/
const MODE = {
  MOCKUP:   'MOCKUP',     // モックアップ環境
  COUPLING: 'COUPLING',   // サーバとの結合環境
};
// モード分岐用スイッチ
export const OPERATION_MODE = MODE.MOCKUP;

/*********************************************************************/
/* (1-2) [DEPRECATED] Server Status Level                            */
/*********************************************************************/
// [廃止] ビューは HTTP ステータスコードだけを見て処理を切り分ける。
/*
const SERVER_SATATUS_LEVEL = {
  NORMAL:   0,    // 正常運転
  FATAL:    9,    // 致命的エラー
  ERROR:    8,    // エラー
  WARNING:  7,    // 警告
  INFO:     6,    // 情報提供
  NOTICE:   5,    // 念のための情報提供  
  DEBUG:    4,    // デバッグ用情報

};
*/

/*********************************************************************/
/* (1-3) [DEPRECATED] Ajax Status                                    */
/*********************************************************************/
// Ajax処理の成否。全てのAjax通信に含まれる。
// [廃止] ビューは HTTP ステータスコードだけを見て処理を切り分ける。
/*
const AJAX_STATUS = {
  SUCCEEDED:  true,   // 成功
  FAILED:     false,  // 失敗（アプリレベルエラー）

};
*/

/*********************************************************************/
/* (1-4) Input Validation                                            */
/*********************************************************************/
/*
const INPUT_VALIDATION = {
  OK: true,   // バリデーションOK
  NG: false,  // バリデーションNG

};
*/

/*********************************************************************/
/* (1-4) Input Validation                                            */
/*********************************************************************/
const RESOURCE = {
  TITLE: 'Giuseppe',
  CATCH_PHRASE: 'ウェブアプリ モックアップ デザイン',
  CREDIT: 'Powered by Giuseppe - Web Appli Mockup Design.',
  COPYRIGHT: '(c) 2017 Peano System Inc.',
};

/*********************************************************************/
/* Export                                                            */
/*********************************************************************/
export default {
  MODE: MODE,
  RESOURCE: RESOURCE,
};