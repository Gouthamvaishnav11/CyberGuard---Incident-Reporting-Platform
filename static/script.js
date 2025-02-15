const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide"),
  loginForm = document.querySelector(".login_form form");

// Show form container
formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

// Toggle password visibility
pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    const getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

// Switch to signup form
signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});

// Switch to login form
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});

// Handle login submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Navigate to index.html after successful login
  window.location.href = "/main"; // Replace with your actual HTML file
});






function handleClick(button) {
  button.classList.add('animate');
  setTimeout(() => button.classList.remove('animate'), 500); // Reset the animation after it's done
}


// JavaScript to toggle the mobile menu
function toggleMenu() {
  const navItems = document.querySelector('.nav_item');
  navItems.classList.toggle('active');
}


