import styled from "styled-components";
import { COLOR, FONT_SIZE, MEDIA_QUERY } from "../../../constants/style";
import { PageWidth } from "../../../components/common";

// 以下測試 Button hover 顏色用
const TempWrapper = styled.div`
  ${MEDIA_QUERY.desktop} {
    outline: 1px solid gold;
    position: relative;
    height: calc(100vh - 380px);
  }
`;
const TempBTN = styled.button`
  ${MEDIA_QUERY.desktop} {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    width: 220px;
    height: 50px;
    border-radius: 3px;
    background: ${COLOR.primary_light};
    color: ${COLOR.text_light};
    font-size: ${FONT_SIZE.md};
    transition: all 0.3s;
    &:hover {
      background: ${COLOR.primary_light_hover};
    }
  }
`;

export default function Join() {
  return (
    <>
      <PageWidth>
        <TempWrapper>
          <TempBTN>加入購物車</TempBTN>
        </TempWrapper>
      </PageWidth>
    </>
  );
}
