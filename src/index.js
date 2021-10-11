import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import GlobalStyle from './constants/globalStyle'

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root')
)
