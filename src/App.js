import './App.css';
import { useEffect } from 'react';
import Geocode from 'react-geocode';

const App = () => {
  useEffect(() => {
    if ('geolocation' in navigator) {
      console.log("Available");
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      const success = (position) => {
        const coordinates = position.coords;
        console.log(`Your current position is`);
        console.log(`Latitude : ${coordinates.latitude}`);
        console.log(`Longitude: ${coordinates.longitude}`);
        console.log(`More or less ${coordinates.accuracy} meters.`);
        Geocode.setApiKey("AIzaSyDWY6vKML1ij6vOjma9rRWfjTqEjDPjD4U");
        Geocode.fromLatLng(coordinates.latitude, coordinates.longitude).then(
          response => {
            const address = response.results[0].formatted_address;
            console.log(address);
          },
          error => {
            console.error(error);
          }
        );
      }
     const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      console.log("Not Available");
    }
  }, [])

  const amIinKent = () => true;
  console.log(amIinKent());
  const response = amIinKent() ? "YES" : "NO";

  return (
    <div className="App">
      <div className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="App-logo">
          {/* Edit <code>src/App.js</code> and save to reload. */}
          {response}
        </h1>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </div>
    </div>
  );
}

export default App;
