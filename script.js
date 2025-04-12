let loginAttempts = 0;
const maxAttempts = 10;

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorDiv = document.getElementById("error");

  if (!username || !password) {
    errorDiv.textContent = "Please enter both username and password.";
    return;
  }

  fetch("users.json")
    .then(response => response.json())
    .then(users => {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        localStorage.setItem("loginAttempts_" + username, 0); // reset counter
        window.location.href = "choose-datasheet.html";
      } else {
        loginAttempts++;
        errorDiv.textContent = `Invalid credentials. Attempt ${loginAttempts}/${maxAttempts}`;
        if (loginAttempts >= maxAttempts) {
          errorDiv.textContent = "You have exceeded the maximum login attempts.";
          document.querySelector("button").disabled = true;
        }
      }
    })
    .catch(err => {
      console.error("Error loading user data:", err);
      errorDiv.textContent = "Something went wrong. Try again later.";
    });
});

function togglePassword() {
  const pwd = document.getElementById("password");
  pwd.type = pwd.type === "password" ? "text" : "password";
}
