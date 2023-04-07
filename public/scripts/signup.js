document.getElementById('submit').addEventListener('click', function() {
    // get the name, email and password from the form and send it to the server using fetch API
    // to user/signup route
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    var data = {
        name: name,
        password: password,
        email: email
    };
    fetch('/user/signup', {
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
