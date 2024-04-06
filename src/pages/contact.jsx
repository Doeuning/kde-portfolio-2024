import styled from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  height: 100%;
`;

const List = styled.ul`
  font-size: 20px;
  ${({ theme }) => theme.MIXINS.fontPixelifySans};
  color: #fff;
  li ~ li {
    margin-top: 30px;
  }
  .tit {
    font-size: 16px;
    color: #f1cc2f;
    padding-left: 20px;
    margin-left: -20px;
    background: left center / 16px auto no-repeat;
    &.cell {
      background-image: url(/ico-16-cell.gif);
    }
    &.email {
      background-image: url(/ico-16-email.gif);
    }
  }
`;
function Contact(props) {
  return (
    <motion.div
      key={"contact"}
      initial={{ opacity: 0, y: "100px" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100px" }}
    >
      <Wrap>
        <List>
          <li>
            <div className="tit cell">Cell</div>
            <a href="tel:010-6541-1552">010.6541.1552</a>
          </li>
          <li>
            <div className="tit email">Email</div>
            <a href="mailto:doeuning@gmail.com">doeuning@gmail.com</a>
          </li>
        </List>
      </Wrap>
    </motion.div>
  );
}

Contact.bgColor = "#111";

export default Contact;
