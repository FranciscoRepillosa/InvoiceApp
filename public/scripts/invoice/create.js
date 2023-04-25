document.getElementById('submit').addEventListener('click', function(e) {
    // get the total and email from the form and send it to the server using fetch API
    // to invoice route

    e.preventDefault();

    const serviceElements = document.querySelectorAll('tbody tr');

    const services = [];

    serviceElements.forEach(serviceElement => {
        const name = serviceElement.querySelector('.name').value;
        const price = serviceElement.querySelector('.price').value;
        const qty = serviceElement.querySelector('.qty').value;
        const total = serviceElement.querySelector('.serviceTotal').textContent;
        services.push({
            name,
            price,
            qty,
            total
        });
    });

    console.log(services);
    var total = Number(document.getElementById('invoiceTotal').textContent);
    var email = document.getElementById('invoiceEmail').value;
    const clientName = document.getElementById('clientName').value;
    var data = {
        total: total,
        email: email,
        services,
        clientName
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

const numberInuts = document.getElementsByTagName("input");

console.log(numberInuts);

const numberInutsArray = [...numberInuts];

numberInutsArray.forEach(input => {
    if(input.type === 'number') {
       input.addEventListener('change', function(e) {
            const serviceNumber = e.target.id.substr(e.target.id.length -1,1)
            const servicePrice = document.getElementById(`price${serviceNumber}`).value;
            const serviceQuantity = document.getElementById(`qty${serviceNumber}`).value;
            let serviceElementTotal = document.getElementById(`total${serviceNumber}`);
            serviceElementTotal.textContent = servicePrice * serviceQuantity;

            let invoiceTotalElement = document.getElementById('invoiceTotal');
           
            const allServiceTotals = document.getElementsByClassName('serviceTotal');

            let allServiceTotalsArray = [...allServiceTotals];

            const allServiceTotalsArrayNumbers = allServiceTotalsArray.map(serviceTotal => Number(serviceTotal.textContent) ? Number(serviceTotal.textContent) : 0);

            invoiceTotalElement.textContent = allServiceTotalsArrayNumbers.reduce((a, b) => a + b, 0);;

        })
    }
})