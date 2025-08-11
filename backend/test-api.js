import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:4000/api';

const testAPI = async () => {
  console.log('🧪 Testing Travel Globetrotter API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log(`   ✅ Health: ${healthResponse.status} - ${healthData.message}\n`);

    // Test cities endpoint
    console.log('2. Testing cities endpoint...');
    const citiesResponse = await fetch(`${BASE_URL}/cities`);
    const citiesData = await citiesResponse.json();
    console.log(`   ✅ Cities: ${citiesResponse.status} - Found ${citiesData.cities?.length || 0} cities\n`);

    // Test activities endpoint
    console.log('3. Testing activities endpoint...');
    const activitiesResponse = await fetch(`${BASE_URL}/activities`);
    const activitiesData = await activitiesResponse.json();
    console.log(`   ✅ Activities: ${activitiesResponse.status} - Found ${activitiesData.activities?.length || 0} activities\n`);

    // Test trips endpoint
    console.log('4. Testing trips endpoint...');
    const tripsResponse = await fetch(`${BASE_URL}/trips`);
    const tripsData = await tripsResponse.json();
    console.log(`   ✅ Trips: ${tripsResponse.status} - Found ${tripsData.trips?.length || 0} trips\n`);

    // Test user registration
    console.log('5. Testing user registration...');
    const userData = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    };
    
    const registerResponse = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (registerResponse.ok) {
      const registerData = await registerResponse.json();
      console.log(`   ✅ User Registration: ${registerResponse.status} - User ID: ${registerData.user.id}\n`);
      
      // Test user login
      console.log('6. Testing user login...');
      const loginResponse = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password
        })
      });
      
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        console.log(`   ✅ User Login: ${loginResponse.status} - User ID: ${loginData.user.id}\n`);
        
        // Test trip creation
        console.log('7. Testing trip creation...');
        const tripData = {
          title: 'Test Trip',
          description: 'A test trip for API testing',
          startDate: '2024-06-01',
          endDate: '2024-06-07',
          budget: 1500,
          cities: [],
          activities: [],
          userId: loginData.user.id
        };
        
        const tripResponse = await fetch(`${BASE_URL}/trips`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tripData)
        });
        
        if (tripResponse.ok) {
          const tripResponseData = await tripResponse.json();
          console.log(`   ✅ Trip Creation: ${tripResponse.status} - Trip ID: ${tripResponseData.trip._id}\n`);
        } else {
          console.log(`   ❌ Trip Creation: ${tripResponse.status} - ${tripResponse.statusText}\n`);
        }
      } else {
        console.log(`   ❌ User Login: ${loginResponse.status} - ${loginResponse.statusText}\n`);
      }
    } else {
      console.log(`   ❌ User Registration: ${registerResponse.status} - ${registerResponse.statusText}\n`);
    }

    console.log('🎉 API testing completed!');

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    console.log('\n💡 Make sure your backend server is running: npm run dev');
  }
};

// Run the test
testAPI();
