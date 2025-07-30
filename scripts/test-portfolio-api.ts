// Test script to verify the portfolio API endpoint
const testApi = async () => {
  try {
    const service = 'video-editing';
    const apiUrl = `http://localhost:3000/api/portfolio/items?service=${encodeURIComponent(service)}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    try {
      const data = await response.json();
    } catch (e) {
      const text = await response.text();
      console.error('Failed to parse JSON response. Response text:', text);
    }
  } catch (error) {
    console.error('Error in test:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }
  }
};

testApi();
