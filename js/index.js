const testOne = document.getElementsByClassName('my-page-btn-icon')[0];
const testTwo = document.getElementsByClassName('my-page-dropdown')[0];

const testThree = document.getElementsByClassName('search-btn-icon')[0];
const testFour = document.getElementsByClassName('search-container')[0];

showContents(testOne, testTwo);
showContents(testThree, testFour);


function showContents(eventBtn, contents){
    // 버튼 클릭 이벤트로 display 스타일 조정
    // 버튼 재클릭 or 닫기 클릭 or 컨텐츠 외부 영역 클릭 시 이벤트

    eventBtn.addEventListener('click', () => {
        contents.classList.toggle('hide-box');
        console.log('버튼 클릭!');
    });

    eventBtn.addEventListener('blur', () => {
        contents.classList.add('hide-box');
        console.log('외부영역');
    });
}





