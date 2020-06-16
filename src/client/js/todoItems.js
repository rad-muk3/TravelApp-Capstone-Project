/**
 * @description This code idea was got from w3schools todolist
 * @description function creates a todo list container holder
 * @description function creates a todo list user input
 * @description function creates a add button to the container
 **/
export const createToDoContainer = () => {
  const container = document.createElement('div');
  container.classList.add("todoBtn");
  container.style.width = "40rem";
  const inputElement = document.createElement('input');
  inputElement.type = "text";
  inputElement.placeholder = "Enter your Items"
  inputElement.id = "myInput";

  const btnElement = document.createElement('button');
  btnElement.innerText = "Add";
  btnElement.id = "todoBtn";
  //btnElement.id = "addBtn";
  btnElement.type = "submit"

  container.appendChild(inputElement);
  container.appendChild(btnElement);

  const toDoPanel = document.querySelector('#todolist');
  toDoPanel.appendChild(container);

  // creating a UL Element and add list items to it.
  const ul = document.createElement('ul');
  ul.id = 'listContainer';
  toDoPanel.appendChild(ul);


}


/**
 * @description Create a New list Item when clicking the Add Button
 * @description Also has functionality to delete  an item
 *
 * This code idea was got from w3schools.com
 **/

// Create a "close" button and append it to each list item
var listNode = document.getElementsByTagName("li");
var i;
for (i = 0; i < listNode.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}
// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a UL Container and respective List Items at the  click of a button
export const addlistItems = () => {
  const myInput = document.querySelector("#myInput");
  const todoBtn = document.querySelector("#todoBtn");

  const userInput = myInput.value;

  const li = document.createElement('li');
  var t = document.createTextNode(userInput);
  li.appendChild(t);
  const ul = document.querySelector('#listContainer');
  ul.appendChild(li);
  myInput.value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }

}

//Clearing the list
function removeAll() {
  var lst = document.getElementById("listContainer");
  lst[0].innerHTML = "";

}
