import * as ol from 'ol';

const form = document.querySelector('form')! as HTMLFormElement;
// const address = document.getElementById('address')! as HTMLInputElement;
const searchAddressHandler = (event: Event) => {
    event.preventDefault();

    //  send this to google's api
    // const value = address.value;

    const coordinates = { lat: 40.41, lng: -73.99 }; // Can't fetch
    document.getElementById('map')!.innerHTML = ''; // clear <p> from <div id="map">
    new ol.Map({
        target: 'map',
        layers: [new ol.Tile({ source: new ol.OSM() })],
        view: new ol.View({
            center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
            zoom: 16,
        }),
    });
};

form.addEventListener('submit', searchAddressHandler);
