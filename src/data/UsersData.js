import { books } from "./BooksData";

export const users = [
  {
    userId: 0,
    nickname: books[0][0].nickname,
    profileImage: books[0][0].profileImage,
    myBooks: books[0],
    myFriends: [...books[1], ...books[2], ...books[3]],
  },

  {
    userId: 1,
    nickname: books[1][0].nickname,
    profileImage: books[1][0].profileImage,
    myBooks: books[1],
    myFriends: [...books[2], ...books[3]],
  },

  {
    userId: 2,
    nickname: books[2][0].nickname,
    profileImage: books[2][0].profileImage,
    myBooks: books[2],
    myFriends: [...books[1], ...books[3]],
  },

  {
    userId: 3,
    nickname: books[3][0].nickname,
    profileImage: books[3][0].profileImage,
    myBooks: books[3],
    myFriends: [...books[1], ...books[2]],
  },
];
