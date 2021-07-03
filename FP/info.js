const mainInfo = document.querySelector('.main-info');
const wrap = document.querySelector('.wrap');
const cardInfo = document.querySelector('.container_card');
const search = document.querySelector('.search input');
const container = document.querySelector('.container');

search.addEventListener('keyup',searhShow);

run();

function run() {
    try {
    getdataArtikel();
    showDetail();
    container.style.display = 'block';
    } catch (error) {
        
    }
}

document.addEventListener('click', (a) => {
    if (a.target.classList == "btn" || a.target.classList == "btn_pagedetail") {
        localStorage.setItem('idDetail', a.target.id);
        window.location.href = 'infoDetail.html';
        showDetail();
    }
});



function searhShow(data) {
    if (data.key == "Enter") {
        if (search.value == ''){
            alert('Maaf inputan kosong');
            run();
        } else {
            getSearchArtikel(search.value);
        }
        
    }
}


async function getSearchArtikel(val) {
    const data = await fetch(`https://calm-refuge-58943.herokuapp.com/searchArtikel/${val}`);
    const newData = await data.json();
    const {values} = newData;
    if (values != '') {
        showCardArtikel(values);
        container.style.display = 'none';
    }else {
        card = '';
        card = error();
        mainInfo.innerHTML = card;
        container.style.display = 'none';
    }
}

async function getdataArtikel() {
    const data = await fetch('https://calm-refuge-58943.herokuapp.com/getArtikel');
    const newData = await data.json();
    const {values} = newData;
    showCardArtikel(values);
    cardArtikel(values);
    showCardArtikelDetail(values);
}

async function showDetail() {
    try {
        const id = localStorage.getItem('idDetail');
        const data = await fetch(`https://calm-refuge-58943.herokuapp.com/getArtikelByKey/${id}`);
        const newData = await data.json();
        const {
            values
        } = newData;
        showDetailArtikel(values);
        showArrayDetail(values.content);
    } catch (error) {
        console.log(error);
    }
}

function showArrayDetail(val) {
    const liArtikel = document.querySelector('.li_artikel');
    const dataLi = val.map(el => {
        return `<li >
        <p>${el.title}</p>     
        <div class="img_artikel">
        <img src="${el.thumb}" alt="">
            </div>
            <p class="content">${el.artikel}</p>
        </li>`;
    }).join('');
    liArtikel.innerHTML = dataLi;
}

//menampilkan card di info page
function showCardArtikel(val) {
    try {
        card = '';
        val.forEach(el => card += cardArtikel(el));
        mainInfo.innerHTML = card;
    } catch (error) {
        console.log(error);
    }
}


//infoDetail

function showDetailArtikel(val) {
    try {
        card = '';
        card += contentDetail(val);
        wrap.innerHTML = card;
    } catch (error) {
        console.log(error);
    }

}

function showCardArtikelDetail(val) {
    try {
        card = '';
        val.forEach(el => card += showArtikelLaien(el));
        cardInfo.innerHTML = card;
    } catch (error) {
        console.log(error);
    }
}

function cardArtikel(val) {
    return `<div class="card-info"">
                <div class="img-info">
                    <img src="${val.thumb}"alt="">
                </div>
                <div class="title-info">
                    <p>${val.title}</p>
                </div>
                <button class="btn" id="${val.key}" ></button>
                <div class="author">
                        <div class="name">${val.author}</div>
                        <div class="tgl">${val.date_published}</div>
                </div>
            </div>`;
}


function contentDetail(val) {
    return `<div class="title-Artikel">
                    <h2>${val.title}</h2>
                    <div class="author_detail">
                    <p>${val.date_published}</p>
                    <p>||</p>
                    <p>${val.author}</p>
                    </div>
                </div>
                <div class="banner">
                    <img src="${val.thumb}" alt="">
                </div>
                <div class="pendahuluan">
                    <p>${val.description}</p>
                </div>
                <ol class="li_artikel">
                    
                </ol>`;
}

function showArtikelLaien(val) {
    return `<div class="card-info"">
            <div class="img-info">
                <img src="${val.thumb}"alt="">
            </div>
            <div class="title-info">
                <p>${val.title}</p>
            </div>
            <button class="btn_pagedetail" id="${val.key}" ></button>
            <div class="author">
                    <div class="name">${val.author}</div>
                    <div class="tgl">${val.date_published}</div>
            </div>
        </div>`;
}
//error
function error() {
    return `<div class="notFound">
    <img  src="https://cdn.discordapp.com/attachments/764062693124341760/859859375694151700/3024051-removebg-preview.png" alt="">
    <h3>Maaf data tidak ditemukan (:</h3>
    </div>`;
}