const data= [
    {
        id : 0,
        img : '/images/redmiK20.jpg',
        name : 'Redmi K20',
        price : 190,
        save : 25,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 1,
        img : '/images/samGalaxynote20.jpg',
        name : 'Samsung Galaxy Note 20',
        price : 300,
        save : 50,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 2,
        img : '/images/oppofindX2.jpg',
        name : 'OPPO Find X2',
        price : 240,
        save : 30,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 3,
        img : '/images/realmeX20pro.jpg',
        name : 'Realme X50 Pro',
        price : 285,
        save : 35,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 4,
        img : '/images/redminote8.jpg',
        name : 'Redmi Note 8',
        price : 200,
        save : 15,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 5,
        img : '/images/redminote9.jpg',
        name : 'Redmi Note 9',
        price : 220,
        save : 25,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 6,
        img : '/images/redmi8.jpg',
        name : 'Redmi 8A Dual',
        price : 160,
        save : 20,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 7,
        img : '/images/redmi9.jpg',
        name : 'Redmi 9',
        price : 100,
        save : 10,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
];

let cartList=[]; //array to store cart lists

var i;
var detail =document.getElementsByClassName('card-item');
var detailsImg = document.getElementById('details-img')
var detailTitle = document.getElementById('detail-title')
var detailPrice = document.getElementById('detail-price')
var youSave = document.getElementById('you-save');
var detailsPage = document.getElementById('details-page');
var back = document.getElementById('buy')
back.addEventListener('click',refreshPage)
var addToCarts = document.querySelectorAll('#add-to-cart')
var cart = document.getElementById('cart');

// click event to display cart page
cart.addEventListener('click',displayCart)

var carts = document.getElementById('carts');

//click events to add items to cart from details page
carts.addEventListener('click',()=>addToCart(getId))

var home = document.getElementById('logo');

//click event to hide cart page and return to home page
home.addEventListener('click',hideCart);

//events on dynamically created element to remove items from list
document.addEventListener('click',function (e){
    if(e.target.id=='remove'){
        var itemId = e.target.parentNode.id
        removeFromCart(itemId)
    }
})


//click event to display details page
for(i=0;i<data.length;i++){
    detail[i].addEventListener('click',handleDetail)
}

var getId;

//click events to add items to cart from home page cart icon
addToCarts.forEach(val=>val.addEventListener('click',()=>addToCart(val.parentNode.id)));

// details function
function handleDetail(e){
    detailsPage.style.display = 'block'
    getId= this.parentNode.id;
    detailsImg.src= data[getId].img;
    detailTitle.innerHTML=   data[getId].name;
    detailPrice.innerHTML= 'Price : $ ' +data[getId].price;
    youSave.innerHTML= 'You save : ($ ' + data[getId].save + ')';
}

// add item to the cart
function addToCart(id) {
    if(!data[id].itemInCart){
        cartList= [...cartList,data[id]];
        addItem()
        
        alert('item added to your cart')

    }
    else{
        alert('your item is already there')
    }
    data[id].itemInCart= true
}

//back to main page
function refreshPage(){
    detailsPage.style.display = 'none'
}

// hide your cart page
function hideCart(){
    document.getElementById('main').style.display= "block";
    document.getElementById('cart-container').style.display= "none";
}

//display your cart page
function displayCart(){
    document.getElementById('main').style.display= "none";
    document.getElementById('details-page').style.display= "none";
    document.getElementById('cart-container').style.display= "block";
    if(cartList.length==0){
        document.getElementById('cart-with-items').style.display= "none";
        document.getElementById('empty-cart').style.display= "block";
    }
    else{
        document.getElementById('empty-cart').style.display= "none";
        document.getElementById('cart-with-items').style.display= "block";
        
    }
}

var totalAmount;
var totalItems;
var totalSaving;

//add item to the cart
function addItem(){
    totalAmount=0;
    totalItems = 0;
    totalSaving=0
    var clrNode=document.getElementById('item-body');
        clrNode.innerHTML= '';
        console.log(clrNode.childNodes)
        cartList.map((cart)=>
        {
            var cartCont = document.getElementById('item-body');
            totalAmount = totalAmount + cart.price;
            totalSaving = totalSaving + cart.save;
            totalItems = totalItems + 1;

            var tempCart = document.createElement('div')
            tempCart.setAttribute('class','cart-list');
            tempCart.setAttribute('id',cart.id);

            var listImg = document.createElement('img');
            listImg.setAttribute('id','list-img');
            listImg.src = cart.img
            tempCart.appendChild(listImg)

            var listName = document.createElement('h3');
            listName.setAttribute('class','list-name');
            listName.innerHTML = cart.name;
            tempCart.appendChild(listName)

            var listPay = document.createElement('h3');
            listPay.setAttribute('class','pay');
            listPay.innerHTML = cart.price;
            tempCart.appendChild(listPay);

            var listQuantity = document.createElement('h3');
            listQuantity.setAttribute('class','quantity');
            listQuantity.innerHTML = '1';
            tempCart.appendChild(listQuantity);

            var listTrash = document.createElement('i');
            listTrash.setAttribute('class','fa fa-trash ');
            listTrash.setAttribute('id','remove');
            tempCart.appendChild(listTrash);

            cartCont.appendChild(tempCart)
            
        })
        document.getElementById('total-amount').innerHTML = 'Total Amount : $ ' + totalAmount;
        document.getElementById('total-items').innerHTML = 'Total Items : ' + totalItems;
        document.getElementById('you-saved').innerHTML = 'You Saved : $ ' + totalSaving;
        document.getElementById('total').style.display= "block";
}

//remove item from the cart
function removeFromCart(itemId){
    data[itemId].itemInCart = false
    cartList = cartList.filter((list)=>list.id!=itemId);
    addItem()
    if(cartList.length==0){
        document.getElementById('cart-with-items').style.display= "none";
        document.getElementById('empty-cart').style.display= "block";
    }
}
var btnvar = document.getElementById("btn");
function  Toggle(){
    if(btnvar.style.color =="red"){
        btnvar.style.color = "grey"
    }else{
        btnvar.style.color = "red"
    }
}
var btnvar1 = document.getElementById("btn1");
function  Toggle1(){
    if(btnvar1.style.color =="red"){
        btnvar1.style.color = "grey"
    }else{
        btnvar1.style.color = "red"
    }
}
var btnvar2 = document.getElementById("btn2");
function  Toggle2(){
    if(btnvar2.style.color =="red"){
        btnvar2.style.color = "grey"
    }else{
        btnvar2.style.color = "red"
    }
}
var btnvar3 = document.getElementById("btn3");
function  Toggle3(){
    if(btnvar3.style.color =="red"){
        btnvar3.style.color = "grey"
    }else{
        btnvar3.style.color = "red"
    }
}
var btnvar4 = document.getElementById("btn4");
function  Toggle4(){
    if(btnvar4.style.color =="red"){
        btnvar4.style.color = "grey"
    }else{
        btnvar4.style.color = "red"
    }
}
var btnvar5 = document.getElementById("btn5");
function  Toggle5(){
    if(btnvar5.style.color =="red"){
        btnvar5.style.color = "grey"
    }else{
        btnvar5.style.color = "red"
    }
}var btnvar6 = document.getElementById("btn6");
function  Toggle6(){
    if(btnvar6.style.color =="red"){
        btnvar6.style.color = "grey"
    }else{
        btnvar6.style.color = "red"
    }
}
var btnvar7 = document.getElementById("btn7");
function  Toggle1(){
    if(btnvar7.style.color =="red"){
        btnvar7.style.color = "grey"
    }else{
        btnvar7.style.color = "red"
    }
}
var btnvar8 = document.getElementById("btn8");
function  Toggle8(){
    if(btnvar8.style.color =="red"){
        btnvar8.style.color = "grey"
    }else{
        btnvar8.style.color = "red"
    }
}
var btnvar9 = document.getElementById("btn9");
function  Toggle9(){
    if(btnvar9.style.color =="red"){
        btnvar9.style.color = "grey"
    }else{
        btnvar9.style.color = "red"
    }
}
var btnvar10 = document.getElementById("btn10");
function  Toggle1(){
    if(btnvar10.style.color =="red"){
        btnvar10.style.color = "grey"
    }else{
        btnvar10.style.color = "red"
    }
}
var btnvar11 = document.getElementById("btn11");
function  Toggle11(){
    if(btnvar11.style.color =="red"){
        btnvar11.style.color = "grey"
    }else{
        btnvar11.style.color = "red"
    }
}
var btnvar12 = document.getElementById("btn12");
function  Toggle12(){
    if(btnvar12.style.color =="red"){
        btnvar12.style.color = "grey"
    }else{
        btnvar12.style.color = "red"
    }
}
var btnvar13 = document.getElementById("btn13");
function  Toggle13(){
    if(btnvar13.style.color =="red"){
        btnvar13.style.color = "grey"
    }else{
        btnvar13.style.color = "red"
    }
}
var btnvar14 = document.getElementById("btn14");
function  Toggle14(){
    if(btnvar14.style.color =="red"){
        btnvar14.style.color = "grey"
    }else{
        btnvar14.style.color = "red"
    }
}
var btnvar15 = document.getElementById("btn15");
function  Toggle15(){
    if(btnvar15.style.color =="red"){
        btnvar15.style.color = "grey"
    }else{
        btnvar15.style.color = "red"
    }
}
var btnvar16 = document.getElementById("btn16");
function  Toggle16(){
    if(btnvar16.style.color =="red"){
        btnvar16.style.color = "grey"
    }else{
        btnvar16.style.color = "red"
    }
}
var btnvar17 = document.getElementById("btn17");
function  Toggle17(){
    if(btnvar17.style.color =="red"){
        btnvar17.style.color = "grey"
    }else{
        btnvar17.style.color = "red"
    }
}
var btnvar18 = document.getElementById("btn18");
function  Toggle18(){
    if(btnvar18.style.color =="red"){
        btnvar18.style.color = "grey"
    }else{
        btnvar18.style.color = "red"
    }
}
var btnvar19 = document.getElementById("btn19");
function  Toggle19(){
    if(btnvar19.style.color =="red"){
        btnvar19.style.color = "grey"
    }else{
        btnvar19.style.color = "red"
    }
}

