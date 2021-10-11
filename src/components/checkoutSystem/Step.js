import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const StepsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 700px;
  margin: 40px auto;
  ${MEDIA_QUERY.tablet} {
    width: 70%;
  }
`
const Step = styled.div`
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
const StepTitle = styled.div`
  border: 3px solid;
  border-radius: 50%;
  color: inherit;
  height: 40px;
  width: 40px;
  line-height: 35px;
  font-weight: bold;
`
const StepContent = styled.div`
  color: inherit;
  font-weight: bold;
  margin: 10px 0px;
  ${MEDIA_QUERY.desktop} {
    margin: 0px 10px;
  }
`
const StepArrow = styled(ArrowForwardIosIcon)`
  fill: ${COLOR.text_primary_light};
`
const Steps = () => {
  const location = useLocation()
  return (
    <StepsWrapper>
      <Step $active={location.pathname.includes('step1')}>
        <StepTitle children={1} />
        <StepContent children={'購物車明細'} />
      </Step>
      <StepArrow />
      <Step $active={location.pathname.includes('step2')}>
        <StepTitle children={2} />
        <StepContent children={'填寫寄送資料'} />
      </Step>
      <StepArrow />
      <Step $active={location.pathname.includes('step3')}>
        <StepTitle children={3} />
        <StepContent children={'訂單完成'} />
      </Step>
    </StepsWrapper>
  )
}
const Title = styled.div`
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
const CarTitles = styled.div`
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
const TitleWidth = styled.div`
  width: 100px;
`
const TitleGroup = styled.div`
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
const CarTitle = styled.div`
  color: ${COLOR.text_light};
  font-weight: bold;
  padding: 10px;
`

const Item = styled.div`
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
const ItemInfo = styled.div`
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
const ItemImg = styled(Link)`
  min-width: 100px;
  height: 100px;
  background: url(${(props) => props.img}) center;
`

const ItemName = styled(Link)`
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

const ItemContent = styled.div`
  display: flex;
  justify-content: space-between;
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
const ItemPrice = styled.div`
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

const ItemDelete = styled(DeleteOutlineIcon)`
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
const TotalPrice = styled.div`
  text-align: right;
  padding: 10px;
`
const BtnFlex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`
const LinkStyle = {
  maxWidth: '200px',
  width: '45%',
  margin: '20px 0px'
}
export {
  Steps,
  Title,
  TitleWidth,
  TitleGroup,
  CarTitles,
  CarTitle,
  Item,
  ItemInfo,
  ItemImg,
  ItemName,
  ItemContent,
  ItemPrice,
  ItemDelete,
  TotalPrice,
  BtnFlex,
  LinkStyle
}
