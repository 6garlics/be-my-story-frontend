import { styled } from "styled-components";
import DatePicker from "react-datepicker";

export const Loader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
  color: grey;
  font-size: 20px;
`;

export const LoaderText = styled.div`
  margin-top: 40px;
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  font-weight: bold;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 60px);
  padding-top: 30px;
  padding-bottom: 30px;
  box-sizing: border-box;
`;

export const TopicWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 700px;
  height: 110px;
`;

export const Topic = styled.div`
  flex: 1;
  text-align: center;
  font-size: 30px;
  font-family: "Gaegu";
  word-break: keep-all;
  white-space: pre-wrap;
`;

export const RefreshIcon = styled.img`
  position: relative;
  right: 0;
  &:hover {
    cursor: pointer;
  }
`;

export const Form = styled.form`
  flex: 1;
  display: flex;
`;

export const FormBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 700px;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 25px;
  color: black;
  background: white;
  display: ${({ $show }) => !$show && "none"};
`;

export const PrevBtn = styled.div`
  &:hover {
    cursor: pointer;
  }
  width: 50px;
  padding: 4px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export const Img = styled.img`
  width: 8px;
`;

export const Text = styled.div`
  margin: 6px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SDatePicker = styled(DatePicker)`
  width: 130px;
  height: 40px;
  font-size: 16px;
  border-radius: 10px;
  padding: -10px;
  margin: 0px;
  border: none;
  background: inherit;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

export const CharacterNameWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.div`
  font-size: 18px;
  /* margin-bottom: 20px; */
`;

export const CharacterName = styled.input`
  display: block;
  width: 170px;
  height: 34px;
  padding: 0px 8px;
  margin: 20px 0px;
  font-size: 16px;
  border: none;
  border: 1px solid lightgrey;
  border-radius: 10px;
  background: inherit;
  &:focus {
    outline: none;
  }
`;

export const Title = styled.input`
  flex: 1.5;
  border: none;
  font-size: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: inherit;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #999999;
  }
`;

export const Contents = styled.textarea`
  flex: 15;
  font-size: 16px;
  line-height: 25px;
  font-family: "Nanum Gothic";
  resize: none;
  border: none;
  background: inherit;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #999999;
  }
`;

export const GenreWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Genres = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  margin: 10px 0px;
  flex-wrap: wrap;
`;

export const GenreLabel = styled.label``;

export const RadioButton = styled.input`
  display: none;
`;

export const Genre = styled.div`
  width: 60px;
  text-align: center;
  margin: 10px;
  padding: 5px 10px;
  border-radius: 50px;
  outline: 1px solid lightgrey;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
  ${(props) =>
    props.index === props.selectedGenre
      ? { background: "#BEDDFF", fontWeight: "bold", outline: "none" }
      : { background: "inherit" }}
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: #beddff;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;

export const S = {
  Loader,
  LoaderText,
  Error,
  Wrapper,
  TopicWrapper,
  Topic,
  RefreshIcon,
  Form,
  FormBox,
  PrevBtn,
  Img,
  Text,
  Header,
  SDatePicker,
  CharacterNameWrapper,
  Label,
  CharacterName,
  Title,
  Contents,
  GenreWrapper,
  Genres,
  GenreLabel,
  RadioButton,
  Genre,
  ButtonWrapper,
  Button,
};
