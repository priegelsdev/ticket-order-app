import {ticketData} from "/data.js";

let cart = [];

document.addEventListener('click', function(e) {
  if (e.target.dataset.add) {
    addToCart(e.target.dataset.add);
  } else {
    console.log(e.target.id)
  }
})

// add event listeners


//create function to get item feed from data.js

function getFeedHtml() {
  let itemFeedHtml = '';

  ticketData.forEach(ticket => {

    itemFeedHtml += `
      <div class="item-container">
        <img src="https://via.placeholder.com/150" class="item-img">
      
        <div class="text-container">
          <h3 class="item-name">${ticket.name}</h3>
          <p class="item-desc">${ticket.description}</p>
          <h4 class="item-price">$${ticket.price}</h4>
        </div>
      
        <button class="add-btn" id="add-btn" data-add="${ticket.uuid}">+</button>
      </div>
      ` 
  })

  return itemFeedHtml;
}

// create add to cart function

function addToCart(ticketId) {
  const targetItem = ticketData.filter(ticket => ticket.uuid === ticketId)[0]; 
  const itemAmountEl = document.querySelector('.item-amount');

  let itemAmount = 0;

  // if function when targetItem is not already in cart

  if (!cart.includes(targetItem)) {
    cart.push(targetItem);
    itemAmount++;

    document.querySelector('.checkout-feed').innerHTML += `
      <div class="checkout-item" id="${ticketId}">
        <p class="item-amount">${itemAmount}</p><span class="amount-factor">x</span>
        <h3 class="item-name">${targetItem.name}<span class="remove">remove</span></h3>
        <span class="dollar-tag">$</span><h4 class="item-price">${targetItem.price}</h4>
      </div>`
  } else { // or already in cart
    itemAmount = document.getElementById(`${ticketId}`).querySelector('.item-amount')
    let newItemAmount = parseInt(itemAmount.innerHTML);
    newItemAmount++;
    itemAmount.innerHTML = newItemAmount;

    let itemPrice = document.getElementById(`${ticketId}`).querySelector('.item-price');
    let addedItemPrice = parseFloat(itemPrice.innerHTML) + targetItem.price;
    let newItemPrice = addedItemPrice.toFixed(2);
    itemPrice.innerHTML = newItemPrice;    
  } 

  renderCheckout();
}

// create render checkout function; remove class "hidden" set to display: none 

function renderCheckout() {
  document.querySelector(".checkout-container").classList.remove('hidden');
}

// create render function

function render() {
  document.querySelector('.item-feed').innerHTML = getFeedHtml();
}

// call render

render();

