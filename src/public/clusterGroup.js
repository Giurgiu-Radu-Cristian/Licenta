document.addEventListener('DOMContentLoaded', function() {
    // Initialize Leaflet map
    let map = L.map('map').setView([51.505, -0.09], 4.5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markers = L.markerClusterGroup(); // Define the marker cluster group globally
    let allMarkers = L.layerGroup(); // Layer group for all markers
    let clusteredMarkers = L.markerClusterGroup(); // Clustered markers
    let allData = []; // Store fetched data globally

    // Fetch contracts data and populate map initially
    fetch('/api/contracts')
        .then(response => response.json())
        .then(data => {
            allData = data;
            addMarkers(data, false); // Initially add markers without clustering

            const totalCount = data.length;
            document.getElementById('contractsCount').textContent = `Total Contracts: ${totalCount}`;

            // Event listener for checkbox change
            document.getElementById('clusterToggle').addEventListener('change', (event) => {
                const useClustering = event.target.checked;
                addMarkers(allData, useClustering);
            });
        });

    // Dummy function for contract details modal
    window.showContractDetails = function(contractJson) {
        const contract = JSON.parse(unescape(contractJson));
        alert(`Showing details for contract with ${contract.Counterparty}`);
    };

    function addMarkers(data, useClustering) {
        // Clear existing markers and marker clusters
        allMarkers.clearLayers();
        clusteredMarkers.clearLayers();
        map.removeLayer(allMarkers);
        map.removeLayer(clusteredMarkers);

        if (useClustering) {
            // Group contracts by objectives
            const groupedContracts = data.reduce((acc, contract) => {
                const objective = contract.Objectives || 'No Objectives';
                if (!acc[objective]) {
                    acc[objective] = [];
                }
                acc[objective].push(contract);
                return acc;
            }, {});

            // Add markers to respective clusters
            Object.keys(groupedContracts).forEach(objective => {
                const clusterGroup = L.markerClusterGroup(); // Create a new cluster group for each objective
                groupedContracts[objective].forEach(contract => {
                    const location = contract['Counterparty location'];
                    if (location && location.lat && location.lng) {
                        const marker = L.marker([location.lat, location.lng]);
                        let popupContent = `<b>${contract.University}</b><br>${contract.Counterparty}<br>${contract.address || 'No address available'}`;

                        if (contract.images && contract.images.length > 0) {
                            popupContent += '<div class="popup-images">';
                            contract.images.forEach((image, index) => {
                                if (index === 0) {
                                    popupContent += `<img src="${image}" alt="Image ${index + 1}" class="active">`;
                                } else {
                                    popupContent += `<img src="${image}" alt="Image ${index + 1}">`;
                                }
                            });
                            popupContent += '<div class="slideshow-controls">';
                            popupContent += '<span class="prev" onclick="plusSlides(-1)">&#10094; Prev</span>';
                            popupContent += '<span class="next" onclick="plusSlides(1)">Next &#10095;</span>';
                            popupContent += '</div></div>';
                        }

                        popupContent += `<br><button onclick="showContractDetails('${escape(JSON.stringify(contract))}')">Show Details</button>`;

                        marker.bindPopup(popupContent);
                        clusterGroup.addLayer(marker);
                    }
                });
                clusteredMarkers.addLayer(clusterGroup);
            });

            // Add clustered markers to the map
            map.addLayer(clusteredMarkers);
        } else {
            // Add plain markers to the map
            data.forEach(contract => {
                const location = contract['Counterparty location'];
                if (location && location.lat && location.lng) {
                    const marker = L.marker([location.lat, location.lng]);
                    let popupContent = `<b>${contract.University}</b><br>${contract.Counterparty}<br>${contract.address || 'No address available'}`;

                    if (contract.images && contract.images.length > 0) {
                        popupContent += '<div class="popup-images">';
                        contract.images.forEach((image, index) => {
                            if (index === 0) {
                                popupContent += `<img src="${image}" alt="Image ${index + 1}" class="active">`;
                            } else {
                                popupContent += `<img src="${image}" alt="Image ${index + 1}">`;
                            }
                        });
                        popupContent += '<div class="slideshow-controls">';
                        popupContent += '<span class="prev" onclick="plusSlides(-1)">&#10094; Prev</span>';
                        popupContent += '<span class="next" onclick="plusSlides(1)">Next &#10095;</span>';
                        popupContent += '</div></div>';
                    }

                    popupContent += `<br><button onclick="showContractDetails('${escape(JSON.stringify(contract))}')">Show Details</button>`;

                    marker.bindPopup(popupContent);
                    allMarkers.addLayer(marker);
                }
            });

            // Add all markers layer group to map
            map.addLayer(allMarkers);
        }
    }
});
