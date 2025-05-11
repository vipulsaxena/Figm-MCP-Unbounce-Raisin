// Figma file configuration
const FIGMA_FILE_KEY = 'Fxz2NrwBdB8Zb19TKOcw5k';
const NODE_ID = '1-4264';

// Function to fetch Figma data
async function fetchFigmaData() {
    try {
        const response = await fetch(`/api/figma?fileKey=${FIGMA_FILE_KEY}&nodeId=${NODE_ID}`);
        if (!response.ok) {
            throw new Error('Failed to fetch Figma data');
        }
        const data = await response.json();
        console.log('Figma data:', data);
        // TODO: Use the data to update the page
        return data;
    } catch (error) {
        console.error('Error fetching Figma data:', error);
        return null;
    }
}

// Function to render the dashboard based on Figma data
function renderDashboard(data) {
    if (!data) return;

    const content = document.querySelector('.dashboard-content');
    // Clear existing content
    content.innerHTML = '';

    // Render the dashboard components based on the Figma data
    // This will be implemented once we have the actual Figma data structure
}

// Initialize the dashboard
async function initDashboard() {
    const figmaData = await fetchFigmaData();
    renderDashboard(figmaData);
}

// Start the dashboard when the page loads
document.addEventListener('DOMContentLoaded', initDashboard);

// Start fetching when the page loads
document.addEventListener('DOMContentLoaded', fetchFigmaData);

// FAQ Accordion Functionality

document.addEventListener('DOMContentLoaded', function () {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            // Close all accordions
            document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
                openItem.classList.remove('open');
                openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            // Toggle current
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            } else {
                item.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    });
});

