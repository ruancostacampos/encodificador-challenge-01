let emptyWarning;
let emptyImage;
let userInput;
let encodedText;
let initiallyHidden;
let copyButton;
let regex = /[^a-zA-Z\s]/g;
let aRegex = /ai/g;
let eRegex = /enter/g;
let iRegex = /imes/g;
let oRegex = /ober/g;
let uRegex = /ufat/g;
let mouseX, mouseY;
let mouseText;
const ANIMATION_SPEED = 60;

function sleep(speed){
    return new Promise(r => setTimeout(r, speed));
}

// Load the html element to te variables
window.onload =  () => {
    
    userInput = document.getElementById("userInput")
    userInput.addEventListener("input", e => {
        userInput.style.height = "auto"
        let scrollHeight = e.target.scrollHeight;
        userInput.style.height = `${scrollHeight}px`;
    })

    userInput.addEventListener("input", validateInput)
    emptyWarning = document.getElementsByClassName("encodedTextEmptyWarning")[0]
    emptyImage = document.getElementsByClassName("man-magnifying")[0]
    encodedText = document.getElementById("encodedText")
    initiallyHidden = document.getElementsByClassName("initiallyHidden")[0]
    copyButton = document.getElementById("copyButton")
    mouseText = document.getElementById("mouseText")
    copyButton.addEventListener("click", copyText)

    
}


async function animateCursor(e){


    function moveText(moveEvent){
        mouseText.style.left = `${moveEvent.clientX + 10}px`;
        mouseText.style.top = `${moveEvent.clientY}px`;
        console.log(1)
    }

    window.addEventListener("mousemove",  moveText);

    

    mouseText.style.left = `${e.clientX + 10}px`;
    mouseText.style.top = `${e.clientY}px`;

    let text = 'Copiado'
    for(let i = 0; text[i] !== undefined; i++){
        mouseText.innerText += text[i]
        await sleep(ANIMATION_SPEED);
    }

    await sleep(1000)
    
    while(mouseText.innerText[0] !== undefined){
        mouseText.innerText = mouseText.innerHTML.substring(0, mouseText.innerText.length - 1)
        await sleep(ANIMATION_SPEED);
    }

    window.removeEventListener("mousemove",  moveText);
    mouseText.style.left = "-20px";
    mouseText.style.top = "-20px";
}


// You give a word and you get the word encrypted
function crypt(word){

    let encrypted = '';
    
    for(let i = 0; i<word.length; i++){

        let char = word[i];

        switch(char){

            case "a": 
                encrypted = encrypted + 'ai'
                break;
            case "e": 
                encrypted = encrypted + 'enter'
                break;
            case "i": 
                encrypted = encrypted + 'imes'
                break;
            case "o": 
                encrypted = encrypted + 'ober'
                break;
            case "u": 
                encrypted = encrypted + 'ufat'
                break;
            default: encrypted = encrypted + char
        }
    }

    return encrypted;

}

async function copyText(e){
    animateCursor(e)
    await navigator.clipboard.writeText(encodedText.innerText)
}

function decrypt(word){

    word = word.replace(aRegex, 'a');
    word = word.replace(eRegex, 'e');
    word = word.replace(iRegex, 'i');
    word = word.replace(oRegex, 'o');
    word = word.replace(uRegex, 'u');
    return word;

}

function runDecrypt(){

    // if the user put a value in the input
    if(userInput.value.length > 0){
        hideEmptyWarning()
        encodedText.innerText = decrypt(userInput.value)
    }

    // if the user press decrypt without put any value on the box
    if(userInput.value.length === 0){
        showEmptyWarning()
    }

}


function runCrypt(){

    // if the user put a value in the input
    if(userInput.value.length > 0){
        hideEmptyWarning()
        encodedText.innerText = crypt(userInput.value)
    }

    // if the user press decrypt without put any value on the box
    if(userInput.value.length === 0){
        showEmptyWarning()
    }
}

function hideEmptyWarning(){
    emptyWarning.style.display = 'none';
    emptyImage.style.display = 'none';
    encodedText.style.display = 'block';
    initiallyHidden.style.display = 'flex'
    copyButton.style.display = 'block'
}

function showEmptyWarning(){
    emptyWarning.style.display = 'block';
    emptyImage.removeAttribute("style")
    encodedText.style.display = 'none';
    initiallyHidden.style.display = 'none'
    copyButton.style.display = 'none'
}

function validateInput(e){
    
    e.target.value = e.target.value.toLowerCase()
    e.target.value = e.target.value.replace(regex, '')

}