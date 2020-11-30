import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import '../App.css';
import marker from '../assets/marker.png';
import data from '../data.json';

function Map() {
  const helsinkiCoordinates = [60.2982894249722, 24.95601016354179];
  const [viewport, setViewport] = useState({
    latitude: helsinkiCoordinates[1],
    longitude: helsinkiCoordinates[0],
    width: '100vw',
    height: 'calc(100vh - 100px)',
    zoom: 4,
    minZoom: 2,
  });

  const countries = data.countries;

  // close a popup if escape key pressed
  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedCountry(null);
      }
    };
    window.addEventListener('keydown', listener);

    // clean up after this component will be unmounted
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div className="map">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/tiberiusportal/ckhwe9oei0rvu19o0ak1y8abv"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {countries.map(country => (
          <Marker
            key={Math.random()}
            latitude={country.coordinates[0]}
            longitude={country.coordinates[1]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedCountry(country);
              }}
            >
              <img src={marker} alt="Marker Icon" />
            </button>
          </Marker>
        ))}
        {selectedCountry && (
          <Popup
            latitude={selectedCountry.coordinates[0]}
            longitude={selectedCountry.coordinates[1]}
            onClose={() => {
              setSelectedCountry(null);
            }}
          >
            <div className="popup">
              <h3>{selectedCountry.country}</h3>
              <p>
                <strong>In rating:</strong> {selectedCountry.rank}
              </p>
              <p>
                <strong>Happiness score:</strong> {selectedCountry.score}
              </p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default Map;
