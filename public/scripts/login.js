document.getElementById('submit').addEventListener('click', function(e) {
    e.preventDefault();
    var email = document.getElementById('exampleInputEmail1').value;
    var password = document.getElementById('exampleInputPassword1').value;
    var data = {
        email: email,
        password: password
    };
    fetch('./login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function (response) {
        log
        if (response.status === 200) {
            window.location.href = '/invoice/list';
        } else {
            alert('Invalid username or password');
        }
    });
})