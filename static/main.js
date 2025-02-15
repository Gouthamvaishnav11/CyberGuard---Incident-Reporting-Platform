// DOM Elements
const reportButton = document.getElementById('reportIncident');
const dashboardButton = document.getElementById('viewDashboard');
const modal = document.getElementById('reportModal');
const closeModal = document.getElementById('closeModal');
const cancelReport = document.getElementById('cancelReport');
const incidentForm = document.getElementById('incidentForm');
const connectWallet = document.getElementById('connectWallet');

// Event Listeners
reportButton.addEventListener('click', showModal);
closeModal.addEventListener('click', hideModal);
cancelReport.addEventListener('click', hideModal);
connectWallet.addEventListener('click', handleWalletConnection);
incidentForm.addEventListener('submit', handleIncidentSubmission);

// Modal Functions
function showModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    incidentForm.reset();
}

// Handle clicking outside modal to close
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});


// Wallet Connection
async function handleWalletConnection() {
    try {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            // Request account access
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });

            const account = accounts[0];
            connectWallet.textContent = `${account.slice(0, 6)}...${account.slice(-4)}`;

            // Add connected class for styling
            connectWallet.classList.add('connected');
        } else {
            alert('Please install MetaMask to connect your wallet!');
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
    }
}

// Dashboard Navigation
dashboardButton.addEventListener('click', () => {
    // Navigate to the dashboard.html file
    window.location.href = '/dashboard';
});





 document.getElementById('viewDashboard').addEventListener('click', function() {
        window.location.href = '/dashboard';
    });

// Form Submission
async function handleIncidentSubmission(e) {
    e.preventDefault();

    // Collect form data
    const formData = new URLSearchParams();
    formData.append('incident_type', document.getElementById('incidentType').value);
    formData.append('typeseverity', document.getElementById('severity').value);
    formData.append('message', document.getElementById('description').value);

    // Show success page immediately after form submission
    showSuccessPage();

    try {
        // Make POST request to Flask server to store the incident data in the database
        const response = await fetch('/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });

        // Handle response
        if (response.ok) {
            console.log('Incident successfully stored in database!');
        } else {
            const errorText = await response.text();
            console.error('Error:', errorText);
           
        }
    } catch (error) {
        console.error('Error submitting incident:', error);
        
    }
}

// Success Page
function showSuccessPage() {
    // Create a success message page dynamically
    const successPage = `<!DOCTYPE html>
<html>
<head>
    <title>Report Submission</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #e0f7fa; /* Light blue */
        color: #004d40; /* Dark teal */
        text-align: center;
    }
    h1 {
        color: #00796b; /* Teal */
        font-size: 2rem;
        animation: bounceIn 1s ease-out forwards;
    }
    p {
        color: #004d40; /* Dark teal */
        font-size: 1.2rem;
        margin: 10px 0;
        animation: bounceIn 1s ease-out forwards 0.5s;
    }

    @keyframes bounceIn {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        50% {
            transform: scale(1.1);
            opacity: 0.7;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @media (min-width: 768px) {
        h1 {
            font-size: 2.5rem;
        }
        p {
            font-size: 1.5rem;
        }
    }
</style>

</head>
<body>
    <div>
        <h1>Report Successfully Submitted!</h1>
        <p>Thank you for reporting the security incident. Our team will review it promptly.</p>
        <span><h1>✅</h1></span>
    </div>
</body>
</html>`;

    // Open the success page in the current window
    const newWindow = window.open('', '_self');
    newWindow.document.open();
    newWindow.document.write(successPage);
    newWindow.document.close();

    // Redirect after 10 seconds
    setTimeout(() => {
        window.location.href = '/main'; // Change this to your desired redirect URL
    }, 10000); // 10 seconds
}
