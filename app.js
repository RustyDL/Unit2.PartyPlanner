// app.js
document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events';

    // Fetch party data from the API and render the list
    function fetchAndRenderParties() {
        // Fetch data from the API using GET method
        fetch(apiUrl)
                .then(response => response.json())
                .then(data => renderPartyList(data))
                .catch(error => console.error('Error fetching parties:', error));
        }

    // Render the party list dynamically
    function renderPartyList(parties) {
        const partyList = document.getElementById('partyList');
            partyList.innerHTML = ''; // Clear existing list

            parties.forEach(party => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <strong>${party.name}</strong> -
                    Date: ${party.date}, Time: ${party.time}, Location: ${party.location}, Description: ${party.description}
                    <button onclick="deleteParty(${party.id})">Delete</button>
                `;
                partyList.appendChild(listItem);
            });
        }

    // Delete a party using the DELETE method
    function deleteParty(partyId) {
        // Fetch data from the API using DELETE method
        fetch(`${apiUrl}/${partyId}`, { method: 'DELETE' })
                .then(() => fetchAndRenderParties())
                .catch(error => console.error('Error deleting party:', error));
        }

        // Handle party form submission
        const partyForm = document.getElementById('partyForm');
        partyForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(partyForm);

            // Fetch data from the API using POST method
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            })
                .then(() => {
                    partyForm.reset(); // Clear the form
                    fetchAndRenderParties();
                })
                .catch(error => console.error('Error adding party:', error));
        });

        // Initial fetch and render
        fetchAndRenderParties();
    });
