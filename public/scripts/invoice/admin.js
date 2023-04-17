const startDate = document.getElementById('startDate').value
const endDate = document.getElementById('endDate').value
const status = document.getElementById('status').value

const getInvoices = async () => {
    const response = await fetch(`/invoices?startDate=${startDate}&endDate=${endDate}&status=${status}`)
    const invoices = await response.json()
    return invoices
}

const renderInvoices = async () => {
    const invoices = await getInvoices()
    const table = document.getElementById('invoicesTable')
    table.innerHTML = ''
    invoices.forEach(invoice => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${invoice.userThatHasToPayEmail}</td>
            <td>${invoice.total}</td>
            <td>${invoice.date}</td>
            <td>${invoice.status}</td>
            <td>
                <a href="/invoices/${invoice._id}" class="btn btn-primary">Ver</a>
            </td>
        `
        table.appendChild(row)
    })
}

startDate.addEventListener('change', renderInvoices)
endDate.addEventListener('change', renderInvoices)
status.addEventListener('change', renderInvoices)

