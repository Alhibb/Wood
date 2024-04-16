document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      if (username === 'admin' && password === '123456') {
          sessionStorage.setItem('userRole', 'admin');
          window.location.href = 'admin.html';
      } else if ((username === 'user1' && password === '123456') || 
                 (username === 'user2' && password === '123456')) {
          sessionStorage.setItem('userRole', 'user');
          localStorage.removeItem('cart');
          window.location.href = 'done.html';
      } else {
          alert('Error logging in. Please check your username and password.');
      }
  });
});