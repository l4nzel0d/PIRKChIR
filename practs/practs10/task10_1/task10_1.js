function generateTextCaptcha() {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captchaLength = 6;
    let captcha = "";
    
    for (let i = 0; i < captchaLength; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        captcha += chars.charAt(randomIndex);
    }
    
    captchaElement.innerHTML = captcha;
    captchaElement.setAttribute("data-val", captcha);
};


const MIN_NUMBER = 10;
const MAX_NUMBER = 90;
 
function generateRandomNumber(rangeStart, rangeEnd) {
    return Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
}

function generateMathCaptcha() {
    let num1 = generateRandomNumber(MIN_NUMBER, MAX_NUMBER);
    let num2 = generateRandomNumber(MIN_NUMBER, MAX_NUMBER);
    let sum = num1 + num2;
    captchaElement.innerHTML = `${num1} + ${num2}`;
    captchaElement.setAttribute("data-val", sum)
}

function generateCaptcha() {
    if (captchaType == "text") {
        generateTextCaptcha();
    }
    else if (captchaType == "math") {
        generateMathCaptcha();
    }
    document.getElementById("user-input").value = "";
    document.getElementById("result").innerHTML = "";
}

function changeCaptchaType() {
    if (captchaType == "text") {
        captchaType = "math";
        userInputElement.placeholder = "Enter Sum";
    }
    else if (captchaType == "math") {
        captchaType = "text";
        userInputElement.placeholder = "Enter Captcha";
    }
    generateCaptcha();
    console.log(captchaType);
}

function checkCaptcha() {
    if (userInputElement.value === captchaElement.getAttribute("data-val")) {
        resultElement.innerHTML = "Correct!";
        resultElement.classList.remove('invalid');
        resultElement.classList.add('valid');

        submitButton.removeAttribute("disabled");

        const tryDifferentParagraph = document.getElementById('try-different');
        if (tryDifferentParagraph) {
            captchaBlockElement.removeChild(tryDifferentParagraph);
        }
    }
    else {
        resultElement.innerHTML = "Invalid. Try again!";
        resultElement.classList.remove('valid');
        resultElement.classList.add('invalid');
        
        submitButton.disabled = true;

        document.getElementById('change-captcha-type').style.display = 'block';

        if (!document.getElementById('try-different')) {
            const tryDifferentParagraph = document.createElement('p');
            tryDifferentParagraph.id = 'try-different';
            tryDifferentParagraph.textContent = 'Give different captcha type a try';
            captchaBlockElement.appendChild(tryDifferentParagraph);
        }
    }
}

let captchaType = "text";
const captchaElement = document.getElementById("captcha");
const userInputElement = document.getElementById("user-input");
const resultElement = document.getElementById("result");
const submitButton = document.querySelector('input[type="submit"]');
const captchaBlockElement = document.querySelector('.captcha-block');

generateCaptcha();

document.getElementById("generate-captcha").addEventListener('click', generateCaptcha);
document.getElementById("change-captcha-type").addEventListener('click', changeCaptchaType);
document.getElementById("check-captcha").addEventListener('click', checkCaptcha);

