import { styled } from "styled-components";
import DatePicker from "react-datepicker";

export const Loader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
  color: white;
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

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  min-width: 500px;
  max-width: 700px;
  height: 100%;
  padding-top: 10px;
  padding-bottom: 20px;
  box-sizing: border-box;
`;

export const TopicWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 110px;
`;

export const Topic = styled.div`
  flex: 1;
  text-align: center;
  font-size: 30px;
  font-family: inherit;
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
  width: 100%;
  border-radius: 12px;
  color: white;
  background: rgba(255, 255, 255, 0.2);
`;

export const FormBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 25px;
  color: inherit;
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
  width: 150px;
  height: 40px;
  font-size: 18px;
  font-family: inherit;
  border-radius: 10px;
  padding: -10px;
  margin: 0px;
  border: none;
  color: inherit;
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
  font-size: 24px;
`;

export const CharacterName = styled.input`
  display: block;
  width: 150px;
  height: 34px;
  padding: 0px 8px;
  padding-top: 2px;
  margin: 20px 0px;
  font-size: 20px;
  font-family: inherit;
  border: none;
  outline: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  color: inherit;
  background: inherit;
  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.3);
  }
`;

export const Title = styled.input`
  flex: 1.5;
  border: none;
  font-size: 30px;
  font-family: inherit;
  padding-top: 10px;
  padding-bottom: 10px;
  color: inherit;
  background: inherit;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const Contents = styled.textarea`
  flex: 15;
  font-size: 20px;
  line-height: 25px;
  font-family: inherit;
  resize: none;
  border: none;
  color: inherit;
  background: inherit;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
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
  outline: 1px solid rgba(255, 255, 255, 0.3);
  white-space: nowrap;

  ${({ $selected, $background }) =>
    $selected
      ? {
          background: $background,
          color: "black",
          fontWeight: "bold",
          outline: "none",
        }
      : { background: "inherit" }};
  &:hover {
    cursor: pointer;
    outline: 2px solid rgba(255, 255, 255, 0.3);
  }
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
  width: 90px;
  height: 40px;
  border: none;
  border-radius: 10px;
  color: ${({ $background }) => ($background ? "black" : "inherit")};
  background: ${({ $background }) => ($background ? $background : "none")};
  font-family: inherit;
  font-size: 20px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

export const S = {
  Loader,
  LoaderText,
  Error,
  Container,
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
