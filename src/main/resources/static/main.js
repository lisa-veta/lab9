const shoppingList = document.getElementById('shopping-list');
async function updateList() {
    fetch('/items')
        .then(response => response.json())
        .then(data => {
            shoppingList.innerHTML = '';
            data.forEach((item) => {
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(item.text));

                let deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-button");
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
                if (checkbox.checked) {
                    li.style.textDecoration = "line-through";
                }
                li.insertBefore(checkbox, li.firstChild);
                shoppingList.appendChild(li);
            });
            if (shoppingList.innerHTML === '') {
                deleteAllButton.style.display = "none";
                let p = document.createElement("p");
                p.appendChild(document.createTextNode("Список пуст"));
                p.style.textAlign = "center";
            } else {
                deleteAllButton.style.display = "inline-block";
            }
        });

}

let deleteAllButton = document.createElement("button");
deleteAllButton.classList.add("delete-all-button");
deleteAllButton.textContent = "Удалить все";
deleteAllButton.onclick = async function() {
    fetch('/items')
        .then(response => response.json())
        .then(data => {
            data.forEach((item) => {
                deleteItem(item.id)
            });
        })
};
shoppingList.after(deleteAllButton);

async function deleteItem(id) {
    fetch('/items/' + id, {
        method: 'DELETE'
    }).then(() => updateList());
}

async function addItem() {
    const newItem = document.getElementById('new-item').value;
    if(newItem !== ''){
        if (shoppingList.innerHTML === '') {
            shoppingList.innerHTML = '';
        }
        fetch('/items', {
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
    fetch('/items/' + id, {
        method: 'PUT'
    }).then(() => updateList());
}
updateList();