// check if there is local storage color option
let mainColors = localStorage.getItem("color-option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // remove active class from all class list item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // add active class on element with data color === local storge item
    if (element.dataset.color === mainColors) {
      // add active class
      element.classList.add("active");
    }
  });
}

// random background option
let backgroundOption = true;

// variable to control the interval
let backgroundInterval;

// check if there is local storge randob background item
let backgroundLocalItem = localStorage.getItem("background_option");

// check if random background local storge is not empty

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // remove active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// toggle spin class om icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // toggle class fa-spin for rotaion on self
  this.classList.toggle("fa-spin");

  // toggle class open on main settings box
  document.querySelector(".settings-box").classList.toggle("open");
};

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

// loop on all list items
colorsLi.forEach((li) => {
  // click on every list items
  li.addEventListener("click", (e) => {
    // set colors on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // set color on localstorage
    localStorage.setItem("color-option", e.target.dataset.color);

    // remove active class from all childrens
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    // add  active class on self
    e.target.classList.add("active");
  });
});
// switch random background options
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// loop on all spans
randomBackEl.forEach((span) => {
  // click on every span
  span.addEventListener("click", (e) => {
    // remove active class from all spans
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    // add active class on self
    e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// select landing page element
let landingPage = document.querySelector(".landing-page");

// get array of images
let imagesArray = [
  "../uploads/images/1.jpg",
  "../uploads/images/2.webp",
  "../uploads/images/3.jpeg",
  "../uploads/images/4.jpg",
  "../uploads/images/5.jpg",
];

// function to randomize imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // get random number
      let randomNumber = Math.floor(Math.random() * imagesArray.length);
      //change background image url
      landingPage.style.backgroundImage =
        'url("images/' + imagesArray[randomNumber] + '")';
    }, 5000);
  }
}
randomizeImgs();

// select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  // skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // window height
  let windowHeight = this.innerHeight;

  // window top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop >= skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//creat popup with image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // creat overlay element
    let overlay = document.createElement("div");

    // add class to overlay
    overlay.className = "popup-overlay";

    // append overlay to body
    document.body.appendChild(overlay);

    // creat the pop box
    let popupBox = document.createElement("div");

    // add class to popup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // creat heading
      let imgHeading = document.createElement("h3");

      // creat text for heading
      imgText = document.createTextNode(img.alt);

      // add the text to the heading
      imgHeading.appendChild(imgText);

      // add the heaging to the popup box
      popupBox.appendChild(imgHeading);
    }

    //creat the img
    let popupImg = document.createElement("img");

    // add img src
    popupImg.src = img.src;

    // add img to prop box
    popupBox.appendChild(popupImg);

    // add popup box to body
    document.body.appendChild(popupBox);

    // creat the close span
    let closeButton = document.createElement("span");

    // creat the close button text
    let closeButtonText = document.createTextNode("X");

    // add text to the close button
    closeButton.appendChild(closeButtonText);

    // add class to close button
    closeButton.className = "close-button";

    // add close button to popup box
    popupBox.appendChild(closeButton);

    // // close popup anthor example
    // closeButton.addEventListener("click", () => {
    //   overlay.remove();
    //   popupBox.remove();
    // });
  });
});

// close popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // remmove the current popup
    e.target.parentNode.remove();

    // remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});
