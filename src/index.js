import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    font-family: "Noto Sans TC", "sans-serif","Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif; !important;
  };
  
  html {
    height:100vh;
    width:100wh;
    margin:0; 
    padding:0;
    outline:0;
      /*網頁版版 1rem 基準*/
    font-size: 16px;
    @media (max-width: 768px) {
      /*行動版 1rem 基準*/
      font-size: 14px;
    }
  };
  
  body {
    height:100vh;
    width:100wh;
    margin: 0;
    padding: 0;
    outline:0;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;    
  };
  
  #root{
    width:100%;
    height:100%;
    margin: 0;
    padding: 0;
    outline:0;
  };
`

ReactDOM.render(
  <>
  <GlobalStyle />
  <App/>
  </>,
  document.getElementById('root')
);
