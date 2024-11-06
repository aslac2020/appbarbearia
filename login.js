document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const response = await fetch('https://appbarbearia.vercel.app/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
    });

    const loginAlert = document.getElementById('loginAlert');
    if (response.ok) {
        window.location.href = 'home.html';
    } else {
        loginAlert.textContent = 'Email ou senha incorretos.';
        loginAlert.className = 'alert alert-danger';
        loginAlert.style.display = 'block';
    }
});
