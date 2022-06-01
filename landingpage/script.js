/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const headerNav             = document.getElementsByClassName('.navbar__menu');
const navList               = document.getElementById('navbar__list');
const sections              = document.querySelectorAll('section');

/**
 * End Global Variables
 * 
*/

/**
 * Begin Main Functions
 * 
*/
// construct the nav
function buildNav() {
  // get a reference to the UL
  let navList = document.getElementById('navbar__list');
  // sections is defined above
  for (let i = 0; i < sections.length; i++) {
    let currentSectionId   = sections[i].id;                       // Get the id of the section
    let currentSectionName = sections[i].getAttribute('data-nav'); // Get the name of the section
    let liEl               = document.createElement("li");         // Create an li element to add to the nav
    liEl.innerHTML         = currentSectionName                    // add the name to the li
    liEl.setAttribute("data-id", currentSectionId);                // add the data-id attribute to use
    liEl.classList.add("nav-item");                                // give the li a class
    navList.appendChild(liEl);                                     // append the li to the ul 
    // add an event listener to the li to detect click
    liEl.addEventListener('click', function(e) {
      //
      e.preventDefault();

      e.target.classList.add('focus');
      let secId        = e.target.getAttribute("data-id"); // get the section ID value
      let scrollTarget = document.getElementById(secId);
      // make the scrolling smooth
      window.scroll({
        top: scrollTarget.offsetTop,
        behavior: 'smooth'
      });
    });    
  }
}
/**
* Scroll Top Button processes
*
**/

let scrollButton = document.getElementById("topBtn");            //Get the button

window.onscroll = function() {scrollFunction()};                 //120px from the top of the document, show the button

function scrollFunction() {
  if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
    scrollButton.style.display = "block";
} 
  else {
    scrollButton.style.display = "none";
  }
}

function topFunction() {                                            // Click on button, scroll to the top
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

buildNav();
const offset = (section) => {
return Math.floor(section.getBoundingClientRect().top);
};

// These functions to add or remove active class.
// Removes active class
const removeActive = (section) =>{
  section.classList.remove('focus');
};

// Adds the active class
const addActive = (conditional, section) => {
  if (conditional){
    section.classList.add('focus');
  }
}

// Calling the function
const toggleActiveClass = () => {
  sections.forEach(section => {
    const elementoffset = offset(section);
    inviewport = () => elementoffset < 150 && elementoffset >= -150;
    removeActive(section);
    addActive(inviewport(), section)
  });
};