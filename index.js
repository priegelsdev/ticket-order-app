import {ticketData} from "/data.js";

let cart = [];
let totalPrice = 0;

document.addEventListener('click', function(e) {
  if (e.target.dataset.add) {
    addToCart(e.target.dataset.add);
  } else if (e.target.id === 'order-btn') {
    openModal();
  }
    else if (e.target.dataset.remove) {
    removeItem(e.target.dataset.remove);
  } else if (e.target.id === 'pay-btn') {
    e.preventDefault();
    handlePayBtnClick();
  } else if (e.target.id === 'close-modal-btn' ||
    !e.target.closest(".modal")) {
    closeModal(); 
  }
})

// add event listeners


//create function to get item feed from data.js

function getFeedHtml() {
  let itemFeedHtml = '';

  ticketData.forEach(ticket => {

    itemFeedHtml += `
      <div class="item-container">
        <img src="${ticket.img}" class="item-img">
      
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

  // if function when targetItem is not already in cart

  if (!cart.includes(targetItem)) {
    cart.push(targetItem);
    targetItem.amount++;
  } else {
    targetItem.amount++;
  }
  
  renderCheckout();
}

// create function to remove item 

function removeItem(ticketId) {
  const targetItem = ticketData.filter(ticket => ticket.uuid === ticketId)[0]; 

  // if function when targetItem is not already in cart

  if (targetItem.amount === 1) {
    targetItem.amount--;
    cart = cart.filter(item => item != targetItem)
  } else if (targetItem.amount > 1){
    targetItem.amount--;
  }
  
  renderCheckout();
}

// create function to open modal 

function openModal() {
  document.querySelector('.modal').classList.remove('hidden');
}

// create function to close modal 

function closeModal() {
  document.querySelector('.modal').classList.add('hidden');
}

// create function to handle pay button click

function handlePayBtnClick() {
  let name = document.querySelector('.form-name').value;
  let creditCard = document.querySelector('.form-card').value;
  let cvv = document.querySelector('.form-cvv').value;


  if (name != '' && creditCard != '' && cvv != '') {
    let confirmationHtmlText = `<h3>Thanks ${name}! Your order is on its way.</h3>`;

    closeModal();
    document.querySelector('.checkout-container').classList.add('hidden');
    document.querySelector('.confirmation-container').innerHTML = confirmationHtmlText;
    document.querySelector('.confirmation-container').classList.remove('hidden');
    cart = [];
  } else {
    alert('Please fill out all fields!');
  }

}


// create render cart function; looping through array of cart and rendering HTML elements

function renderCart() {

  let cartFeedHtml = ''
  let checkoutFeedEl = document.querySelector('.checkout-feed');
  let total = 0;

  cart.forEach(item => {
    let updatedPrice = (item.amount * item.price).toFixed(2)
    let cartItemHtml = `
    <div class="checkout-item">
      <p class="item-amount">${item.amount}x</p>
      <h3 class="item-name">${item.name}<span class="remove" id="remove" data-remove="${item.uuid}">remove</span></h3>
      <h4 class="item-price">$${updatedPrice}</h4>
    </div>
    `   
    cartFeedHtml += cartItemHtml;
    checkoutFeedEl.innerHTML = cartFeedHtml;
    
    total += parseFloat(updatedPrice);
  })

  totalPrice = total.toFixed(2);

  let checkoutHtml = `
    <h3 class="total-price-tag">Total Price</h3>
    <h4 class="total-price">$${totalPrice}</h4>
  `

  document.querySelector('.checkout-total').innerHTML = checkoutHtml;

  if (cart.length === 0) {
    document.querySelector('.checkout-container').classList.add('hidden');
  } else if (document.querySelector('.confirmation-container').classList != 'hidden') {
    document.querySelector('.confirmation-container').classList.add('hidden');
  }
}

// create render checkout function; remove class "hidden" set to display: none 

function renderCheckout() {
  document.querySelector('.checkout-container').classList.remove('hidden');
  renderCart();
}

// create render function

function render() {
  document.querySelector('.item-feed').innerHTML = getFeedHtml();
}

// call render

render();

