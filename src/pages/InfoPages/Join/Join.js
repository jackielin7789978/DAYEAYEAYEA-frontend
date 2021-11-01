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
  width: ${(props) => (props.$width ? props.$width : 77)}px;
  height: ${(props) => (props.$height ? props.$height : 90)}px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(
    -50%,
    ${(props) => (props.$translateY ? props.$translateY : -50)}%
  );
`
const dance = (x1, x2) => keyframes`
  from {
    background-position: ${x1}px;
  }
  to {
    background-position: ${x2}px;
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
      animation: ${(props) => dance(props.$x1, props.$x2)} 0.4s steps(4)
        infinite alternate;
    }
  }
`
const CardTop = styled.div`
  padding: 50px 50px 20px 50px;
  border: 1px solid ${COLOR.border_primary};
  border-radius: 20% 20% 0% 0%;
  min-height: 350px;
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
        <CardMember $x1={-82} $x2={-425}>
          <CardTop>
            <Avatar $bg={`${process.env.PUBLIC_URL}/avatar/dingbg.png`}>
              <DanceAvator
                $width={81}
                $img={`${process.env.PUBLIC_URL}/avatar/ding.png`}
              />
            </Avatar>
            <Name>叮叮</Name>
            <SubTitle>負責項目</SubTitle>
            <Work>
              <li>資料庫建立</li>
              <li>前臺後臺介面</li>
              <li>商品瀏覽系統</li>
              <li>商品搜尋功能</li>
              <li>後臺商品管理系統</li>
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
        <CardMember $x1={-55} $x2={-279}>
          <CardTop>
            <Avatar $bg={`${process.env.PUBLIC_URL}/avatar/jackiebg.png`}>
              <DanceAvator
                $width={55}
                $img={`${process.env.PUBLIC_URL}/avatar/jackie.png`}
              />
            </Avatar>
            <Name>Jackie</Name>
            <SubTitle>負責項目</SubTitle>
            <Work>
              <li>前臺後臺介面</li>
              <li>購物車卡片</li>
              <li>後臺登入系統</li>
              <li>後臺訂單管理系統</li>
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
        <CardMember $x1={-80} $x2={-395}>
          <CardTop>
            <Avatar $bg={`${process.env.PUBLIC_URL}/avatar/enzobg.png`}>
              <DanceAvator $img={`${process.env.PUBLIC_URL}/avatar/enzo.png`} />
            </Avatar>
            <Name>Enzo</Name>
            <SubTitle>負責項目</SubTitle>
            <Work>
              <li>會員系統</li>
              <li>前臺後臺介面</li>
              <li>後端 API 撰寫</li>
              <li>後端 JWT 驗證</li>
              <li>後端部屬</li>
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
        <CardMember $x1={-75} $x2={-385}>
          <CardTop>
            <Avatar $bg={`${process.env.PUBLIC_URL}/avatar/janetbg.png`}>
              <DanceAvator
                $width={75}
                $height={110}
                $translateY={-60}
                $img={`${process.env.PUBLIC_URL}/avatar/janet.png`}
              />
            </Avatar>
            <Name>Janet</Name>
            <SubTitle>負責項目</SubTitle>
            <Work>
              <li>網站視覺設計</li>
              <li>前臺後臺介面</li>
              <li>結帳系統</li>
              <li>登入/註冊系統</li>
              <li>後臺會員管理系統</li>
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
