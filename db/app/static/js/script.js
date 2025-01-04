let pagesData = [];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize event listeners
    document.getElementById('searchInput').addEventListener('input', filterData);
    document.getElementById('sortSelect').addEventListener('change', sortData);
    document.getElementById('refreshBtn').addEventListener('click', fetchData);

    // Initial data fetch
    fetchData();
});

function fetchData() {
    showLoading(true);
    
    fetch('/get-data')
        .then(response => {
            console.log('Response status:', response.status);
            return response.json().then(data => {
                if (!response.ok) {
                    throw new Error(data.error || `HTTP error! status: ${response.status}`);
                }
                return data;
            });
        })
        .then(data => {
            pagesData = data[0]?.pages || [];
            updateDashboard();
            updateStats();
            showLoading(false);
        })
        .catch(handleError);
}

function updateDashboard() {
    const accordion = document.getElementById('dataAccordion');
    accordion.innerHTML = '';

    if (pagesData.length === 0) {
        accordion.innerHTML = '<div class="alert alert-info">No data available</div>';
        return;
    }

    pagesData.forEach((item, index) => {
        const accordionItem = createAccordionItem(item, index);
        accordion.innerHTML += accordionItem;
    });
}

function createAccordionItem(item, index) {
    return `
        <div class="accordion-item">
            <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#collapse${index}">
                    <i class="fas fa-file-alt me-2"></i>
                    ${item.title || 'No Title'}
                </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse">
                <div class="accordion-body">
                    <p>${item.summary || 'No Summary'}</p>
                    ${item.link ? `<a href="${item.link}" target="_blank" class="btn btn-primary btn-sm">
                        <i class="fas fa-external-link-alt"></i> Visit Link</a>` : ''}
                </div>
            </div>
        </div>`;
}

function filterData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = pagesData.filter(item => 
        item.title?.toLowerCase().includes(searchTerm) || 
        item.summary?.toLowerCase().includes(searchTerm)
    );
    updateDashboard(filtered);
}

function sortData() {
    const sortBy = document.getElementById('sortSelect').value;
    pagesData.sort((a, b) => {
        if (sortBy === 'title') {
            return (a.title || '').localeCompare(b.title || '');
        }
        // Add more sorting options as needed
    });
    updateDashboard();
}

function updateStats() {
    document.getElementById('totalPages').textContent = pagesData.length;
    
    // Create simple chart
    const ctx = document.getElementById('statsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Pages with Links', 'Pages without Links'],
            datasets: [{
                label: 'Page Statistics',
                data: [
                    pagesData.filter(item => item.link).length,
                    pagesData.filter(item => !item.link).length
                ],
                backgroundColor: ['#36a2eb', '#ff6384']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    spinner.classList.toggle('d-none', !show);
    document.getElementById('refreshBtn').querySelector('i').classList.toggle('refreshing', show);
}

function handleError(error) {
    console.error('Error details:', error);
    document.getElementById('dataAccordion').innerHTML = 
        `<div class="alert alert-danger">Error loading data: ${error.message}</div>`;
    showLoading(false);
}