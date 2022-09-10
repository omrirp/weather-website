/** @format */

//const { response } = require('express');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let message1 = document.querySelector('#message-1');
  let message2 = document.querySelector('#message-2');
  message1.textContent = 'Loading...';
  message2.textContent = '';
  let location = search.value;

  fetch('http://localhost:3000/weather?adress=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecast;
      }
    });
  });
});
