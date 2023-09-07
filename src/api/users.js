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

//아이디 중복확인
export const checkDuplicate = async (userName) => {
  try {
    const res = await axios.get(
      `http://43.202.81.68:80/checkUserName?userName=${userName}`
    );

    console.log(res.data);
    return res;
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
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("beMyStoryToken", token);
    localStorage.setItem("userName", body.get("userName"));
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//로그아웃
export const logout = async (body) => {
  try {
    const res = await client.post(`http://43.202.81.68:80/users/logout`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(res.data);
    const token = res.data.token;
    localStorage.removeItem("beMyStoryToken");
    localStorage.removeItem("userName");

    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//내 정보 조회
export const getMyInfo = async () => {
  try {
    const res = await client.get(`/users/me`);

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("내 정보 조회 에러 발생");
    console.log(err);
    throw err;
  }
};

//다른 유저 정보 조회
export const getUserInfo = async (userName) => {
  try {
    const res = await client.get(`/users?userName=${userName}`);

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//친구 추가
export const follow = async (friendName) => {
  try {
    const res = await client.post(`/users/follow/${friendName}`);

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//친구 삭제
export const unfollow = async (friendName) => {
  try {
    const res = await client.delete(`/users/follow/${friendName}`);

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//친구 여부 조회
export const checkFriend = async (friendName) => {
  try {
    const res = await client.get(`/users/following/${friendName}`);

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//팔로잉 조회
export const getFollowing = async (userName) => {
  try {
    const res = await client.get(`/users/${userName}/following`);

    console.log("팔로잉 목록", res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//팔로워 조회
export const getFollower = async (userName) => {
  try {
    const res = await client.get(`/users/${userName}/follower`);

    console.log("팔로워 목록", res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};
