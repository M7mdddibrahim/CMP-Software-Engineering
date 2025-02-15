function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', () => deleteEmployee(item.id));
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.addEventListener('DOMContentLoaded', () => {
  fetchEmployees();
  // Add event listener to the submit button
  document.getElementById('submitBtn').addEventListener('click', createEmployee);
});

// TODO
function createEmployee() {
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;

  if (!name || !id) {
    alert('Please enter both ID and Name');
    return;
  }

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, id })
  })
    .then(response => response.json())
    .then(() => {
      fetchEmployees();
      document.getElementById('name').value = '';
      document.getElementById('id').value = '';
    })
    .catch(error => console.error('Error creating employee:', error));
}

// TODO
function deleteEmployee(id) {
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(() => fetchEmployees())
    .catch(error => console.error('Error deleting employee:', error));
}