let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let id = "";


// get total

const getTotal = ()=>{
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerText = result;
        total.style.background = "green";
    }else{
        total.innerText = ""
        total.style.background = "rgb(173, 61, 61)";
    }
}

// create product

let data;
if(localStorage.product != null){
    data = JSON.parse(localStorage.product)
}else{
    data = [];
}


submit.addEventListener("click",()=>{
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerText,
        count: count.value,
        category: category.value.toLowerCase()
    }
    if(title.value != "" && price.value != "" && category.value != ""&& +count.value <= 100){
        if(mood === "create"){
            // count
            let productCount = +count.value
            if(productCount > 1){
                for(let i=0;i<productCount ; i++){
                    data.push(newPro);
                }
            }else{
                data.push(newPro);
            }
        }else{
            data[id] = newPro;
            count.style.display = "block";
            submit.innerHTML = "Create";
            mood = "create";
        }

        // Call clear Inputs
        clearData()
    }

    // save localStorage
    localStorage.setItem("product", JSON.stringify(data))


    showData()
})


// clear inputs

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerText = '';
    total.style.background = "rgb(173, 61, 61)";
    count.value = '';
    category.value = '';
}

// read
let tbody = document.getElementById("tbody");
function showData(){
    let element = '';
    for(let i=0; i<data.length;i++){
        element +=  `
        <tr>
            <td>${i+1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td><button onClick="updateProduct(${i})">update</button></td>
            <td><button onClick="deleteData(${i})">delete</button></td>
        </tr>`
    }
    tbody.innerHTML = element;

    // Delete All Products
    const deleteAll = document.getElementById('deleteAll');
    if(data.length > 0 ){
        deleteAll.innerHTML = `
            <button onClick="deleteAllData()">Delete All (${data.length})</button>
        `
    }else{
        deleteAll.innerHTML = '';
    }
}
showData();


// delete
function deleteData(i){
    data.splice(i,1);
    localStorage.product = JSON.stringify(data);
    showData();
}
function deleteAllData(){
        data.splice(0,data.length);
        localStorage.product = JSON.stringify(data);
        showData();
}


// update
function updateProduct(i){
    let product = data[i];
    title.value = product.title;
    price.value = product.price;
    taxes.value = product.taxes;
    ads.value = product.ads;
    discount.value = product.discount;
    count.style.display = "none";
    category.value = product.category;

    submit.innerHTML = "Update";

    // change mood to update
    mood = "update";
    // sent id to update function
    id = i;

    // scroll smooth to top
    scroll({
        top:0,
        behavior:"smooth"
    })

    getTotal();
}

// search
let searchMood = "Title";
function getSearchMood(id){
    let search = document.getElementById("search");
    if(id === "searchTitle"){
        searchMood = "Title";
    }else{
        searchMood = "Category";
    }
    search.placeholder = "Search By " + searchMood;
    search.focus();
    search.value = "";
    showData();
}

function searchData(value){
    let element = "";
    for(let i=0;i<data.length;i++){
        if(searchMood === "Title"){
            if(data[i].title.includes(value.toLowerCase())){
                element +=  `
                <tr>
                    <td>${i+1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onClick="updateProduct(${i})">update</button></td>
                    <td><button onClick="deleteData(${i})">delete</button></td>
                </tr>`;
            }
        }else{
            if(data[i].category.includes(value.toLowerCase())){
                element += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td><button onClick="updateProduct(${i})">update</button></td>
                        <td><button onClick="deleteData(${i})">delete</button></td>
                    </tr>`;
            }
        }
    }
    tbody.innerHTML = element;
}

//clean data


