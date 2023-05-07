import React, { useState } from "react";
import { styled } from "styled-components";

const images = [
  "images/image1.png",
  "images/image2.png",
  "images/image3.png",
  "images/image4.png",
  "images/image5.png",
  "images/image6.png",
];

function Book(props) {
  const [page, setPage] = useState(1);
  return (
    <Container>
      Book.js
      <Profile>
        <ProfileIcon src="images/Profile.jpg" />
        <ProfileName>Jamie</ProfileName>
      </Profile>
      <PageContainer>
        <Button
          onClick={() => {
            page >= 3 && setPage((page) => page - 2);
          }}
        >{`<`}</Button>
        <Page>
          <Image
            src={
              images.filter((image, index) => {
                return index + 1 === page;
              })[0]
            }
            alt=""
            key={page}
          />
          <PageNum>{page}</PageNum>
        </Page>
        <Page>
          <Image
            src={
              images.filter((image, index) => {
                return index + 1 === page + 1;
              })[0]
            }
            alt=""
            key={page + 1}
          />
          <PageNum>{page + 1}</PageNum>
        </Page>
        <Button
          onClick={() => {
            page < images.length - 1 && setPage((page) => page + 2);
          }}
        >{`>`}</Button>
      </PageContainer>
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid grey;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  background: grey;
  border-radius: 100%;
`;

const ProfileName = styled.div`
  margin-left: 10px;
  border: 1px solid grey;
`;

const PageContainer = styled.div`
  display: flex;
`;

const Page = styled.div`
  width: 200px;
  height: 230px;
  background: lightblue;
  border: 1px solid grey;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  background: lightpink;
  border: 1px solid grey;
`;

const PageNum = styled.div``;

const Button = styled.button`
  background: pink;
`;

export default Book;
