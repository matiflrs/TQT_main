
// Esto no funciono xD
//let filteredVehicles = [];
//let currentFilters = {
 //   category: 'all',
   // price: 'all'
//};

const vehicleData = [
    {
        id: 'model3',
        name: 'Tesla Model 3',
        category: 'deportivo',
        price: 38990,
        image: 'assets/img/model_3.png',
        description: 'Sedán eléctrico de alto rendimiento con tecnología autónoma avanzada.',
        specs: {
            autonomy: '568 km',
            maxSpeed: '261 km/h',
            acceleration: '3.3s 0-100 km/h',
            seats: 5,
            power: '450 hp'
        },
        features: [
            'Piloto automático avanzado',
            'Pantalla táctil de 15"',
            'Carga rápida Supercharger',
            'Actualizaciones OTA',
            'Sistema de sonido premium'
        ]
    },
    {
        id: 'models',
        name: 'Tesla Model S',
        category: 'sedan',
        price: 94990,
        image: 'assets/img/model_s.png',
        description: 'Sedán de lujo eléctrico con el máximo rendimiento y confort premium.',
        specs: {
            autonomy: '652 km',
            maxSpeed: '322 km/h',
            acceleration: '2.1s 0-100 km/h',
            seats: 5,
            power: '1020 hp'
        },
        features: [
            'Modo Plaid ultra rápido',
            'Interior de lujo premium',
            'Suspensión adaptativa',
            'Volante tipo yoke',
            'Sistema de entretenimiento gaming'
        ]
    },
    {
        id: 'modelx',
        name: 'Tesla Model X',
        category: 'suv',
        price: 109990,
        image: 'assets/img/model_x.webp',
        description: 'SUV eléctrico premium con puertas falcon wing y capacidad para 7 pasajeros.',
        specs: {
            autonomy: '547 km',
            maxSpeed: '262 km/h',
            acceleration: '2.6s 0-100 km/h',
            seats: 7,
            power: '1020 hp'
        },
        features: [
            'Puertas Falcon Wing',
            'Capacidad para 7 pasajeros',
            'Remolque hasta 2.3 toneladas',
            'Filtro HEPA médico',
            'Modo biodefensa'
        ]
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