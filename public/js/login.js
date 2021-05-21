document.querySelector('.loginBox').style.display = 'flex';
document.querySelector('.signupBox').style.display = 'none';

const loginFn = () => {
    document.querySelector('.loginBox').style.display = 'flex';
    document.querySelector('.signupBox').style.display = 'none';
};

const signupFn = () => {
    document.querySelector('.loginBox').style.display = 'none';
    document.querySelector('.signupBox').style.display = 'flex';
};

const loginUserFn = async (event) => {
    event.preventDefault();

    const name = document.querySelector('.userName1').value;
    const password = document.querySelector('.password1').value;

    if (name && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const newUserFn = async (event) => {
    event.preventDefault();

    const name = document.querySelector('.userName2').value;
    const password = document.querySelector('.password2').value;

    if(name && password) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.logInBtn').addEventListener('click', loginFn);
document.querySelector('.signUpBtn').addEventListener('click', signupFn);
document.querySelector('.loginBtn').addEventListener('click', loginUserFn);
document.querySelector('.signupBtn').addEventListener('click', newUserFn);