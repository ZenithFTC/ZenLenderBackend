const express = require('express');
const app = express();
const port = 4000;
const fs = require('fs')
let returned, dynamicHTML;
let rawProductData = fs.readFileSync('./products.json');
let productData = JSON.parse(rawProductData);
app.get('/partinitial/:partInitials', async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let part = req.params.partInitials;
    returned = false
    console.log(part)
    console.log(productData.products[0].partInitials);
    for (let i = 0; i < productData.products.length; i++) {
        console.log(i)
        console.log(productData.products[i]);
        if(productData.products[i].partInitials=== part) {
            res.json(productData.products[i])
            returned = true
            break;
        }
        if(returned === false){

        }
    }
    //res.json({part:null})
});

app.get('/generatehtml/:parts', async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(req.params.parts);
    let cart = req.params.parts;
    let cartList = cart.split(';');
    console.log(cartList)
    dynamicHTML= "";
    for (let j = 0; j < cartList.length; j++) {
        console.log(cartList[j]);
        for (let i = 0; i < productData.products.length; i++) {
            console.log(i)
            console.log(productData.products[i]);
            if(productData.products[i].partInitials=== cartList[j]) {
                dynoHTML(productData.products[i]);
            }
        }
    }
    console.log(dynamicHTML)
    res.send(dynamicHTML);
});

app.get('/generateprice/:parts', async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(req.params.parts);
    let cart = req.params.parts;
    let cartList = cart.split(';');
    let price = 0;
    console.log(cartList)
    dynamicHTML= "";
    for (let j = 0; j < cartList.length; j++) {
        console.log(cartList[j]);
        for (let i = 0; i < productData.products.length; i++) {
            console.log(i)
            if(productData.products[i].partInitials=== cartList[j]) {
                price = price + parseInt(productData.products[i].price, 10);
            }
        }
    }
    console.log(price)
    res.send(`<p>Subtotal</p>
                                    <p>$${price}</p>`);
});

app.get('/', async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send("hello");
});

app.listen(port, () => {
    console.log(`Success! Your application is running on port ${port}.`);

});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



function dynoHTML(doc) {
    doc = JSON.parse(JSON.stringify(doc));
    dynamicHTML = dynamicHTML + `
<li class="flex py-6">
                                                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img src="${doc.imgUrl}" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="h-full w-full object-cover object-center">
                                                </div>

                                                <div class="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div class="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href="#"> ${doc.partName}</a>
                                                            </h3>
                                                            <p class="ml-4">$ ${doc.price}</p>
                                                        </div>
                                                        <p class="mt-1 text-sm text-gray-500">${doc.partInitials}</p>
                                                    </div>
                                                    <div class="flex flex-1 items-end justify-between text-sm">
                                                        <p class="text-gray-500">Qty 1</p>

                                                        <div class="flex">
                                                            <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>`
}