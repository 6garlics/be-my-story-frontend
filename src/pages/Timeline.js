import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
//import axios from "axios";
import Book from "../components/timeline/Book";
import { friends } from "../data/FriendsData";

const id = 0;

function Timeline() {
  // const [friends, setFriends] = useState([]);

  //Postman Mock Server 사용시 aixos 호출
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Container>
        {friends.map((friend, index) => (
          <Book key={index} friend={friend} />
        ))}
      </Container>
    </div>
  );
}

const Container = styled.div``;

export default Timeline;
