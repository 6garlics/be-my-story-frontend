import React from "react";
import axios from "axios";
import client from "./client";

//회원가입
export const join = async (body) => {
  try {
    const res = await axios.post(`http://43.202.81.68:80/users/join`, body, {
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

//로그인
export const login = async (body) => {
  try {
    const res = await axios.post(`http://43.202.81.68:80/users/login`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(res.data);
    const token = res.data.token;
    localStorage.setItem("beMyStoryToken", token);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//🍋 내 정보 조회
export const getMyInfo = async () => {
  try {
    const res = await client.get(`/users/me`, {
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

//🍋 다른 유저 정보 조회
export const getUserInfo = async (userName) => {
  try {
    const res = await client.get(`/users/${userName}`, {
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

//🍋 내책장 조회
export const getBookshelf = async (userId) => {
  try {
    const res = await client.get(`/users/${userId}/books`, {
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
