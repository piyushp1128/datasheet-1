async function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");
  
    try {
      const response = await fetch("users.json");
      const users = await response.json();
  
      const user = users.find(u => u.username === username && u.password === password);
  
      if (user) {
        let loginCount = localStorage.getItem(`loginCount_${username}`);
        loginCount = loginCount ? parseInt(loginCount) : 0;
  
        if (loginCount >= 10) {
          errorMessage.textContent = "Maximum login limit reached (10).";
        } else {
          localStorage.setItem(`loginCount_${username}`, loginCount + 1);
          window.location.href = "choose-datasheet.html";
        }
      } else {
        errorMessage.textContent = "Invalid username or password.";
      }
    } catch (err) {
      errorMessage.textContent = "Error loading user data.";
      console.error(err);
    }
  }
  