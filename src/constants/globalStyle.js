import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: 1.5em;
    text-decoration: none;
  }
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
  button {
    border: none;
    cursor: pointer;

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
`;

export default GlobalStyle;
