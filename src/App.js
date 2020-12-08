import "./App.css";
import { useEffect, useState } from "react";
import Geocode from "react-geocode";

const App = () => {
  const kentZipCodes = [
    "BR",
    "CT",
    "DA",
    "ME",
    "TN1",
    "TN2",
    "TN3",
    "TN4",
    "TN8",
    "TN9",
    "TN10",
    "TN11",
    "TN12",
    "TN13",
    "TN14",
    "TN15",
    "TN16",
    "TN17",
    "TN18",
    "TN23",
    "TN24",
    "TN25",
    "TN26",
    "TN27",
    "TN28",
    "TN29",
    "TN30",
    "BR",
  ];

  const [currentZipCode, setcurrentZipCode] = useState("");

  useEffect(() => {
    const extractFromAddress = (components, type) =>
      components
        .filter((component) => component.types.indexOf(type) === 0)
        .map((item) => item.long_name)
        .pop() || null;

    if ("geolocation" in navigator) {
      console.log("Available");

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };

      const success = (position) => {
        const coordinates = position.coords;
        console.log(`Latitude : ${coordinates.latitude}`);
        console.log(`Longitude: ${coordinates.longitude}`);
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);
        Geocode.fromLatLng(coordinates.latitude, coordinates.longitude).then(
          (response) => {
            const zipCode = extractFromAddress(
              response.results[0].address_components,
              "postal_code"
            );
            setcurrentZipCode(zipCode);
            console.log(zipCode);
          },
          (error) => {
            console.error(error);
          }
        );
      };

      const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      console.log("Not Available");
    }
  }, [setcurrentZipCode]);

  const amIinKent = () =>
    kentZipCodes.some((digits) => currentZipCode.indexOf(digits) !== -1);
  console.log("amIinKent", amIinKent());

  return (
    <div className="App">
      <div
        className="body"
        style={{
          backgroundColor: amIinKent() ? "#b32828" : "#112c74"
        }}
      >
        {amIinKent() ? (
          <h1 className="yes">YES</h1>
        ) : (
          <h1 className="no">NO</h1>
        )}
      </div>
    </div>
  );
};

export default App;
