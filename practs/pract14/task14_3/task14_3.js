let isSelecting = false;
let startX, startY, selectionBox;
let allListItemsOnPage = document.querySelectorAll('li');


document.addEventListener('click', (event) => {
    console.log('click triggered');
    let listItem = event.target.closest('li');
    let list = event.target.closest('ul');
    let listItems;

    if (list) {
        listItems = list.querySelectorAll('li');
    }

    if (!listItem) {
        if (listItems) {
            removeSelectedFromEachElement(listItems);
        }
        return;
    };

    if (event.ctrlKey) {
        listItem.classList.toggle('selected');
        return;
    }

    removeSelectedFromEachElement(listItems);
    listItem.classList.add('selected');
});

function removeSelectedFromEachElement(arrayOfItems) {
    arrayOfItems.forEach(element => {
        element.classList.remove('selected');
    });
}

document.addEventListener('mousedown', (event) => {
    console.log("mousedown triggered");
    event.preventDefault();
    if (event.button !== 0) return;

    isSelecting = true;
    startX = event.clientX;
    startY = event.clientY;

    allListItemsOnPage.forEach(item => {
        item.dataset.wasSelected = item.classList.contains('selected');
    })

    selectionBox = document.createElement('div');
    selectionBox.classList.add('selection-box');
    document.body.appendChild(selectionBox);

    selectionBox.style.left = `${startX}px`;
    selectionBox.style.top = `${startY}px`;

    selectionBox.style.width = '0px';
    selectionBox.style.height = '0px';
});

document.addEventListener('mousemove', (event) => {
    // console.log('mousemove triggered');
    // console.log(`isSelecting: ${isSelecting}`);
    if (!isSelecting) return;

    let currentX = event.clientX;
    let currentY = event.clientY;

    let width = Math.abs(currentX - startX);
    let height = Math.abs(currentY - startY);

    selectionBox.style.width = `${width}px`;
    selectionBox.style.height = `${height}px`;

    selectionBox.style.left = `${Math.min(startX, currentX)}px`;
    selectionBox.style.top = `${Math.min(startY, currentY)}px`;

    allListItemsOnPage.forEach((item) => {
        const isInSelectionBox = isElementInSelectionBox(item, selectionBox);
        const wasSelected = item.dataset.wasSelected === 'true';

        if (event.ctrlKey) {
            if (isInSelectionBox && !wasSelected) {
                item.classList.add('selected');
                item.dataset.wasSelected = 'true'; // Update state
            } else if (!isInSelectionBox && wasSelected) {
                item.classList.remove('selected');
                item.dataset.wasSelected = 'false'; // Update state
            }
        } else {
            item.classList.toggle('selected', isInSelectionBox);
        }
    });
});

document.addEventListener('mouseup', (event) => {
    console.log('mouseup triggerd');
    isSelecting = false;
    if (selectionBox) {
        selectionBox.remove();
    }
});

function isElementInSelectionBox(element, box) {
    console.log("isElementInSelectionBox triggered")
    let elementRect = element.getBoundingClientRect();
    let boxRect = box.getBoundingClientRect();

    return !(
        elementRect.right < boxRect.left ||
        elementRect.left > boxRect.right ||
        elementRect.bottom < boxRect.top ||
        elementRect.top > boxRect.bottom
    )
}