window.onload = function() {
    // 버튼 업데이트 함수 호출
    updateButtons();
  };

//버튼 업데이트 함수
function updateButtons() {
 // Ajax 요청을 통해 로그인 상태 확인
 var xhr = new XMLHttpRequest();
 xhr.onreadystatechange = function() {
   if (xhr.readyState === XMLHttpRequest.DONE) {
     if (xhr.status === 200) {
       var response = JSON.parse(xhr.responseText);
       if (response.isLoggedIn) {
         // 로그인되어 있으면 버튼 업데이트
         updateLoggedInButtons(response.username);
       } else {
         // 로그인되어 있지 않으면 버튼 업데이트
         updateLoggedOutButtons();
       }
     } else {
       console.error('Ajax 요청 실패: ' + xhr.status);
     }
   }
 };
 xhr.open('GET', '/checkLoginStatus', true); // 서버의 로그인 상태 확인 엔드포인트 지정
 xhr.send();
}

//로그인되어 있을 때 버튼 업데이트 함수
function updateLoggedInButtons(username) {
 var loginButton = document.querySelector('.split-contant .secondary-button[href="/teamProject/authentication-pages/sign-in.do"]');
 if (loginButton) {
   loginButton.innerHTML = username + ' 님'; // 로그인 버튼 텍스트 변경
   loginButton.href = '#'; // 로그인 버튼 링크 삭제
 }

 // 회원가입 버튼 숨기기
 var signUpButton = document.querySelector('.split-contant .secondary-button[href="/teamProject/authentication-pages/sign-up.do"]');
 if (signUpButton) {
   signUpButton.style.display = 'none';
 }
}

//로그인되어 있지 않을 때 버튼 업데이트 함수
function updateLoggedOutButtons() {
 // 여기서는 아무런 작업을 하지 않음
 // 페이지 로드 시 기본 상태로 버튼이 설정되어 있음
}