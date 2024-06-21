document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/contracts')
        .then(response => response.json())
        .then(data => {
            const contractList = document.getElementById('contract-list');

            data.forEach(contract => {
                const contractElement = document.createElement('div');
                contractElement.classList.add('contract');
                contractElement.innerHTML = `
                    <h2>Contract ID: ${contract["Contract ID"]}</h2>
                    <p>University: ${contract["University"]}</p>
                    <p>Counterparty: ${contract["Counterparty"]}</p>
                    <p>Counterparty location: ${contract["Counterparty location"]}</p>
                    <p>Type of contract: ${contract["Type of contract"]}</p>
                    <p>Purpose: ${contract["Purpose"]}</p>
                    <p>Objectives: ${contract["Objectives"]}</p>
                    <p>Contract Start Date: ${contract["Contract Start Date"]}</p>
                    <p>Duration: ${contract["Duration"]}</p>
                    <p>Status: ${contract["Status"]}</p>
                `;
                contractList.appendChild(contractElement);
            });
        })
        .catch(error => console.error('Error fetching contracts:', error));
});
