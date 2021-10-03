import styled from "styled-components";
import { COLOR, FONT_SIZE, MEDIA_QUERY } from "../../../constants/style";
import { PageWidth } from "../../../components/general";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

// 以下測試 Button hover 顏色用
const TempWrapper = styled.div`
  ${MEDIA_QUERY.desktop} {
    position: relative;
    height: 240px;
  }
`;
const TempBTN = styled.button`
  ${MEDIA_QUERY.desktop} {
    width: 220px;
    height: 50px;
    border-radius: 3px;
    font-size: ${FONT_SIZE.md};
    color: ${COLOR.text_light};
    margin: 180px 50px;
  }
`;
const BTN1 = styled(TempBTN)`
  background: ${COLOR.primary_light};
  transition: ease-out 0.3s;
  border: 1px solid transparent;
  color: ${COLOR.text_light};
  &:hover {
    background: ${COLOR.light};
    color: ${COLOR.primary_light};
    border: 1px solid ${COLOR.primary_light};
  }
`;
const BTN2 = styled(TempBTN)`
  background: ${COLOR.warning};
  transition: linear 0.2s;
  &:hover {
    background: ${COLOR.warning_hover};
  }
`;
const BTN3 = styled(TempBTN)`
  background: ${COLOR.accent};
  transition: linear 0.2s;
  &:hover {
    background: ${COLOR.accent_hover};
  }
`;

export default function Join() {
  return (
    <>
      <PageWidth>
        <TempWrapper>
          <BTN1>
            {/* <ShoppingCartOutlinedIcon sx={{ color: "white" }} /> */}
            加入購物車
          </BTN1>
          <BTN2>我再想想</BTN2>
          <BTN3>繼續購物</BTN3>
        </TempWrapper>
      </PageWidth>
    </>
  );
}
