document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    // const email = document.getElementById('form3Example97').value;
    // const password = document.getElementById('password').value;
    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });
    const message = await response.text();
    document.getElementById('registrationMessage').textContent = message;
});
