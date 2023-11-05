import React from "react";
import { styled } from "styled-components";
import Profile from "../components/common/Profile";
import MailItem from "../components/mail_box/MailItem";

const mails = [
  {
    bookId: 0,
    senderName: "lion",
    content:
      "이것은 편지 내용입니다. 어찌고 저찌고 이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고",
  },
  {
    bookId: 0,
    senderName: "quokka",
    content:
      "이것은 편지 내용입니다. 어찌고 저찌고 이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고",
  },
  {
    bookId: 0,
    senderName: "cat",
    content:
      "이것은 편지 내용입니다. 어찌고 저찌고 이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고",
  },
  {
    bookId: 0,
    senderName: "quokka",
    content:
      "이것은 편지 내용입니다. 어찌고 저찌고 이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고",
  },
  {
    bookId: 0,
    senderName: "lion",
    content:
      "이것은 편지 내용입니다. 어찌고 저찌고 이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고",
  },
  {
    bookId: 0,
    senderName: "lion",
    content:
      "이것은 편지 내용입니다. 어찌고 저찌고 이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고",
  },
  {
    bookId: 0,
    senderName: "lion",
    content:
      "이것은 편지 내용입니다. 어찌고 저찌고 이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고",
  },
  {
    bookId: 0,
    senderName: "cat",
    content:
      "이것은 편지 내용입니다. 어찌고 저찌고 이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고이것은 편지 내용입니다. 어찌고 저찌고",
  },
];

const MailBoxPage = () => {
  return (
    <Wrapper>
      <MailWrapper>
        <MailViewer>
          <Header>
            <Profile userName="lion" />
            님이 보낸 편지
          </Header>
          <Content>
            이것은 편지 내용입니다 랄ㄹ라랄 이것은 편지 내용이다 하하하하하하
            이것은 편지 내용입니다 랄ㄹ라랄 이것은 편지 내용이다 하하하하하하
            이것은 편지 내용입니다 랄ㄹ라랄 이것은 편지 내용이다 하하하하하하
            이것은 편지 내용입니다 랄ㄹ라랄 이것은 편지 내용이다 하하하하하하
            이것은 편지 내용입니다 랄ㄹ라랄 이것은 편지 내용이다 하하하하하하
            이것은 편지 내용입니다 랄ㄹ라랄 이것은 편지 내용이다 하하하하하하
            이것은 편지 내용입니다 랄ㄹ라랄 이것은 편지 내용이다 하하하하하하
            이것은 편지 내용입니다 랄ㄹ라랄 이것은 편지 내용이다 하하하하하하
            이것은 편지 내용입니다 랄ㄹ라랄 이것은 편지 내용이다 하하하하하하
            이것은 편지 내용입니다 랄ㄹ라랄 이것은 편지 내용이다 하하하하하하
            이것은 편지 내용입니다 랄ㄹ라랄 이것은 편지 내용이다 하하하하하하
            이것은 편지 내용입니다 랄ㄹ라랄 이것은 편지 내용이다 하하하하하하
          </Content>
        </MailViewer>
      </MailWrapper>
      <MailList>
        {mails.map((mail) => (
          <MailItem
            bookId={mail.bookId}
            senderName={mail.senderName}
            content={mail.content}
          />
        ))}
      </MailList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

const MailWrapper = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MailViewer = styled.div`
  width: 500px;
  height: 600px;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 22px;
`;

const Content = styled.div`
  background: none;
  border: none;
  resize: none;
  width: 100%;
  height: 90%;
  flex: 1;
  box-sizing: border-box;
  color: inherit;
  font-family: inherit;
  font-size: 22px;
  vertical-align: super;
  margin-top: 10px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  &:focus {
    outline: none;
  }

  /* 밑줄 */
  line-height: 34px;
  background-attachment: local;
  background-image: repeating-linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 33px,
    rgba(255, 255, 255, 0.2) 33px,
    rgba(255, 255, 255, 0.2) 34px,
    rgba(0, 0, 0, 0) 34px
  );

  //스크롤바 디자인
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 16px;
    visibility: hidden;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(151, 161, 255, 0.5);
    border-radius: 10px;
    background-clip: padding-box;
    border: 4px solid transparent;
    &:hover {
      cursor: default;
    }
  }
  &::-webkit-scrollbar-track {
    visibility: hidden;
  }
`;

const MailList = styled.div`
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  padding-left: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: scroll;
  overflow-x: hidden; //가로 스크롤바 숨기기
  //스크롤바 디자인
  &::-webkit-scrollbar {
    width: 20px;
    visibility: hidden;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(151, 161, 255, 0.6);
    border-radius: 10px;
    background-clip: padding-box;
    border: 4px solid transparent;
  }
  &::-webkit-scrollbar-track {
    visibility: hidden;
  }
`;

export default MailBoxPage;
