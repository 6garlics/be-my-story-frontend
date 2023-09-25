import axios from "axios";
import client from "./client";
import { bookSlice } from "../redux/bookSlice";

//전체 동화책 조회
export const getBooks = async () => {
  try {
    const res = await axios.get(
      `https://1d805cb7-0534-49b3-93af-7b95cf7604c4.mock.pstmn.io/books`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("전체 동화책 조회", res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//책장 조회
export const getBookshelf = async (userName) => {
  try {
    const res = await client.get(`/books?userName=${userName}`);

    console.log("책장 조회", res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//동화책 1개 조회
export const getBook = async (bookId) => {
  try {
    const res = await client.get(`/books/${bookId}`);

    console.log("동화책 1개 조회", res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//동화책 1개 수정
export const editBook = async (bookId, body) => {
  try {
    const res = await client.put(`/books/${bookId}`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("동화책 1개 수정", res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//동화책 1개 삭제
export const deleteBook = async (bookId) => {
  try {
    const res = await client.delete(`/books/${bookId}`);

    console.log("동화책 1개 삭제", res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//동화 텍스트 생성
export const createTexts = async (body) => {
  try {
    const res = await client.post(`/books`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("동화 텍스트 생성", res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//표지 생성
export const createCover = async (bookId, dispatch) => {
  try {
    const res = await client.get(
      `/books/${bookId}/cover`,
      // `https://1d805cb7-0534-49b3-93af-7b95cf7604c4.mock.pstmn.io/books/${bookId}/cover`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("표지 생성", res.data);
    //리덕스에 저장
    dispatch(bookSlice.actions.setCover({ coverUrl: res.data.coverUrl }));

    return res.data;
  } catch (err) {
    console.log("커버 에러 발생");
    console.log(err);
    throw err;
  }
};

//일러스트 1개 생성
export const createImage = async (bookId, pageNum, dispatch) => {
  try {
    const res = await client.get(
      `/books/${bookId}/pages/${pageNum}`,
      // `https://1d805cb7-0534-49b3-93af-7b95cf7604c4.mock.pstmn.io/books/${bookId}/pages/${pageNum}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("일러스트 1개 생성", res.data);
    //리덕스에 저장
    dispatch(
      bookSlice.actions.setImages({
        index: res.data.index,
        imgUrl: res.data.imgUrl,
      })
    );
    dispatch(bookSlice.actions.sortImages());

    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//일기 조회
export const getDiary = async (bookId) => {
  try {
    const res = await client.get(`/books/${bookId}/diary`);

    console.log("일기 조회", res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//일기 저장
export const postDiary = async (body) => {
  try {
    const res = await client.post(`/diary`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("일기 저장 - 저장된 일기의 id", res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//최초 동화책 저장
export const postBook = async (body) => {
  console.log("최초 동화책 저장 body", body);
  try {
    const res = await client.post(`/books`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("최초 동화책 저장 - 저장된 동화책의 id", res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};
