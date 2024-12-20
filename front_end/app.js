
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid username or password');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('token', data.token);
            document.getElementById('login-container').style.display = 'none';  // Ховаємо форму входу

             window.location.href = 'dashboard.html';  // Перехід на нову сторінку
        })
        .catch(error => {
            document.getElementById('login-error').textContent = error.message;
        });
}



 function fetchPlanets() {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }

    fetch('http://localhost:5000/planets', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch planets');
            }
            return response.json();
        })
        .then(data => {
            const planetsList = document.getElementById('planets-list');
            planetsList.innerHTML = '';
            data.planets.forEach(planet => {
                const li = document.createElement('li');
                li.textContent = planet;
                planetsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

 window.onload = function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
    } else {
        fetchPlanets();
    }
};