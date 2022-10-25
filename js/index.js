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
makeLineCarousel();   //라인 캐러셀
makeCategoryCarousel();  //카테고리 캐러셀
addDragEvent();   //리뷰 좌우 드래그



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


//라인 캐러셀
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


//카테고리 캐러셀
function makeCategoryCarousel(){
    const wrapper = document.querySelectorAll('.category-carousel .carousel-contents-wrapper');
    const radioContainer = document.querySelectorAll('.category-carousel .category-bottom-btn');
    const frame = document.querySelector('.category-carousel .carousel-frame');
    const tabNum = document.getElementsByClassName('category-type-btn').length;
    const prevBtn = document.querySelectorAll('.category-carousel .prev-btn');
    const nextBtn = document.querySelectorAll('.category-carousel .next-btn');
    const item = makeProductElements();
    let moveChecker = true;
    let unitInnerNum;   //한 프레임 안에 들어가는 상품 개수
    let unitNum = [];    //상품 묶음 개수
    let lastWidth = window.innerWidth; 
    let originalNum = [];  //클론 전 슬라이드 개수
    let originalWidth = [];  //클론 전 길이
    let slideNum = [];  //슬라이드 개수
    let slideIndex = [];   //현재 인덱스
    let frameWidth;
    let unit = document.createElement('li');

    unit.classList.add('carousel-unit');

    if(window.innerWidth > 1280){
        unitInnerNum = 4;  
    }else if(window.innerWidth <= 1280 && window.innerWidth > 1100){
        unitInnerNum = 3; 
    }else if(window.innerWidth <= 1100 && window.innerWidth > 834){
        unitInnerNum = 2; 
    }else if(window.innerWidth <= 834){
        unitInnerNum = 1; 
    }

    createCarousel(wrapper, radioContainer, frame, tabNum, item, unitInnerNum, unitNum, originalNum, originalWidth, slideNum, slideIndex, frameWidth, unit);

    

    //좌우 버튼 이벤트
    for(let i = 0; i < tabNum; i++){
        //prev
        prevBtn[i].addEventListener('click', () => {
            if(moveChecker){
                moveChecker = false;
                slideIndex[i]--;
                moveSlide(true, slideIndex[i], wrapper[i], frame, frameWidth, originalNum[i], originalWidth[i]);

                selectRadio(radioContainer[i], originalNum[i], slideNum[i], slideIndex[i]);
                
                setTimeout(() => {
                    moveChecker = true;
                    if(slideIndex[i] === 0){
                        slideIndex[i] = slideNum[i] - 2;
                        moveSlide(false, slideIndex[i], wrapper[i], frame, frameWidth, originalNum[i], originalWidth[i]);
                    }
                }, 500);
            }
        });

        //next
        nextBtn[i].addEventListener('click', () => {
            if(moveChecker){
                moveChecker = false;
                slideIndex[i]++;
                moveSlide(true, slideIndex[i], wrapper[i], frame, frameWidth, originalNum[i], originalWidth[i]);

                selectRadio(radioContainer[i], originalNum[i], slideNum[i], slideIndex[i]);
                
                setTimeout(() => {
                    moveChecker = true;
                    if(slideIndex[i] === slideNum[i] - 1){
                        slideIndex[i] = 1;
                        moveSlide(false, slideIndex[i], wrapper[i], frame, frameWidth, originalNum[i], originalWidth[i]);
                    }
                }, 500);
            }
        });
    }

    //반응형 고려
    window.addEventListener('resize', () => {

        if(lastWidth <= 1280 && window.innerWidth > 1280){
            unitInnerNum = 4;  
            for(let i = 0; i < tabNum; i++){
                deleteElements(wrapper[i]);
            }
            createCarousel(wrapper, radioContainer, frame, tabNum, item, unitInnerNum, unitNum, originalNum, originalWidth, slideNum, slideIndex, frameWidth, unit);
        }else if((lastWidth > 1280 && window.innerWidth <= 1280) || (lastWidth <= 1100 && window.innerWidth > 1100)){
            unitInnerNum = 3; 
            for(let i = 0; i < tabNum; i++){
                deleteElements(wrapper[i]);
            }
            createCarousel(wrapper, radioContainer, frame, tabNum, item, unitInnerNum, unitNum, originalNum, originalWidth, slideNum, slideIndex, frameWidth, unit);
        }else if((lastWidth > 1100 && window.innerWidth <= 1100) || (lastWidth <= 834 && window.innerWidth > 834)){
            unitInnerNum = 2; 
            for(let i = 0; i < tabNum; i++){
                deleteElements(wrapper[i]);
            }
            createCarousel(wrapper, radioContainer, frame, tabNum, item, unitInnerNum, unitNum, originalNum, originalWidth, slideNum, slideIndex, frameWidth, unit);
        }else if(lastWidth > 834 && window.innerWidth <= 834){
            unitInnerNum = 1; 
            for(let i = 0; i < tabNum; i++){
                deleteElements(wrapper[i]);
            }
            createCarousel(wrapper, radioContainer, frame, tabNum, item, unitInnerNum, unitNum, originalNum, originalWidth, slideNum, slideIndex, frameWidth, unit);
        } else{
            for(let i = 0; i < tabNum; i++){
                originalWidth[i] = wrapper[i].scrollWidth - (wrapper[i].firstChild.clientWidth + wrapper[i].lastChild.clientWidth);
                moveSlide(false, slideIndex[i], wrapper[i], frame, frameWidth, originalNum[i], originalWidth[i]);
            }
        }

        lastWidth = window.innerWidth;
    });

    setDiscountRate();
}

//개별 상품 데이터 생성
function makeProductObj(productImgURL, productName, productDiscountRate, productCost, productSellingPrice, productHref){
    let obj = {
        imgURL : productImgURL,
        name : productName,
        discountRate : productDiscountRate,
        cost : productCost,
        sellingPrice : productSellingPrice,
        href : productHref,
    }

    return obj;
}


//상품 리스트 생성
function makeProductElements(){
    const productData = [
        [
            makeProductObj('img/category_1-1.jpg', '소나무 진정 시카 토너 250ml', 0, '23,000', '23,000', '#'), 
            makeProductObj('img/category_1-2.jpg', '1025 독도 토너 대용량 500ml', 0, '30,000', '30,000', '#'), 
            makeProductObj('img/category_1-3.jpg', '포 맨 자작나무 수분 토너 200ml', 0, '24,000', '24,000', '#'), 
            makeProductObj('img/category_1-4.jpg', '해풍쑥 진정 토너 300ml', 20, '24,000', '19,200', '#')
        ],
        [
            makeProductObj('img/category_2-1.jpg', '1025 독도 앰플 45g', 20, '28,000', '22,400', '#'), 
            makeProductObj('img/category_2-2.jpg', '자작나무 수분 세럼 50ml', 10, '28,000', '25,200', '#'), 
            makeProductObj('img/category_2-3.jpg', '1025 독도 수분 앰플 30ml', 10, '15,000', '13,500', '#'), 
            makeProductObj('img/category_2-4.jpg', '1025 독도 진정 앰플 30ml', 10, '15,000', '13,500', '#')
        ],
        [
            makeProductObj('img/category_3-1.jpg', '1025 독도 로션 200ml', 20, '20,000', '16,000', '#'), 
            makeProductObj('img/category_3-2.jpg', '1025 독도 크림 80ml', 10, '32,000', '28,800', '#'), 
            makeProductObj('img/category_3-3.jpg', '약콩 영양 크림 80ml + 크림 20ml', 20, '32,000', '25,600', '#'), 
            makeProductObj('img/category_3-4.jpg', '자작나무 수분 크림 80ml', 20, '32,000', '25,600', '#')
        ],
        [
            makeProductObj('img/category_4-1.jpg', '1025 독도클렌저 150ml', 10, '13,000', '11,700', '#'), 
            makeProductObj('img/category_4-2.jpg', '1025 독도 클렌징 오일 200ml', 10, '23,000', '20,700', '#'), 
            makeProductObj('img/category_4-3.jpg', '1025 독도 클렌징 워터 400ml', 10, '18,000', '16,200', '#'), 
            makeProductObj('img/category_4-4.jpg', '자작나무 수분 클렌저 150ml', 10, '15,000', '13,500', '#')
        ],
        [
            makeProductObj('img/category_5-1.jpg', '1025 독도 수면팩 100m', 20, '21,000', '16,800', '#'), 
            makeProductObj('img/category_5-2.jpg', '약콩 영양 마스크 (1매)', 40, '3,000', '1,800', '#'), 
            makeProductObj('img/category_5-3.jpg', '자작나무 수분 마스크 (1매)', 40, '3,000', '1,800', '#'), 
            makeProductObj('img/category_5-4.jpg', '해풍쑥 진정 마스크 (1매)', 40, '3,000', '1,800', '#')
        ],
        [
            makeProductObj('img/category_6-1.jpg', '365 안심 선크림 50ml (논나노무기자차)', 10, '25,000', '2,500', '#'), 
            makeProductObj('img/category_6-2.jpg', '365 안심 선크림 50ml 2개 세트 (논나노무기자차)', 20, '50,000', '40,000', '#'), 
            makeProductObj('img/category_6-3.jpg', '365 톤업 선크림 50ml', 20, '25,000', '20,000', '#'), 
            makeProductObj('img/category_6-4.jpg', '365 톤업 선크림 50ml 2개 세트', 20, '50,000', '40,000', '#')
        ]
    ];

       //상품 요소 생성 후 저장할 곳
    let productElements = new Array(productData.length);
    for(let i = 0; i < productElements.length; i++){
        productElements[i] = new Array(productData[i].length);
    }

    for(let i = 0; i < productData.length; i++){
        for(let j = 0; j < productData[i].length; j++){
            const product = document.createElement('div');
            product.classList.add('carousel-contents');

            const productLink = document.createElement('a');
            productLink.setAttribute('href', productData[i][j].href);

            const discountImg = document.createElement('div');
            discountImg.classList.add('discount-img');
            
            if(productData[i][j].discountRate == 0){
                discountImg.classList.add('discount0');
            }else if(productData[i][j].discountRate == 10){
                discountImg.classList.add('discount10');
            }else if(productData[i][j].discountRate == 20){
                discountImg.classList.add('discount20');
            }else if(productData[i][j].discountRate == 25){
                discountImg.classList.add('discount25');
            }else if(productData[i][j].discountRate == 30){
                discountImg.classList.add('discount30');
            }else if(productData[i][j].discountRate == 40){
                discountImg.classList.add('discount40');
            }else if(productData[i][j].discountRate == 50){
                discountImg.classList.add('discount50');
            }else if(productData[i][j].discountRate == 60){
                discountImg.classList.add('discount60');
            }

            const figure = document.createElement('figure');
            const productImg = document.createElement('img');
            productImg.setAttribute('src', productData[i][j].imgURL);
            productImg.setAttribute('alt', productData[i][j].name + ' 상품 이미지');
            figure.appendChild(productImg);

            const textBox = document.createElement('div');
            textBox.classList.add('text-box');

            const productNameBox = document.createElement('div');
            productNameBox.classList.add('product-name');
            const productName = document.createElement('p');
            productName.appendChild(document.createTextNode(productData[i][j].name));
            productNameBox.appendChild(productName);

            const productPriceBox = document.createElement('div');
            productPriceBox.classList.add('product-price');
            const cost = document.createElement('span');
            cost.classList.add('discount');
            if(productData[i][j].discountRate != 0){
                cost.appendChild(document.createTextNode(productData[i][j].cost));
            }
            const sellingPrice = document.createElement('span');
            sellingPrice.classList.add('price');
            sellingPrice.appendChild(document.createTextNode(productData[i][j].sellingPrice));
            const won = document.createElement('span');
            won.classList.add('won');
            won.appendChild(document.createTextNode('원'));
            productPriceBox.appendChild(cost);
            productPriceBox.appendChild(sellingPrice);
            productPriceBox.appendChild(won);


            textBox.appendChild(productNameBox);
            textBox.appendChild(productPriceBox);
            productLink.appendChild(discountImg);
            productLink.appendChild(figure);
            productLink.appendChild(textBox);
            product.appendChild(productLink);

            productElements[i][j] = product;
        }
    }

    return productElements;
}


function createCarousel(wrapper, radioContainer, frame, tabNum, item, unitInnerNum, unitNum, originalNum, originalWidth, slideNum, slideIndex, frameWidth, unit){
    createUnit(item, unitInnerNum, unitNum, wrapper, unit, slideNum, originalNum);

    for(let i = 0; i < tabNum; i++){
        originalWidth[i] = wrapper[i].scrollWidth;
    }

    //라디오 버튼 생성
    for(let i = 0; i < tabNum; i++){
        deleteElements(radioContainer[i]);
        
        for(let j = 0; j < slideNum[i]; j++){
            const radioButton = document.createElement('div');
            radioButton.classList.add('default-radio');
            radioContainer[i].appendChild(radioButton);
            

            radioButton.addEventListener('click', () => {
                slideIndex[i] = j + 1;
                moveSlide(true, slideIndex[i], wrapper[i], frame, frameWidth, originalNum[i], originalWidth[i]);
                selectRadio(radioContainer[i], originalNum[i], slideNum[i], slideIndex[i]);
            });
        }
    
        //선택된 라디오 버튼에 색 변경 클래스 추가
        radioContainer[i].firstChild.classList.add('selected-radio');
    }

    //슬라이드 추가
    for(let i = 0; i < tabNum; i++){
        if(slideNum[i] > originalNum[i]){
            wrapper[i].removeChild(wrapper[i].firstChild);
            wrapper[i].removeChild(wrapper[i].lastChild);
        }
        const cloneFirst = wrapper[i].firstElementChild.cloneNode(true);  
        const cloneLast = wrapper[i].lastElementChild.cloneNode(true);
        
        wrapper[i].insertBefore(cloneLast, wrapper[i].firstChild);
        wrapper[i].appendChild(cloneFirst);

        //상태 초기화
        slideIndex[i] = 1;
        moveSlide(false, slideIndex[i], wrapper[i], frame, frameWidth, originalNum[i], originalWidth[i]);
        slideNum[i] = slideNum[i] + 2   //클론 포함 슬라이드 개수
    }
}


function deleteElements(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

function createUnit(item, unitInnerNum, unitNum, wrapper, unit, slideNum, originalNum){
    for(let i = 0; i < item.length; i++){
        unitNum[i] = parseInt(item[i].length / unitInnerNum);
        if(item[i].length % unitInnerNum > 0){
            slideNum[i] = unitNum[i] + 1;
            originalNum[i] = unitNum[i] + 1;
        }else{
            slideNum[i] = unitNum[i];
            originalNum[i] = unitNum[i];
        }
        
        for(let j = 0; j < unitNum[i]; j++){
            wrapper[i].appendChild(unit.cloneNode(true));
            if(j == unitNum[i] - 1){
                for(let k = unitInnerNum * j; k < item[i].length; k++){
                    wrapper[i].lastChild.appendChild(item[i][k]);
                }
            }else{
                for(let k = unitInnerNum * j; k < unitInnerNum * (j + 1); k++){
                    wrapper[i].lastChild.appendChild(item[i][k]);
                }
            }
        }
    } 
}


//슬라이드 이동 + 스킵 이펙트
function moveSlide(transition, slideIndex, wrapper, frame, frameWidth, originalNum, originalWidth){
    frameWidth = frame.clientWidth;

    if(slideIndex == 0){
        wrapper.style.transform = `translateX(-${wrapper.firstChild.clientWidth - frameWidth}px)`;
    }else if(slideIndex == 1){
        wrapper.style.transform = `translateX(-${wrapper.firstChild.clientWidth}px)`;
    }else if(slideIndex == originalNum){
        wrapper.style.transform = `translateX(-${wrapper.firstChild.clientWidth + originalWidth - frameWidth}px)`;
    }else if(slideIndex > originalNum){
        wrapper.style.transform = `translateX(-${wrapper.firstChild.clientWidth + originalWidth}px)`;
    }else{
        wrapper.style.transform = `translateX(-${wrapper.firstChild.clientWidth + frameWidth * (slideIndex - 1)}px)`;
    }

    if(transition){
        wrapper.style.transition = `.5s`;
    }else{
        wrapper.style.transition = `0s`;
    }
}


function addDragEvent(){
    const frame = document.querySelector('.review-frame');
    const slider = document.querySelector('.review-contents-wrapper');
    const scrollBar = document.querySelector('.bottom-bar');
    const scroll = document.querySelector('.check-loc');
    let moveChecker = true;   //단순 클릭시 slider 움직임 방지
    let isMouseDown = false;   //마우스가 클릭 중이면 true
    let walk;    //드래그 이동거리
    let startX;  //드래그 시작지점의 X좌표
    let scrollStartX;   //스크롤바 드래그 시작지점의 X좌표
    let lastX = 0;  //드래그 후 총 슬라이더 이동 거리
    let endWidth = slider.scrollWidth - frame.clientWidth;
    let scrollRate = (scrollBar.clientWidth - scroll.clientWidth) / endWidth;  //스크롤로 전환되는 비율
    let sliderRate =  endWidth / (scrollBar.clientWidth - scroll.clientWidth);  //슬라이더로 전환되는 비율
    let beforeSize = frame.clientWidth;
    let way = true;  // true : 마우스 클릭 / false : 터치
    let event = true;  //true : slider  / false : scroll



    //반응형
    window.addEventListener('resize', () => {
        endWidth = slider.scrollWidth - frame.clientWidth;
        scrollRate = (scrollBar.clientWidth - scroll.clientWidth) / endWidth;
        sliderRate =  endWidth / (scrollBar.clientWidth - scroll.clientWidth);
        
        if(beforeSize != frame.clientWidth){
            lastX = 0;
            slider.style.transform = `translateX(0)`; 
            scroll.style.left = `0`; 
        }

        beforeSize = frame.clientWidth;
    });
    

    //마우스 클릭
    slider.addEventListener('mousedown', (e) => {
        if(isNaN(lastX)){
            lastX = 0;
        }
        isMouseDown = true;
        startX = e.pageX - slider.offsetLeft;   //slider 요소 내에서의 X좌표값이 계산된다.
    });

    slider.addEventListener('mouseleave', () => {
        if(moveChecker){
            lastX = lastX - walk;
            if(lastX < 0){
                lastX = 0;
            }else if(lastX > endWidth){
                lastX = endWidth;
            }
        }
        isMouseDown = false;
        moveChecker = false;
    });

    slider.addEventListener('mouseup', () => {
        if(moveChecker){
            lastX = lastX - walk;
            if(lastX < 0){
                lastX = 0;
            }else if(lastX > endWidth){
                lastX = endWidth;
            }
        }

        isMouseDown = false;
        moveChecker = false;
    });

    slider.addEventListener('mousemove', (e) => {
        if(!isMouseDown) return;   //드래그 중이 아닐 경우 이벤트 중지
        
        e.preventDefault();   //클릭 한 위치의 요소의 기본이벤트 실행 방지

        moveChecker = true;

        const x = e.pageX - slider.offsetLeft;   //현재 커서 위치의 x 좌표(slider 내부 기준)
        walk = x - startX;   //양수 : 우측이동 / 음수 : 좌측이동
        
        if(lastX - walk > endWidth){
            slider.style.transform = `translateX(-${endWidth}px)`; 
            scroll.style.left = `${endWidth * scrollRate}px`; 
        }else if(lastX - walk < 0){
            slider.style.transform = `translateX(0)`; 
            scroll.style.left = `0`; 
        }else{
            slider.style.transform = `translateX(-${lastX - walk}px)`;   
            scroll.style.left = `${(lastX - walk) * scrollRate}px`;  
        }
    });

    scroll.addEventListener('mousedown', (e) => {
        if(isNaN(lastX)){
            lastX = 0;
        }
        isMouseDown = true;
        scrollStartX = e.pageX - scrollBar.offsetLeft;   //scrollbar 요소 내에서의 X좌표값이 계산된다.
    });

    scroll.addEventListener('mouseleave', () => {
        if(moveChecker){
            lastX = lastX - walk;
            if(lastX < 0){
                lastX = 0;
            }else if(lastX > endWidth){
                lastX = endWidth;
            }
        }
        isMouseDown = false;
        moveChecker = false;
    });

    scroll.addEventListener('mouseup', () => {
        if(moveChecker){
            lastX = lastX - walk;
            if(lastX < 0){
                lastX = 0;
            }else if(lastX > endWidth){
                lastX = endWidth;
            }
        }

        isMouseDown = false;
        moveChecker = false;
    });

    scroll.addEventListener('mousemove', (e) => {
        if(!isMouseDown) return;   //드래그 중이 아닐 경우 이벤트 중지
        
        e.preventDefault();   //클릭 한 위치의 요소의 기본이벤트 실행 방지

        moveChecker = true;

        const x = e.pageX - scrollBar.offsetLeft;   
        walk = -(x - scrollStartX) * sliderRate;   
        
        if(lastX - walk > endWidth){
            slider.style.transform = `translateX(-${endWidth}px)`; 
            scroll.style.left = `${endWidth * scrollRate}px`; 
        }else if(lastX - walk < 0){
            slider.style.transform = `translateX(0)`; 
            scroll.style.left = `0`; 
        }else{
            slider.style.transform = `translateX(-${lastX - walk}px)`;   
            scroll.style.left = `${(lastX - walk) * scrollRate}px`;  
        }
    });


    //터치
    slider.addEventListener('touchstart', (e) => {
        if(isNaN(lastX)){
            lastX = 0;
        }
        isMouseDown = true;
        startX = e.touches[0].screenX - slider.offsetLeft;   //slider 요소 내에서의 X좌표값이 계산된다.
    });

    slider.addEventListener('touchend', () => {
        if(moveChecker){
            lastX = lastX - walk;
            if(lastX < 0){
                lastX = 0;
            }else if(lastX > endWidth){
                lastX = endWidth;
            }
        }

        isMouseDown = false;
        moveChecker = false;
    });

    slider.addEventListener('touchmove', (e) => {
        if(!isMouseDown) return;   //드래그 중이 아닐 경우 이벤트 중지
        
        e.preventDefault();   //클릭 한 위치의 요소의 기본이벤트 실행 방지

        moveChecker = true;

        const x = e.touches[0].screenX - slider.offsetLeft;   //현재 커서 위치의 x 좌표(slider 내부 기준)
        walk = x - startX;   //양수 : 우측이동 / 음수 : 좌측이동
        
        if(lastX - walk > endWidth){
            slider.style.transform = `translateX(-${endWidth}px)`; 
            scroll.style.left = `${endWidth * scrollRate}px`; 
        }else if(lastX - walk < 0){
            slider.style.transform = `translateX(0)`; 
            scroll.style.left = `0`; 
        }else{
            slider.style.transform = `translateX(-${lastX - walk}px)`;   
            scroll.style.left = `${(lastX - walk) * scrollRate}px`;  
        }
    });

    scroll.addEventListener('touchstart', (e) => {
        if(isNaN(lastX)){
            lastX = 0;
        }
        isMouseDown = true;
        scrollStartX = e.touches[0].screenX - scrollBar.offsetLeft;   //slider 요소 내에서의 X좌표값이 계산된다.
    });

    scroll.addEventListener('touchend', () => {
        if(moveChecker){
            lastX = lastX - walk;
            if(lastX < 0){
                lastX = 0;
            }else if(lastX > endWidth){
                lastX = endWidth;
            }
        }

        isMouseDown = false;
        moveChecker = false;
    });

    scroll.addEventListener('touchmove', (e) => {
        if(!isMouseDown) return;   //드래그 중이 아닐 경우 이벤트 중지
        
        e.preventDefault();   //클릭 한 위치의 요소의 기본이벤트 실행 방지

        moveChecker = true;

        const x = e.touches[0].screenX - scrollBar.offsetLeft;   
        walk = -(x - scrollStartX) * sliderRate;   
        
        if(lastX - walk > endWidth){
            slider.style.transform = `translateX(-${endWidth}px)`; 
            scroll.style.left = `${endWidth * scrollRate}px`; 
        }else if(lastX - walk < 0){
            slider.style.transform = `translateX(0)`; 
            scroll.style.left = `0`; 
        }else{
            slider.style.transform = `translateX(-${lastX - walk}px)`;   
            scroll.style.left = `${(lastX - walk) * scrollRate}px`;  
        }
    });

    
}

