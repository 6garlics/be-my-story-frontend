import React from "react";
import axios from "axios";

//회원가입
export const register = async (body) => {
  try {
    const res = await axios.post(`http://43.202.81.68:80/users/join`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
  }
};

//로그인
export const login = async (body) => {
  try {
    const res = await axios.post(`http://43.202.81.68:80/users/login`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
  }
};

//🍋 내책장 조회
export const getBookshelf = async (userId) => {
  try {
    const res = await axios.get(
      `http://43.202.81.68:80/users/${userId}/books`,
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
