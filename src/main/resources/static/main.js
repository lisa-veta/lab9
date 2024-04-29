const shoppingList = document.getElementById('shopping-list');
async function updateList() {
    fetch('/api/items')
        .then(response => response.json())
        .then(data => {
            shoppingList.innerHTML = '';
            data.forEach((item) => {
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(item.text));

                let deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-button");
                deleteButton.appendChild(document.createTextNode("Удалить"));
                deleteButton.onclick = function() {
                    deleteItem(item.id);
                };
                li.appendChild(deleteButton);

                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = item.isMarked;
                checkbox.onclick = function() {
                    markAsPurchased(item.id);
                };
                li.insertBefore(checkbox, li.firstChild);
                shoppingList.appendChild(li);
            });
        });
}

async function deleteItem(id) {
    fetch('/api/items/' + id, {
        method: 'DELETE'
    }).then(() => updateList());
}

async function addItem() {
    const newItem = document.getElementById('new-item').value;
    if(newItem !== ''){
        if (shoppingList.innerHTML === '') {
            shoppingList.innerHTML = '';
        }
        fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: 1,
                text: newItem,
                isMarked: false
            })
        }).then(() => updateList());
    }
}

async function markAsPurchased(id) {
    fetch('/api/items/' + id, {
        method: 'PUT'
    }).then(() => updateList());
}
updateList();