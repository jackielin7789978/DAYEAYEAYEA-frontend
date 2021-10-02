import styled from "styled-components";
import { MEDIA_QUERY } from "../../constants/style";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const BurgerBTN = styled(MenuIcon)`
  outline: 1px solid gold;
  cursor: pointer;
  margin: 0 5px;
  display: ${(props) => (props.$isOpen ? "none" : "inline-block")};
  ${MEDIA_QUERY.desktop} {
    display: none;
  }
`;
const CloseBTN = styled(CloseIcon)`
  outline: 1px solid gold;
  cursor: pointer;
  margin: 0 5px;
  display: ${(props) => (props.$isOpen ? "inline-block" : "none")};
  ${MEDIA_QUERY.desktop} {
    display: none;
  }
`;
export default function Burger({ $isOpen, handleOpen, handleClose }) {
  return (
    <>
      <BurgerBTN onClick={handleOpen} $isOpen={$isOpen} />
      <CloseBTN onClick={handleClose} $isOpen={$isOpen} />
    </>
  );
}
