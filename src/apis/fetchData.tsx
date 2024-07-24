import axios from 'axios';
import { locationType } from '../Type';
const url = 'http://34.46.145.148:5000/get-sidewalk-features-in-range';
const bmcc = { lat: 40.713536, lng: -74.011223 };
// Define the function that fetches the sidewalk accessibility data

export const getSidewalkAccessibility = async (linePoints: locationType[]) => {
  try {
    // Construct the URL with query parameters

    const response = await axios.post(url, { linePoints });
    return response.data
  } catch (error) {
    console.error('Error fetching sidewalk accessibility data:', error);
    throw error;
  }
};

export const getSidewalkFeaturesInRange = async (currentPosition: google.maps.LatLngLiteral) => {
  try {
    console.log(currentPosition)
    const { lat, lng } = bmcc;
    const km_distance = 0.07; // You can adjust the distance as needed
    const toBeFixedUrl = `${url}?focal_lat=${lng}&focal_lon=${lat}&km_distance=${km_distance}`;
    const response = await axios.get(toBeFixedUrl);
    return response.data
  } catch (error) {
    console.error('Error fetching sidewalk accessibility data:', error);
    throw error;
  }
};