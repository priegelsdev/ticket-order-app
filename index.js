import {ticketData} from "/data.js";

let cart = [];
let totalPrice = 0;

document.addEventListener('click', function(e) {
  if (e.target.dataset.add) {
    addToCart(e.target.dataset.add);
  } else if (e.target.id === 'order-btn') {
    openModal();
    document.querySelector('.container').style.opacity = 0.5;
  } else if (e.target.id === 'pay-btn') {
    e.preventDefault();
    console.log('hello');
  } else if (e.target.id === 'close-modal-btn' ||
    !e.target.closest(".modal")) {
    closeModal(); 
    document.querySelector('.container').style.opacity = 1;
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

    totalPrice += targetItem.price;

  } else { // or already in cart
    itemAmount = document.getElementById(`${ticketId}`).querySelector('.item-amount')
    let newItemAmount = parseInt(itemAmount.innerHTML);
    newItemAmount++;
    itemAmount.innerHTML = newItemAmount;

    let itemPrice = document.getElementById(`${ticketId}`).querySelector('.item-price');
    let addedItemPrice = parseFloat(itemPrice.innerHTML) + targetItem.price;
    let newItemPrice = addedItemPrice.toFixed(2);
    itemPrice.innerHTML = newItemPrice;    

    totalPrice += targetItem.price;
  } 

  // display total amount, rounded down to 2 decimals

  let fixedTotalPrice = totalPrice.toFixed(2);

  document.querySelector('.checkout-total').innerHTML = `
    <h3 class="total-price-tag">Total Price</h3>
    <span class="dollar-tag">$</span><h4 class="total-price">${fixedTotalPrice}</h4>
  `
  renderCheckout();
}

// create function to open modal 

function openModal() {
  document.querySelector('.modal').classList.remove('hidden');
}

function closeModal() {
  document.querySelector('.modal').classList.add('hidden');
}

// create render checkout function; remove class "hidden" set to display: none 

function renderCheckout() {
  document.querySelector('.checkout-container').classList.remove('hidden');
}

// create render function

function render() {
  document.querySelector('.item-feed').innerHTML = getFeedHtml();
}

// call render

render();

