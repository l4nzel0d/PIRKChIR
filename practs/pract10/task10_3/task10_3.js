function truncate(str, maxlength) {
    return str.length > maxlength ? str.slice(0, maxlength) + '…' : str;
}

function applyTruncate() {
    const maxLength = document.getElementById('maxlength').value;
    const cardTexts = document.querySelectorAll('.card-text');

    cardTexts.forEach(cardText => {
        const originalText = cardText.getAttribute('data-original');
        cardText.innerHTML = truncate(originalText, maxLength);
    });
}

document.getElementById('apply').addEventListener('click', applyTruncate);

window.onload = applyTruncate;
