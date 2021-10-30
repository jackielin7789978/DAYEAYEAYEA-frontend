import styled from 'styled-components'
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
  & hover {
  }
`
const CardTop = styled.div`
  padding: 50px 50px 20px 50px;
  border: 1px solid ${COLOR.border_primary};
  border-radius: 20% 20% 0% 0%;
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
  background: url(${(props) => props.$img}) no-repeat center,
    radial-gradient(
      circle at center,
      ${COLOR.primary_light},
      ${COLOR.primary_light_hover}
    );
  background-size: cover;
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
        <CardMember>
          <CardTop>
            <Avatar $img={'https://i.imgur.com/UkSjhZT.png'}></Avatar>
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
            <div>
              <FontAwesomeIcon
                icon={['fab', 'github']}
                size='lg'
                color={`${COLOR.light}`}
              />
              <IconTitle children={'GitHub'} />
            </div>
            <div>
              <FontAwesomeIcon
                icon={faPortrait}
                size='lg'
                color={`${COLOR.light}`}
              />
              <IconTitle children={'履歷'} />
            </div>
          </CardFooter>
        </CardMember>
        <CardMember>
          <CardTop>
            <Avatar $img={'https://i.imgur.com/7KaTasx.png'}></Avatar>
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
            <div>
              <FontAwesomeIcon
                icon={['fab', 'github']}
                size='lg'
                color={`${COLOR.light}`}
              />
              <IconTitle children={'GitHub'} />
            </div>
            <div>
              <FontAwesomeIcon
                icon={faPortrait}
                size='lg'
                color={`${COLOR.light}`}
              />
              <IconTitle children={'履歷'} />
            </div>
          </CardFooter>
        </CardMember>
        <CardMember>
          <CardTop>
            <Avatar $img={'https://i.imgur.com/KKUyQO6.png'}></Avatar>
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
            <div>
              <FontAwesomeIcon
                icon={['fab', 'github']}
                size='lg'
                color={`${COLOR.light}`}
              />
              <IconTitle children={'GitHub'} />
            </div>
            <div>
              <FontAwesomeIcon
                icon={faPortrait}
                size='lg'
                color={`${COLOR.light}`}
              />
              <IconTitle children={'履歷'} />
            </div>
          </CardFooter>
        </CardMember>
        <CardMember>
          <CardTop>
            <Avatar $img={'https://i.imgur.com/NIlmi5Z.png'}></Avatar>
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
            <div>
              <FontAwesomeIcon
                icon={['fab', 'github']}
                size='lg'
                color={`${COLOR.light}`}
              />
              <IconTitle children={'GitHub'} />
            </div>
            <div>
              <FontAwesomeIcon
                icon={faPortrait}
                size='lg'
                color={`${COLOR.light}`}
              />
              <IconTitle children={'履歷'} />
            </div>
          </CardFooter>
        </CardMember>
      </Card>
    </PageWidth>
  )
}
