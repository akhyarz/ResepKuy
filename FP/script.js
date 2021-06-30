//login
const btn = document.querySelector('button');
const form = document.querySelectorAll('.form input');
const checkbox = document.querySelector('input[type=checkbox]');
//Index
const search = document.querySelector('.search');
const containerCard = document.querySelector('.cardcontainer');


//login
btn.addEventListener('click', validasi);
checkbox.addEventListener('click',check);

//Index
search.addEventListener('keyup',searchFood);



//Index
function searchFood(e) {
    if(e.key == "Enter"){

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

//login

//Index

async function getDataResep() {
    const data = await fetch('https://calm-refuge-58943.herokuapp.com/getdataResep');
    const newData = await data.json();
    return newData;
}
showCard();
async function showCard() {
    const data = await getDataResep();
    const {values} = data;
    card = ``;
    values.forEach(el => card += cardInfo(el));
    containerCard.innerHTML = card;
    console.log(values);
}


function cardInfo(el) {
    return ` <div class="card-food">
    <div class="header-card">
        <div class="img">
            <img src=${el.thumb} alt="">
        </div>
        <div class="detail">
            <p>${el.title}</p>
            <p>Yogyakarta</p>
        </div>
    </div>
    <div class="info-card">
        <div class="inf">
            <p>${el.description}</p>
        </div>
    </div>
    <div class="btn-detail">
        <button class="detail_btn"><a class="link" href="FoodInformation.html">Detail</a></button>
        <div class="time">
            <button><i class="ri-heart-add-line"></i></button>
        </div>
    </div>  
</div> `;
}