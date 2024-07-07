document.getElementById('summarize').addEventListener('click', async () => {
  try {
    // Query for the active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Execute a content script in the active tab to fetch article content
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: () => {
          const paragraphs = Array.from(document.querySelectorAll('p'))
                                  .map(p => p.textContent.trim())
                                  .filter(text => text.length > 0);
          return paragraphs.join('\n');
        },
      },
      async (results) => {
        if (results && results[0]) {
          const content = results[0].result;

          try {
            // Make an API request to Hugging Face API for text summarization
            const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer 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', // Replace with your actual access token
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ inputs: content })
            });

            if (!response.ok) {
              throw new Error('Failed to fetch data. Status: ' + response.status);
            }

            const data = await response.json();
            console.log('API response:', data);

            const summary = data[0]?.summary_text;
            if (summary) {
              document.getElementById('summary').innerText = summary;
            } else {
              console.log('API response does not contain summary_text:', data);
            }
          } catch (error) {
            console.log('Error fetching or processing data:', error.message);
          }
        } else {
          console.log('Failed to retrieve content from the page.');
        }
      }
    );
  } catch (error) {
    console.log('Error initializing summarization:', error.message);
  }
});


  
  
  