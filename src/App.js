import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {addIframeListener, 
        removeIframeListener,
        addIframeCustomListener,
        removeIframeCustomListener
      } from './utility/bimHandler.js'

      import {msgSetEntityColor,
              msgSetBackgroundColor,
              msgSetSelectionDisplayMode,
              msgTakeSnapShot,
              msgViewSnapShot
      } from './utility/daxiangyun.js'

import {randColor} from './utility/helper.js'

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
`;

const BtnWrapper = styled.div`
  position:absolute;
  width:15%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  background-color:red;
  z-index:0;
`

const App = () => {
  
  const iframeRef = useRef();
  const [ selectId,setSelectId ] = useState('')
  const [ nonSelectTransparent, setNonSelectTransparent] = useState(false)
  const [ snapshotArr, setSnapshotArr ] = useState([])

  const selectIdHandler = (e) => {
    if (e.origin !== process.env.REACT_APP_VIEWER_SERVER_HOST) return;
    const obj = (typeof e.data === 'object' ? e.data : JSON.parse(e.data))
    //console.log(obj)
    if(obj.type === 'MSG_ENTITY_SELECTED'){
      setSelectId(obj.data.selectionIds[0])
    }   
  }

  const saveSnapshotHandler = (e) => {
    if (e.origin !== process.env.REACT_APP_VIEWER_SERVER_HOST) return;
    const obj = (typeof e.data === 'object' ? e.data : JSON.parse(e.data))
    //console.log(obj)
    if(obj.type === 'MSG_SNAPSHOT_CAPTURED'){
      console.log(obj.data.id)
      console.log(obj.data.status);
      snapshotArr.push(obj.data)
      setSnapshotArr([...snapshotArr])//記憶體位置改
      console.log(snapshotArr)
    }   
  } 

  const nonSelectTransparentHandler=()=>{
    setNonSelectTransparent(c=>!c)
    msgSetSelectionDisplayMode(iframeRef,nonSelectTransparent?0.5:1)
  }

  //general listner
  useEffect(() => {
    addIframeListener();
    return () => removeIframeListener();
  });
  
  //Custom listner
  useEffect(()=>{
    addIframeCustomListener(selectIdHandler);
    return () => removeIframeCustomListener(selectIdHandler);
  })

  //Custom listner
  useEffect(()=>{
    addIframeCustomListener(saveSnapshotHandler);
    return () => removeIframeCustomListener(saveSnapshotHandler);
  })

//console.log(selectId)

  return (
    <>
      <BtnWrapper>
        <button 
          onClick={() => msgSetEntityColor(iframeRef,selectId,[randColor(),randColor(),randColor()])}
        >
          改選中模型顏色
        </button>
        <button 
          onClick={() => msgSetBackgroundColor(iframeRef,[randColor(),randColor(),randColor()])}
        >
          改背景顏色
        </button>
        <button 
          onClick={nonSelectTransparentHandler}
        >
          非選中實體半透明 {nonSelectTransparent?'開啟':'關閉'}
        </button>
        <button 
          onClick={() => msgTakeSnapShot(iframeRef, snapshotArr)}
        >
          生成快照
        </button>
        
        <div style={{ width:'60%',
                      height:'120px',
                      display:'flex',
                      flexDirection:'column',
                      alignItems:'center',
                      backgroundColor:'#FFF'}}
        >
        {snapshotArr.map(snapshot => 
          <button 
            style={{width:'120px',height:'20px'}}
            onClick={()=>msgViewSnapShot(iframeRef, snapshot.status)}
          >
            {snapshot.id}
          </button>)}
        </div>
        
        <button 
          onClick={() => setSnapshotArr([])}
        >
          清除快照
        </button>
      </BtnWrapper>

      
      <Iframe
        ref={iframeRef}
        src={`${process.env.REACT_APP_VIEWER_SERVER_HOST}/viewer.html?path=${process.env.REACT_APP_MODEL_PATH}&language=zh-TW`}
      />
    
    </>
  )}

export default App;