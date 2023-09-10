import React from "react";
import axios from "axios";
import AIclient from "./AIclient";

//동화 텍스트 생성
export const createTexts = async (body) => {
  try {
    const res = await AIclient.post(`/diaryToStory`, body, {
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

//표지 생성
export const createCover = async (body, dispatch) => {
  try {
    const res = await AIclient.post(`/cover`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("cover", res.data);
    //리덕스에 저장
    dispatch({ type: "UPDATE_COVER", data: { coverUrl: res.data.coverUrl } });

    return res.data;
  } catch (err) {
    console.log("커버 에러 발생");
    console.log(err);
    throw err;
  }
};

//일러스트 1개 생성
export const createImage = async (pageNum, body, dispatch) => {
  try {
    const res = await AIclient.post(`/textToImage/${pageNum}`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(res.data);
    //리덕스에 저장
    dispatch({
      type: "UPDATE_IMAGES",
      data: { pageNum: res.data.pageNum, imgUrl: res.data.imgUrl },
    });
    // dispatch({ type: "SORT_IMAGES" });

    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};
