import styled from 'styled-components'
import { MEDIA_QUERY } from '../../../constants/style'
const Wrapper = styled.div`
  height: 600px;
`
const WrapperBg = styled.div`
  background: url(${(props) => props.$bg}) center no-repeat;
  background-size: cover;
  width: 100%;
  height: 500px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${MEDIA_QUERY.widescreen} {
    height: 900px;
  }
`

export default function NotFound() {
  return (
    <Wrapper>
      <WrapperBg $bg={`${process.env.PUBLIC_URL}/404/back404.png`}></WrapperBg>
    </Wrapper>
  )
}
