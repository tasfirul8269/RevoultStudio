// Test script to verify the portfolio API endpoint
const testApi = async () => {
  try {
    const service = 'video-editing';
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/portfolio/items?service=${encodeURIComponent(service)}`;
    
    console.log(`Testing API endpoint: ${apiUrl}`);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);
    
    try {
      const data = await response.json();
      console.log('Response data:', JSON.stringify(data, null, 2));
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
