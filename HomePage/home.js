window.addEventListener('load', loadData);

let products = [];
let comments = [];

function loadData() {
    fetch('http://localhost:3000/comments', {
        method: 'GET'
    }).then(response => response.json()).then(data => {
        console.log(data); 
        comments = data;
        console.log(comments);
    }).catch(error => console.log(error));

    fetch('http://localhost:3000/categories' , {
        method: 'GET'
    }).then(response => response.json()).then(data => {
        console.log(data);
        loadCategoriesInSelect(data, 'filter-category');
    }).catch(error => console.log(error));

    fetch('http://localhost:3000/products', {
        method: 'GET'
    }).then(response => response.json()).then(data => {
        console.log(data); 
        products = data;
        showProducts(data);
    }).catch(error => console.log(error));

};

function showProducts(products) {
    const divProducts = document.querySelector('.wrapper-card');
    divProducts.innerHTML = '';
    for (let i = 0; i < products.length; i++) {
        const divProduct = document.createElement('div');
        divProduct.classList.add('outer');
        divProducts.appendChild(divProduct);
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('main-div');
        divProduct.appendChild(mainDiv);
        const divContent = document.createElement('div');
        divContent.classList.add('content');
        mainDiv.appendChild(divContent);   
        const title = document.createElement('h1');
        title.classList.add('title');
        title.innerHTML = products[i].title;
        divContent.appendChild(title);
        const price = document.createElement('p');
        price.classList.add('price')
        price.innerHTML = products[i].price;
        divContent.appendChild(price);
        const desc = document.createElement('p');
        desc.classList.add('description');
        desc.innerHTML = products[i].description;
        divContent.appendChild(desc);
        const divButton = document.createElement('div');
        divContent.appendChild(divButton);
        divButton.classList.add('buy-button');
        const buyButton = document.createElement('button');
        divButton.appendChild(buyButton);
        buyButton.classList.add('btn-buy');
        buyButton.innerHTML = 'ADD TO CART';
        const divImg = document.createElement('div');
        mainDiv.appendChild(divImg);
        divImg.classList.add('image-holder')
        const img = document.createElement('img');
        divImg.appendChild(img);
        img.classList.add('guitar');
        img.src = products[i].image;
        const likes = document.createElement('p');
        likes.classList.add('like-count');
        divButton.appendChild(likes);
        likes.innerHTML = products[i].likes;
        const like = document.createElement('i');
        const likeBtn = document.createElement('button');
        likeBtn.appendChild(like);
        like.classList.add('far');
        like.classList.add('fa-thumbs-up');
        likes.appendChild(likeBtn);
        likeBtn.onclick = function() {
            const id = products[i].id;
            addNewLike(products[i])
        };

        const inputDiv = document.createElement('div');
        inputDiv.classList.add('form__group');
        inputDiv.id = 'input-div';
        const inputComment = document.createElement('input');
        inputDiv.appendChild(inputComment);
        inputComment.classList.add('form__field');
        inputComment.placeholder = 'Name';
        const inputLabel = document.createElement('label');
        inputLabel.classList.add('form__label');
        inputLabel.innerHTML = 'Enter comment';
        inputDiv.appendChild(inputLabel);
        divProduct.appendChild(inputDiv);
        inputComment.onkeydown = function(event) {
            if (event.key == 'Enter') {
                addNewComment(inputComment.value, products[i].id);
            };
        };
        const commentBtn = document.createElement('button');
        inputDiv.appendChild(commentBtn);
        commentBtn.innerHTML = 'Add comment';
        commentBtn.classList.add('btn')
        commentBtn.onclick = function() {
            addNewComment(inputComment.value, products[i].id);
        };
        const productComments = comments.filter(comment => comment.productId === products[i].id);
        const div = document.createElement('div');
        divProduct.appendChild(div);
        div.classList.add('comments-div');
        for (let j = 0; j < productComments.length; j++) {
            const p = document.createElement('li');
            p.innerHTML = productComments[j].text ;
            div.appendChild(p);
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

function addNewComment(text, productId) {
    fetch('http://localhost:3000/comments/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            text: text,
            productId: productId
        }) 
        }).then(response => response.json()).then(data => {
            console.log(data);
            alert('Komentar je uspesno dodat!');
        }).catch(error => console.log(error));
}

function addNewLike(product) {
    fetch('http://localhost:3000/products/' + product.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.image,
            likes: product.likes + 1,
            categoryId: product.categoryId
        }) 
        }).then(response => response.json()).then(data => {
            console.log(data);
            alert('Uspesno ste lajkovali proizvod!');
        }).catch(error => console.log(error));
};

document.getElementById('filter-category').addEventListener('change', filterProducts);

function filterProducts() {
    const selectedCategory = document.getElementById('filter-category').value;
    const fiteredProducts = products.filter(product => product.categoryId == selectedCategory);
    showProducts(fiteredProducts);
};