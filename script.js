const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');


function generateRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}