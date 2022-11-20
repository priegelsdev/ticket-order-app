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
  cart.push(targetItem);
  
  return cart;
}

// create render function

function render() {
  document.querySelector('.item-feed').innerHTML = getFeedHtml();
}

// call render

render();

