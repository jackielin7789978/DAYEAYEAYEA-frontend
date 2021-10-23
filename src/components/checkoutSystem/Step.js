import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
export const StepsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 700px;
  margin: 40px auto;
  ${MEDIA_QUERY.tablet} {
    width: 70%;
  }
`
export const Step = styled.div`
  transition: 0.2s;
  color: ${COLOR.text_primary_light};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${(props) =>
    props.$active &&
    `
  color: ${COLOR.text_warning};
  `}
  ${MEDIA_QUERY.desktop} {
    flex-direction: row;
  }
`
export const StepTitle = styled.div`
  border: 3px solid;
  border-radius: 50%;
  color: inherit;
  height: 40px;
  width: 40px;
  line-height: 35px;
  font-weight: bold;
`
export const StepContent = styled.div`
  color: inherit;
  font-weight: bold;
  margin: 10px 0px;
  ${MEDIA_QUERY.desktop} {
    margin: 0px 10px;
  }
`
export const StepArrow = styled(FontAwesomeIcon)`
  & path {
    color: ${COLOR.text_primary_light};
  }
`
export const Steps = () => {
  const location = useLocation()
  return (
    <StepsWrapper>
      <Step $active={location.pathname.includes('step1')}>
        <StepTitle children={1} />
        <StepContent children={'購物車明細'} />
      </Step>
      <StepArrow icon={faChevronRight} />
      <Step $active={location.pathname.includes('step2')}>
        <StepTitle children={2} />
        <StepContent children={'填寫寄送資料'} />
      </Step>
      <StepArrow icon={faChevronRight} />
      <Step $active={location.pathname.includes('step3')}>
        <StepTitle children={3} />
        <StepContent children={'訂單完成'} />
      </Step>
    </StepsWrapper>
  )
}
export const Title = styled.div`
  font-size: ${FONT_SIZE.lg};
  margin: 20px 0px;
  font-weight: bold;
  text-align: left;
  ${MEDIA_QUERY.desktop} {
    padding: 0px 20px;
  }
  ${MEDIA_QUERY.tablet} {
    padding: 0px 20px;
  }
`
export const CartTitles = styled.div`
  display: none;
  ${MEDIA_QUERY.desktop} {
    display: flex;
    background: ${COLOR.primary_dark};
  }
  ${MEDIA_QUERY.tablet} {
    display: flex;
    background: ${COLOR.primary_dark};
    justify-content: space-around;
  }
`
export const TitleWidth = styled.div`
  width: 100px;
`
export const TitleGroup = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  ${MEDIA_QUERY.tablet} {
    & div:nth-child(3) {
      margin-right: 20px;
    }
    & div:nth-child(2) {
      margin-left: 25px;
    }
  }
`
export const CartTitle = styled.div`
  color: ${COLOR.text_light};
  font-weight: bold;
  padding: 10px;
`

export const Item = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: solid 1px ${COLOR.border_primary};
  padding: 20px 0px;
  ${MEDIA_QUERY.desktop} {
    padding: 20px;
  }
  ${MEDIA_QUERY.tablet} {
    padding: 20px;
  }
`
export const ItemInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: cneter;
  flex-wrap: wrap;
  padding: 0px 10px;
  justify-content: flex-start;
  ${MEDIA_QUERY.desktop} {
    flex-wrap: nowrap;
    justify-content: space-around;
  }
  ${MEDIA_QUERY.tablet} {
    flex-wrap: nowrap;
    justify-content: space-around;
  }
`
export const ItemImg = styled(Link)`
  min-width: 100px;
  height: 100px;
  background: url(${(props) => props.img}) center;
`

export const ItemName = styled(Link)`
  text-align: left;
  margin-right: 30px;
  color: ${COLOR.text_dark};
  &:hover {
    color: ${COLOR.text_dark};
  }
  ${MEDIA_QUERY.desktop} {
    margin-right: 0px;
    width: 30%;
  }
  ${MEDIA_QUERY.tablet} {
    margin-right: 0px;
    width: 45%;
  }
`

export const ItemContent = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  ${MEDIA_QUERY.tablet} {
    flex-direction: row;
    justify-content: space-around;
    margin-top: 0px;
  }
  ${MEDIA_QUERY.desktop} {
    flex-direction: row;
    justify-content: space-around;
    margin-top: 0px;
    margin-right: 10px;
  }
`
export const ItemPrice = styled.div`
  width: 100%;
  position: relative;
  &:before {
    content: 'x';
    position: absolute;
    left: -10px;
    top: -2px;
    font-weight: bold;
  }
  ${MEDIA_QUERY.tablet} {
    &:before {
      content: '';
    }
  }
  ${MEDIA_QUERY.desktop} {
    &:before {
      content: '';
    }
  }
`
export const ItemPriceHidden = styled(ItemPrice)`
  display: none;
  ${MEDIA_QUERY.tablet} {
    display: initial;
  }
  ${MEDIA_QUERY.desktop} {
    display: initial;
  }
`
export const ItemCount = styled.div`
  width: 100%;
  ${MEDIA_QUERY.tablet} {
    margin-right: 25px;
    width: 250px;
  }
  ${MEDIA_QUERY.desktop} {
    margin-right: 25px;
    width: 250px;
  }
`
export const ItemCountHidden = styled(ItemCount)`
  display: none;
  ${MEDIA_QUERY.tablet} {
    display: initial;
  }
  ${MEDIA_QUERY.desktop} {
    display: initial;
  }
`
export const ItemCountMobile = styled(ItemCount)`
  display: initial;
  text-align: left;
  ${MEDIA_QUERY.tablet} {
    display: none;
  }
  ${MEDIA_QUERY.desktop} {
    display: none;
  }
`
export const ItemDelete = styled(FontAwesomeIcon)`
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 20px;
  ${MEDIA_QUERY.tablet} {
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
  }
  ${MEDIA_QUERY.desktop} {
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
  }
`
export const TotalPrice = styled.div`
  text-align: right;
  padding: 10px;
`
export const BtnFlex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  & a{
    maxWidth: '200px',
  width: '45%',
  margin: '20px 0px'
  }
`
export const BtnFlexCenter = styled(BtnFlex)`
  justify-content: center;
  & button {
    max-width: initial;
    width: 100%;
  }
  ${MEDIA_QUERY.desktop} {
    & button {
      max-width: 200px;
      width: 45%;
    }
  }
  ${MEDIA_QUERY.tablet} {
    & button {
      max-width: 200px;
      width: 45%;
    }
  }
`
export const LinkStyle = {
  maxWidth: '200px',
  width: '45%',
  margin: '20px 0px'
}

export const FormTitle = styled(Title)`
  padding: 0;
`
export const FormWrapper = styled.div`
  width: 100%;
  border: 1px solid ${COLOR.border_light_grey};
  padding: 20px;
  margin: 10px auto;
  ${MEDIA_QUERY.desktop} {
    padding: 20px 50px;
    margin: 20px;
  }
`

export const Form = styled.form`
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  ${MEDIA_QUERY.desktop} {
    & > div {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }
  width: 100%;
  margin-bottom: 20px;
  ${MEDIA_QUERY.desktop} {
    margin: 20px;
  }
`
export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0px;
  justify-content: flex-start;
`
export const InputTitle = styled.div``
export const RadionLabel = styled.span`
  position: relative;
  &:before {
    content: '';
    display: block;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    border: 0.1em solid ${COLOR.warning};
    position: absolute;
    left: -2em;
    top: 0.2em;
  }
`
export const Input = styled.input`
  display: block;
  border: solid 1px ${COLOR.border_grey};
  padding: 10px;
  flex: 1 1 0;
  border-radius: 3px;
  margin-left: 20px;
  ::placeholder {
    color: ${COLOR.text_placeholder};
  }
  &:focus {
    border: solid 1px ${COLOR.border_grey};
  }
  ${(props) =>
    props.type === 'radio' &&
    `
    opacity: 0;
    width: 0;
    height: 0;
    flex: initial;
    margin-right: 20px;
    &:checked + span {
      transform: translateX(2.5px) scale(1.05);
      font-weight: bold;
    }
    &:checked + span:before {
      background: ${COLOR.warning};
      
    }
  `}
`
export const Label = styled.label`
  display: flex;
  align-items: center;
  margin: 20px 0;
  cursor: pointer;
`
export const RadioControl = styled.span`
  display: block;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 0.1em solid ${COLOR.warning};
  transform: translateX(-1em);
`

export const ErrorMsg = styled.p`
  margin-top: 10px;
  color: ${COLOR.text_warning};
  font-weight: bold;
  text-align: left;
`
export const DeliveryData = styled.div`
  text-align: left;
  padding: 10px 20px;
`
export const WarningMessage = styled.p`
  font-size: ${FONT_SIZE.sm};
  color: ${COLOR.warning};
  margin-top: 8px;
  font-weight: bold;
  ${MEDIA_QUERY.desktop} {
    position: absolute;
    right: 7%;
    width: 150px;
    top: 65%;
  }
  ${MEDIA_QUERY.tablet} {
    position: absolute;
    right: 7%;
    width: 150px;
    top: 65%;
  }
`
export const MsgTitle = styled.div`
  font-size: ${FONT_SIZE.lg};
  margin-top: 30px;
  font-weight: bold;
`
