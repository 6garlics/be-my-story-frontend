import React, { useState } from "react";
import { styled } from "styled-components";

function Book({ book }) {
  const [pageNum, setPageNum] = useState(0);
  return (
    <Container>
      <Profile>
        <ProfileIcon src={book.profileImage} />
        <ProfileName>{book.userId}</ProfileName>
      </Profile>
      <PageContainer>
        <Page>
          <ImageBox>
            <Image src={book.pages[pageNum].image} alt="" key={pageNum} />
            <Button
              onClick={() => {
                pageNum > 1 && setPageNum((pageNum) => pageNum - 2);
              }}
              left="0px"
              right="auto"
            >{`<`}</Button>
          </ImageBox>
          <PageNum left="3px" right="auto">
            {pageNum + 1}
          </PageNum>
          <PageText>{book.pages[pageNum].text}</PageText>
        </Page>
        <Page>
          <ImageBox>
            <Image
              src={book.pages[pageNum + 1].image}
              alt=""
              key={pageNum + 1}
            />
            <Button
              onClick={() => {
                pageNum < book.pages.length - 2 &&
                  setPageNum((pageNum) => pageNum + 2);
              }}
              left="auto"
              right="0px"
            >{`>`}</Button>
          </ImageBox>
          <PageNum left="auto" right="3px">
            {pageNum + 2}
          </PageNum>
          <PageText>{book.pages[pageNum + 1].text}</PageText>
        </Page>
      </PageContainer>
    </Container>
  );
}

const Container = styled.div`
  margin: 10px 20px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

const ProfileName = styled.div`
  margin-left: 10px;
`;

const PageContainer = styled.div`
  display: flex;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid grey;
`;

const ImageBox = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  /* 윈도우 가로 크기 늘렸을때 5,6 페이지만 크기 작아지는 현상 발생 */
  /* 이미지가 실제크기 이상으로 안늘어나는 듯 */
`;

const Button = styled.button`
  position: absolute;
  top: 0px;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  width: 50%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  opacity: 0;
  /* 문제점: 버튼의 세로길이가 이미지의 세로길이보다 살짝 길다.*/
  /* 마우스 hover시 강조 효과로 inner 그림자 주면 좋을 듯 */
`;

const PageNum = styled.div`
  position: absolute;
  bottom: 2px;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  text-align: center;
`;

const PageText = styled.div`
  text-align: center;
  font-size: 20px;
  word-break: keep-all;
  height: 6rem;
`;

export default Book;
