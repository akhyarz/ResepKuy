//sidebar
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
//recipe page
const recipeInfo = document.querySelector('#recipe_info');
const recipeDetail = document.querySelector('#recipeDetail');
//login
btn.addEventListener('click', validasi);
checkbox.addEventListener('click',check);

//Index
search.addEventListener('keyup',searchFood);

document.addEventListener('click',(a) => {
    if (a.target.classList == 'link' || a.target.classList == 'detail_btn'){
        window.location.href = 'FoodInformation.html';
        localStorage.setItem('id',a.target.id);
        foodInformation();
    } else if (a.target.classList == 'detailbtn'){
        window.location.href = 'recipe.html';
    }
});

run();
foodInformation();

async function run() {
    const values = await getDataResep();
    showCard(values);
    banner.style.display = "block";
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
            let loginA = true;
            console.log(loginA);
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

//Index

function searchFood(e) {
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
            
        }
    }
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
                    <div class="inf">
                        <p>${el.description}</p>
                    </div>
                </div>
                <div class="btn-detail">
                    <button  class="detail_btn" id="${el.key}"><a id="${el.key}" class="link" >Detail</a></button>
                    <div class="time">
                        <button><i class="ri-timer-line"></i><span>${el.times}<span></button>
                        <button><i class="ri-heart-add-line"></i></button>
                    </div>
                </div>  
            </div> `;
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
        console.log(values);
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
        
    } catch (error) {
        
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
//recipe detail page
async function showRecipeDetail(values) {
    try {
        card = '';
        card += cardRecipeDetail(values);
        recipeDetail.innerHTML = card;
    } catch (error) {
        
    }
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

function mapBahan(bahan,langkah) {
    try {
        const ingredient = document.querySelector('.ingredient');
        const step = document.querySelector('.step');

        const listBahan = bahan.map(el => `<li>${el}</li>`).join('');
        const listStep = langkah.map(el => `<li>${el}</li>`).join('');

        ingredient.innerHTML = listBahan;
        step.innerHTML = listStep;
    } catch (error) {
        
    }
}
//error
function error() {
    return `<div class="notFound">
    <img  src="https://cdn.discordapp.com/attachments/764062693124341760/859859375694151700/3024051-removebg-preview.png" alt="">
    <h3>Maaf data tidak ditemukan (:</h3>
    </div>`;
}