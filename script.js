'use strict';

console.log('test starting...');
//check if button is clicked
document.getElementById('button').addEventListener('click', buttonClicked);

function buttonClicked() {
    //set heading by asking prompt
    let name = prompt('What is your name?');
    document.getElementById('heading').textContent = 'Hello ' + name + '!';
}