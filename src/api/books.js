import client from "./client";

//전체 동화책 조회
export const getBooks = async () => {
  try {
    const res = await client.get(
      `/timeline?category=ALL&page=1&size=10&sort=DESC`,
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
