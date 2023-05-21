import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import Book from "../components/timeline/Book";

const id = 1;

function Timeline() {
  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
    const response = await axios(
      `https://8d2f9c4b-049f-4bd4-81c4-e22ed6603982.mock.pstmn.io/user/${id}/friends`
    );
    setFriends(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    getFriends();
  }, []);

  return (
    <Container>
      {friends.map((book, index) => (
        <Book key={index} book={book} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  /* background: beige; */
`;

export default Timeline;
