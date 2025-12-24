import React, { useState, useEffect } from 'react';
import { Heart, X, MessageCircle, Car, Plus, Check, ChevronLeft, Send, User, Filter, Star, Bell, Trash2 } from 'lucide-react';

const Logo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="95" stroke="#3B82F6" strokeWidth="3" fill="none"/>
    <path d="M75 60L45 100L75 140" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M125 60L155 100L125 140" stroke="#FB923C" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M100 130C100 130 70 110 70 85C70 65 85 55 100 75C115 55 130 65 130 85C130 110 100 130 100 130Z" fill="#FB923C"/>
  </svg>
);

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('login');
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [requests, setRequests] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [currentRole, setCurrentRole] = useState('kaeufer');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedCarForDetail, setSelectedCarForDetail] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [savedSearches, setSavedSearches] = useState([]);
  const [showSaveSearchModal, setShowSaveSearchModal] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [sellerRatings, setSellerRatings] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingForm, setRatingForm] = useState({ sellerId: '', stars: 5, comment: '' });
  const [equipmentSearch, setEquipmentSearch] = useState('');
  const [swipeStartX, setSwipeStartX] = useState(0);
  const [swipeCurrentX, setSwipeCurrentX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [filters, setFilters] = useState({ 
    marke: '', modell: '', karosserie: '', zustand: '', verkaeuferTyp: '', sitzplaetze: '', tueren: '', farbe: '',
    minPreis: 0, maxPreis: 100000, minBaujahr: 2000, maxBaujahr: 2025, kraftstoffart: '', minKm: 0, maxKm: 300000,
    getriebe: '', minPS: 0, maxPS: 500, umkreis: 0, ausstattung: []
  });

  const ausstattungsmerkmale = {
    'Komfort': ['Klimaanlage', 'Klimaautomatik', 'Sitzheizung', 'Standheizung', 'Beheizbares Lenkrad', 'Elektrische Fensterheber', 'Elektrische Seitenspiegel', 'Elektr. verstellbare Sitze', 'Lederlenkrad', 'Multifunktionslenkrad', 'Tempomat', 'Adaptive Geschwindigkeitsregelung', 'Einparkhilfe', 'Rückfahrkamera', '360-Grad-Kamera', 'Park-Assistent', 'Start/Stopp-Automatik', 'Keyless Entry', 'Zentralverriegelung', 'Elektrische Heckklappe'],
    'Sicherheit': ['ABS', 'ESP', 'Traktionskontrolle', 'Airbag Fahrer', 'Airbag Beifahrer', 'Seitenairbags', 'Notbremsassistent', 'Spurhalteassistent', 'Totwinkel-Assistent', 'Verkehrszeichenerkennung', 'Müdigkeitswarner', 'Nachtsicht-Assistent', 'Kurvenlicht', 'LED-Scheinwerfer', 'Xenon-Scheinwerfer', 'Tagfahrlicht', 'Nebelscheinwerfer', 'Reifendruckkontrolle', 'Isofix (Kindersitzbefestigung)'],
    'Entertainment': ['Radio', 'CD-Spieler', 'MP3', 'Navigationssystem', 'Bluetooth', 'Freisprecheinrichtung', 'USB-Anschluss', 'Apple CarPlay', 'Android Auto', 'Soundsystem', 'DAB-Radio', 'Sprachsteuerung', 'Induktionsladen', 'WLAN / WiFi Hotspot', 'Head-Up Display'],
    'Extras': ['Alufelgen', 'Leichtmetallfelgen', 'Panoramadach', 'Schiebedach', 'Glasschiebedach', 'Anhängerkupplung', 'Dachreling', 'Sportpaket', 'Sportfahrwerk', 'Luftfederung', 'Allrad', '4x4', 'Differentialsperre', 'Schaltwippen', 'Ledersitze', 'Teilleder', 'Alcantara', 'Sportsitze', 'Massagesitze', 'Ambientebeleuchtung', 'Metallic-Lackierung', 'Sommerreifen', 'Winterreifen', 'Ganzjahresreifen', '8fach bereift', 'Ersatzreifen', 'Skisack', 'Windschott', 'Tuning', 'Nichtraucherfahrzeug']
  };

  const standardFarben = ['Schwarz', 'Weiß', 'Grau', 'Silber', 'Blau', 'Rot', 'Grün', 'Braun', 'Beige', 'Orange', 'Gelb', 'Gold', 'Bronze', 'Violett', 'Bordeaux'];
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regForm, setRegForm] = useState({ email: '', password: '', vorname: '', name: '', geburtsdatum: '', strasse: '', plz: '', ort: '', telefon: '', profilbild: '' });
  const [profileForm, setProfileForm] = useState({ vorname: '', name: '', geburtsdatum: '', strasse: '', plz: '', ort: '', telefon: '', profilbild: '' });
  const [carForm, setCarForm] = useState({ marke: '', modell: '', karosserie: 'Limousine', zustand: 'Gebraucht', verkaeuferTyp: 'Privat', sitzplaetze: 5, tueren: 4, baujahr: 2020, preis: 20000, kraftstoffart: 'Benzin', km: 50000, farbe: '', beschreibung: '', getriebe: 'Schaltgetriebe', ps: 150, standort: '', ausstattung: [], bilder: [] });

  useEffect(() => {
    const init = async () => {
      const demoUsers = [
        { id: 'buyer1', email: 'kaeufer@demo.de', password: 'demo', vorname: 'Max', name: 'Mustermann', geburtsdatum: '1990-05-15', strasse: 'Musterstraße 123', plz: '10115', ort: 'Berlin', telefon: '+49 123 456789', profilbild: '' },
        { id: 'seller1', email: 'verkaeufer@demo.de', password: 'demo', vorname: 'Auto', name: 'Dealer', geburtsdatum: '1985-03-20', strasse: 'Händlerweg 1', plz: '80331', ort: 'München', telefon: '+49 987 654321', profilbild: '' }
      ];
      const demoCars = [
        { id: '1', sellerId: 'seller1', marke: 'BMW', modell: '3er', karosserie: 'Limousine', zustand: 'Gebraucht', verkaeuferTyp: 'Händler', sitzplaetze: 5, tueren: 4, baujahr: 2020, preis: 35000, kraftstoffart: 'Benzin', km: 45000, farbe: 'Schwarz', beschreibung: 'Top Zustand', getriebe: 'Automatik', ps: 184, standort: 'München', ausstattung: ['Allrad', 'Apple CarPlay', 'Alufelgen'], bilder: [] }
      ];
      try {
        const storedUsers = localStorage.getItem('users'); setUsers(storedUsers ? JSON.parse(storedUsers) : demoUsers);
        const storedCars = localStorage.getItem('cars'); setCars(storedCars ? JSON.parse(storedCars) : demoCars);
        const r = localStorage.getItem('requests'); setRequests(r ? JSON.parse(r) : []);
        const m = localStorage.getItem('matches'); setMatches(m ? JSON.parse(m) : []);
        const f = localStorage.getItem('favorites'); setFavorites(f ? JSON.parse(f) : []);
        const ss = localStorage.getItem('savedSearches'); setSavedSearches(ss ? JSON.parse(ss) : []);
        const sr = localStorage.getItem('sellerRatings'); setSellerRatings(sr ? JSON.parse(sr) : []);
        const session = localStorage.getItem('currentSession');
        if (session) {
          const sessionData = JSON.parse(session);
          const user = (storedUsers ? JSON.parse(storedUsers) : demoUsers).find(u => u.id === sessionData.userId);
          if (user) { setCurrentUser(user); setCurrentRole(sessionData.role); setView(sessionData.role === 'verkaeufer' ? 'dashboard' : 'swipe'); }
        }
      } catch (e) { console.error(e); }
    };
    init();
  }, []);

  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      const role = user.email === 'verkaeufer@demo.de' ? 'verkaeufer' : 'kaeufer';
      setCurrentRole(role); setView(role === 'verkaeufer' ? 'dashboard' : 'swipe');
      try { localStorage.setItem('currentSession', JSON.stringify({ userId: user.id, role })); } catch (e) { console.error(e); }
    } else { alert('Falsche Anmeldedaten!'); }
  };

  const handleLogout = () => {
    try { localStorage.removeItem('currentSession'); } catch (e) { console.error(e); }
    setCurrentUser(null); setView('login');
  };

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      const filteredCars = getFilteredCars();
      const car = filteredCars[currentCarIndex];
      if (car) {
        const req = { id: Date.now(), carId: car.id, buyerId: currentUser.id, sellerId: car.sellerId, status: 'pending' };
        const updated = [...requests, req];
        setRequests(updated);
        try { localStorage.setItem('requests', JSON.stringify(updated)); alert('Anfrage gesendet!'); } catch (e) { console.error(e); }
      }
    }
    setCurrentCarIndex(p => p + 1);
  };

const handleTouchStart = (e) => { setSwipeStartX(e.touches[0].clientX); setIsSwiping(true); };
  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - swipeStartX;
    setSwipeCurrentX(diff);
    setSwipeDirection(Math.abs(diff) > 50 ? (diff > 0 ? 'right' : 'left') : null);
  };
  const handleTouchEnd = () => {
    if (!isSwiping) return;
    if (Math.abs(swipeCurrentX) > 100) { handleSwipe(swipeCurrentX > 0 ? 'right' : 'left'); }
    setIsSwiping(false); setSwipeCurrentX(0); setSwipeDirection(null);
  };

  const handleMouseDown = (e) => { setSwipeStartX(e.clientX); setIsSwiping(true); };
  const handleMouseMove = (e) => {
    if (!isSwiping) return;
    const diff = e.clientX - swipeStartX;
    setSwipeCurrentX(diff);
    setSwipeDirection(Math.abs(diff) > 50 ? (diff > 0 ? 'right' : 'left') : null);
  };
  const handleMouseUp = () => {
    if (!isSwiping) return;
    if (Math.abs(swipeCurrentX) > 100) { handleSwipe(swipeCurrentX > 0 ? 'right' : 'left'); }
    setIsSwiping(false); setSwipeCurrentX(0); setSwipeDirection(null);
  };

  const handleRequestResponse = (reqId, accept) => {
    const updated = requests.map(r => r.id === reqId ? { ...r, status: accept ? 'accepted' : 'rejected' } : r);
    setRequests(updated);
    try { localStorage.setItem('requests', JSON.stringify(updated)); } catch (e) { console.error(e); }
    if (accept) {
      const req = requests.find(r => r.id === reqId);
      if (req) {
        const match = { id: Date.now(), carId: req.carId, buyerId: req.buyerId, sellerId: req.sellerId, messages: [] };
        const updatedMatches = [...matches, match];
        setMatches(updatedMatches);
        try { localStorage.setItem('matches', JSON.stringify(updatedMatches)); alert('Match erstellt!'); } catch (e) { console.error(e); }
      }
    }
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedChat) return;
    const updated = matches.map(m => {
      if (m.id === selectedChat.id) {
        return { ...m, messages: [...m.messages, { id: Date.now(), senderId: currentUser.id, text: messageText, timestamp: new Date().toISOString() }] };
      }
      return m;
    });
    setMatches(updated);
    try {
      localStorage.setItem('matches', JSON.stringify(updated));
      setSelectedChat(updated.find(m => m.id === selectedChat.id));
      setMessageText('');
    } catch (e) { console.error(e); }
  };

  const handleAddCar = (carData) => {
    const newCar = { id: Date.now(), sellerId: currentUser.id, ...carData };
    const updated = [...cars, newCar];
    setCars(updated);
    try {
      localStorage.setItem('cars', JSON.stringify(updated));
      setView('dashboard');
      setCarForm({ marke: '', modell: '', karosserie: 'Limousine', zustand: 'Gebraucht', verkaeuferTyp: 'Privat', sitzplaetze: 5, tueren: 4, baujahr: 2020, preis: 20000, kraftstoffart: 'Benzin', km: 50000, farbe: '', beschreibung: '', getriebe: 'Schaltgetriebe', ps: 150, standort: '', ausstattung: [], bilder: [] });
    } catch (e) { console.error(e); }
  };

  const handleDeleteCar = (carId) => {
    const updated = cars.filter(c => c.id !== carId);
    setCars(updated);
    try { localStorage.setItem('cars', JSON.stringify(updated)); } catch (e) { console.error(e); }
  };

  const handleRegister = (data) => {
    const newUser = { id: Date.now(), ...data };
    const updated = [...users, newUser];
    setUsers(updated);
    try {
      localStorage.setItem('users', JSON.stringify(updated));
      setCurrentUser(newUser); setCurrentRole('kaeufer'); setView('swipe');
      localStorage.setItem('currentSession', JSON.stringify({ userId: newUser.id, role: 'kaeufer' }));
    } catch (e) { console.error(e); }
  };

  const handleUpdateProfile = () => {
    const updated = users.map(u => u.id === currentUser.id ? { ...u, ...profileForm } : u);
    setUsers(updated);
    try {
      localStorage.setItem('users', JSON.stringify(updated));
      setCurrentUser({ ...currentUser, ...profileForm });
      alert('Profil aktualisiert!');
    } catch (e) { console.error(e); }
  };

  const handleFavorite = (carId) => {
    const isFav = favorites.some(f => f.carId === carId && f.buyerId === currentUser.id);
    let updated = isFav 
      ? favorites.filter(f => !(f.carId === carId && f.buyerId === currentUser.id))
      : [...favorites, { id: Date.now(), carId, buyerId: currentUser.id }];
    setFavorites(updated);
    try { localStorage.setItem('favorites', JSON.stringify(updated)); } catch (e) { console.error(e); }
  };

  const handleSaveSearch = () => {
    if (!searchName.trim()) return;
    const newSearch = { id: Date.now(), name: searchName, filters: { ...filters }, createdAt: new Date().toISOString() };
    const updated = [...savedSearches, newSearch];
    setSavedSearches(updated);
    try {
      localStorage.setItem('savedSearches', JSON.stringify(updated));
      setSearchName(''); setShowSaveSearchModal(false);
    } catch (e) { console.error(e); }
  };

const handleDeleteSearch = (searchId) => {
    const updated = savedSearches.filter(s => s.id !== searchId);
    setSavedSearches(updated);
    try { localStorage.setItem('savedSearches', JSON.stringify(updated)); } catch (e) { console.error(e); }
  };

  const handleSubmitRating = () => {
    if (!ratingForm.comment.trim()) { alert('Bitte schreibe einen Kommentar!'); return; }
    const newRating = { 
      id: Date.now(), sellerId: ratingForm.sellerId, buyerId: currentUser.id, 
      buyerName: currentUser.vorname, stars: ratingForm.stars, comment: ratingForm.comment, createdAt: new Date().toISOString() 
    };
    const updated = [...sellerRatings, newRating];
    setSellerRatings(updated);
    try {
      localStorage.setItem('sellerRatings', JSON.stringify(updated));
      setShowRatingModal(false); setRatingForm({ sellerId: '', stars: 5, comment: '' });
      alert('Bewertung abgegeben!');
    } catch (e) { console.error(e); }
  };

  const getFilteredCars = () => {
    return cars.filter(car => {
      if (filters.marke && car.marke !== filters.marke) return false;
      if (filters.modell && !car.modell.toLowerCase().includes(filters.modell.toLowerCase())) return false;
      if (car.preis < filters.minPreis || car.preis > filters.maxPreis) return false;
      if (car.baujahr < filters.minBaujahr || car.baujahr > filters.maxBaujahr) return false;
      if (car.km < filters.minKm || car.km > filters.maxKm) return false;
      if (filters.kraftstoffart && car.kraftstoffart !== filters.kraftstoffart) return false;
      if (filters.getriebe && car.getriebe !== filters.getriebe) return false;
      if (car.ps < filters.minPS || car.ps > filters.maxPS) return false;
      if (filters.karosserie && car.karosserie !== filters.karosserie) return false;
      if (filters.zustand && car.zustand !== filters.zustand) return false;
      if (filters.farbe && car.farbe !== filters.farbe) return false;
      if (filters.ausstattung.length > 0) {
        if (!filters.ausstattung.every(attr => car.ausstattung.includes(attr))) return false;
      }
      return true;
    });
  };

  const filteredCars = getFilteredCars();
  const myCars = cars.filter(c => c.sellerId === currentUser?.id);
  const myRequests = requests.filter(r => r.sellerId === currentUser?.id && r.status === 'pending');
  const myMatches = matches.filter(m => m.buyerId === currentUser?.id || m.sellerId === currentUser?.id);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-blue-900 selection:bg-blue-100">
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(currentRole === 'verkaeufer' ? 'dashboard' : 'swipe')}>
            <Logo className="w-8 h-8" />
            <span className="text-xl font-light tracking-tight text-blue-900">Match<span className="font-semibold text-orange-500">My</span>Ride</span>
          </div>
          {currentUser && (
            <div className="flex items-center gap-4">
              <button onClick={() => setView('profile')} className="text-zinc-400 hover:text-blue-600 transition"><User size={24} strokeWidth={1.5} /></button>
              <button onClick={handleLogout} className="text-zinc-400 hover:text-red-500 transition"><X size={24} strokeWidth={1.5} /></button>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-md mx-auto pb-20">
        {view === 'login' && (
          <div className="px-6 pt-12">
            <h1 className="text-3xl font-semibold mb-2 text-blue-900">Willkommen zurück</h1>
            <p className="text-zinc-500 font-light mb-8">Melde dich an, um dein Traumauto zu finden.</p>
            <div className="space-y-4">
              <input type="email" placeholder="E-Mail" className="w-full p-4 bg-white border border-zinc-200 rounded-2xl outline-none focus:border-blue-500 transition font-light" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
              <input type="password" placeholder="Passwort" className="w-full p-4 bg-white border border-zinc-200 rounded-2xl outline-none focus:border-blue-500 transition font-light" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              <button onClick={() => handleLogin(loginEmail, loginPassword)} className="w-full bg-blue-600 text-white p-4 rounded-2xl font-medium hover:bg-blue-700 transition shadow-xl shadow-blue-100 mt-4">Anmelden</button>
              <button onClick={() => setView('register')} className="w-full text-zinc-500 p-4 font-light">Noch kein Konto? Registrieren</button>
            </div>
          </div>
        )}

{view === 'register' && (
          <div className="px-6 pt-8 pb-12">
            <h1 className="text-3xl font-semibold mb-2 text-blue-900">Konto erstellen</h1>
            <p className="text-zinc-500 font-light mb-8">Tritt der Community bei.</p>
            <div className="space-y-4">
              <input type="text" placeholder="Vorname" className="w-full p-4 bg-white border border-zinc-200 rounded-2xl outline-none" onChange={(e) => setRegForm({...regForm, vorname: e.target.value})} />
              <input type="text" placeholder="Nachname" className="w-full p-4 bg-white border border-zinc-200 rounded-2xl outline-none" onChange={(e) => setRegForm({...regForm, name: e.target.value})} />
              <input type="email" placeholder="E-Mail" className="w-full p-4 bg-white border border-zinc-200 rounded-2xl outline-none" onChange={(e) => setRegForm({...regForm, email: e.target.value})} />
              <input type="password" placeholder="Passwort" className="w-full p-4 bg-white border border-zinc-200 rounded-2xl outline-none" onChange={(e) => setRegForm({...regForm, password: e.target.value})} />
              <button onClick={() => handleRegister(regForm)} className="w-full bg-orange-500 text-white p-4 rounded-2xl font-medium hover:bg-orange-600 shadow-xl shadow-orange-100 transition">Registrierung abschließen</button>
              <button onClick={() => setView('login')} className="w-full text-zinc-500 p-4 font-light">Zurück zum Login</button>
            </div>
          </div>
        )}

        {view === 'swipe' && currentUser && (
          <div className="pt-6 px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Entdecken</h2>
              <button onClick={() => setShowFilterModal(true)} className="p-2 bg-white border border-zinc-200 rounded-xl text-zinc-600 shadow-sm"><Filter size={20} /></button>
            </div>
            {currentCarIndex < filteredCars.length ? (
              <div 
                className="relative aspect-[3/4] bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-zinc-100 touch-none"
                onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
              >
                <div className="absolute inset-0 bg-zinc-100 flex items-center justify-center">
                  <Car size={80} className="text-zinc-300" />
                </div>
                <div 
                  className="absolute inset-0 transition-transform duration-200 pointer-events-none"
                  style={{ transform: `translateX(${swipeCurrentX}px) rotate(${swipeCurrentX * 0.05}deg)` }}
                >
                  <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-3xl font-bold mb-1">{filteredCars[currentCarIndex].marke} {filteredCars[currentCarIndex].modell}</h3>
                        <p className="text-lg font-light opacity-90">{filteredCars[currentCarIndex].preis.toLocaleString()} € • {filteredCars[currentCarIndex].km.toLocaleString()} km</p>
                      </div>
                      <button onClick={() => handleFavorite(filteredCars[currentCarIndex].id)} className="p-3 bg-white/20 backdrop-blur-md rounded-full">
                        <Heart size={24} fill={favorites.some(f => f.carId === filteredCars[currentCarIndex].id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-zinc-200 border-dashed">
                <p className="text-zinc-400 font-light">Keine weiteren Autos gefunden.</p>
                <button onClick={() => setCurrentCarIndex(0)} className="mt-4 text-blue-600 font-medium">Suche zurücksetzen</button>
              </div>
            )}
          </div>
        )}

        {view === 'dashboard' && (
          <div className="px-6 pt-8">
            <h2 className="text-2xl font-bold mb-6">Verkäufer Dashboard</h2>
            <div className="space-y-6">
              <div className="bg-blue-600 p-6 rounded-[2rem] text-white shadow-xl shadow-blue-100">
                <p className="text-blue-100 font-light mb-1 text-sm uppercase tracking-wider">Offene Anfragen</p>
                <h3 className="text-4xl font-bold">{myRequests.length}</h3>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Deine Inserate</h3>
                {myCars.map(car => (
                  <div key={car.id} className="bg-white p-4 rounded-2xl border border-zinc-200 mb-3 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{car.marke} {car.modell}</p>
                      <p className="text-sm text-zinc-500">{car.preis.toLocaleString()} €</p>
                    </div>
                    <button onClick={() => handleDeleteCar(car.carId)} className="p-2 text-zinc-400 hover:text-red-500 transition"><Trash2 size={20} /></button>
                  </div>
                ))}
                <button onClick={() => setView('add-car')} className="w-full p-4 border-2 border-dashed border-zinc-200 rounded-2xl text-zinc-500 flex items-center justify-center gap-2 mt-4 hover:border-blue-400 transition">
                  <Plus size={20} /> Auto inserieren
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'matches' && (
          <div className="px-6 pt-8">
            <h2 className="text-2xl font-bold mb-6">Nachrichten</h2>
            {myMatches.length > 0 ? (
              <div className="space-y-4">
                {myMatches.map(match => (
                  <div key={match.id} onClick={() => {setSelectedChat(match); setView('chat');}} className="bg-white p-4 rounded-2xl border border-zinc-200 flex items-center gap-4 cursor-pointer hover:border-blue-300 transition shadow-sm">
                    <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><Car size={24} /></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold">Chat zu {cars.find(c => c.id === match.carId)?.marke}</h4>
                        <span className="text-xs text-zinc-400">jetzt</span>
                      </div>
                      <p className="text-sm text-zinc-500 truncate">{match.messages[match.messages.length - 1]?.text || 'Keine Nachrichten bisher'}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20"><p className="text-zinc-400">Noch keine Matches vorhanden.</p></div>
            )}
          </div>
        )}

        {view === 'chat' && selectedChat && (
          <div className="flex flex-col h-[calc(100vh-140px)]">
            <div className="p-4 border-b border-zinc-200 bg-white flex items-center gap-3">
              <button onClick={() => setView('matches')}><ChevronLeft size={24} /></button>
              <h4 className="font-bold">Chat Details</h4>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedChat.messages.map(m => (
                <div key={m.id} className={`flex ${m.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${m.senderId === currentUser.id ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-zinc-200 text-blue-900 rounded-tl-none'}`}>
                    <p className="text-sm">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-white border-t border-zinc-200 flex gap-2">
              <input type="text" className="flex-1 bg-zinc-100 p-3 rounded-xl outline-none" placeholder="Nachricht..." value={messageText} onChange={(e) => setMessageText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
              <button onClick={handleSendMessage} className="bg-blue-600 text-white p-3 rounded-xl"><Send size={20} /></button>
            </div>
          </div>
        )}

        {view === 'profile' && currentUser && (
          <div className="px-6 pt-8 pb-12">
            <h2 className="text-2xl font-bold mb-6">Mein Profil</h2>
            <div className="space-y-4">
              <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-sm text-center">
                <div className="w-24 h-24 bg-orange-50 text-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center"><User size={48} /></div>
                <h3 className="text-xl font-bold">{currentUser.vorname} {currentUser.name}</h3>
                <p className="text-zinc-500 text-sm">{currentUser.email}</p>
              </div>
              <button onClick={() => setView(currentRole === 'kaeufer' ? 'dashboard' : 'swipe')} className="w-full p-4 bg-zinc-100 rounded-2xl font-medium transition">
                Wechseln zu {currentRole === 'kaeufer' ? 'Verkäufer' : 'Käufer'}-Modus
              </button>
              <button onClick={handleLogout} className="w-full p-4 text-red-500 font-medium">Ausloggen</button>
            </div>
          </div>
        )}
      </main>

      {currentUser && (
        <div className="fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-lg border-t border-zinc-200 py-3 z-40">
          <div className="max-w-md mx-auto flex justify-around">
            <button onClick={() => setView(currentRole === 'verkaeufer' ? 'dashboard' : 'swipe')} className={`p-2 transition ${view === 'swipe' || view === 'dashboard' ? 'text-blue-600 scale-110' : 'text-zinc-400 hover:text-blue-400'}`}><Car size={26} /></button>
            <button onClick={() => setView('matches')} className={`p-2 transition ${view === 'matches' || view === 'chat' ? 'text-blue-600 scale-110' : 'text-zinc-400 hover:text-blue-400'}`}><MessageCircle size={26} /></button>
            <button onClick={() => setView('profile')} className={`p-2 transition ${view === 'profile' ? 'text-blue-600 scale-110' : 'text-zinc-400 hover:text-blue-400'}`}><User size={26} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

          

  




  

