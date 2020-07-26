import React, { useEffect, useRef ,useState } from 'react';
import styled from 'styled-components';
import {msgSetToolbarItems, 
        msgSetEntityColor, 
        msgSetBackgroundColor,
        msgSetSelectionDisplayMode,
        msgTakeSnapShot,
        msgViewSnapShot,
        msgPickPoint,
        msgToggleCube,
        msgSetSection,
        msgToggleSection,
        msgIsPointVisibal} from '../src/daxiangyun';
/*
const Iframe = styled.iframe`
position: relative;
overflow: hidden;
display:flex;
width: 100%;
height: 800px;
border:dashed 2px;
`;
*/

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;  
  display: flex;
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100vw;
  height: 100vh;
  outline: none;
  border: 0;
`;

const Btn =styled.button`
  margin:none;
  border:none;
  background-color:#FFFFFF;
`;

const App = () => {
  
  const iframeWindow = useRef(null);
  const [tempShot, setTempShot ] = useState(null);

  useEffect(() => {
    const onMessageReceivedFromIframe = (e) => {
      if (e.origin !== process.env.REACT_APP_VIEWER_SERVER_HOST) return;
      //console.log(typeof (e.data) === 'string' ? console.log((JSON.parse(e.data)).type) : e.data)
      console.log(e.data);
      
      //改背景色
      msgSetBackgroundColor(iframeWindow);
      
      //以下功能尚需修改細節:
      //設置立體視圖導航(平面、透視、測視...)
      //msgToggleCube(iframeWindow);
      //設置XYZ切剖
      //msgSetSection(iframeWindow);
      //XYZ切剖開關(第二個參數布林設定)
      //msgToggleSection(iframeWindow,true);
      //判定該點是否是模型當前視窗可見
      //msgIsPointVisibal(iframeWindow,500,500,500);
      //非選中實體半透明(使用記得關掉 msgSetEntityColor)
      //msgSetSelectionDisplayMode(iframeWindow);
      //二維點轉三維點
      //msgPickPoint(iframeWindow,x,y);

      try {
        const obj = (typeof e.data === 'object' ? e.data : JSON.parse(e.data))
        switch (obj.type) {
          
          
          case 'MSG_ENTITY_SELECTED':
          //改變物件變色
          msgSetEntityColor(iframeWindow, [
              [obj.data.selectionIds[0], [49/255,200/255,248/255]],
            ]);
            console.log(obj.data.selectionIds[0]);
            break
            
          case 'MSG_CAMERA_CHANGE':
            //console.log('相機在轉');
            break
          
          // 模型加載完成
          case 'MSG_MODEL_READY':
          //不顯示工具列
          msgSetToolbarItems(iframeWindow, []); 
          console.log('模型加載完成');
            break
          
          case 'MSG_MODEL_TREE_READY':
            break
          
          // 模型拍照功能
          case 'MSG_SNAPSHOT_CAPTURED':
            setTempShot(obj.data.status);
            console.log(tempShot);
            break
          
          default:
            break
        }
      } catch (error) {
        console.log(error);
      }
    }

    const addIframeListener = () => {
      window.addEventListener('message', onMessageReceivedFromIframe);
    }
    const removeIframeListener = () => {
      window.removeEventListener('message', onMessageReceivedFromIframe);
    }
    addIframeListener();
    return () => {
      removeIframeListener();
    };

  });
  
  return (
    <>
      <Wrapper>
      <Iframe
        ref={iframeWindow}
        src={`${process.env.REACT_APP_VIEWER_SERVER_HOST}/viewer.html?path=${process.env.REACT_APP_MODEL_PATH}&language=zh-TW`}
      />
      <Btn>
      <button onClick={() => msgTakeSnapShot(iframeWindow)}>照相TakeSnapShot</button>
      <button onClick={() => msgViewSnapShot(iframeWindow,tempShot)}>回復上一視角ViewSnapShot</button>
      </Btn>
      </Wrapper> 
      {/*新增第二個模型視窗
      <Iframe
        ref={iframeWindow}
        src={`${process.env.REACT_APP_VIEWER_SERVER_HOST}/viewer.html?path=${process.env.REACT_APP_MODEL_PATH}&language=zh-TW`}
      />
      */}

    </>
  )}

export default App;