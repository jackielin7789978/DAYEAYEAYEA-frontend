import styled from 'styled-components'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../../constants/style'
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
const Title = styled.div`
  color: ${COLOR.warning};
  font-size: ${FONT_SIZE.xxxl};
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translateX(-50%);
  text-align: center;
  font-weight: bold;
`
const SubTitle = styled.div`
  font-size: ${FONT_SIZE.xl};
  color: ${COLOR.warning};
`

export default function NotFound() {
  return (
    <Wrapper>
      <WrapperBg $bg={`${process.env.PUBLIC_URL}/404/back404.png`}></WrapperBg>
    </Wrapper>
  )
}
