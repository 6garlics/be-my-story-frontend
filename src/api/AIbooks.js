import AIclient from "./AIclient";

//동화 텍스트 생성
export const createTexts = async (body) => {
  try {
    const res = await AIclient.post(`/diaryToStory`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("생성된 동화 텍스트", res.data);
    return res.data;
  } catch (err) {
    console.log("동화 텍스트 에러 발생");
    console.log(err);
    throw err;
  }
};

//배경음악 생성
export const createMusic = async (body) => {
  try {
    const res = await AIclient.post(`/music`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("생성된 배경음악 url", res.data);
    return res.data;
  } catch (err) {
    console.log("배경음악 에러 발생");
    console.log(err);
    throw err;
  }
};

//표지 생성
export const createCover = async (body) => {
  try {
    const res = await AIclient.post(`/cover`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("생성된 커버", res.data);
    return res.data;
  } catch (err) {
    console.log("커버 에러 발생");
    console.log(err);
    throw err;
  }
};

//일러스트 1개 생성
export const createImage = async (pageNum, body) => {
  try {
    const res = await AIclient.post(`/textToImage/${pageNum}`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("생성된 일러스트", res.data);
    return res.data;
  } catch (err) {
    console.log("일러스트 에러 발생");
    console.log(err);
    throw err;
  }
};
