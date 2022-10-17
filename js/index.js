


makeScrollAnimation();  //헤더 SA
scrollToTop();  //스크롤 투 탑 버튼
copyText();  //푸터 텍스트 복사
makeIntroCarousel();   //인트로
makeLineTabMenu();   //라인 탭메뉴
makeCategoryTabMenu();  //유형 탭메뉴







    



function makeScrollAnimation(){
    //쓰로틀링
    let lastScrollY = 0;
    let timer;
    window.addEventListener("scroll", () => {
        if (!timer) {  //타이머가 설정되어있을 땐 실행되지 않도록 한다.
            timer = setTimeout(() => {
                timer = null;

                makeHeaderSA(lastScrollY);
                makeItemLineSA();
                makeBgSA();
                makeReviewSA();

                lastScrollY = window.scrollY;
            }, 100);
        }
    });
}

function makeHeaderSA(lastScrollY){
    const header = document.querySelector('header');

    header.style.transition = '.3s';
    if(window.innerWidth < 1100){
        if(window.scrollY > 50){
            if(window.scrollY > lastScrollY){  //스크롤 방향이 아래쪽
                header.classList.add('push-up');
            }else if(window.scrollY < lastScrollY){ //스크롤 방향이 위쪽
                header.classList.remove('push-up');
            }
        }else{
            header.classList.remove('push-up');
        }
    }else{
        header.classList.remove('push-up');
    }
}

function makeIntroCarousel(){
    const introBox = document.getElementsByClassName('intro-box');
    let index = 0;

    for(let i = 0; i < introBox.length; i++){
        introBox[i].style.transition = '1s'
        if(i == index){
            introBox[i].classList.remove('move-back');
        }else{
            introBox[i].classList.add('move-back');
        }
    }

    setInterval(() => {
        if(index < introBox.length - 1){
            index++;
        }else if(index == introBox.length - 1){
            index = 0;
        }else{
            index = 0;
            console.log('error... reset index');
        }

        for(let i = 0; i < introBox.length; i++){
            if(i == index){
                introBox[i].classList.remove('move-back');
            }else{
                introBox[i].classList.add('move-back');
            }
        }
    }, 5000);
}

function makeItemLineSA(){
    const lineContainer = document.getElementsByClassName('line-container');
    

    for(let i = 0; i < lineContainer.length; i++){
        lineContainer[i].style.transition = '1s';
        
        if(lineContainer[i].getBoundingClientRect().top - window.innerHeight < 0){
            if(i == 1){
                lineContainer[i].classList.remove('from-right');
            }else{
                lineContainer[i].classList.remove('from-left');
            }
        }
    }
}

function makeLineTabMenu(){
    const frame = document.querySelector('#line-products .selected-type-frame');
    const contents = document.querySelector('#line-products .type-contents-wrapper');
    const btn = document.getElementsByClassName('line-type-btn');

    makeTabMenu(frame, contents, btn);
}

function makeCategoryTabMenu(){
    const frame = document.querySelector('#category-product .selected-type-frame');
    const contents = document.querySelector('#category-product .type-contents-wrapper');
    const btn = document.getElementsByClassName('category-type-btn');

    makeTabMenu(frame, contents, btn);
}

function makeTabMenu(frameElements, contentsElements, btnElements){
    const frame = frameElements;
    const contents = contentsElements;
    const btn = btnElements;

    btn[0].classList.add('selected-tab');

    for(let index = 0; index < btn.length; index++){
        btn[index].addEventListener('click', () => {
            console.log(index);
            contents.style.transform = `translateX(-${frame.clientWidth * index}px)`
            for(let i = 0; i < btn.length; i++){
                if(i == index){
                    btn[i].classList.add('selected-tab');
                }else{
                    btn[i].classList.remove('selected-tab');
                }
            }
        });
    }
}

function makeBgSA(){
    const lineBg = document.querySelector('.line-bg-blue');
    const categoryBg = document.querySelector('.category-bg-blue');

    lineBg.style.transition = '1s';
    categoryBg.style.transition = '1s';

    if(lineBg.getBoundingClientRect().top - window.innerHeight < 0){
        lineBg.classList.remove('from-left-all');
    }

    if(categoryBg.getBoundingClientRect().top - window.innerHeight < 0){
        categoryBg.classList.remove('from-left-all');
    }
}

function makeReviewSA(){
    const reviewColumns = document.getElementsByClassName('review-columns');
    const reviewFrame = document.querySelector('.review-frame');

    for(let i = 0; i < reviewColumns.length; i++){
        reviewColumns[i].style.transition = '.7s';
        if(reviewFrame.getBoundingClientRect().top - window.innerHeight < 0){
            setTimeout(() => {
                reviewColumns[i].classList.remove('from-bottom');
            }, 200*(i+1));
        }
    }
}

function copyText(){
    const copy = document.getElementsByClassName('copy-contents');
    const copyIcon = document.getElementsByClassName('copy-icon');
    for(let i = 0; i < copy.length; i++){
        copyIcon[i].style.transition = '.3s';
        copy[i].addEventListener('click', () => {
            navigator.clipboard.writeText(copy[i].innerText).then(() => {
                copyIcon[i].style.backgroundImage = 'url(../img/copy_ok.png)'
                setTimeout(() => {
                    copyIcon[i].style.backgroundImage = 'url(../img/copy_icon.png)'
                }, 1000);
            });
        });
    }
}

function scrollToTop() {
    const scrollBtn = document.querySelector('.scroll-btn');

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

}













/*
    캐러셀 필요한 요소
    - 프레임 너비
    - 슬라이드 이동 길이
    - 현재 인덱스
    - moveChecker (transition 동안은 슬라이드가 이동하지 않게)
    - 슬라이드 개수
    - 좌우 버튼
    - 라디오 버튼 컨테이너

    필요 작업
    - 하단 라디오 버튼 생성 + 색변경 클래스 추가
    - 클론노드(슬라이드 양끝)
    - 좌우 버튼 이벤트
    - 라디오 버튼 컬러변경 함수(인덱스에 따라서)
    - 슬라이드 이동 & 스킵 함수(이동거리 설정과 트랜지션 부여)
*/

  




function makeCarousel(){
    let slideIndex = 1;  //현재 인덱스
    let moveChecker = true; //슬라이드 이동 가능 상태 : true
    let frameWidth;  //프레임 가로길이
    let moveWidth;  //슬라이드 이동 길이
    let slideNum;  //슬라이드 개수


    const wrapper = document.querySelector('.line-carousel .carousel-contents-wrapper');
    const frame = document.querySelector('.line-carousel .carousel-frame');

}








// 헤더 우측버튼
const mBtn = document.querySelector('.my-page-btn-icon');
const mContainer = document.querySelector('.my-page-dropdown');
const sBtn = document.querySelector('.search-btn-icon');
const sContainer = document.querySelector('.search-container');


showContents(mBtn, mContainer);
showContents(sBtn, sContainer);
// mypage btn : .my-page-btn-icon, container : .my-page-dropdown
// search btn : .search-btn-icon, container : .search-container

function showContents(eventBtn, eventContainer){
    // 버튼 클릭 이벤트로 display 스타일 조정
    // 버튼 재클릭 or 컨텐츠 외부 영역 클릭 시 이벤트
    const btn = eventBtn;
    const container = eventContainer;
    const body = document.querySelector('body');

    body.addEventListener('click', (e) => {
        if(e.target != container && !(e.target.parentNode == btn) && !container.classList.contains('hide-box')){
            container.classList.add('hide-box');
            console.log('외부!');
        }
    });

    btn.addEventListener('click', () => {
        container.classList.toggle('hide-box');
        console.log('버튼!');
    });

}





