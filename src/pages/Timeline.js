import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import Book from "../components/timeline/Book";
import { friends } from "../data/Friends";

const id = 0;

function Timeline() {
  // const [friends, setFriends] = useState([]);

  // const getFriends = async () => {
  //   const response = await axios(
  //     `https://1d805cb7-0534-49b3-93af-7b95cf7604c4.mock.pstmn.io/users/${id}/friends`
  //   );
  //   setFriends(response.data);
  //   console.log("Timeline: ", response.data);
  // };
  // useEffect(() => {
  //   getFriends();
  // }, []);

  return (
    <Container>
      {friends.map((friend, index) => (
        <Book key={index} friend={friend} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  /* background: beige; */
`;

export default Timeline;
