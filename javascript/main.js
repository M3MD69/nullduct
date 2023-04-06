let title = document.getElementById('title'),
    price = document.getElementById('price'),
    taxes = document.getElementById('taxes'),
    ads = document.getElementById('ads'),
    discount = document.getElementById('discount'),
    total = document.getElementById('total'),
    category = document.getElementById('category'),
    count = document.getElementById('count'),
    create = document.getElementById('create'),
    mood = 'Create',
    tmp;

// Get Total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'var(--ThirdColor)';
    } else {
        total.style.backgroundColor = 'var(--FourthColor)';
        total.innerHTML = '';
    }
}

// Save Local Storage
let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
    dataProduct = [];
}

// Create Product
create.addEventListener("click", () => {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value,
        count: count.value
    }

    // // Count
    // if (newProduct.count > 1) {
    //     for (let i = 0; i < newProduct.count; i++) {
    //         dataProduct.push(newProduct);
    //     }
    // } else {
    //     dataProduct.push(newProduct);
    // }

    if (mood === 'Create') {
        dataProduct.push(newProduct);
    } else {
        dataProduct[tmp] = newProduct;
        mood = 'Create';
        create.innerHTML = 'Create';
    }
    localStorage.setItem('product', JSON.stringify(dataProduct));

    clearData();
    showData();
});

// Clear Inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    category.value = '';
    count.value = '';
}

// Read
function showData() {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price} £</td>
            <td>${dataProduct[i].taxes} £</td>
            <td>${dataProduct[i].ads} £</td>
            <td>${dataProduct[i].discount} £</td>
            <td>${dataProduct[i].total} £</td>
            <td>${dataProduct[i].category}</td>
            <td>${dataProduct[i].count}</td>
            <td><button onclick=updateData(${i}) id="update">Update</button></td>
            <td><button onclick=deleteData(${i}) id="delete">Delete</button></td>
        <tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

    let deleteAll = document.getElementById('deleteAll');
    if (dataProduct.length > 0) {
        deleteAll.innerHTML = `
        <button onclick='deleteAll()'>Delete All (${dataProduct.length})</button>
        `;
    } else {
        deleteAll.innerHTML = '';
    }

    getTotal();
}
showData();

// Delete
function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}

function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}

// Update
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    // total.innerHTML = dataProduct[i].total;
    getTotal();
    category.value = dataProduct[i].category;
    count.value = dataProduct[i].count;

    create.innerHTML = 'Update';
    mood = 'Update';
    tmp = i;

    scroll({
        top: 0,
        behavior: "smooth"
    });
}

// Search



function getSearchMood() {

    let searchMood = 'Title',
        selectElement = document.getElementById('searchSelector'),
        selectedOption = selectElement.options[selectElement.selectedIndex],
        search = document.getElementById('search');

    search.focus();

    if (selectedOption.value == 0) {
        searchMood = 'Title';
    } else if (selectedOption.value == 1) {
        searchMood = 'Price';
    } else if (selectedOption.value == 2) {
        searchMood = 'Taxes';
    } else if (selectedOption.value == 3) {
        searchMood = 'Ads';
    } else if (selectedOption.value == 4) {
        searchMood = 'Discount';
    } else if (selectedOption.value == 5) {
        searchMood = 'Total';
    } else if (selectedOption.value == 6) {
        searchMood = 'Category';
    } else if (selectedOption.value == 7) {
        searchMood = 'Count';
    }

    search.placeholder = `Search By ${searchMood}`;
}

function searchData(value) {
    let table = '',
        selectElement = document.getElementById('searchSelector'),
        selectedOption = selectElement.options[selectElement.selectedIndex];

    if (selectedOption.value == 0) {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price} £</td>
                    <td>${dataProduct[i].taxes} £</td>
                    <td>${dataProduct[i].ads} £</td>
                    <td>${dataProduct[i].discount} £</td>
                    <td>${dataProduct[i].total} £</td>
                    <td>${dataProduct[i].category}</td>
                    <td>${dataProduct[i].count}</td>
                    <td><button onclick=updateData(${i}) id="update">Update</button></td>
                    <td><button onclick=deleteData(${i}) id="delete">Delete</button></td>
                <tr>
                `;
            }
        }
    } else if (selectedOption.value == 1) {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].price.includes(value)) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price} £</td>
                    <td>${dataProduct[i].taxes} £</td>
                    <td>${dataProduct[i].ads} £</td>
                    <td>${dataProduct[i].discount} £</td>
                    <td>${dataProduct[i].total} £</td>
                    <td>${dataProduct[i].category}</td>
                    <td>${dataProduct[i].count}</td>
                    <td><button onclick=updateData(${i}) id="update">Update</button></td>
                    <td><button onclick=deleteData(${i}) id="delete">Delete</button></td>
                <tr>
                `;
            }
        }
    } else if (selectedOption.value == 2) {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].taxes.includes(value)) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price} £</td>
                    <td>${dataProduct[i].taxes} £</td>
                    <td>${dataProduct[i].ads} £</td>
                    <td>${dataProduct[i].discount} £</td>
                    <td>${dataProduct[i].total} £</td>
                    <td>${dataProduct[i].category}</td>
                    <td>${dataProduct[i].count}</td>
                    <td><button onclick=updateData(${i}) id="update">Update</button></td>
                    <td><button onclick=deleteData(${i}) id="delete">Delete</button></td>
                <tr>
                `;
            }
        }
    } else if (selectedOption.value == 3) {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].ads.includes(value)) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price} £</td>
                    <td>${dataProduct[i].taxes} £</td>
                    <td>${dataProduct[i].ads} £</td>
                    <td>${dataProduct[i].discount} £</td>
                    <td>${dataProduct[i].total} £</td>
                    <td>${dataProduct[i].category}</td>
                    <td>${dataProduct[i].count}</td>
                    <td><button onclick=updateData(${i}) id="update">Update</button></td>
                    <td><button onclick=deleteData(${i}) id="delete">Delete</button></td>
                <tr>
                `;
            }
        }
    } else if (selectedOption.value == 4) {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].discount.includes(value)) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price} £</td>
                    <td>${dataProduct[i].taxes} £</td>
                    <td>${dataProduct[i].ads} £</td>
                    <td>${dataProduct[i].discount} £</td>
                    <td>${dataProduct[i].total} £</td>
                    <td>${dataProduct[i].category}</td>
                    <td>${dataProduct[i].count}</td>
                    <td><button onclick=updateData(${i}) id="update">Update</button></td>
                    <td><button onclick=deleteData(${i}) id="delete">Delete</button></td>
                <tr>
                `;
            }
        }
    } else if (selectedOption.value == 5) {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].total.includes(value)) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price} £</td>
                    <td>${dataProduct[i].taxes} £</td>
                    <td>${dataProduct[i].ads} £</td>
                    <td>${dataProduct[i].discount} £</td>
                    <td>${dataProduct[i].total} £</td>
                    <td>${dataProduct[i].category}</td>
                    <td>${dataProduct[i].count}</td>
                    <td><button onclick=updateData(${i}) id="update">Update</button></td>
                    <td><button onclick=deleteData(${i}) id="delete">Delete</button></td>
                <tr>
                `;
            }
        }
    } else if (selectedOption.value == 6) {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].category.includes(value)) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price} £</td>
                    <td>${dataProduct[i].taxes} £</td>
                    <td>${dataProduct[i].ads} £</td>
                    <td>${dataProduct[i].discount} £</td>
                    <td>${dataProduct[i].total} £</td>
                    <td>${dataProduct[i].category}</td>
                    <td>${dataProduct[i].count}</td>
                    <td><button onclick=updateData(${i}) id="update">Update</button></td>
                    <td><button onclick=deleteData(${i}) id="delete">Delete</button></td>
                <tr>
                `;
            }
        }
    } else if (selectedOption.value == 7) {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].count.includes(value)) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price} £</td>
                    <td>${dataProduct[i].taxes} £</td>
                    <td>${dataProduct[i].ads} £</td>
                    <td>${dataProduct[i].discount} £</td>
                    <td>${dataProduct[i].total} £</td>
                    <td>${dataProduct[i].category}</td>
                    <td>${dataProduct[i].count}</td>
                    <td><button onclick=updateData(${i}) id="update">Update</button></td>
                    <td><button onclick=deleteData(${i}) id="delete">Delete</button></td>
                <tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// Clean Data

