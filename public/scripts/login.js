document.getElementById('submit').addEventListener('click', function(e) {
    e.preventDefault();
    var email = document.getElementById('exampleInputEmail1').value;
    var password = document.getElementById('exampleInputPassword1').value;
    var data = {
        email: email,
        password: password
    };
    fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async function (response) {
        let data = await response.json();
        if (data.status === "success") {
            window.location.href = '/invoice/list';
        } else {
            alert('Invalid username or password');
        }
    });
})