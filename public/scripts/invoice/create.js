document.getElementById('submit').addEventListener('click', function(e) {
    // get the total and email from the form and send it to the server using fetch API
    // to invoice route

    e.preventDefault();
    var total = document.getElementById('invoiceTotal').value;
    var email = document.getElementById('invoiceEmail').value;
    var data = {
        total: total,
        email: email
    };
    fetch('/invoice', {
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
}
)