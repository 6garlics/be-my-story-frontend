import React from "react";
import styled from "styled-components";
import BookCover from "../components/BookCover";

const myBooks = {
  userId: "Jamie",
  profileImage: "images/Profile.jpg",
  books: [
    {
      id: 1,
      title: "피터팬1",
      pages: [
        {
          image: "images/image1.png",
          text: "피터팬과 아이들은 함께 하늘로 날아 올랐어요.",
        },
        {
          image: "images/image2.png",
          text: "피터팬은 후크선장을 악어에게 데리고 갔어요.",
        },
        {
          image: "images/image3.png",
          text: "“과자로 만들어진 집이네?”",
        },
        {
          image: "images/image4.png",
          text: "남매는 마녀에게 붙잡혀 버렸어요.",
        },
        {
          image: "images/image5.png",
          text: "아기 돼지 삼형제는 집을 지으러 떠났어요.",
        },
        {
          image: "images/image6.png",
          text: "형제들은 마침내 집을 완성했답니다.",
        },
      ],
    },
    {
      id: 2,
      title: "피터팬2",
      pages: [
        {
          image: "images/image1.png",
          text: "피터팬과 아이들은 함께 하늘로 날아 올랐어요.",
        },
        {
          image: "images/image2.png",
          text: "피터팬은 후크선장을 악어에게 데리고 갔어요.",
        },
        {
          image: "images/image3.png",
          text: "“과자로 만들어진 집이네?”",
        },
        {
          image: "images/image4.png",
          text: "남매는 마녀에게 붙잡혀 버렸어요.",
        },
        {
          image: "images/image5.png",
          text: "아기 돼지 삼형제는 집을 지으러 떠났어요.",
        },
        {
          image: "images/image6.png",
          text: "형제들은 마침내 집을 완성했답니다.",
        },
      ],
    },
    {
      id: 3,
      title: "피터팬3",
      pages: [
        {
          image: "images/image1.png",
          text: "피터팬과 아이들은 함께 하늘로 날아 올랐어요.",
        },
        {
          image: "images/image2.png",
          text: "피터팬은 후크선장을 악어에게 데리고 갔어요.",
        },
        {
          image: "images/image3.png",
          text: "“과자로 만들어진 집이네?”",
        },
        {
          image: "images/image4.png",
          text: "남매는 마녀에게 붙잡혀 버렸어요.",
        },
        {
          image: "images/image5.png",
          text: "아기 돼지 삼형제는 집을 지으러 떠났어요.",
        },
        {
          image: "images/image6.png",
          text: "형제들은 마침내 집을 완성했답니다.",
        },
      ],
    },
    {
      id: 4,
      title: "피터팬4",
      pages: [
        {
          image: "images/image1.png",
          text: "피터팬과 아이들은 함께 하늘로 날아 올랐어요.",
        },
        {
          image: "images/image2.png",
          text: "피터팬은 후크선장을 악어에게 데리고 갔어요.",
        },
        {
          image: "images/image3.png",
          text: "“과자로 만들어진 집이네?”",
        },
        {
          image: "images/image4.png",
          text: "남매는 마녀에게 붙잡혀 버렸어요.",
        },
        {
          image: "images/image5.png",
          text: "아기 돼지 삼형제는 집을 지으러 떠났어요.",
        },
        {
          image: "images/image6.png",
          text: "형제들은 마침내 집을 완성했답니다.",
        },
      ],
    },
    {
      id: 5,
      title: "피터팬5",
      pages: [
        {
          image: "images/image1.png",
          text: "피터팬과 아이들은 함께 하늘로 날아 올랐어요.",
        },
        {
          image: "images/image2.png",
          text: "피터팬은 후크선장을 악어에게 데리고 갔어요.",
        },
        {
          image: "images/image3.png",
          text: "“과자로 만들어진 집이네?”",
        },
        {
          image: "images/image4.png",
          text: "남매는 마녀에게 붙잡혀 버렸어요.",
        },
        {
          image: "images/image5.png",
          text: "아기 돼지 삼형제는 집을 지으러 떠났어요.",
        },
        {
          image: "images/image6.png",
          text: "형제들은 마침내 집을 완성했답니다.",
        },
      ],
    },
    {
      id: 6,
      title: "피터팬6",
      pages: [
        {
          image: "images/image1.png",
          text: "피터팬과 아이들은 함께 하늘로 날아 올랐어요.",
        },
        {
          image: "images/image2.png",
          text: "피터팬은 후크선장을 악어에게 데리고 갔어요.",
        },
        {
          image: "images/image3.png",
          text: "“과자로 만들어진 집이네?”",
        },
        {
          image: "images/image4.png",
          text: "남매는 마녀에게 붙잡혀 버렸어요.",
        },
        {
          image: "images/image5.png",
          text: "아기 돼지 삼형제는 집을 지으러 떠났어요.",
        },
        {
          image: "images/image6.png",
          text: "형제들은 마침내 집을 완성했답니다.",
        },
      ],
    },
    {
      id: 7,
      title: "피터팬7",
      pages: [
        {
          image: "images/image1.png",
          text: "피터팬과 아이들은 함께 하늘로 날아 올랐어요.",
        },
        {
          image: "images/image2.png",
          text: "피터팬은 후크선장을 악어에게 데리고 갔어요.",
        },
        {
          image: "images/image3.png",
          text: "“과자로 만들어진 집이네?”",
        },
        {
          image: "images/image4.png",
          text: "남매는 마녀에게 붙잡혀 버렸어요.",
        },
        {
          image: "images/image5.png",
          text: "아기 돼지 삼형제는 집을 지으러 떠났어요.",
        },
        {
          image: "images/image6.png",
          text: "형제들은 마침내 집을 완성했답니다.",
        },
      ],
    },
    {
      id: 8,
      title: "피터팬8",
      pages: [
        {
          image: "images/image1.png",
          text: "피터팬과 아이들은 함께 하늘로 날아 올랐어요.",
        },
        {
          image: "images/image2.png",
          text: "피터팬은 후크선장을 악어에게 데리고 갔어요.",
        },
        {
          image: "images/image3.png",
          text: "“과자로 만들어진 집이네?”",
        },
        {
          image: "images/image4.png",
          text: "남매는 마녀에게 붙잡혀 버렸어요.",
        },
        {
          image: "images/image5.png",
          text: "아기 돼지 삼형제는 집을 지으러 떠났어요.",
        },
        {
          image: "images/image6.png",
          text: "형제들은 마침내 집을 완성했답니다.",
        },
      ],
    },
  ],
};

const MyBookshelf = () => {
  return (
    <Container>
      <Profile>
        <ProfileIcon src={myBooks.profileImage} />
        <ProfileName>{myBooks.userId}</ProfileName>
        <FriendsButton>친구목록</FriendsButton>
      </Profile>
      <Bookshelf>
        {myBooks.books.map((book) => (
          <BookCover
            key={book.id}
            coverImage={book.pages[0].image}
            title={book.title}
          />
        ))}
      </Bookshelf>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  width: 450px;
  padding: 60px;
`;

const ProfileIcon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
`;

const ProfileName = styled.div`
  flex: none;
  font-size: 30px;
  margin-left: 20px;
`;

const FriendsButton = styled.button`
  margin-left: auto;
  width: 50px;
`;

const Bookshelf = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
`;

export default MyBookshelf;
