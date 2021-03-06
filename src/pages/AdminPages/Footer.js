import styled from 'styled-components'


const FootWrapper = styled.footer`
  height: 24px;
  line-height: 24px;
  letter-spacing: 1px;
  text-align: center;
  background: #c4c4c4;
  color: #fff;
`

const Footer = () => {
  return (
    <FootWrapper>&copy; copyright 2021</FootWrapper>
  )
};

export default Footer
