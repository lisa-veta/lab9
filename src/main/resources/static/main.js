const shoppingList = document.getElementById('shopping-list');
async function updateList() {
    await fetch('/items')
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
        }).catch((error) => {
            console.log(error.message);
        });

}

let deleteAllButton = document.createElement("button");
deleteAllButton.classList.add("delete-all-button");
deleteAllButton.textContent = "Удалить все";
deleteAllButton.onclick = async function() {
    await fetch('/items')
        .then(response => response.json())
        .then(data => {
            data.forEach((item) => {
                deleteItem(item.id)
            });
        })
        .catch((error) => {
            console.log(error.message);
        });
};
shoppingList.after(deleteAllButton);

async function deleteItem(id) {
    await fetch('/items/' + id, {
        method: 'DELETE'
    }).then(() => updateList())
    .catch((error) => {
        console.log(error.message);
    });
}

async function addItem() {
    const newItem = document.getElementById('new-item').value;
    if(newItem !== ''){
        if (shoppingList.innerHTML === '') {
            shoppingList.innerHTML = '';
        }
        await fetch('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: newItem
            })
        }).then(() => updateList())
        .catch((error) => {
            console.log(error.message);
        });
    }
}
async function markAsPurchased(id) {
    await fetch('/items/' + id, {
        method: 'PUT'
    }).then(() => updateList())
    .catch((error) => {
        console.log(error.message);
    });
}
updateList();

