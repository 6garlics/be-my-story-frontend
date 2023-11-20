import client from "./client";

//편지 보내기
export const sendLetter = async (receiverName, body) => {
  try {
    const res = await client.post(`/letter?to=${receiverName}`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("편지 보내기", res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//편지리스트by유저
export const getLetterListByUser = async (userName) => {
  try {
    const res = await client.get(`/letter/${userName}`, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("편지리스트by유저", res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};
