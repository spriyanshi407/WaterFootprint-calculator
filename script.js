document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calculator-form');
    const resultDiv = document.getElementById('result');
    let chart = null;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get all input values
        const inputs = {
            shower: parseFloat(document.getElementById('shower').value) || 0,
            dishwasher: parseFloat(document.getElementById('dishwasher').value) || 0,
            laundry: parseFloat(document.getElementById('laundry').value) || 0,
            toilet: parseFloat(document.getElementById('toilet').value) || 0,
            cooking: parseFloat(document.getElementById('cooking').value) || 0,
            gardening: parseFloat(document.getElementById('gardening').value) || 0,
            drinking: parseFloat(document.getElementById('drinking').value) || 0,
            cleaning: parseFloat(document.getElementById('cleaning').value) || 0,
            carwash: parseFloat(document.getElementById('carwash').value) || 0,
            other: parseFloat(document.getElementById('other').value) || 0
        };

        // Calculate water footprint
        const footprint = calculateWaterFootprint(inputs);
        
        // Display result with animation
        displayResult(footprint);
        
        // Update chart
        updateChart(inputs, footprint);
    });

    function calculateWaterFootprint(inputs) {
        const factors = {
            shower: 10,        // liters per minute
            dishwasher: 15,    // liters per load
            laundry: 20,       // liters per load
            toilet: 5,         // liters per flush
            cooking: 1.5,      // liters per minute
            gardening: 5,      // liters per minute
            drinking: 1,       // liters per liter
            cleaning: 2,       // liters per minute
            carwash: 20,       // liters per minute
            other: 1           // liters per liter
        };

        let total = 0;
        for (const [key, value] of Object.entries(inputs)) {
            total += value * factors[key];
        }

        return total;
    }

    function displayResult(footprint) {
        resultDiv.style.opacity = '0';
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class="result-content">
                    <h3>Your Daily Water Footprint</h3>
                    <p class="footprint-value">${footprint.toFixed(2)} liters</p>
                    <div class="footprint-message">
                        ${getFootprintMessage(footprint)}
                    </div>
                </div>
            `;
            resultDiv.style.opacity = '1';
        }, 300);
    }

    function getFootprintMessage(footprint) {
        if (footprint < 100) {
            return '<p class="good">Excellent! You are using water very efficiently.</p>';
        } else if (footprint < 200) {
            return '<p class="average">Good job! Your water usage is within the average range.</p>';
        } else {
            return '<p class="high">Consider reducing your water usage. Here are some tips:</p>' +
                   '<ul>' +
                   '<li>Take shorter showers</li>' +
                   '<li>Fix any leaks</li>' +
                   '<li>Use water-efficient appliances</li>' +
                   '</ul>';
        }
    }

    function updateChart(inputs, total) {
        const ctx = document.getElementById('waterFootprintChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (chart) {
            chart.destroy();
        }

        const labels = Object.keys(inputs).map(key => 
            key.charAt(0).toUpperCase() + key.slice(1)
        );
        
        const data = Object.values(inputs).map((value, index) => {
            const factors = [10, 15, 20, 5, 1.5, 5, 1, 2, 20, 1];
            return value * factors[index];
        });

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Water Usage (liters)',
                    data: data,
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(46, 204, 113, 0.8)',
                        'rgba(155, 89, 182, 0.8)',
                        'rgba(52, 73, 94, 0.8)',
                        'rgba(230, 126, 34, 0.8)',
                        'rgba(26, 188, 156, 0.8)',
                        'rgba(41, 128, 185, 0.8)',
                        'rgba(142, 68, 173, 0.8)',
                        'rgba(44, 62, 80, 0.8)',
                        'rgba(243, 156, 18, 0.8)'
                    ],
                    borderColor: [
                        'rgba(52, 152, 219, 1)',
                        'rgba(46, 204, 113, 1)',
                        'rgba(155, 89, 182, 1)',
                        'rgba(52, 73, 94, 1)',
                        'rgba(230, 126, 34, 1)',
                        'rgba(26, 188, 156, 1)',
                        'rgba(41, 128, 185, 1)',
                        'rgba(142, 68, 173, 1)',
                        'rgba(44, 62, 80, 1)',
                        'rgba(243, 156, 18, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Liters of Water'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.y.toFixed(2)} liters`;
                            }
                        }
                    }
                }
            }
        });
    }
});

// Mobile Navigation
function openNav() {
    document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('myNav');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (event.target !== mobileBtn && !mobileBtn.contains(event.target) && 
        event.target !== nav && !nav.contains(event.target)) {
        closeNav();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to current navigation item
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === '#home')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}); 