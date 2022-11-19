import {ticketData} from "/data.js";

//create function to get item feed from data.js

function getFeedHtml() {
  console.log(ticketData);

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
      
        <button class="add-btn">+</button>
      </div>
      ` 
  })

  return itemFeedHtml;


}

// create render function

function render() {
  document.querySelector('.item-feed').innerHTML = getFeedHtml();
}

// call render

render();





/* For rendered out item container

  <div class="item-container">
  <img src="https://via.placeholder.com/150" class="item-img">

  <div class="text-container">
    <h3 class="item-name">ITEM NAME</h3>
    <p class="item-desc">ITEM DESCRIPTION</p>
    <h4 class="item-price">$ PRICE</h4>
  </div>

  <button class="add-btn">+</button>
  </div>

*/