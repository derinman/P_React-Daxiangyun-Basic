//定義post Message
const postMessage = (iframeWindow, type, data) => {
  iframeWindow.contentWindow.postMessage(JSON.stringify({ type, data }), process.env.REACT_APP_VIEWER_SERVER_HOST);
}

//改顏色
function msgSetEntityColor(iframeWindow,id,color){
  postMessage(
    iframeWindow.current, 
    'MSG_SET_ENTITY_STATE',
    {
    states: [ [id,[color[0]/256,color[1]/256,color[2]/256]] ],
    useState: true,
		defaultStateColor: [],//未被選實體
    useDefaultStateColor: false,//未被選實體
    }
  )
}

//改背景顏色
function msgSetBackgroundColor(iframeWindow,color){
  postMessage(iframeWindow.current, 'MSG_SET_BACKGROUND',{color: [color[0]/255,color[1]/255,color[2]/255] })}

//非選中實體半透明
function msgSetSelectionDisplayMode(iframeWindow){
  postMessage(iframeWindow.current, 'MSG_SET_SELECTION_DISPLAY_MODE', {"mode": 1,"transparency": 0.5})
}

//拍照
function msgTakeSnapShot(iframeWindow){
  postMessage(iframeWindow.current, 'MSG_TAKE_SNAPSHOT',{id: '自設快照1'})
}

//回到某一鏡頭，跳轉至某視角
function msgViewSnapShot(iframeWindow, state){
  postMessage(iframeWindow.current, 'MSG_VIEW_SNAPSHOT', {status: state})
}

//二維轉三維
function msgPickPoint(iframeWindow,x ,y){
  postMessage(iframeWindow.current, 'MSG_PICK_POINT',{point: [x, y]})
}

// 工具列顯示設定
function msgSetToolbarItems(iframeWindow, item) {
  postMessage(iframeWindow.current, 'MSG_SET_TOOLBAR_ITEMS', { items: item });
}

// 三維座標轉二維
function msgProjectPoint(iframeWindow, point) {
  postMessage(iframeWindow.current, 'MSG_PROJECT_POINT', { point: point });
}

// 設置立體視圖導航(平面、透視、側視...)
function msgToggleCube(iframeWindow) {
  postMessage(iframeWindow.current, 'MSG_TOGGLE_CUBE', { state:true, position:{top:'3px',right:'3px'}})
}

//設置XYZ切剖
function msgSetSection(iframeWindow) {
  postMessage(iframeWindow.current, 'MSG_SET_SECTION', { bbox: [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5] })
}

// 剖切開關
function msgToggleSection(iframeWindow, state) {
  postMessage(iframeWindow.current, 'MSG_TOGGLE_SECTION', { state, position: {top: '10%', left: 'calc(100% - 315px)'} })
}

//判定該點是否是模型當前視窗可見
function msgIsPointVisibal(iframeWindow,x,y,z){
  postMessage(iframeWindow.current, 'MSG_IS_POINT_VISIBLE',{point: [x, y, z]})
}

export {
  msgSetEntityColor,
  msgSetBackgroundColor
}