import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../../constants/style'
import { PageWidth } from '../../../components/general'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPortrait } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fab)
const Card = styled.div`
  margin-top: 120px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const Avatar = styled.div`
  border: 5px solid ${COLOR.border_light_grey};
  border-radius: 50%;
  width: 150px;
  height: 150px;
  position: absolute;
  top: -110px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  background: url(${(props) => props.$bg}) no-repeat center;
  background-size: cover;
`
const DanceAvator = styled.div`
  background: url(${(props) => props.$img}) no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const dance = (x) => keyframes`
  from {
    background-position:  0px;
  }

  to {
    background-position: ${x}px;
  }
`
const CardMember = styled.div`
  position: relative;
  margin: 50px;
  min-width: 300px;
  margin-bottom: 120px;
  ${MEDIA_QUERY.desktop} {
    width: 315px;
  }
  ${MEDIA_QUERY.tablet} {
    width: 315px;
  }
  &:hover {
    ${DanceAvator} {
      background: url(${(props) => props.$danceImg}) no-repeat;
      background-size: cover;
      width: ${(props) => (props.$width ? props.$width : 77)}px;
      height: ${(props) => (props.$height ? props.$height : 90)}px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(
        -50%,
        ${(props) => (props.$translateY ? props.$translateY : -50)}%
      );
      animation: ${(props) => dance(props.$x)} 0.4s steps(4) infinite alternate;
    }
  }
`
const CardTop = styled.div`
  padding: 50px 50px 20px 50px;
  border: 1px solid ${COLOR.border_primary};
  border-radius: 20% 20% 0% 0%;
`

const Name = styled.div`
  font-size: ${FONT_SIZE.xl};
  padding-bottom: 5px;
  border-bottom: 2px solid ${COLOR.border_primary};
  font-weight: bold;
`
const Title = styled.div`
  font-size: ${FONT_SIZE.xxl};
  font-weight: 700;
  margin: 50px;
`
const SubTitle = styled.div`
  font-weight: 700;
  margin: 20px;
`
const Work = styled.ul`
  > li {
    margin: 10px;
  }
`
const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: ${COLOR.primary_light};
  padding: 10px;
  border-radius: 0% 0% 3px 3px;
`
const IconTitle = styled.span`
  margin-left: 10px;
  color: white;
`
export default function Join() {
  return (
    <PageWidth>
      <Title>DAYEAYEAYEA 團隊</Title>
      <Card>
        <CardMember
          $danceImg={'https://i.imgur.com/lMsSbeA.png'}
          $x={-340}
          $width={80}
        >
          <CardTop>
            <Avatar $bg={'https://i.imgur.com/G2acwhV.png'}>
              <DanceAvator $img={'https://i.imgur.com/2LlrzGf.png'} />
            </Avatar>
            <Name>叮叮</Name>
            <SubTitle>負責項目</SubTitle>
            <Work>
              <li>blablablabla</li>
              <li>blablabla</li>
              <li>blablablabla</li>
              <li>blablablablabla</li>
            </Work>
          </CardTop>
          <CardFooter>
            <Link to='/'>
              <FontAwesomeIcon
                icon={['fab', 'github']}
                size='lg'
                color={`${COLOR.light}`}
              />
              <IconTitle children={'GitHub'} />
            </Link>
            <Link to='/'>
              <FontAwesomeIcon
                icon={faPortrait}
                size='lg'
                color={`${COLOR.light}`}
              />
              <IconTitle children={'履歷'} />
            </Link>
          </CardFooter>
        </CardMember>
        <CardMember
          $danceImg={'https://i.imgur.com/jJaOC2h.png'}
          $x={-222}
          $width={55}
        >
          <CardTop>
            <Avatar $bg={'https://i.imgur.com/fgmDbdG.png'}>
              <DanceAvator $img={'https://i.imgur.com/UjZSIrO.png'} />
            </Avatar>
            <Name>Jackie</Name>
            <SubTitle>負責項目</SubTitle>
            <Work>
              <li>blablablablabla</li>
              <li>blablabla</li>
              <li>blablablabla</li>
              <li>blablablablabla</li>
            </Work>
          </CardTop>
          <CardFooter>
            <Link to='/'>
              <FontAwesomeIcon
                icon={['fab', 'github']}
                size='lg'
                color={`${COLOR.light}`}
              />
              <IconTitle children={'GitHub'} />
            </Link>
            <Link to='/'>
              <FontAwesomeIcon
                icon={faPortrait}
                size='lg'
                color={`${COLOR.light}`}
              />
              <IconTitle children={'履歷'} />
            </Link>
          </CardFooter>
        </CardMember>
        <CardMember $danceImg={'https://i.imgur.com/ijpQPkc.png'} $x={-306}>
          <CardTop>
            <Avatar $bg={'https://i.imgur.com/7W6f0bL.png'}>
              <DanceAvator $img={'https://i.imgur.com/NGk6d8r.png'} />
            </Avatar>
            <Name>Enzo</Name>
            <SubTitle>負責項目</SubTitle>
            <Work>
              <li>blablablabla</li>
              <li>blablablablabla</li>
              <li>blablablabla</li>
              <li>blablablablablabla</li>
            </Work>
          </CardTop>
          <CardFooter>
            <Link to='/'>
              <FontAwesomeIcon
                icon={['fab', 'github']}
                size='lg'
                color={`${COLOR.light}`}
              />
              <IconTitle children={'GitHub'} />
            </Link>
            <Link to='/'>
              <FontAwesomeIcon
                icon={faPortrait}
                size='lg'
                color={`${COLOR.light}`}
              />
              <IconTitle children={'履歷'} />
            </Link>
          </CardFooter>
        </CardMember>
        <CardMember
          $danceImg={'https://i.imgur.com/aBRIgF0.png'}
          $x={-306}
          $height={110}
          $translateY={-60}
        >
          <CardTop>
            <Avatar $bg={'https://i.imgur.com/PfbWpth.png'}>
              <DanceAvator $img={'https://i.imgur.com/Wp6fW8X.png'} />
            </Avatar>
            <Name>Janet</Name>
            <SubTitle>負責項目</SubTitle>
            <Work>
              <li>網站視覺設計</li>
              <li>登入頁面切版&功能</li>
              <li>結帳切版&功能</li>
              <li>會員管理切版&功能</li>
            </Work>
          </CardTop>
          <CardFooter>
            <Link to='/'>
              <FontAwesomeIcon
                icon={['fab', 'github']}
                size='lg'
                color={`${COLOR.light}`}
              />
              <IconTitle children={'GitHub'} />
            </Link>
            <Link to='/'>
              <FontAwesomeIcon
                icon={faPortrait}
                size='lg'
                color={`${COLOR.light}`}
              />
              <IconTitle children={'履歷'} />
            </Link>
          </CardFooter>
        </CardMember>
      </Card>
    </PageWidth>
  )
}
