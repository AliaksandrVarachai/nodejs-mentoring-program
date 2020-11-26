import { pageLoginPathname, authRegisterUrl } from './config.js';

const formNode = document.getElementById('form');
const errorSectionNode = document.getElementById('error-section');

formNode.onsubmit = async function (event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const age = +document.getElementById('age').value;
  const confirmPassword = document.getElementById('confirm-password').value.trim();

  if (password !== confirmPassword) {
    errorSectionNode.innerText = 'Confirmed password does not match the entered password';
    return;
  }

  try {
    const response = await fetch(authRegisterUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, age })
    });
    if (response.ok) {
      location.pathname = pageLoginPathname;
      return;
    }
    const { error: { message } } = await response.json();
    errorSectionNode.innerText = message;
  } catch (error) {
    errorSectionNode.innerText = error.message;
  }
};

const loginLink = document.getElementById('login-link');
loginLink.onclick = function (event) {
  event.preventDefault();
  location.pathname = pageLoginPathname;
};
