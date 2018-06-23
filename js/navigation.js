// Checking active item based on click
// document.querySelector('ul li').addEventListener('click', changeNavigationItem);
// Adding click event for toggle button
document.querySelector(".menu-toggle").addEventListener("click", sidedrawer);

let sidenav = document.querySelector("nav");
let toggleIcon = document.querySelector(".menu-toggle .fa");

function sidedrawer() {
  // Toggle active class
  sidenav.classList.toggle("active");

  // Toggle menu icon
  if (sidenav.classList.contains("active")) {
    toggleIcon.classList.replace("fa-bars", "fa-times");
  } else {
    toggleIcon.classList.replace("fa-times", "fa-bars");
  }
}

function changeNavigationItem(e) {
  // Remove all other element with active class
  document.querySelectorAll('nav ul li').forEach(list => {
    if (list.classList.contains('active')) {
      // Drop down then add active class to drop down li also
      if (list == e.srcElement.parentNode) {
        // nav ul li.active(parentNode) ul(parentNode) li.active(targeted element) a
        list.parentNode.parentNode.classList.add('active');
      } else {
        // remove all other active class from all other li tag's
        list.classList.remove('active');
      }
      list.classList.remove('active');
    }
  });
  // Add active class to clicked on
  e.srcElement.parentNode.classList.add('active');
}

// let li = document.querySelectorAll('nav ul li');  
function addEventListenerToNav(query, event, fn) {
  let list = document.querySelectorAll(query);
  for (let i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fn, false);
  }
}

addEventListenerToNav('nav ul li', 'click', changeNavigationItem);