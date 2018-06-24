// Get the current top location using self.pageYOffset
function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

// Get the position of element till where you want to scroll to: element.offsetTop
function elmYPosition(eID, offset) {
  let elm = document.getElementById(eID);
  let y = elm.offsetTop;
  let node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return (y - offset);
}

// Do a for loop to reach there, which will be quite fast or use a timer to do smooth scroll till that position using window.scrollTo
function smoothScroll(eID, offset) {
  let startY = currentYPosition();
  let stopY = elmYPosition(eID, offset);
  let distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  let speed = Math.round(distance / 10);
  if (speed >= 20) speed = 20;
  let step = Math.round(distance / 25);
  let leapY = stopY > startY ? startY + step : startY - step;
  let timer = 0;
  if (stopY > startY) {
    for (let i = startY; i < stopY; i += step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
}

// Decode and call the main function
function scrollByHash(e) {
  // to stop changing url
  e.preventDefault();
  // get the id of the section which we are targeting
  if (!e.target.parentNode.classList.contains('menu-dropdown')) {
    let hash = e.target.attributes[0].value.split('#')[1];
    // calling scroll function with offset so that navigation bar won't over lap contents.
    smoothScroll(hash, navbarHeight);
  }
}

// Add event to all a tags
function addScrollEventListener(query, event, fn) {
  let list = document.querySelectorAll(query);
  for (let i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fn, false);
  }
}

const navbarHeight = document.querySelector('.navbar').offsetHeight;

// All Clicked events
addScrollEventListener("nav > ul > li", "click", scrollByHash);

// scrollTo class 
addScrollEventListener(".scrollTo", "click", scrollByHash);

// Navigation bar 
let sectionList = {};

function getSection(id, index) {
  if (id) {
    let pos = elmYPosition(id, navbarHeight);
    sectionList[index] = pos;
  } else {
    setTimeout(() => {
      sectionList[index] = sectionList[index + 1];
    }, 500);
  }
}

function changeActive(index) {
  let li = listArray[index];

  listArray.forEach(list => {
    if (list.classList.contains('active')) {
      list.classList.remove('active');
      if (li.parentNode.parentNode.classList.contains('menu-dropdown')) {
        li.parentNode.parentNode.classList.add('active');
      }
    }
  });

  li.classList.add('active');

  // close navigation bar
  // sidenav and toggleIcon is defined in navigation.js file
  if (sidenav.classList.contains("active")) {
    toggleIcon.classList.replace("fa-bars", "fa-times");
    sidenav.classList.remove("active");
  } else {
    toggleIcon.classList.replace("fa-times", "fa-bars");
  }
}

function scrollActive() {
  let current_pos = currentYPosition();
  if (sectionList[sectionIndex] <= current_pos && sectionList[sectionIndex + 1] > current_pos) {
    current_section = sectionList[sectionIndex];
  } else if ((sectionList[sectionIndex] > current_pos) && (sectionIndex > 0)) {
    sectionIndex--;
    changeActive(sectionIndex);
  } else if (sectionIndex < listArray.length - 1) {
    sectionIndex++;
    changeActive(sectionIndex);
  }
}

let sectionIndex = 0; // index
let current_section = 0; // index value = 0 top home position

// let sidenav = document.querySelector("nav"); // I have defined sidenav in navigation.js
let listArray = document.querySelectorAll('nav ul li');

document.querySelectorAll('nav ul li a').forEach((section, index) => {
  getSection(section.getAttribute('href').split('#')[1], index);
});

document.addEventListener('scroll', scrollActive, false);