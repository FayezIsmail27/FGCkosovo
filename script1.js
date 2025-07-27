

document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map', {
    center: [42.667, 20.900],
    zoom: 3,
    minZoom: 2
  });
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: '&copy; OpenStreetMap contributors' }
  ).addTo(map);

  const wrap = document.getElementById('map-wrapper');
  document.getElementById('fullscreen-btn').addEventListener('click', () => {
    if (!document.fullscreenElement) wrap.requestFullscreen();
    else document.exitFullscreen();
  });

  const chatLog = document.getElementById('chat-log');
  function appendChat(txt, cls = '') {
    const p = document.createElement('p');
    p.textContent = txt;
    if (cls) p.classList.add(cls);
    chatLog.appendChild(p);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  const blueIcon = new L.Icon.Default();
  const redIcon  = new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize:     [25, 41],
    iconAnchor:   [12, 41],
    popupAnchor:  [1, -34],
    shadowSize:   [41, 41]
  });

  const KBOX     = { north: 43.3, south: 41.8, west: 20.2, east: 21.8 };
  const arrowMap = {
    N:  '⬆️',
    NE: '↗️',
    E:  '➡️',
    SE: '↘️',
    S:  '⬇️',
    SW: '↙️',
    W:  '⬅️',
    NW: '↖️'
  };

  map.on('click', e => {
    const { lat, lng } = e.latlng;

    const isCorrect = (
      lat >= KBOX.south &&
      lat <= KBOX.north &&
      lng >= KBOX.west &&
      lng <= KBOX.east
    );

    const icon = isCorrect ? redIcon : blueIcon;
    L.marker([lat, lng], { icon }).addTo(map);

    if (isCorrect) {
      appendChat('🎉 You found Kosovo! Level complete!', 'system');

      const p = document.createElement('p');
      p.classList.add('system');
      const a = document.createElement('a');
      a.textContent = '➡️ Go to Level 2';
      a.href = 'level2.html';
      a.style.cursor = 'pointer';
      a.style.color = '#007bff';
      a.addEventListener('mouseover', () => a.style.textDecoration = 'underline');
      a.addEventListener('mouseout',  () => a.style.textDecoration = 'none');
      p.appendChild(a);
      chatLog.appendChild(p);
      chatLog.scrollTop = chatLog.scrollHeight;
      return;
    }

    const dist = getDistance(lat, lng, 42.667, 20.900).toFixed(1);
    const bear = getBearing(lat, lng, 42.667, 20.900);
    const dir  = bearingToCompass(bear);
    appendChat(`❌ Nope! Kosovo is ${dist} km ${arrowMap[dir]}`);
  });

  function deg2rad(d){ return d * Math.PI/180; }
  function rad2deg(r){ return r * 180/Math.PI; }

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat/2)**2 +
              Math.cos(deg2rad(lat1)) *
              Math.cos(deg2rad(lat2)) *
              Math.sin(dLon/2)**2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function getBearing(lat1, lon1, lat2, lon2) {
    const φ1 = deg2rad(lat1),
          φ2 = deg2rad(lat2),
          Δλ = deg2rad(lon2 - lon1);
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1)*Math.sin(φ2) -
              Math.sin(φ1)*Math.cos(φ2)*Math.cos(Δλ);
    return (rad2deg(Math.atan2(y, x)) + 360) % 360;
  }

  function bearingToCompass(bearing) {
    const dirs = ['N','NE','E','SE','S','SW','W','NW'];
    return dirs[Math.round(bearing / 45) % 8];
  }
});
