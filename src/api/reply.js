import client from "./client";

//댓글 리스트 조회
export const getCommentList = async (bId) => {
  try {
    const res = await client.get(`/reply/${bId}`, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("댓글 리스트 조회", res.data.replies);
    return res.data.replies;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//모댓글 등록
export const postComment = async (bId, body) => {
  try {
    const res = await client.post(`/reply?bId=${bId}`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("등록된 모댓글 id: ", res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};

//댓글 삭제
export const deleteComment = async (replyId) => {
  try {
    const res = await client.delete(`/reply/${replyId}`, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("삭제된 댓글 id: ", res.data);
    return res.data;
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
    throw err;
  }
};
