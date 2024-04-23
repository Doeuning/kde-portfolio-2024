import styled from "styled-components";
import Link from "next/link";

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
  ${({ theme }) => theme.MIXINS.fontDungGeunMo};
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
  );
}

Contact.bgColor = "#111";

export default Contact;
