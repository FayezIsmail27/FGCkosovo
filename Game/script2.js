// script2.js — Level 2 logic with “Go to Level 3” link on success

document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map').setView([42.667, 20.900], 7);

  L.tileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png',
    { attribution: '&copy; OpenStreetMap contributors & CartoDB (no labels)' }
  ).addTo(map);

  fetch('kosovo.geojson')
    .then(res => res.json())
    .then(data => {
      const borderLayer = L.geoJSON(data, {
        style: { color: '#e63946', weight: 4, fillOpacity: 0 }
      }).addTo(map);
      map.fitBounds(borderLayer.getBounds());
    })
    .catch(err => console.error('Failed to load border:', err));

  const wrap  = document.getElementById('map-wrapper'),
        fsBtn = document.getElementById('fullscreen-btn'),
        chat  = document.getElementById('chat-log'),
        toast = document.getElementById('toast');

  fsBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) wrap.requestFullscreen();
    else document.exitFullscreen();
  });
  document.addEventListener('fullscreenchange', () => {
    chat.style.display = document.fullscreenElement === wrap ? 'none' : '';
  });

  const blueIcon = new L.Icon.Default();
  const redIcon  = new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize:     [25, 41],
    iconAnchor:   [12, 41],
    popupAnchor:  [1, -34],
    shadowSize:   [41, 41]
  });

  function appendChat(txt, cls = '') {
    const p = document.createElement('p');
    p.textContent = txt;
    if (cls) p.classList.add(cls);
    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight;
  }
  function showToast(txt) {
    toast.textContent = txt;
    toast.style.display = 'block';
    setTimeout(() => (toast.style.display = 'none'), 3000);
  }

  const PRISTINA  = { lat: 42.6629, lng: 21.1655 },
        RADIUS_KM = 10,
        ARROWS    = { N:'⬆️', NE:'↗️', E:'➡️', SE:'↘️', S:'⬇️', SW:'↙️', W:'⬅️', NW:'↖️' };

  map.on('click', e => {
    const { lat, lng } = e.latlng;
    const d   = getDistance(lat, lng, PRISTINA.lat, PRISTINA.lng);
    const b   = getBearing( lat, lng, PRISTINA.lat, PRISTINA.lng);
    const dir = ['N','NE','E','SE','S','SW','W','NW'][Math.round(b/45)%8];

    const isHit = d <= RADIUS_KM;
    const icon  = isHit ? redIcon : blueIcon;
    L.marker([lat, lng], { icon }).addTo(map);

    if (isHit) {
      const winMsg = '🎯 That’s Pristina! Level complete!';
      if (document.fullscreenElement === wrap) {
        showToast(winMsg);
      } else {
        appendChat(winMsg, 'system');
        const pLink = document.createElement('p');
        pLink.classList.add('system');
        const link = document.createElement('a');
        link.textContent = '➡️ Go to Level 3';
        link.href = 'level3.html';
        link.style.cursor = 'pointer';
        link.style.color  = '#007bff';
        link.addEventListener('mouseover', () => link.style.textDecoration = 'underline');
        link.addEventListener('mouseout',  () => link.style.textDecoration = 'none');
        pLink.appendChild(link);
        chat.appendChild(pLink);
        chat.scrollTop = chat.scrollHeight;
      }
      return;
    }

    const hint = `⚠️ Move ${d.toFixed(1)} km ${ARROWS[dir]} (${dir})`;
    if (document.fullscreenElement === wrap) showToast(hint);
    else appendChat(hint);
  });

 
  function deg2rad(d){ return d * Math.PI/180; }
  function rad2deg(r){ return r * 180/Math.PI; }
  function getDistance(a,b,c,d){
    const R = 6371, φ1 = deg2rad(a), φ2 = deg2rad(c),
          Δφ = deg2rad(c - a), Δλ = deg2rad(d - b);
    const A = Math.sin(Δφ/2)**2 +
              Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A));
  }
  function getBearing(a,b,c,d){
    const φ1 = deg2rad(a), φ2 = deg2rad(c), Δλ = deg2rad(d - b);
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1)*Math.sin(φ2) - Math.sin(φ1)*Math.cos(φ2)*Math.cos(Δλ);
    return (rad2deg(Math.atan2(y, x)) + 360) % 360;
  }
});
