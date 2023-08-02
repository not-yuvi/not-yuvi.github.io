'use strict';

console.log('test starting...');


let elementsToHide = document.getElementsByClassName("login=hide");
let elementsToShow = document.getElementsByClassName("login=show");

//check if button is clicked
document.getElementById('button').addEventListener('click', buttonClicked);
document.getElementById('catbutton').addEventListener('click', getCatFact);
//document.getElementById('afterlogin').hidden = true;


function buttonClicked() {
    //set heading by asking prompt
    let name = prompt('What is your name?', 'Guest');
    if (name == null || name == '') {
        document.getElementById('heading').textContent = 'Hello Guest!';
        for (var i = 0; i < elementsToShow.length; i++) {
            elementsToShow[i].hidden = false;
        }
        for (var i = 0; i < elementsToHide.length; i++) {
            elementsToHide[i].hidden = true;
        }
    } else {
        document.getElementById('heading').textContent = 'Hello ' + name + '!';
        for (var i = 0; i < elementsToShow.length; i++) {
            elementsToShow[i].hidden = false;
        }
        for (var i = 0; i < elementsToHide.length; i++) {
            elementsToHide[i].hidden = true;
        }
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function getCatFact() {
    //get cat fact from api
    fetch('https://meowfacts.herokuapp.com/')
        .then((response) => response.json())
        .then(async (data) => {
            document.getElementById('CatFactText').textContent = data.data[0];
            document.getElementById('catbutton').disabled = true;
            document.getElementById('catbutton').textContent = 'Wait...';
            await wait(2000);
            document.getElementById('catbutton').disabled = false;
            document.getElementById('catbutton').textContent = 'Get another fact';
        });
}
