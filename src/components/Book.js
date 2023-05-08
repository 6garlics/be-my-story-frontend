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

const text = [
  "피터팬과 아이들은 함께 하늘로 날아 올랐어요.",
  "피터팬은 후크선장을 악어에게 데리고 갔어요.",
  "“과자로 만들어진 집이네?”",
  "남매는 마녀에게 붙잡혀 버렸어요.",
  "아기 돼지 삼형제는 집을 지으러 떠났어요.",
  "형제들은 마침내 집을 완성했답니다.",
];

function Book(props) {
  const [page, setPage] = useState(1);
  return (
    <Container>
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
          <PageText>
            {
              text.filter((t, index) => {
                return index + 1 === page;
              })[0]
            }
          </PageText>
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
          <PageText>
            {
              text.filter((t, index) => {
                return index + 1 === page + 1;
              })[0]
            }
          </PageText>
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

const Container = styled.div``;

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
`;

const PageContainer = styled.div`
  display: flex;
`;

const Page = styled.div`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const PageText = styled.div`
  text-align: center;
  font-size: 20px;
  word-break: keep-all;
`;

const PageNum = styled.div`
  text-align: center;
`;

const Button = styled.button``;

export default Book;
