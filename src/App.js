import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {addIframeListener, 
        removeIframeListener,
        addIframeCustomListener,
        removeIframeCustomListener
      } from './utility/bimHandler.js'

      import {msgSetEntityColor,
        msgSetBackgroundColor
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
  z-index:10;
`

const App = () => {
  
  const iframeRef = useRef();
  const [ selectId,setSelectId ] = useState('')

  const selectIdHandler = (e) => {
    if (e.origin !== process.env.REACT_APP_VIEWER_SERVER_HOST) return;
    const obj = (typeof e.data === 'object' ? e.data : JSON.parse(e.data))
    //console.log(obj)
    if(obj.type === 'MSG_ENTITY_SELECTED'){
      setSelectId(obj.data.selectionIds[0])
    }   
  }

  useEffect(() => {
    addIframeListener();
    return () => removeIframeListener();
  });
  
  useEffect(()=>{
    addIframeCustomListener(selectIdHandler);
    return () => removeIframeCustomListener(selectIdHandler);
  })

//console.log(selectId)

  return (
    <>
      <BtnWrapper>
        <button 
          onClick={() => msgSetEntityColor(iframeRef,selectId,[randColor(),randColor(),randColor()])}
        >
          改模型顏色
        </button>
        <button 
          onClick={() => msgSetBackgroundColor(iframeRef,[randColor(),randColor(),randColor()])}
        >
          改背景顏色
        </button>
      </BtnWrapper>
      <Iframe
        ref={iframeRef}
        src={`${process.env.REACT_APP_VIEWER_SERVER_HOST}/viewer.html?path=${process.env.REACT_APP_MODEL_PATH}&language=zh-TW`}
      />
    </>
  )}

export default App;