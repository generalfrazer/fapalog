document.addEventListener("DOMContentLoaded", function() {
    let totalCount = 0;
    let mostRecentLog = null;
  
    const logButton = document.getElementById('logButton');
    const totalCountDisplay = document.getElementById('totalCount');
    const mostRecentLogDisplay = document.getElementById('mostRecentLog');
  
    // Event listener for the "Fapped!" button
    logButton.addEventListener('click', () => {
      // Send data to the server to record the log
      fetch('/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Update the UI with the total count and the most recent log time
          totalCountDisplay.innerText = data.totalCount;
          mostRecentLogDisplay.innerText = new Date(data.mostRecentLog).toLocaleString();
        } else {
          console.error('Error logging event:', data.message);
        }
      })
      .catch(error => console.error('Error:', error));
    });
  });
  