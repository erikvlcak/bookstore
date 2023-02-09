'use strict';

const RED = '#FD4D4D';

//Slow down background video
let video = document.querySelector('video');
video.defaultPlaybackRate = 1;
video.load();

//Add coins to wallet and add that value to coins property for further use.
let coinsField = document.querySelector('.add-money');
let coinsCount = document.querySelector('.wallet-sum');
let wallet = null;

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
            wallet = value;
            console.log(wallet);
        } else if (isFinite(value) && value < 0) {
            coinsField.querySelector('input').value = '';
            alert('C\'mon, you can\'t have negative coins.');
        } else {
            coinsField.querySelector('input').value = '';
            alert('Value must be a number.');
        }

    }
});

let bookInfo = {
    nameNewBook: /^[\w\s]+$/,
    authorNewBook: /^[a-zA-Z\s]+$/,
    priceNewBook: /^\d+$/,
};


//Remove book from the list if you have enough Coins. Subtract price from your wallet.
let sellList = document.querySelectorAll('.sellBooksList');
sellList.forEach((book) => {
    book.addEventListener('click', (e) => {
        if (e.target.tagName == 'BUTTON') {
            let bookPrice = parseInt(e.target.previousElementSibling.querySelector('.coinsPrice').textContent);
            console.log(`bookPrice is ${bookPrice}`)
            if (!wallet) {
                alert('You have no money in your wallet. Add some!');
            } else if (parseInt(bookPrice) <= parseInt(wallet)) {
                alert(`
                Spellbook:
                
                "${e.target.previousElementSibling.querySelector('.bookName').textContent}"

                have been purchased for ${e.target.previousElementSibling.querySelector('.coinsPrice').textContent} Coins.
                
                Enjoy your reading!`);
                e.target.parentElement.parentElement.removeChild(e.target.parentElement);
                coinsCount.textContent = wallet - bookPrice;
                wallet = parseInt(coinsCount.textContent);
            } else {
                alert(`Sorry, you are ${bookPrice - wallet} Coins short for this one.`)
            }
        }
        if (document.querySelectorAll('.sellBooksList li').length == 0) {
            document.querySelector('.empty').style.display = 'block';
        }
    })
});




let inputData = document.querySelectorAll('.addNewBooks input');
let validField = new Set();

//enter info about new book
inputData.forEach((item) => {
    item.addEventListener('keyup', (e) => {
        let value = e.target.value;
        let regex = bookInfo[e.target.id];

        if (e.target.value) {
            if (regex.test(value)) {
                e.target.style.backgroundColor = 'lightgreen';
                validField.add(e.target.id);
                e.target.parentElement.children[0].classList.replace('inactive', 'active');
                e.target.parentElement.children[1].classList.replace('active', 'inactive');
                console.log(validField.size);
            } else {
                e.target.style.backgroundColor = RED;
                validField.delete(e.target.id);
                e.target.parentElement.children[0].classList.replace('active', 'inactive');
                e.target.parentElement.children[1].classList.replace('inactive', 'active');
                console.log(validField.size);
            };
        } else {
            e.target.style.backgroundColor = 'white';
        };
        //if everything is filled correctly, enable submit button
        if (validField.size == 3) {
            createConfirm.disabled = false;
            createConfirm.style.opacity = 1;
        }

    })
})

let createConfirm = document.querySelector('.conjureConfirm');
//disable submit button initially
document.addEventListener('DOMContentLoaded', (e) => {
    createConfirm.disabled = true;
    createConfirm.style.opacity = 0.5;
})


console.log(validField.size);
//add new book
createConfirm.addEventListener('click', (e) => {
    let newName = document.querySelector('#nameNewBook').value;
    let newAuthor = document.querySelector('#authorNewBook').value;
    let newPrice = document.querySelector('#priceNewBook').value;
    let location;

    if (validField.size == 3) {

        e.target.style.backgroundColor = 'white';
        e.target.textContent = 'Make it appear!';
        validField.clear();
        inputData.forEach((item) => {
            item.value = '';
            item.style.backgroundColor = 'white';
        })
        e.target.disabled = true;
        e.target.style.opacity = 0.5;

        //**for sale
        if (document.querySelector('#sellNewBookYes').checked) {
            //create new elements
            location = 'has been put for sale!';
            let newLi = document.createElement('li');
            let newDiv = document.createElement('div');
            let newSpanName = document.createElement('span');
            let newSpanAuthor = document.createElement('span');
            let newSpanPrice = document.createElement('span');
            let newSpanCoins = document.createElement('span');
            let newButton = document.createElement('button');

            //add classes to new elements
            newLi.classList.add('sellBook');
            newDiv.classList.add('bookData');
            newSpanName.classList.add('bookName');
            newSpanAuthor.classList.add('bookAuthor');
            newSpanPrice.classList.add('bookPrice');
            newSpanCoins.classList.add('coinsPrice');
            newButton.classList.add('button');

            //add content to new elements
            newSpanName.textContent = newName;
            newSpanAuthor.textContent = `by ${newAuthor}`;
            newSpanCoins.textContent = Number(newPrice);
            newButton.textContent = 'This book shall be mine';

            //construct new entry
            newSpanPrice.append('For');
            newSpanPrice.appendChild(newSpanCoins);
            newSpanPrice.append('Coins');
            newDiv.appendChild(newSpanName);
            newDiv.appendChild(newSpanAuthor);
            newDiv.appendChild(newSpanPrice);
            newLi.appendChild(newDiv);
            newLi.appendChild(newButton);
            sellList.forEach((item) => {
                item.appendChild(newLi)
            });

            //set info that there are no more books left
            if (document.querySelectorAll('.sellBooksList li').length != 0) {
                document.querySelector('.empty').style.display = 'none';
            }

            //**for archive
        } else {
            location = 'has been added to our archive!';
            //create new elements
            let newLi = document.createElement('li');
            let newSpanName = document.createElement('span');
            let newSpanAuthor = document.createElement('span');
            let archiveList = document.querySelectorAll('.archiveBooks');
            //add classes to new elements
            newLi.classList.add('archiveBook');
            newSpanName.classList.add('bookName');
            newSpanAuthor.classList.add('bookAuthor');
            //add content to new elements
            newSpanName.textContent = newName;
            newSpanAuthor.textContent = newAuthor;
            //construct new entry
            newLi.appendChild(newSpanName);
            newLi.appendChild(newSpanAuthor);
            archiveList.forEach((item) => {
                item.appendChild(newLi);
            })

        }
        alert(`
        Book named "${newName}"
        created by ${newAuthor}

        ${location}
        `);


    }
});

let searchBar = document.querySelector('#searchBox');

searchBar.addEventListener('keyup', (e) => {
    let value = e.target.value;

})



