import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Book from "../components/timeline/Book";
import { getMyInfo, getUserInfo } from "./../api/users";
import { createCover, createImage } from "./../api/books";
import { useSelector } from "react-redux";

const NewBookDetail = () => {
  const location = useLocation();
  console.log(location);

  const coverUrl = useSelector((state) => state.coverUrl);
  const images = useSelector((state) => state.images);
  console.log(coverUrl);
  console.log(images);

  const [profileImg, setProfileImg] = useState();
  // const [coverUrl, setCoverUrl] = useState("");
  // const [images, setImages] = useState([]);

  // //유저 프로필이미지 조회
  // useEffect(() => {
  //   async function fetchMyInfo() {
  //     const userData = await getMyInfo();
  //     setProfileImg(userData.profileImg);
  //   }
  //   // fetchMyInfo();
  // }, []);

  // //표지 생성
  // useEffect(() => {
  //   async function fetchCover() {
  //     try {
  //       const coverData = await createCover(location.state.bookId);
  //       setCoverUrl(coverData);
  //     } catch (err) {
  //       setCoverUrl("/images/dummy3.png");
  //     }
  //   }
  //   // fetchCover();
  // }, []);

  // //일러스트 여러개 생성
  // useEffect(() => {
  //   async function fetchImages() {
  //     location.state.texts.forEach(async (_, pageNum) => {
  //       let newBookImages = images;
  //       try {
  //         newBookImages[pageNum] = await createImage(
  //           location.state.bookId,
  //           pageNum
  //         );
  //         setImages(newBookImages);
  //       } catch (err) {
  //         newBookImages[pageNum] = "/images/bike1.png";
  //         setImages(newBookImages);
  //       }
  //     });
  //   }
  //   // fetchImages();
  // }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Book
          userName={location.state.userName}
          profileImg={location.state.profileImg}
          title={location.state.title}
          texts={location.state.texts}
          coverUrl={coverUrl}
          images={images}
        />
      </div>
    </div>
  );
};

export default NewBookDetail;
