import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { GeneralBtn } from '../../components/Button'
const Wrapper = styled.div`
  height: 600px;
`
const WrapperBg = styled.div`
  background: url(${(props) => props.$bg}) center;
  background-size: cover;
  width: 100%;
  height: 550px;
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
  const location = useHistory()
  const style = {
    width: '120px',
    position: 'absolute',
    left: '50%',
    bottom: '17%',
    transform: 'translateX(-50%)'
  }
  return (
    <Wrapper>
      <WrapperBg $bg={`${process.env.PUBLIC_URL}/404/front404.png`}>
        <Title>
          404<SubTitle>找不到頁面</SubTitle>
        </Title>
        <GeneralBtn
          color={'warning'}
          children={'返回首頁'}
          buttonStyle={style}
          onClick={() => location.push('/')}
        />
      </WrapperBg>
    </Wrapper>
  )
}
