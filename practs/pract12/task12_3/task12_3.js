document.getElementById('create-list-btn').addEventListener('click', createListItem);

function createListItem() {
    let userInput;
    const ul = document.getElementById('dynamic-list');

    while ((userInput = prompt('Введите текст для нового элемента списка:')) !== null) {
        if (userInput.trim() === '') {
            break; 
        }

        const li = document.createElement('li');
        li.textContent = userInput; 
        ul.appendChild(li);
    }
}
