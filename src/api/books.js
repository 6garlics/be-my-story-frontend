import React from "react";
import axios from "axios";
import client from "./client";

//전체 동화책 조회
export const getBooks = async () => {
  try {
    const res = await axios.get(
      `https://1d805cb7-0534-49b3-93af-7b95cf7604c4.mock.pstmn.io/books`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//동화책 1개 조회
export const getBook = async () => {};

//동화책 1개 수정
export const editBook = async () => {};

//🍋 동화 텍스트 생성
export const createTexts = async (body) => {
  try {
    const res = await client.post(`/books`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//🍋 표지 생성
export const createCover = async (bookId) => {
  try {
    const res = await client.get(
      `/books/${bookId}/cover`,
      // `https://1d805cb7-0534-49b3-93af-7b95cf7604c4.mock.pstmn.io/books/${bookId}/cover`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("cover", res.data);
    return res.data;
  } catch (err) {
    console.log("커버 에러 발생");
    console.log(err);
    throw err;
  }
};

//🍋 일러스트 1개 생성
export const createImage = async (bookId, pageNum) => {
  try {
    const res = await client.get(
      `/books/${bookId}/pages/${pageNum}`,
      // `https://1d805cb7-0534-49b3-93af-7b95cf7604c4.mock.pstmn.io/books/${bookId}/pages/${pageNum}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};
