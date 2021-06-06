window.addEventListener('load', loadData);

function loadData() {
    fetch('http://localhost:3000/categories', {
    method: 'GET'
    }).then(response => response.json()).then(data => {
        console.log(data);
        loadCategoriesInSelect(data, 'category');
        loadCategoriesInSelect(data, 'category-update');
    }).catch(error => console.log(error));

    fetch('http://localhost:3000/products', {
    method: 'GET'
    }).then(response => response.json()).then(data => {
        console.log(data);
        fillTable(data);
    }).catch(error => console.log(error));

    
};


function fillTable(products) {
    const table = document.getElementById('table');
    for (let i = 0; i < products.length; i++) {
        const tr = document.createElement('tr');
        table.appendChild(tr);
        const td1 = document.createElement('td');
        td1.innerHTML = products[i].title;
        tr.appendChild(td1);
        const td2 = document.createElement('td');
        td2.innerHTML = products[i].description;
        tr.appendChild(td2);
        const td3 = document.createElement('td');
        td3.innerHTML = products[i].price;
        tr.appendChild(td3);
        const td4 = document.createElement('td');
        tr.appendChild(td4);
        const image = document.createElement('img');
        image.src = products[i].image;
        image.width = 100;
        image.height = 100;
        td4.appendChild(image);
        const td5 = document.createElement('td');
        tr.appendChild(td5);
        const categoryId = products[i].categoryId;
        fetch('http://localhost:3000/categories/' + categoryId, {
        method: 'GET'
        }).then(response => response.json()).then(data => {
            console.log(data);
            td5.innerHTML = data.name;
        }).catch(error => console.log(error));
        const tdDiv = document.createElement('div');
        tr.appendChild(tdDiv);
        tdDiv.classList.add('tbl-buttons');
        const td6 = document.createElement('td');
        tdDiv.appendChild(td6);
        const btnDelete = document.createElement('button');
        td6.appendChild(btnDelete);
        btnDelete.innerHTML = 'Delete';
        btnDelete.classList.add('btn');
        btnDelete.onclick = function () {
            const id = products[i].id;
            deleteProduct(id);
        };
        const td7 = document.createElement('td');
        tdDiv.appendChild(td7);
        const btnUpdate = document.createElement('button');
        btnUpdate.innerHTML = 'Update';
        btnUpdate.classList.add('btn');
        td7.appendChild(btnUpdate);
        btnUpdate.onclick = function () {
            document.getElementById('title').value = products[i].title;
            document.getElementById('description').value = products[i].description;
            document.getElementById('price').value = products[i].price;
            document.getElementById('image').value = products[i].image;
            document.getElementById('category').value = products[i].categoryId;
            document.getElementById('product-id').value = products[i].id;
        };
    };
};

function loadCategoriesInSelect(categories, selectId) {
    const select = document.getElementById(selectId);
    for (let i = 0; i < categories.length; i++) {
        const option = document.createElement('option');
        option.innerHTML = categories[i].name;
        option.value = categories[i].id;
        select.appendChild(option);
    };
};

document.getElementById('add-product').addEventListener('click', addProduct);

function addProduct() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = Number(document.getElementById('price').value);
    const image = document.getElementById('image').value;
    const categoryId = Number(document.getElementById('category').value);

    fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            price: price,
            image: image,
            likes: 0,
            categoryId: categoryId
        })
    }).then(response => response.json()).then(data => {
        console.log(data);
    }).catch(error => console.log(error));
};

function deleteProduct(id) {
    fetch('http://localhost:3000/products/' + id, { 
        method: 'DELETE'
    }).then(response => response.json()).then(data => {
        console.log(data);
        alert('Proizvod je uspesno obrisan!');
    }).catch(error => console.log(error));
};

document.getElementById('update-product').addEventListener('click', updateProduct);

function updateProduct() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = Number(document.getElementById('price').value);
    const image = document.getElementById('image').value;
    const categoryId = Number(document.getElementById('category').value);
    const id = Number(document.getElementById('product-id').value);

    fetch('http://localhost:3000/products/' + id, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        image: image,
        categoryId: categoryId
    }) 
    }).then(response => response.json()).then(data => {
        console.log(data);
        alert('Priozvod je uspesno azuriran!');
    }).catch(error => console.log(error));

};

document.getElementById('add-category').addEventListener('click', addNewCategory);

function addNewCategory() {
    const name = document.getElementById('category-name').value;

    fetch('http://localhost:3000/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name
        })
    }).then(response => response.json()).then(data => {
        console.log(data);
        alert('Nova kategorija je uspesno dodata!');
    }).catch(error => console.log(error));
};