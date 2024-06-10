let login = 'admin',
    pass = 'admin2024';

let closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', function() {
    let modal = document.querySelector('.model');
    modal.style.display = 'none';
});

document.querySelector('.loginLink').addEventListener('click', (e)=>{
    e.preventDefault();
    let modal = document.querySelector('.model');
    modal.style.display = 'block';
});

document.querySelector('#loginForm').addEventListener('submit', (e)=>{
    e.preventDefault(); 

    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;

    if(login == username && pass == password){
        window.location.href = "./html/data.html";
    }
    else{
        alert('Error!');
    }
});