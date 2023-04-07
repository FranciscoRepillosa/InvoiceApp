document.getElementById('submit').addEventListener('click', function() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var data = {
        email: email,
        password: password
    };
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function (response) {
        if (response.status === 200) {
            window.location.href = '/invoice/list';
        } else {
            alert('Invalid username or password');
        }
    });
})