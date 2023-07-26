import React from "react";
import axios from "axios";

//전체 동화책 조회
export const getBooks = async () => {};

//동화책 1개 조회
export const getBook = async () => {};

//동화책 1개 수정
export const editBook = async () => {};

//🍋 동화 텍스트 생성
export const createTexts = async (body) => {
  try {
    const res = await axios.post(`http://43.202.81.68:80/books`, body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: false,
    });

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    return err;
  }
};

//🍋 표지 생성
export const createCover = async (bookId) => {
  try {
    const res = await axios.get(
      `http://43.202.81.68:80/books/${bookId}/cover`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
  }
};

//🍋 일러스트 1개 생성
export const createImage = async (bookId, pageNum) => {
  try {
    const res = await axios.get(
      `http://43.202.81.68:80/books/${bookId}/pages/${pageNum}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
  }
};
