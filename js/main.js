// Typing effect in about section

// document.addEventListener("DOMContentLoaded", typeWriter);
document.addEventListener("DOMContentLoaded", () => {
  let aboutSection = elmYPosition('about', 50);

  document.addEventListener('scroll', () => {
    if ((aboutSection - 5) < currentYPosition()) {
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