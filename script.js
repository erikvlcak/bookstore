'use strict';

let video = document.querySelector('video');
video.defaultPlaybackRate = 0.5;
video.load();

//Add coins to wallet and add that value to coins property for further use.
let coinsField = document.querySelector('.add-money');
let coinsCount = document.querySelector('.wallet-sum');
let coins = null;

coinsField.addEventListener('click', (e) => {
    if (e.target.className == 'button') {
        let value = coinsField.querySelector('input').value;
        if (!value) {
            alert('First enter a value.')
        }
        else if (isFinite(value) && value >= 0) {
            coinsCount.textContent = value;
            e.target.style.backgroundColor = 'grey';
            e.target.disabled = 'true';
            coinsField.querySelector('input').value = ' ';
            coinsField.querySelector('input').style.backgroundColor = 'grey';
            coinsField.querySelector('input').disabled = 'true';
            coinsField.querySelector('label').textContent = 'Coins are in your wallet.'
            coins = value;
            console.log(coins);
        } else if (isFinite(value) && value < 0) {
            coinsField.querySelector('input').value = '';
            alert('C\'mon, you can\'t have negative coins.');
        } else {
            coinsField.querySelector('input').value = '';
            alert('Value must be a number.');
        }

    }
});

let sellList = document.querySelectorAll('.sellBooksList');

sellList.forEach((book) => {
    book.addEventListener('click', (e) => {
        if (e.target.tagName == 'BUTTON') {
            e.target.parentElement.parentElement.removeChild(e.target.parentElement);
        }
    })
})

