//login
const btn = document.querySelector('button');
const form = document.querySelectorAll('.form input');
const checkbox = document.querySelector('input[type=checkbox]');
//Index
const search = document.querySelector('.search');


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
getDataResep();
async function getDataResep() {
    const data = await fetch('https://calm-refuge-58943.herokuapp.com/getdataResep');
    const newData = await data.json();
    console.log(newData);
}



function cardInfo(params) {
    
}