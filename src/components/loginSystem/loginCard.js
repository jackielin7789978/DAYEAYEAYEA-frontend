import styled from 'styled-components'
import { COLOR, MEDIA_QUERY, FONT_SIZE } from '../../constants/style'
import { Link } from 'react-router-dom'
import { PageWidth } from '../general'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

const PageWidthHeight = styled(PageWidth)`
  min-height: 600px;
  height: 100%;
`
const AbsoluteCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
`
const Title = styled.div`
  font-size: ${FONT_SIZE.lg};
  margin-top: 30px;
  font-weight: bold;
`
const FormWrapper = styled.div`
  transition: 1.5s;
  max-width: 500px;
  width: 100%;
  margin: 30px auto;
  border: 1px solid ${COLOR.border_light_grey};
  ${MEDIA_QUERY.tablet} {
    transform: translateY(5%);
  }
`

const Form = styled.form`
  padding: 30px;
  ${MEDIA_QUERY.desktop} {
    padding: 20px 50px 50px;
  }
  ${MEDIA_QUERY.tablet} {
    padding: 20px 50px 50px;
  }
`
const Input = styled.input`
  display: block;
  border: solid 1px ${COLOR.border_primary};
  width: 100%;
  padding: 10px;
  border-radius: 3px;
  margin: 30px 0px 10px;
  ::placeholder {
    color: ${COLOR.text_placeholder};
  }
  &:focus {
    border: solid 1px ${COLOR.border_primary_dark};
  }
`

const ErrorMsg = styled.p`
  margin-top: 10px;
  color: ${COLOR.text_warning};
  font-weight: bold;
  text-align: left;
`
const SendPassword = styled(Link)`
  font-weight: bold;
  color: ${COLOR.text_dark};
  margin-top: 20px;
  display: block;
  &:hover {
    color: ${COLOR.text_dark};
  }
`
const PasswordInput = styled.div`
  position: relative;
`
const EyeIcon = styled.div``
const VisibilityIcon = styled(VisibilityOutlinedIcon)`
  position: absolute;
  top: 25%;
  right: 5%;
  fill: ${COLOR.text_primary_dark};
  &:hover {
    cursor: pointer;
  }
`
const VisibilityOffIcon = styled(VisibilityOffOutlinedIcon)`
  position: absolute;
  top: 25%;
  right: 5%;
  fill: ${COLOR.text_primary_light};
  &:hover {
    cursor: pointer;
  }
`

export {
  PageWidthHeight,
  Title,
  FormWrapper,
  Form,
  Input,
  ErrorMsg,
  SendPassword,
  AbsoluteCenter,
  PasswordInput,
  EyeIcon,
  VisibilityIcon,
  VisibilityOffIcon
}
