//定義post Message
const postMessage = (iframeWindow, type, data) => {
  iframeWindow.contentWindow.postMessage(JSON.stringify({ type, data, }), process.env.REACT_APP_VIEWER_SERVER_HOST);
}

//改顏色
export function msgSetEntityColor(iframeWindow,state){
  postMessage(
    iframeWindow.current, 
    'MSG_SET_ENTITY_STATE',
    {states:state,
    useState: true,
		defaultStateColor: [237/255, 146/255, 211/255],
    useDefaultStateColor: true,
    }
  )
}

//改背景顏色
export function msgSetBackgroundColor(iframeWindow){
  postMessage(iframeWindow.current, 'MSG_SET_BACKGROUND',{color: [122/255,219/255,253/255] })}

//非選中實體半透明
export function msgSetSelectionDisplayMode(iframeWindow){
  postMessage(iframeWindow.current, 'MSG_SET_SELECTION_DISPLAY_MODE', {"mode": 1,"transparency": 0.5})
}

//拍照
export function msgTakeSnapShot(iframeWindow){
  postMessage(iframeWindow.current, 'MSG_TAKE_SNAPSHOT',{id: '自設快照1'})
}

//回到某一鏡頭，跳轉至某視角
export function msgViewSnapShot(iframeWindow, state){
  postMessage(iframeWindow.current, 'MSG_VIEW_SNAPSHOT', {status: state})
}

//二維轉三維
export function msgPickPoint(iframeWindow,x ,y){
  postMessage(iframeWindow.current, 'MSG_PICK_POINT',{point: [x, y]})
}

// 工具列顯示設定
export function msgSetToolbarItems(iframeWindow, item) {
  postMessage(iframeWindow.current, 'MSG_SET_TOOLBAR_ITEMS', { items: item });
}

// 三維座標轉二維
export function msgProjectPoint(iframeWindow, point) {
  postMessage(iframeWindow.current, 'MSG_PROJECT_POINT', { point: point });
}

// 設置立體視圖導航(平面、透視、側視...)
export function msgToggleCube(iframeWindow) {
  postMessage(iframeWindow.current, 'MSG_TOGGLE_CUBE', { state:true, position:{top:'3px',right:'3px'}})
}

//設置XYZ切剖
export function msgSetSection(iframeWindow) {
  postMessage(iframeWindow.current, 'MSG_SET_SECTION', { bbox: [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5] })
}

// 剖切開關
export function msgToggleSection(iframeWindow, state) {
  postMessage(iframeWindow.current, 'MSG_TOGGLE_SECTION', { state, position: {top: '10%', left: 'calc(100% - 315px)'} })
}

//判定該點是否是模型當前視窗可見
export function msgIsPointVisibal(iframeWindow,x,y,z){
  postMessage(iframeWindow.current, 'MSG_IS_POINT_VISIBLE',{point: [x, y, z]})
}

