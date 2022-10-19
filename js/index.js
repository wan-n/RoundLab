


makeScrollAnimation();  //헤더 SA
showHamburgerMenu();   //햄버거메뉴
showSearchContents();  //검색
showMyPageContents();  //마이페이지 드롭다운
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
            body.classList.add('scroll-disable');
        }else{
            menu.classList.add('from-right-all');
            body.classList.remove('scroll-disable');
            setTimeout(() => {
                container.classList.add('hide-box');
            }, 300);
        }
    });

    closeBtn.addEventListener('click', () => {
        menu.classList.add('from-right-all');
        body.classList.remove('scroll-disable');
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
    window.onresize = () => {
        if(window.innerWidth < 1100){
            container.classList.add('hide-box');
        }
    }
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
































