const button = document.getElementById('button');

button.onclick = function () {
    let isBoss = confirm(`Ты здесь главный?`);
    alert( isBoss );
}
