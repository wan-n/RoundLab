const testOne = document.getElementsByClassName('my-page-btn-icon')[0];
const testTwo = document.getElementsByClassName('my-page-dropdown')[0];

const testThree = document.getElementsByClassName('search-btn-icon')[0];
const testFour = document.getElementsByClassName('search-container')[0];


showContents(testOne, testTwo);
showContents(testThree, testFour);


function showContents(btn, contents){
    // 버튼 클릭 이벤트로 display 스타일 조정
    // 버튼 재클릭 or 컨텐츠 외부 영역 클릭 시 이벤트

    btn.addEventListener('click', () => {
        contents.classList.toggle('hide-box');
        console.log('버튼 클릭!');
    });

    //blur 이벤트 or 페이지 전체 클릭 이벤트 ??
}





