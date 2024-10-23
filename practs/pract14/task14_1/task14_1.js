const contentsElement = document.getElementById("contents");

contentsElement.addEventListener('click', (event) => {
    let link = event.target.closest("a");

    if (!link) return;

    linkAddress = link.getAttribute('href');
    
    if (!confirm(`Do you really want to go to ${linkAddress} ?`)) {
        event.preventDefault();
    }
})