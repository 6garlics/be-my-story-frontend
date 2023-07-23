import React from "react";

//회원가입
export const register = async () => {};

//로그인
export const login = async () => {};

//🍋 내책장 조회
export const getBookshelf = async (userId) => {
  try {
    const res = await axios.get(
      `http://43.202.81.68:8081/users/${userId}/books`,
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
