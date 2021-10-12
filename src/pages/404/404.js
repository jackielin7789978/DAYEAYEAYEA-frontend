import styled from 'styled-components'
import { FONT_SIZE } from '../../constants/style'

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: ${FONT_SIZE.xl};
`

export default function NotFound() {
  return <Wrapper>Page Not Found</Wrapper>
}
