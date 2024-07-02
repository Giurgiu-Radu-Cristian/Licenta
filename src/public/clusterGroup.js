document.addEventListener('DOMContentLoaded', () => {
    let map = null;

    // Try to retrieve existing map instance
    const existingMapElement = document.getElementById('map');
    if (existingMapElement) {
        map = existingMapElement._leaflet_map || null;
    }

    // If map doesn't exist, initialize Leaflet
    if (!map) {
        map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }
    let clusterGroups = {};
    let plainMarkers = L.layerGroup();

    function addContractMarkers(data, useClustering) {
        for (const key in clusterGroups) {
            clusterGroups[key].clearLayers();
        }
        plainMarkers.clearLayers();

        const groupedContracts = data.reduce((acc, contract) => {
            const objective = contract.Objectives || 'No Objectives';
            if (!acc[objective]) {
                acc[objective] = [];
            }
            acc[objective].push(contract);
            return acc;
        }, {});

        Object.keys(groupedContracts).forEach(objective => {
            if (!clusterGroups[objective]) {
                clusterGroups[objective] = L.markerClusterGroup();
            }
            groupedContracts[objective].forEach(contract => {
                const location = contract['Counterparty location'];
                if (location && location.lat && location.lng) {
                    const marker = L.marker([location.lat, location.lng]);
                    let popupContent = `<b>${contract.University}</b><br>${contract.Counterparty}<br>${contract.address || 'No address available'}`;
                    popupContent += `<br><button onclick="showContractDetails('${escape(JSON.stringify(contract))}')">Show Details</button>`;
                    marker.bindPopup(popupContent);

                    if (useClustering) {
                        clusterGroups[objective].addLayer(marker);
                    } else {
                        plainMarkers.addLayer(marker);
                    }
                }
            });

            if (useClustering) {
                map.addLayer(clusterGroups[objective]);
            }
        });

        if (!useClustering) {
            map.addLayer(plainMarkers);
        }
    }

    // Fetch contracts data and populate map
    fetch('/api/contracts')
        .then(response => response.json())
        .then(data => {
            addContractMarkers(data, false);

            const totalCount = data.length;
            document.getElementById('contractsCount').textContent = `Total Contracts: ${totalCount}`;

            // Event listener for checkbox change
            document.getElementById('clusterToggle').addEventListener('change', (event) => {
                const useClustering = event.target.checked;
                if (useClustering) {
                    map.removeLayer(plainMarkers);
                    addContractMarkers(data, true);
                } else {
                    for (const key in clusterGroups) {
                        map.removeLayer(clusterGroups[key]);
                    }
                    addContractMarkers(data, false);
                }
            });
        });

    // Dummy function for contract details modal
    window.showContractDetails = function(contractJson) {
        const contract = JSON.parse(unescape(contractJson));
        alert(`Showing details for contract with ${contract.Counterparty}`);
    };
});
