# 토리 (Tori)

<img width="100" src="https://github.com/6garlics/tori/assets/97157930/cb60a498-f9d3-42ae-8a96-88199c9358d4">
<img src="https://github.com/6garlics/tori/assets/97157930/6691d4ec-44a4-4b06-946c-fdd816fbd286">

## 📗 세상에 없던 나만의 동화책, 토리
토리는 아동이 일기를 작성하면 생성형 AI가 그림 동화책으로 만들어주어 친구들과 SNS처럼 공유해 볼 수 있는 플랫폼입니다.
<br/><br/>
개발기간: 2023.05 ~ 2023.12
<br/><br/>


## 🧄 팀 육쪽마늘
이화여자대학교 캡스톤디자인과창업프로젝트 6조
<br/><br/>

## 📌 배포 주소
https://tori-fairytale.vercel.app/
<br/><br/>

## 시작 가이드
### Requirements

For building and running the application you need: 
- node `v20.9.0`
- npm `7.24.2`


### Installation
```
git clone https://github.com/6garlics/tori.git
cd tori
npm install
npm start
```

## Stacks

### Development
<div>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=visualstudiocode&logoColor=white"> 
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
</div>

### Environment
<div>
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white"/>
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
</div>

### Config
<div>
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
</div>

### Communication
<div>
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> 
</div>

## 폴더 구조
```javascript
src
│   App.js (최상위 컴포넌트)
│   index.js (최상위 컴포넌트 App.js를 렌더링하는 JS 스크립트)
│   
├───accessControl (로그인 안한 사용자의 접근 제한)
│       isLogin.js
│       PrivateRoutes.js
│       
├───api (웹서버 및 AI 서버에 보내는 api 요청 관리)
│       AIbooks.js
│       AIclient.js
│       books.js
│       client.js
│       letter.js
│       reply.js
│       users.js
│       
├───assets (아이콘 이미지들)
│       arrowLeft.svg
│       arrowRight.svg
│       bookshelf.svg
│       chat.svg
│       diary.svg
│       edit.svg
│       endingPage.svg
│       endingPage2.svg
│       home.svg
│       letter.svg
│       logo.svg
│       logoLight.svg
│       logoPurple.svg
│       pause.svg
│       pencil.svg
│       play.svg
│       plusCircle.svg
│       refresh.svg
│       refresh2.svg
│       smallTrash.svg
│       topics.js
│       trash.svg
│       write.svg
│       
├───components (컴포넌트)
│   ├───book (동화책 열람 페이지 관련 컴포넌트)
│   │       Book.js (동화책 컴포넌트)
│   │       CommentInput.js (댓글 작성창)
│   │       CommentItem.js (댓글 한 개 컴포넌트)
│   │       CommentList.js (댓글 목록 컴포넌트)
│   │       Cover.js (표지 컴포넌트)
│   │       DiaryModal.js (일기 열람 모달)
│   │       LetterForm.js (편지 작성 폼)
│   │       Page.js (동화책의 각 페이지 컴포넌트)
│   │       
│   ├───book_edit (동화책 수정 페이지 관련 컴포넌트)
│   │       PageEdit.js (동화책의 각 페이지 수정 컴포넌트)
│   │       SequelPage.js (뒷이야기 이어쓰기 컴포넌트)
│   │       
│   ├───book_shelf (내 책장 페이지 관련 컴포넌트)
│   │       BookCover.js (내 책장의 동화책 표지 컴포넌트)
│   │       BookList.js (동화책 목록 컴포넌트)
│   │       BookshelfProfile.js (내 책장의 프로필 컴포넌트)
│   │       FriendList.js (팔로잉/팔로워 리스트 컴포넌트)
│   │       FriendListItem.js (팔로잉/팔로워 리스트의 각 아이템)
│   │       
│   ├───common (공통 컴포넌트)
│   │       ArrowButton.js (좌우로 넘기는 버튼)
│   │       Header.js (웹사이트 상단의 헤더 컴포넌트)
│   │       Nav.js (헤더 우측의 네비게이션바)
│   │       Profile.js (프로필 컴포넌트)
│   │       
│   ├───letter_box (편지함 페이지 관련 컴포넌트)
│   │       LetterItem.js (편지함의 편지 한 개 컴포넌트)
│   │       
│   └───timeline (타임라인 페이지 관련 컴포넌트)
│           BookCover.js (타임라인의 동화책 표지 컴포넌트)
│       
└───redux (redux-toolkit으로 전역 상태 관리)
        bookSlice.js (동화책 상태)
        store.js (스토어 관리)
        timelineSlice.js (유저 상태)
        userSlice.js (유저 상태)
        
```


