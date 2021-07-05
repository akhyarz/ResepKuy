// sidebar
$('.menu-btn').click(function(){
    $(this).toggleClass('click');
    $('.sidebar').toggleClass('show');
    $('.mainbar').toggleClass('show');
});

//login page
const btn = document.querySelector('button');
const form = document.querySelectorAll('.form input');
const checkbox = document.querySelector('input[type=checkbox]');
//Index page
const search = document.querySelector('.search input');
const containerCard = document.querySelector('.cardcontainer');
const banner = document.querySelector('.banner');
const btnLog = document.querySelector('.account a');
//Judul
const judul2 = document.querySelector('.Judul2');
const judul = document.querySelector('.Judul');
//favorite
const cardfavorite = document.querySelector('.cardfavorite');
//recipe page
const recipeInfo = document.querySelector('#recipe_info');
const recipeDetail = document.querySelector('#recipeDetail');
//login
btn.addEventListener('click', validasi);
checkbox.addEventListener('click',check);


//menjalankan fungsi dari awal
search.addEventListener('keyup',searchFood);

document.addEventListener('click',(a) => {
    if (a.target.classList == 'link' || a.target.classList == 'detail_btn'){
        window.location.href = 'FoodInformation.html';
        localStorage.setItem('id',a.target.id);
        foodInformation();
    } else if (a.target.classList == 'detailbtn'){
        window.location.href = 'recipe.html';
    }else if (a.target.classList.value == 'ri-heart-add-fill') {
        cekLike(a);
    }else if (a.target.classList.value == 'ri-heart-add-fill like'){
        cekLike(a);
    }
});



run();
foodInformation();
cekLoginOrNot();
loginLogout();


async function run() {
    try {
        const values = await getDataResep();
        showCard(values);
        banner.style.display = "block";
        
    } catch (error) {
        console.log(error);
    }
}


//login
function check() {
    if(checkbox.checked == true) {
        form[1].type ='text';
    }else {
        form[1].type ='password';
    }
}

async function validasi() {
    if (form[0].value == '' || form[1].value == '') {
        alert('Maaf semua form harus di isi');
    }else {
        const data = await login();
        if (data.values == '') {
            alert('email atau password salah');
        }else {
            alert('Login berhasil');
            window.location.href = 'index.html';
            localStorage.setItem('idUser',data.values[0]._id);
        }
    }
}


async function login(){
    let dataUser = {
        email : `${form[0].value}`,
        password : `${form[1].value}`
    };
    let config = {
        method : "POST",
        body : JSON.stringify(dataUser),
        headers : {
            "Content-type": "application/json; charset=UTF-8",
        }
    };
    const data = await fetch('https://calm-refuge-58943.herokuapp.com/login',config);
    const newData = await data.json();
    return newData;
}

//Index page

function cekLoginOrNot() {
    const user = localStorage.getItem('idUser');
    if (user != null) {
        btnLog.innerText = 'Log Out';
        loginLogout();
        getFavoriteUser();
        
    }else {
        try {
            cardfavorite.innerHTML = `<div class="error">
            <img src="https://cdn.discordapp.com/attachments/764062693124341760/861212466134646824/Pngtree_man_with_sadness_face_concept_5311454-removebg-preview.png" alt="" srcset="">
            <h2>Sorry you must login first</h2>
            </div>`;
        } catch (error) {
            console.log(error);
        }
    }
    
}

function loginLogout() {
    try {
        btnLog.addEventListener('click',() => {
            if (btnLog.innerText == 'Log Out'){
                localStorage.removeItem('idUser');
                window.location.href = 'index.html';
            }else if (btnLog.innerText == 'login'){
                window.location.href = 'login.html';
            }
        } );
    } catch (error) {
        console.log(error);
    }
}
function cekLike(a) {
    const user = localStorage.getItem('idUser');
    if (user != null) {
        if (a.target.classList.value == 'ri-heart-add-fill') {
            
            a.target.classList.add('like');
            postFavorit(a.target.id);
        } else if (a.target.classList.value == 'ri-heart-add-fill like'){
            a.target.classList.remove('like');
            deleteFavorite(a.target.id);
        }
    }else {
        alert('Anda harus login terlebih dahulu');
    }
}


function saveLikeUser(val) {
    try {
        const liked = document.querySelectorAll('.ri-heart-add-fill');
        const favorit = val.favorit;
        liked.forEach(el => {
            favorit.forEach(fa => {
                if(el.id == fa){
                    el.classList.toggle('like');
                }
            });
            
        });
        
    } catch (error) {
        console.log(error);
    }
}

async function deleteFavorite(key) {
    const idUser = localStorage.getItem('idUser');
    let userData = {
        id:`${idUser}`,
        key :`${key}`
    };

    let config = {
        method : "PATCH",
        body : JSON.stringify(userData),
        headers : {
            "Content-type": "application/json; charset=UTF-8",
        }
    };
    await fetch(`https://calm-refuge-58943.herokuapp.com/deleteUserFavorite/`,config);

}

async function postFavorit(key) {
    const idUser = localStorage.getItem('idUser');
    let userData = {
        id:`${idUser}`,
        key :`${key}`
    };

    let config = {
        method : "PATCH",
        body : JSON.stringify(userData),
        headers : {
            "Content-type": "application/json; charset=UTF-8",
        }
    };
    await fetch(`https://calm-refuge-58943.herokuapp.com/updateUser/`,config);

}

function searchFood(e) {
    try {
        if(e.key == "Enter"){
            if(search.value == ''){
                banner.style.display = "none";
                alert('Maaf inputan kosong');
                run();
            }else {
                banner.style.display = "none";
                searchDataResep(search.value);
                
            }
            
        }
    } catch (error) {
        
    }
}

async function searchDataResep(value) {
    const data = await fetch(`https://calm-refuge-58943.herokuapp.com/search/${value}`);
    const newData = await data.json();
    const {values} = newData;    
    showCard(values);
}

async function getDataResep() {
    const data = await fetch('https://calm-refuge-58943.herokuapp.com/getdataResep');
    const newData = await data.json();
    const {values} = newData;
    return values;
}

async function showCard(values) {
    card = ``;
    values.forEach(el => card += cardInfo(el));
    if (values == '') {
        card = error();
        containerCard.innerHTML = card;
    } else{
        try {
            containerCard.innerHTML = card;
        } catch (error) {
            console.log(error);
        }
    }
}


//recipe page
//data recipe dan recipe derail
async function foodInformation() {
    try {
        const id = localStorage.getItem('id');
        const data = await fetch(`https://calm-refuge-58943.herokuapp.com/detailRecipe/${id}`);
        const newData = await data.json();
        const {values} = newData;
        
        showFoodInfo(values);
        showRecipeDetail(values);
        mapBahan(values.ingredient,values.step);
        ahah(values);
    } catch (er) {
        console.log(er);
        recipeInfo.innerHTML = error();
    }    
    
}

async function showFoodInfo(values) {
    try {
        card = '';
        card += foodInfo(values);
        recipeInfo.innerHTML = card;
        showTitle2(values);
    } catch (error) {
        
    }
}


//recipe detail page
async function showRecipeDetail(values) {
    try {
        card = '';
        card += cardRecipeDetail(values);
        recipeDetail.innerHTML = card;
        showTitle(values);
    } catch (error) {
        
    }
}

function mapBahan(bahan,langkah) {
    try {
        const ingredient = document.querySelector('.ingredient');
        const step = document.querySelector('.step');

        const listBahan = bahan.map(el => `<li>${el}</li>`).join('');
        const listStep = langkah.map(el => `<li>${el}</li>`).join('');

        ingredient.innerHTML = listBahan;
        step.innerHTML = listStep;
    } catch (error) {
        console.log(error);
    }
}


async function getFavoriteUser() {
    try {
        const id = localStorage.getItem('idUser');

        const data = await fetch(`https://calm-refuge-58943.herokuapp.com/userById/${id}`);
        const newData = await data.json();
        const {values} = newData;
            
        searchFavorite(values.favorit); 
        getCardFavorite(values.favorit);
        dataFavoriteNull(values.favorit);
        setTimeout( () => {
            saveLikeUser(values);
        },2500);
    } catch (error) {
        console.log(error);
    }
}

function searchFavorite(val) {
    const search = document.querySelector('.searchFavorit input');
    const data = [];
    let arr1 = [];
    search.addEventListener('keyup',(a) => {
        if (a.key == "Enter"){
            if (search.value != ''){
                for (let i = 0; i < val.length; i++) {
                    if(val[i].includes(search.value)){
                        arr1.push(val[i]);
                    } 
                }
            } else{
                alert('Maaf inputan kosong');
                location.reload();
                return false;
            }
            
            dataSearchFavorite(data);
            setTimeout(() => {
                arr1 = [];
            },500);
            searchFavoritError(arr1);
        }
    });
}

function searchFavoritError(data) {
    if (data != '') {
        dataSearchFavorite(data);
    }else {
        card = '';
        card += error();
        cardfavorite.innerHTML = card;
    }
}
async function dataSearchFavorite(val) {
    const arr = [];
    for (let i = 0; i < val.length; i++) {
        const data = await  fetch(`https://calm-refuge-58943.herokuapp.com/getResepByKey/${val[i]}`);
        const newData =  await data.json();
        const {values} = newData;
    
        arr.push(values);
    }
    showCardFavorite(arr);

}

function dataFavoriteNull(favorit) {
    if (favorit == '') {
        card = '';
        card += error();
        cardfavorite.innerHTML = card;
    }
}
async function getCardFavorite(val) {
    let dataFavorite =  [];
    for (let i = 0; i < val.length; i++) {
        const data = await  fetch(`https://calm-refuge-58943.herokuapp.com/getResepByKey/${val[i]}`);
        const newData =  await data.json();
        const {values} = newData;
        
        dataFavorite.push(values);
    }
    showCardFavorite(dataFavorite);
}

function showCardFavorite(val) {
    try {
        card = '';
        val.forEach(el => card +=  cardInfo(el));
        cardfavorite.innerHTML = card;
    } catch (error) {
        console.log(error);
    }
}

function foodInfo(val) {
    return `<div class="banner">
                    <div class="img">
                        <img class="img2" src="${val.thumb}" alt="">
                    </div>
                    <div class="headerTitle">
                        <h1 class="img">${val.title}</h1>
                        <p>Jawa Timur</p>
                    </div>
                </div>
                <div class="Detailfood">
                    <div class="title">
                        <h2>${val.title}</h2>
                    </div>
                    <div class="detail">
                        <p>${val.desc}</p>
                    </div>
                    <div class="btn-detail">
                        <button class="detailbtn">Detail Recipe</button>
                    </div>
                </div>`;
}

function cardRecipeDetail(val) {
    return `<div class="video">
                <iframe width="100%" height="400" src="${val.linkyoutube}" allowfullscreen>
                </iframe>
            </div>
            <div class="detailrecipe">
                <div class="title">
                    <h2>${val.title}</h2>
                </div>
                <div class="bahan">
                    <h3>Bahan-bahan</h3>
                    <ol class="ingredient">
                    
                    </ol>
                </div>
                <div class="langkah">
                    <h3>Langkah-langkah</h3>
                    <ol class="step">
                    
                    </ol>
                </div>
            </div>`;
}

function cardInfo(el) {
    return ` <div class="card-food">
                <div class="header-card">
                    <div class="img">
                        <img src=${el.thumb} alt="">
                    </div>
                    <div class="detail">
                        <p>${el.title}</p>
                        <p>${el.origin}</p>
                    </div>
                </div>
                <div class="info-card">
                    <div class="info">
                        <p>${el.description}</p>
                    </div>
                </div>
                <div class="btn-detail">
                    <button  class="detail_btn" id="${el.key}"><a id="${el.key}" class="link" >Detail</a></button>
                    <div class="time">
                        <button><i class="ri-timer-line"></i><span>${el.times}<span></button>
                        <button><i id="${el.key}" class="ri-heart-add-fill"></i></button>
                    </div>
                </div>  
            </div> `;
}




//error
function error() {
    return `<div class="notFound">
    <img  src="https://cdn.discordapp.com/attachments/764062693124341760/859859375694151700/3024051-removebg-preview.png" alt="">
    <h3>Maaf data tidak ditemukan (:</h3>
    </div>`;
}

function ahah(a) {
    const ahha = document.querySelector('.haha');
    // ahha.innerText = `${}`;
    console.log(a);
}

function showTitle(val)
{
    judul.innerText = `${val.title}`;
}

function showTitle2(val)
{
    judul2.innerText = `${val.title}`;
}
