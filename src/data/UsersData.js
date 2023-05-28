import { books } from "./BooksData";

export const users = [
  {
    userId: 0,
    nickname: "Jamie",
    profileImage: "/images/profile.jpg",
    myBooks: books[0],
    myFriends: [...books[1], ...books[2], ...books[3]],
  },

  {
    userId: 1,
    nickname: "Emma1",
    profileImage: "/images/profile.jpg",
    myBooks: books[1],
    myFriends: [...books[2], ...books[3]],
  },

  {
    userId: 2,
    nickname: "Emma2",
    profileImage: "/images/profile.jpg",
    myBooks: books[2],
    myFriends: [...books[1], ...books[3]],
  },

  {
    userId: 3,
    nickname: "Emma3",
    profileImage: "/images/profile.jpg",
    myBooks: books[3],
    myFriends: [...books[1], ...books[2]],
  },
];
