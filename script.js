'use strict';

console.log('test starting...');
//check if button is clicked
document.getElementById('button').addEventListener('click', buttonClicked);

function buttonClicked() {
    //set heading by asking prompt
    let name = prompt('What is your name?');
    if (name == null || name == '') {
        
    } else {
    document.getElementById('heading').textContent = 'Hello ' + name + '!';
    }
}
