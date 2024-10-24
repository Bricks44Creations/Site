let listEl = null;

const init = () => {

    listEl = document.querySelector('box_map');
    const centerLoc = [50.366669, 3.01667]; /*coordonnées du centre de la map*/

    const locations = [{
        name: 'Divion',
        lat: 50.47,
        lon: 2.506},
        {
        name: 'Bousies',
        lat: 50.151 ,
        lon: 3.62},
        {
        name: 'Escaudoeuvres',
        lat: 50.19,
        lon: 3.26667}];

    const map = L.map('map').setView(centerLoc, 8); /*Echelle de la map*/

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const frag = document.createDocumentFragment();
    locations.forEach((location) => {
        // console.log(location.name);
        const liEl = document.createElement('li');
        liEl.innerText = location.name;
        liEl.dataset.lat = location.lat;
        liEl.dataset.lon = location.lon;

        // listEl.append(liEl);
        frag.appendChild(liEl);
        addMarkerToMap(location, map);
    });

    listEl.append(frag);

    listEl.addEventListener('click', ({ target }) => {
        console.log(target);
        if (target.nodeName !== 'LI') {
            return;
        }
        const lat = Number(target.dataset.lat);
        const lon = Number(target.dataset.lon);

        console.log(lat, lon);
        map.flyTo([lat, lon], 11);
    });
    
};

/*Add markers*/
const addMarkerToMap = ({
    lat,
    lon,
    name
}, map) => {
    L.marker([lat, lon]).addTo(map)
        .bindPopup(name);
};

window.onload = init;