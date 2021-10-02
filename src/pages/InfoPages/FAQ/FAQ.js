import styled from "styled-components";
import { useState } from "react";
import { PageWidth } from "../../../components/common";
import { COLOR, FONT_SIZE, MEDIA_QUERY } from "../../../constants/style";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const Title = styled.div`
  margin-top: 20px;
  font-size: ${FONT_SIZE.lg};
  font-weight: bold;
  ${MEDIA_QUERY.desktop} {
    margin-top: 40px;
    font-size: ${FONT_SIZE.xl};
  }
`;
const Container = styled.div`
  margin: 10px 0px 40px;
  padding: 20px;
  ${MEDIA_QUERY.desktop} {
    width: 60%;
    margin: 40px auto;
  }
`;
const Q = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: ${({ $isOpen }) =>
    $isOpen ? "none" : `2px solid ${COLOR.border_light_grey}`};
  h2 {
    font-size: ${FONT_SIZE.md};
    font-weight: bold;
    ${MEDIA_QUERY.desktop} {
      font-size: ${FONT_SIZE.lg};
    }
  }
`;
const A = styled.div`
  padding: 20px;
  width: 90%;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  div {
    text-align: left;
    font-size: ${FONT_SIZE.md};
  }
`;
const Toggle = styled(KeyboardArrowDownRoundedIcon)`
  cursor: pointer;
  transition: all 0.2s;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "none")};
`;

// 問題：問題要怎麼分開展開？又要怎麼一次只開一個問題？
export default function FAQ() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <PageWidth>
      <Title>常見問題</Title>
      <Container>
        <Q $isOpen={isOpen}>
          <h2>如何加入會員？</h2>
          <Toggle onClick={toggleOpen} $isOpen={isOpen} />
        </Q>
        <A $isOpen={isOpen}>
          <div>
            在 IKEA，如果你對於購買的產品不滿意，你可在 365
            天內，攜帶完好的商品、原始包裝、統一發票及明細（刷卡購買者需信用卡與簽單）到
            IKEA 分店退換貨。完整退換貨資訊請點選這裡。
            或是你也可以與IKEA客服連繫確認，請點選這裡確認各分店連絡方式。
          </div>
        </A>
        <Q $isOpen={isOpen}>
          <h2>如何加入會員？</h2>
          <Toggle onClick={toggleOpen} $isOpen={isOpen} />
        </Q>
        <A $isOpen={isOpen}>
          <div>
            在 IKEA，如果你對於購買的產品不滿意，你可在 365
            天內，攜帶完好的商品、原始包裝、統一發票及明細（刷卡購買者需信用卡與簽單）到
            IKEA 分店退換貨。完整退換貨資訊請點選這裡。
            或是你也可以與IKEA客服連繫確認，請點選這裡確認各分店連絡方式。
          </div>
        </A>
      </Container>
    </PageWidth>
  );
}
