import { useState, useEffect } from 'react';

const API_KEY = 'uOBgKXj_a1h4TqfU5j35WbYbhdhcqxFBlt_yzrCeiwl2zp3mWi6aRPrRzLkTXJ6Hvik';

const useLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const tokenResponse = await fetch(
          'https://www.universal-tutorial.com/api/getaccesstoken', 
          {
            headers: {
              "Accept": "application/json",
              "api-token": API_KEY,
              "user-email": "adomisaac50@gmail.com"
            }
          }
        );

        if (!tokenResponse.ok) {
          throw new Error('Failed to get access token');
        }

        const { auth_token } = await tokenResponse.json();

        const locationsResponse = await fetch(
          'https://www.universal-tutorial.com/api/states/Ghana',
          {
            headers: {
              "Authorization": `Bearer ${auth_token}`,
              "Accept": "application/json"
            }
          }
        );

        if (!locationsResponse.ok) {
          throw new Error('Failed to fetch locations');
        }

        const data = await locationsResponse.json();
        setLocations(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching locations:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return { locations, loading, error };
};

export default useLocations; 