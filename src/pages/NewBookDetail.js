import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Book from "../components/timeline/Book";
import { getMyInfo, getUserInfo } from "./../api/users";
import { createCover, createImage } from "./../api/books";
import { useSelector } from "react-redux";

const NewBookDetail = () => {
  const location = useLocation();
  console.log(location);

  const [newImages, setNewImages] = useState();

  //Redux의 상태 꺼내오기
  const coverUrl = useSelector((state) => state.coverUrl);
  const images = useSelector((state) => state.images);
  console.log(coverUrl);
  console.log(images);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Book
          userName={location.state.userName}
          title={location.state.title}
          texts={location.state.texts}
          coverUrl={coverUrl}
          images={images.map((image, index) => {
            return image.imgUrl;
          })}
        />
      </div>
    </div>
  );
};

export default NewBookDetail;
