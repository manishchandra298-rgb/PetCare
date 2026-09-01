/* ===== Burrow & Bark — script.js ===== */

// ---- Mobile navigation toggle ----
var navToggle = document.getElementById("navToggle");
var mainNav = document.getElementById("mainNav");

if (navToggle) {
  navToggle.addEventListener("click", function () {
    mainNav.classList.toggle("open");
  });
}

// ---- Show sign-in status on every page ----
function updateAuthStatus() {
  var authStatus = document.getElementById("authStatus");
  var signInBtn = document.getElementById("signInBtn");
  var userName = localStorage.getItem("bb_username");

  if (userName && authStatus && signInBtn) {
    authStatus.textContent = "Hi, " + userName;
    signInBtn.textContent = "Sign out";
    signInBtn.href = "#";
    signInBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("bb_username");
      window.location.href = "index.html";
    });
  }
}
updateAuthStatus();

// ---- Helper: show/hide an error message under a field ----
function setFieldError(groupId, isInvalid) {
  var group = document.getElementById(groupId);
  if (!group) return;
  if (isInvalid) {
    group.classList.add("invalid");
  } else {
    group.classList.remove("invalid");
  }
}

// ---- Simple email format check ----
function isValidEmail(value) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value);
}

// ===== Login Form Validation =====
var loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var email = document.getElementById("loginEmail").value.trim();
    var password = document.getElementById("loginPassword").value;

    var emailValid = isValidEmail(email);
    var passwordValid = password.length >= 6;

    setFieldError("loginEmailGroup", !emailValid);
    setFieldError("loginPasswordGroup", !passwordValid);

    if (emailValid && passwordValid) {
      // Simulate a successful login (no real backend/server here)
      var namePart = email.split("@")[0];
      localStorage.setItem("bb_username", namePart);

      document.getElementById("loginSuccess").style.display = "block";
      loginForm.reset();

      setTimeout(function () {
        window.location.href = "index.html";
      }, 1200);
    }
  });
}

// ===== Signup Form Validation =====
var signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("signupName").value.trim();
    var email = document.getElementById("signupEmail").value.trim();
    var password = document.getElementById("signupPassword").value;
    var pet = document.getElementById("signupPet").value;

    var nameValid = name.length > 0;
    var emailValid = isValidEmail(email);
    var passwordValid = password.length >= 6;
    var petValid = pet !== "";

    setFieldError("signupNameGroup", !nameValid);
    setFieldError("signupEmailGroup", !emailValid);
    setFieldError("signupPasswordGroup", !passwordValid);
    setFieldError("signupPetGroup", !petValid);

    if (nameValid && emailValid && passwordValid && petValid) {
      localStorage.setItem("bb_username", name);

      document.getElementById("signupSuccess").style.display = "block";
      signupForm.reset();

      setTimeout(function () {
        window.location.href = "index.html";
      }, 1200);
    }
  });
}

// ===== Toggle between Login and Signup boxes =====
var showSignup = document.getElementById("showSignup");
var showLogin = document.getElementById("showLogin");
var loginBox = document.getElementById("loginBox");
var signupBox = document.getElementById("signupBox");

if (showSignup) {
  showSignup.addEventListener("click", function (e) {
    e.preventDefault();
    loginBox.style.display = "none";
    signupBox.style.display = "block";
  });
}

if (showLogin) {
  showLogin.addEventListener("click", function (e) {
    e.preventDefault();
    signupBox.style.display = "none";
    loginBox.style.display = "block";
  });
}
