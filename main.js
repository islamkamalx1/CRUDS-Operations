let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let flag = 'create';
let temp;

// get total
function getTotal() {
    if (price.value !== '') {
        let result = ( +price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040'
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02'
    }
}
// create product
let dataProd;
if (localStorage.product != null) {
    dataProd = JSON.parse(localStorage.product)
} else {
    dataProd = [];
}

submit.onclick = () => {
    let product = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }

    if (title.value != '' && price.value != '' && category.value != '') {
        if (flag === 'create') {
            if (product.count > 1) {
                for(let i = 0; i < product.count; i++) {
                    dataProd.push(product);
                }
            } else {
                dataProd.push(product);
            }
        } else {
            dataProd[temp] = product;
            flag = 'create';
            count.removeAttribute('disabled');
            submit.innerHTML = 'Create';
        }
    }

    // save to local storage
    localStorage.setItem('product', JSON.stringify(dataProd));
    clearData();
    getTotal();
    showData();
}

// clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// read
function showData() {
    let table = '';

    for(let i = 0; i < dataProd.length; i++) {
        table += `<tr>
        <td>${i}</td>
        <td>${dataProd[i].title}</td>
        <td>${dataProd[i].price}</td>
        <td>${dataProd[i].taxes}</td>
        <td>${dataProd[i].ads}</td>
        <td>${dataProd[i].discount}</td>
        <td>${dataProd[i].total}</td>
        <td>${dataProd[i].category}</td>
        <td><button onclick="updateProd(${i})" id="update">update</button></td>
        <td><button onclick="deleteProd(${i})" id="delete">delete</button></td>
    </tr>`;
    }

    document.getElementById('tbody').innerHTML = table;
    
    let deleteAll = document.getElementById('delete-all');
    if (dataProd.length > 0) {
        deleteAll.innerHTML = `<button onclick="deleteAll()">Delete All (${dataProd.length})</button>`;
        deleteAll.style.marginTop = '20px'
    } else {
        deleteAll.innerHTML = '';
    }
}

// delete
function deleteProd(i) {
    dataProd.splice(i,1);
    localStorage.product = JSON.stringify(dataProd);
    showData();
}

// delete all
function deleteAll() {
    localStorage.clear();
    dataProd.splice(0);
    showData();
}

// update
function updateProd(i) {
    title.value = dataProd[i].title;
    price.value = dataProd[i].price;
    taxes.value = dataProd[i].taxes;
    ads.value = dataProd[i].ads;
    discount.value = dataProd[i].discount;
    category.value = dataProd[i].category;
    getTotal();
    count.setAttribute('disabled','disabled');
    submit.innerHTML = 'Update';
    flag = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    });
}

let searchMood = 'title';
function getSearchMood(id) {
    let search = document.getElementById('search');
    id === 'search-title' ? searchMood = 'title' : searchMood = 'category';
    search.placeholder = `Search By ${searchMood}`;
    search.focus();
    search.value = '';
    showData();
}
// search
function searchProd(value) {
    let table = '';
    for(let i = 0; i < dataProd.length; i++) {
        if (searchMood === 'title') {
            if (dataProd[i].title.includes(value.toLowerCase())) {
                table += `<tr>
                <td>${i}</td>
                <td>${dataProd[i].title}</td>
                <td>${dataProd[i].price}</td>
                <td>${dataProd[i].taxes}</td>
                <td>${dataProd[i].ads}</td>
                <td>${dataProd[i].discount}</td>
                <td>${dataProd[i].total}</td>
                <td>${dataProd[i].category}</td>
                <td><button onclick="updateProd(${i})" id="update">update</button></td>
                <td><button onclick="deleteProd(${i})" id="delete">delete</button></td>
            </tr>`;
            }
        
    } else {
            if (dataProd[i].category.includes(value.toLowerCase())) {
                table += `<tr>
                <td>${i}</td>
                <td>${dataProd[i].title}</td>
                <td>${dataProd[i].price}</td>
                <td>${dataProd[i].taxes}</td>
                <td>${dataProd[i].ads}</td>
                <td>${dataProd[i].discount}</td>
                <td>${dataProd[i].total}</td>
                <td>${dataProd[i].category}</td>
                <td><button onclick="updateProd(${i})" id="update">update</button></td>
                <td><button onclick="deleteProd(${i})" id="delete">delete</button></td>
            </tr>`;
            }
        }
    }
    
    document.getElementById('tbody').innerHTML = table;
}

showData()