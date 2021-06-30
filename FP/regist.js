const form = document.querySelectorAll('.form input');
const checkbox = document.querySelector('input[type=checkbox]');
const btn = document.querySelector('button');
let modalb = document.querySelector('.modal-body');

btn.addEventListener('click',validasi);
checkbox.addEventListener('click',check);

function check() {
    if(checkbox.checked == true) {
        form[2].type ='text';
    }else {
        form[2].type ='password';
    }
}
async function validasi() {
    if (form[0].value == '' || form[1].value == '' || form[2].value == '') {
        alert('Semua form harus diisi');
    } else {
        const data = await fetcData();
        for (let i = 0; i < data.length; i++) {
            if(data[i].Username == form[0].value || data[i].email == form[1].value) {
                alert('username atau password sudah digunakan');
                return false;
            }
            
        }
        fetctDataPost();
    }
}

async function fetctDataPost() {
    let data = {
        Username: `${form[0].value}`,
        email: `${form[1].value}`,
        password: `${form[2].value}`,
    };
    const config = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    };
    const regis = await fetch('https://calm-refuge-58943.herokuapp.com/register', config);
    const newRegis = await regis.json();
    if(newRegis.status == 200) {
        alert('Registrasi berhasil,Silakan Login');
        window.location.href = 'login.html';
    }
}

async function fetcData() {
    const data = await fetch('https://calm-refuge-58943.herokuapp.com/dataUser');
    const newData = await data.json();
    const {values} = newData;
    return values;
}