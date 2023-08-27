import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Book from "../components/timeline/Book";
import { getMyInfo, getUserInfo } from "./../api/users";
import { createCover, createImage } from "./../api/books";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

const NewBookDetail = () => {
  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();

  const [newImages, setNewImages] = useState();

  //Redux의 상태 꺼내오기
  const coverUrl = useSelector((state) => state.coverUrl);
  const images = useSelector((state) => state.images);
  console.log(coverUrl);
  console.log(images);

  return (
    <Root>
      <Book
        bookId={location.state.bookId}
        userName={location.state.userName}
        title={location.state.title}
        texts={location.state.texts}
        coverUrl={coverUrl}
        images={images.map((image, index) => {
          return image.imgUrl;
        })}
      />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
`;

export default NewBookDetail;
