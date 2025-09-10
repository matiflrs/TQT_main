
// Esto no funciono xD
//let filteredVehicles = [];
//let currentFilters = {
 //   category: 'all',
   // price: 'all'
//};

const vehicleData = [
    {
        id: 'model3',
        name: 'Tesla Model 3'
    },
    {
        id: 'models',
        name: 'Tesla Model S'
    },
    {
        id: 'modelx',
        name: 'Tesla Model X'
    }
];



function showVehicleDetails(vehicleId) {
    const vehicle = vehicleData.find(v => v.id === vehicleId);
    if (!vehicle) return;    

    const contactModalElement = document.getElementById('contactModal');
    if (contactModalElement) {
        const contactModal = new bootstrap.Modal(contactModalElement);
        

        const messageField = document.getElementById('message');
        const subjectField = document.getElementById('subject');
        
        if (messageField) {
            messageField.value = `Hola, me interesa obtener más información sobre el ${vehicle.name}. Me gustaría conocer detalles sobre precio, financiamiento y disponibilidad.`;
        }
        
        if (subjectField) {
            subjectField.value = 'cotizacion';
        }
        
        contactModal.show();
    }
}