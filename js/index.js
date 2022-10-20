


makeScrollAnimation();  //헤더 SA
showHamburgerMenu();   //햄버거메뉴
showSearchContents();  //검색
showMyPageContents();  //마이페이지 드롭다운
scrollToTop();  //스크롤 투 탑 버튼
copyText();  //푸터 텍스트 복사
makeIntroCarousel();   //인트로
makeLineTabMenu();   //라인 탭메뉴
makeCategoryTabMenu();  //유형 탭메뉴
setDiscountRate();   //상품 할인율 표시







    



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

function showHamburgerMenu(){
    const btn = document.querySelector('.hamburger-menu-btn-icon');
    const container = document.querySelector('.modal-area.hamburger-menu');
    const menu = document.querySelector('.hamburger-menu-container');
    const closeBtn = document.querySelector('.hamburger-menu-container .close-btn');
    const body = document.querySelector('body');
    const modal = document.getElementsByClassName('modal-area');

    container.style.transition = '.3s'

    body.addEventListener('click', (e) => {
        if(e.target.classList.contains('modal-area')){
            menu.classList.add('from-right-all');
            body.classList.remove('scroll-disable');
            body.style.width = `100%`
            setTimeout(() => {
                container.classList.add('hide-box');
            }, 300);
        }
    });

    btn.addEventListener('click', () => {
        if(container.classList.contains('hide-box')){
            for(let i = 0; i < modal.length; i++){
                if(!modal[i].classList.contains('hide-box')){
                    modal[i].classList.add('hide-box');
                }
            }
            container.classList.remove('hide-box');
            setTimeout(() => {
                menu.classList.remove('from-right-all');
            }, 100);
            body.style.width = `${body.clientWidth}px`
            body.classList.add('scroll-disable');
        }else{
            menu.classList.add('from-right-all');
            body.classList.remove('scroll-disable');
            body.style.width = `100%`
            setTimeout(() => {
                container.classList.add('hide-box');
            }, 300);
        }
    });

    closeBtn.addEventListener('click', () => {
        menu.classList.add('from-right-all');
        body.classList.remove('scroll-disable');
        body.style.width = `100%`;
        setTimeout(() => {
            container.classList.add('hide-box');
        }, 300);
    });
}


function showSearchContents(){
    const btn = document.querySelector('.search-btn-icon');
    const container = document.querySelector('.modal-area.search');

    showContents(btn, container);
}

function showMyPageContents(){
    const btn = document.querySelector('.my-page-btn-icon');
    const container = document.querySelector('.modal-area.my-page');

    showContents(btn, container);
    window.addEventListener('resize', () => {
        if(window.innerWidth < 1100){
            container.classList.add('hide-box');
        }
    });
}

function showContents(btn, container){
    const body = document.querySelector('body');
    const modal = document.getElementsByClassName('modal-area');

    body.addEventListener('click', (e) => {
        if(e.target.classList.contains('modal-area')){
            container.classList.add('hide-box');
        }
    });

    btn.addEventListener('click', () => {
        if(container.classList.contains('hide-box')){
            for(let i = 0; i < modal.length; i++){
                if(!modal[i].classList.contains('hide-box')){
                    modal[i].classList.add('hide-box');
                }
            }
            container.classList.remove('hide-box');
        }else{
            container.classList.add('hide-box');
        }
    });
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
    const wrapper = document.querySelector('#line-products .type-contents-wrapper');
    const btn = document.getElementsByClassName('line-type-btn');

    makeTabMenu(frame, wrapper, btn);
}

function makeCategoryTabMenu(){
    const frame = document.querySelector('#category-product .selected-type-frame');
    const wrapper = document.querySelector('#category-product .type-contents-wrapper');
    const btn = document.getElementsByClassName('category-type-btn');

    makeTabMenu(frame, wrapper, btn);
}

function makeTabMenu(frameElements, wrapperElements, btnElements){
    const frame = frameElements;
    const wrapper = wrapperElements;
    const btn = btnElements;
    let idx = 0;

    btn[0].classList.add('selected-tab');

    for(let i = 0; i < btn.length; i++){
        btn[i].addEventListener('click', () => {
            wrapper.style.transform = `translateX(-${frame.clientWidth * i}px)`
            for(let j = 0; j < btn.length; j++){
                if(j == i){
                    btn[j].classList.add('selected-tab');
                }else{
                    btn[j].classList.remove('selected-tab');
                }
            }
            idx = i;
        });
    }

    window.addEventListener('resize', () => {
        wrapper.style.transform = `translateX(-${frame.clientWidth * idx}px)`
    });
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
                copyIcon[i].style.backgroundImage = 'url(img/copy_ok.png)'
                setTimeout(() => {
                    copyIcon[i].style.backgroundImage = 'url(img/copy_icon.png)'
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



function setDiscountRate(){
    const discount = document.getElementsByClassName('discount-img');

    for(let i = 0; i < discount.length; i++){
        if(discount[i].classList.contains('discount0')){
            discount[i].style.display = 'none';
        }else if (discount[i].classList.contains('discount10')){
            discount[i].innerText = `10%`;
        }else if(discount[i].classList.contains('discount20')){
            discount[i].innerText = `20%`;
        }else if(discount[i].classList.contains('discount25')){
            discount[i].innerText = `25%`;
        }else if(discount[i].classList.contains('discount30')){
            discount[i].innerText = `30%`;
        }else if(discount[i].classList.contains('discount40')){
            discount[i].innerText = `40%`;
        }else if(discount[i].classList.contains('discount50')){
            discount[i].innerText = `50%`;
        }else if(discount[i].classList.contains('discount60')){
            discount[i].innerText = `60%`;
        }else{
            discount[i].style.display = 'none';
        }
    }   
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

  


makeLineCarousel();

function makeLineCarousel(){
    const frame = document.querySelector('.line-carousel .carousel-frame');   
    const wrapper = document.querySelectorAll('.line-carousel .carousel-contents-wrapper');
    const radioContainer = document.getElementsByClassName('line-bottom-btn'); 
    const prevBtn = document.querySelectorAll('.line-carousel .prev-btn');
    const nextBtn = document.querySelectorAll('.line-carousel .next-btn');
    const tabNum = document.getElementsByClassName('line-type-btn').length;
    let moveWidth;  //슬라이드 이동 길이
    let slideIndex = [];  //현재 인덱스
    let slideNum;  //슬라이드 개수
    let moveChecker = true; //슬라이드 이동 가능 상태 : true

    
    moveWidth = frame.clientWidth;
    slideNum = wrapper[0].childElementCount;

    for(let i = 0; i < tabNum; i++){ 
        slideIndex[i] = 1;
    }

    //라디오버튼
    for(let i = 0; i < tabNum; i++){   //탭메뉴 모두
        for(let j = 0; j < slideNum; j++){    //라디오 버튼 생성
            const radioButton = document.createElement('div');
            radioButton.classList.add('default-radio');
            radioContainer[i].appendChild(radioButton);

            //라디오 버튼 클릭 이벤트
            radioButton.addEventListener('click', () => {
                slideIndex[i] = j + 1;
                moveLineSlide(true, wrapper[i], moveWidth, slideIndex[i], frame);
                selectRadio(radioContainer[i], radioNum, slideNum, slideIndex[i]);
            });
        }
        radioContainer[i].firstChild.classList.add('selected-radio');
    }
    
    const radioNum = radioContainer[0].childElementCount;

    //슬라이드 추가(클론노드)
    for(let i = 0; i < tabNum; i++){
        const cloneFirst = wrapper[i].firstElementChild.cloneNode(true);
        const cloneLast = wrapper[i].lastElementChild.cloneNode(true);

        wrapper[i].insertBefore(cloneLast, wrapper[i].firstChild);
        wrapper[i].appendChild(cloneFirst);
        moveLineSlide(false, wrapper[i], moveWidth, slideIndex[i], frame);   //처음 위치 세팅
    }
    slideNum = wrapper[0].childElementCount;  //클론 포함


    //좌우 버튼 이벤트
    for(let i = 0; i < tabNum; i++){
        //prev
        prevBtn[i].addEventListener('click', () => {
            if(moveChecker){
                moveChecker = false;
                slideIndex[i]--;
                moveLineSlide(true, wrapper[i], moveWidth, slideIndex[i], frame);

                selectRadio(radioContainer[i], radioNum, slideNum, slideIndex[i]);
                
                setTimeout(() => {
                    moveChecker = true;
                    if(slideIndex[i] === 0){
                        slideIndex[i] = slideNum - 2;
                        moveLineSlide(false, wrapper[i], moveWidth, slideIndex[i], frame);
                    }
                }, 500);
            }
        });

        //next
        nextBtn[i].addEventListener('click', () => {
            if(moveChecker){
                moveChecker = false;
                slideIndex[i]++;
                moveLineSlide(true, wrapper[i], moveWidth, slideIndex[i], frame);

                selectRadio(radioContainer[i], radioNum, slideNum, slideIndex[i]);
                
                setTimeout(() => {
                    moveChecker = true;
                    if(slideIndex[i] === slideNum - 1){
                        slideIndex[i] = 1;
                        moveLineSlide(false, wrapper[i], moveWidth, slideIndex[i], frame);
                    }
                }, 500);
            }
        });
    }

    //반응형
    window.addEventListener('resize', () => {
        for(let i = 0; i < tabNum; i++){
            moveLineSlide(false, wrapper[i], moveWidth, slideIndex[i], frame);
        }
    });

}

//라디오 버튼 컬러 변경
function selectRadio(radioContainer, radioNum, slideNum, slideIndex){
    for(let i = 0; i < radioNum; i++){
            radioContainer.children[i].classList.remove('selected-radio');
        }

        if(slideIndex === slideNum - 1){
            radioContainer.children[0].classList.add('selected-radio');
        }else if(slideIndex === 0){
            radioContainer.children[radioNum - 1].classList.add('selected-radio');
        }else{
            radioContainer.children[slideIndex - 1].classList.add('selected-radio');
        }
}


//슬라이드 이동 + 트랜지션
function moveLineSlide(transition, wrapper, moveWidth, slideIndex, frame){
    moveWidth = frame.clientWidth;
    wrapper.style.transform = `translateX(-${moveWidth * slideIndex}px)`;
    if(transition){
        wrapper.style.transition = `.5s`;
    }else{
        wrapper.style.transition = `0s`;
    }
}

















