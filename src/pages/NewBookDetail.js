import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Book from "../components/timeline/Book";
import { getMyInfo, getUserInfo } from "./../api/users";
import { createCover, createImage } from "../api/AIbooks";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { thunkCreateImage } from "../redux/bookSlice";

const NewBookDetail = () => {
  // const [coverUrl, setCoverUrl] = useState();
  // const [images, setImages] = useState();
  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newImages, setNewImages] = useState();

  //Redux의 상태 꺼내오기
  const coverUrl = useSelector((state) => state.book.coverUrl);
  const images = useSelector((state) => state.book.images);
  console.log(coverUrl);
  console.log(images);

  //누락된 일러스트 재요청
  // useEffect(() => {
  //   location.texts.forEach(async (text, pageNum) => {
  //     if (images[pageNum] === "") {
  //       dispatch(
  //         thunkCreateImage({
  //           pageNum: pageNum,
  //           body: {
  //             text: text,
  //           },
  //         })
  //       );
  //     }
  //   });
  // }, []);

  return (
    <Root>
      <Book
        // bookId={location.state.bookId}
        userName={location.state.userName}
        title={location.state.title}
        texts={location.state.texts}
        coverUrl={coverUrl}
        images={images}
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
