// Loader
// document.addEventListener("DOMContentLoaded", () => {
//   setTimeout(() => {
//     document.querySelector(".loader").style.display = "none";
//     document.body.style.overflow = "initial";
//     window.scrollTo(0, 0);
//   }, 1000);
// });

window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".loader").style.display = "none";
    document.body.style.overflow = "initial";
    window.scrollTo(0, 0);
  }, 1000);
});

// Typing effect in about section

// document.addEventListener("DOMContentLoaded", typeWriter);
document.addEventListener("DOMContentLoaded", () => {
  let aboutSection = elmYPosition("about", 56);

  document.addEventListener("scroll", () => {
    // Typing effect
    if (aboutSection - 5 < currentYPosition()) {
      typeWriter();
    }
  });
});

// Current Paragraph
let typingPara = 0;
// Current paragraph character index
let typingIndex = 0;
// All the paragraph inside typing
let typingText = [];
// 5ms speed
let typingSpeed = 5;
// typing flag
let typingFlag = true;

function typeWriter() {
  if (typingFlag) {
    // only once
    typingFlag = false;
    // Storing
    document.querySelectorAll(".details .typing p").forEach(paragraph => {
      typingText.push(paragraph.innerHTML);
    });
    // Cleaning Current text
    document.querySelectorAll(".details .typing p").forEach(paragraph => {
      paragraph.innerHTML = "";
    });
    // Calling Typing function
    typeWriterCursor();
  }
}

function typeWriterCursor() {
  if (typingIndex < typingText[typingPara].length) {
    document.querySelector(
      `.details .typing p:nth-child(${typingPara + 1})`
    ).innerHTML += typingText[typingPara].charAt(typingIndex);
    typingIndex++;
    setTimeout(typeWriterCursor, typingSpeed);
  } else {
    if (typingPara < typingText.length - 1) {
      typingPara++;
      typingIndex = 0;
      typeWriterCursor();
    }
  }
}

// sticky top for about section
let aboutHeader = document.querySelector("#about header");
// navbarHeight is from smoothScroll.js ----- document.querySelector('.navbar').offsetHeight;
let aboutHeaderOffset = aboutHeader.offsetTop - navbarHeight;
let endAboutSection = aboutHeader.parentElement.nextElementSibling.offsetTop;
let aboutProgressBar = document.getElementById("aboutProgressBar");
let socialMediaSectionOffset =
  document.getElementById("social-media").offsetTop -
  navbarHeight -
  aboutHeader.offsetHeight;
let educationSection =
  document.getElementById("education").offsetTop -
  navbarHeight -
  aboutHeader.offsetHeight;

// scroll event for sticky header.
window.addEventListener("scroll", () => {
  if (
    window.pageYOffset > aboutHeaderOffset &&
    window.pageYOffset < endAboutSection - aboutHeader.offsetHeight
  ) {
    let winScroll = window.pageYOffset - aboutHeaderOffset;
    let height = aboutHeader.parentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    aboutProgressBar.style.width = scrolled + "%";
    aboutHeader.classList.add("sticky");
  } else {
    aboutHeader.classList.remove("sticky");
  }

  // Setting the title of the
  if (
    window.pageYOffset >= aboutHeaderOffset &&
    window.pageYOffset < socialMediaSectionOffset
  ) {
    document.querySelector("header .container h1.title").textContent =
      "Who am I?";
  } else if (
    window.pageYOffset >= socialMediaSectionOffset &&
    window.pageYOffset < educationSection
  ) {
    document.querySelector("header .container h1.title").textContent =
      "Get in touch";
  } else if (
    window.pageYOffset >= educationSection &&
    window.pageYOffset < endAboutSection
  ) {
    document.querySelector("header .container h1.title").textContent =
      "My Education";
  }
});
