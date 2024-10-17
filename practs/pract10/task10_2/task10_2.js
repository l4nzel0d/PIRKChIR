function Accumulator(startingValue) {
    this.value = startingValue;

    this.read = function(number) {
        this.value += number;
    };
}

const accumulator = new Accumulator(123);

const currentValueElement = document.getElementById('current-value');
const numberInputElement = document.getElementById('number-input');
const addButton = document.getElementById('add-number');

function updateCurrentValue() {
    currentValueElement.textContent = accumulator.value;
}

addButton.addEventListener('click', function() {
    const number = parseFloat(numberInputElement.value); 

    if (!isNaN(number)) {
        accumulator.read(number);  
        updateCurrentValue();      
        numberInputElement.value = ''; 
    } else {
        alert('Введите корректное число');
    }
});

updateCurrentValue();
