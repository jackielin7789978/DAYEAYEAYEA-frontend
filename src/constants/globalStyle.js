import { createGlobalStyle } from 'styled-components'
import { COLOR } from './style'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: 1.5em;
    text-decoration: none;
    color: ${COLOR.text_dark};
  }
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background: rgb(219,219,219);
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    line-height:normal;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  button {
    border: none;
    cursor: pointer;
    background: transparent;
    &:hover, &:focus {
      outline: none
    }
  }
  input {
    outline: none;
    border: none;

    &:focus {
      outline: none;
      border: none
    }
  }
  textarea {
    resize: none;
  }
  img {
    height: 600px;
  }
`

export default GlobalStyle
