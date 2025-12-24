import React, { useState, useEffect } from 'react';
import { Heart, X, MessageCircle, Car, Plus, Check, ChevronLeft, Send, User, Filter, Star, Bell, Trash2 } from 'lucide-react';

// Logo als SVG-Komponente
const Logo = ({ className = "w-8 h-8" }) => (
  <svg 
    className={className} 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="100" cy="100" r="95" stroke="#3B82F6" strokeWidth="3" fill="none"/>
    <path d="M75 60L45 100L75 140" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M125 60L155 100L125 140" stroke="#FB923C" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M100 130C100 130 70 110 70 85C70 65 85 55 100 75C115 55 130 65 130 85C130 110 100 130 100 130Z" fill="#FB923C"/>
  </svg>
);

function App = () => {
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
  
  // Swipe States
  const [swipeStartX, setSwipeStartX] = useState(0);
  const [swipeCurrentX, setSwipeCurrentX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  
  const [filters, setFilters] = useState({ 
    marke: '', 
    modell: '',
    karosserie: '',
    zustand: '',
    verkaeuferTyp: '',
    sitzplaetze: '',
    tueren: '',
    farbe: '',
    minPreis: 0, 
    maxPreis: 100000, 
    minBaujahr: 2000, 
    maxBaujahr: 2025, 
    kraftstoffart: '', 
    minKm: 0, 
    maxKm: 300000,
    getriebe: '',
    minPS: 0,
    maxPS: 500,
    umkreis: 0,
    ausstattung: []
  });

  // Umfangreiche Ausstattungsliste wie bei mobile.de
  const ausstattungsmerkmale = {
    'Komfort': [
      'Klimaanlage',
      'Klimaautomatik',
      'Sitzheizung',
      'Standheizung',
      'Beheizbares Lenkrad',
      'Elektrische Fensterheber',
      'Elektrische Seitenspiegel',
      'Elektr. verstellbare Sitze',
      'Lederlenkrad',
      'Multifunktionslenkrad',
      'Tempomat',
      'Adaptive Geschwindigkeitsregelung',
      'Einparkhilfe',
      'Rückfahrkamera',
      '360-Grad-Kamera',
      'Park-Assistent',
      'Start/Stopp-Automatik',
      'Keyless Entry',
      'Zentralverriegelung',
      'Elektrische Heckklappe'
    ],
    'Sicherheit': [
      'ABS',
      'ESP',
      'Traktionskontrolle',
      'Airbag Fahrer',
      'Airbag Beifahrer',
      'Seitenairbags',
      'Notbremsassistent',
      'Spurhalteassistent',
      'Totwinkel-Assistent',
      'Verkehrszeichenerkennung',
      'Müdigkeitswarner',
      'Nachtsicht-Assistent',
      'Kurvenlicht',
      'LED-Scheinwerfer',
      'Xenon-Scheinwerfer',
      'Tagfahrlicht',
      'Nebelscheinwerfer',
      'Reifendruckkontrolle',
      'Isofix (Kindersitzbefestigung)'
    ],
    'Entertainment': [
      'Radio',
      'CD-Spieler',
      'MP3',
      'Navigationssystem',
      'Bluetooth',
      'Freisprecheinrichtung',
      'USB-Anschluss',
      'Apple CarPlay',
      'Android Auto',
      'Soundsystem',
      'DAB-Radio',
      'Sprachsteuerung',
      'Induktionsladen',
      'WLAN / WiFi Hotspot',
      'Head-Up Display'
    ],
    'Extras': [
      'Alufelgen',
      'Leichtmetallfelgen',
      'Panoramadach',
      'Schiebedach',
      'Glasschiebedach',
      'Anhängerkupplung',
      'Dachreling',
      'Sportpaket',
      'Sportfahrwerk',
      'Luftfederung',
      'Allrad',
      '4x4',
      'Differentialsperre',
      'Schaltwippen',
      'Ledersitze',
      'Teilleder',
      'Alcantara',
      'Sportsitze',
      'Massagesitze',
      'Ambientebeleuchtung',
      'Metallic-Lackierung',
      'Sommerreifen',
      'Winterreifen',
      'Ganzjahresreifen',
      '8fach bereift',
      'Ersatzreifen',
      'Skisack',
      'Windschott',
      'Tuning',
      'Nichtraucherfahrzeug'
    ]
  };

  // Standard-Autofarben
  const standardFarben = [
    'Schwarz',
    'Weiß', 
    'Grau',
    'Silber',
    'Blau',
    'Rot',
    'Grün',
    'Braun',
    'Beige',
    'Orange',
    'Gelb',
    'Gold',
    'Bronze',
    'Violett',
    'Bordeaux'
  ];
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regForm, setRegForm] = useState({ email: '', password: '', vorname: '', name: '', geburtsdatum: '', strasse: '', plz: '', ort: '', telefon: '', profilbild: '' });
  const [profileForm, setProfileForm] = useState({ vorname: '', name: '', geburtsdatum: '', strasse: '', plz: '', ort: '', telefon: '', profilbild: '' });
  const [carForm, setCarForm] = useState({ 
    marke: '', 
    modell: '', 
    karosserie: 'Limousine',
    zustand: 'Gebraucht',
    verkaeuferTyp: 'Privat',
    sitzplaetze: 5,
    tueren: 4,
    baujahr: 2020, 
    preis: 20000, 
    kraftstoffart: 'Benzin', 
    km: 50000, 
    farbe: '', 
    beschreibung: '', 
    getriebe: 'Schaltgetriebe', 
    ps: 150, 
    standort: '',
    ausstattung: [],
    bilder: []
  });

  const handleImageUpload = (file, callback) => {
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Bild ist zu groß! Maximal 5MB erlaubt.');
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Bitte nur Bilddateien hochladen!');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      callback(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const init = async () => {
      const demoUsers = [
        { id: 'buyer1', email: 'kaeufer@demo.de', password: 'demo', vorname: 'Max', name: 'Mustermann', geburtsdatum: '1990-05-15', strasse: 'Musterstraße 123', plz: '10115', ort: 'Berlin', telefon: '+49 123 456789', profilbild: '' },
        { id: 'seller1', email: 'verkaeufer@demo.de', password: 'demo', vorname: 'Auto', name: 'Dealer', geburtsdatum: '1985-03-20', strasse: 'Händlerweg 1', plz: '80331', ort: 'München', telefon: '+49 987 654321', profilbild: '' }
      ];
      const demoCars = [
        { id: '1', sellerId: 'seller1', marke: 'BMW', modell: '3er', karosserie: 'Limousine', zustand: 'Gebraucht', verkaeuferTyp: 'Händler', sitzplaetze: 5, tueren: 4, baujahr: 2020, preis: 35000, kraftstoffart: 'Benzin', km: 45000, farbe: 'Schwarz', beschreibung: 'Top Zustand', getriebe: 'Automatik', ps: 184, standort: 'München', ausstattung: ['Allrad', 'Apple CarPlay', 'Alufelgen'], bilder: [] },
        { id: '2', sellerId: 'seller1', marke: 'Mercedes', modell: 'C-Klasse', karosserie: 'Limousine', zustand: 'Gebraucht', verkaeuferTyp: 'Händler', sitzplaetze: 5, tueren: 4, baujahr: 2019, preis: 32000, kraftstoffart: 'Diesel', km: 60000, farbe: 'Silber', beschreibung: 'Gepflegt', getriebe: 'Automatik', ps: 194, standort: 'Hamburg', ausstattung: ['Klimaautomatik', 'Navigationssystem'], bilder: [] },
        { id: '3', sellerId: 'seller1', marke: 'Audi', modell: 'A4', karosserie: 'Kombi', zustand: 'Jahreswagen', verkaeuferTyp: 'Privat', sitzplaetze: 5, tueren: 5, baujahr: 2021, preis: 38000, kraftstoffart: 'Hybrid', km: 25000, farbe: 'Weiß', beschreibung: 'Neuwertig', getriebe: 'Automatik', ps: 204, standort: 'Berlin', ausstattung: ['8fach bereift', 'LED-Scheinwerfer', 'Panoramadach'], bilder: [] }
      ];
      
      try {
        // Load users with fallback
        try {
          const storedUsers = localStorage.getItem('users');
          if (storedUsers) {
            const parsedUsers = JSON.parse(storedUsers);
            setUsers(Array.isArray(parsedUsers) ? parsedUsers : demoUsers);
          } else {
            setUsers(demoUsers);
            localStorage.setItem('users', JSON.stringify(demoUsers));
          }
        } catch (userError) {
          console.error('Error loading users:', userError);
          setUsers(demoUsers);
        }

        // Load cars with fallback
        try {
          const storedCars = localStorage.getItem('cars');
          if (storedCars) {
            const parsedCars = JSON.parse(storedCars);
            setCars(Array.isArray(parsedCars) ? parsedCars : demoCars);
          } else {
            setCars(demoCars);
            localStorage.setItem('cars', JSON.stringify(demoCars));
          }
        } catch (carError) {
          console.error('Error loading cars:', carError);
          setCars(demoCars);
        }

        // Load requests safely
        try {
          const r = localStorage.getItem('requests');
          if (r && r) {
            const parsedRequests = JSON.parse(r);
            setRequests(Array.isArray(parsedRequests) ? parsedRequests : []);
          }
        } catch (e) {
          console.error('Error loading requests:', e);
          setRequests([]);
        }

        // Load matches safely
        try {
          const m = localStorage.getItem('matches');
          if (m && m) {
            const parsedMatches = JSON.parse(m);
            setMatches(Array.isArray(parsedMatches) ? parsedMatches : []);
          }
        } catch (e) {
          console.error('Error loading matches:', e);
          setMatches([]);
        }

        // Load favorites safely
        try {
          const f = localStorage.getItem('favorites');
          if (f && f) {
            const parsedFavorites = JSON.parse(f);
            setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites : []);
          }
        } catch (e) {
          console.error('Error loading favorites:', e);
          setFavorites([]);
        }

        // Load saved searches safely
        try {
          const ss = localStorage.getItem('savedSearches');
          if (ss && ss) {
            const parsedSearches = JSON.parse(ss);
            setSavedSearches(Array.isArray(parsedSearches) ? parsedSearches : []);
          }
        } catch (e) {
          console.error('Error loading saved searches:', e);
          setSavedSearches([]);
        }

        // Load seller ratings safely
        try {
          const sr = localStorage.getItem('sellerRatings');
          if (sr && sr) {
            const parsedRatings = JSON.parse(sr);
            setSellerRatings(Array.isArray(parsedRatings) ? parsedRatings : []);
          }
        } catch (e) {
          console.error('Error loading seller ratings:', e);
          setSellerRatings([]);
        }

        // Auto-Login with error handling
        try {
          const session = localStorage.getItem('currentSession');
          if (session && session) {
            const sessionData = JSON.parse(session);
            const storedUsers = localStorage.getItem('users');
            const users = storedUsers ? JSON.parse(storedUsers) : demoUsers;
            const user = users.find(u => u.id === sessionData.userId);
            if (user) {
              setCurrentUser(user);
              setCurrentRole(sessionData.role);
              setView(sessionData.role === 'verkaeufer' ? 'dashboard' : 'swipe');
            }
          }
        } catch (e) {
          console.error('Error with auto-login:', e);
          // Stay on login screen
        }
      } catch (e) {
        console.error('Critical error during initialization:', e);
        setUsers(demoUsers);
        setCars(demoCars);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setProfileForm({ 
        vorname: currentUser.vorname || '', 
        name: currentUser.name || '', 
        geburtsdatum: currentUser.geburtsdatum || '', 
        strasse: currentUser.strasse || '', 
        plz: currentUser.plz || '', 
        ort: currentUser.ort || '', 
        telefon: currentUser.telefon || '', 
        profilbild: currentUser.profilbild || '' 
      });
    }
  }, [currentUser]);

  const handleLogin = async (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      const role = user.email === 'verkaeufer@demo.de' ? 'verkaeufer' : 'kaeufer';
      setCurrentRole(role);
      setView(user.email === 'verkaeufer@demo.de' ? 'dashboard' : 'swipe');
      
      // Save session for auto-login
      try {
        localStorage.setItem('currentSession', JSON.stringify({ userId: user.id, role }));
      } catch (e) {
        console.error('Failed to save session:', e);
      }
    } else {
      alert('Falsche Anmeldedaten!');
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('currentSession');
    } catch (e) {
      console.error('Failed to clear session:', e);
    }
    setCurrentUser(null);
    setView('login');
  };

  const handleSwipe = async (direction) => {
    if (direction === 'right') {
      const filteredCars = getFilteredCars();
      const car = filteredCars[currentCarIndex];
      const req = { id: Date.now(), carId: car.id, buyerId: currentUser.id, sellerId: car.sellerId, status: 'pending' };
      const updated = [...requests, req];
      setRequests(updated);
      try { localStorage.setItem('requests', JSON.stringify(updated)); 
      alert('Anfrage gesendet!');
    }
    setCurrentCarIndex(p => p + 1);
  };

  // Touch Handlers für Swipe (Mobile)
  const handleTouchStart = (e) => {
    setSwipeStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - swipeStartX;
    setSwipeCurrentX(diff);
    if (Math.abs(diff) > 50) {
      setSwipeDirection(diff > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    const swipeThreshold = 100;
    if (Math.abs(swipeCurrentX) > swipeThreshold) {
      if (swipeCurrentX > 0) {
        handleSwipe('right');
      } else {
        handleSwipe('left');
      }
    }
    setIsSwiping(false);
    setSwipeCurrentX(0);
    setSwipeDirection(null);
    setSwipeStartX(0);
  };

  // Mouse Handlers für Swipe (Desktop)
  const handleMouseDown = (e) => {
    setSwipeStartX(e.clientX);
    setIsSwiping(true);
  };

  const handleMouseMove = (e) => {
    if (!isSwiping) return;
    const currentX = e.clientX;
    const diff = currentX - swipeStartX;
    setSwipeCurrentX(diff);
    if (Math.abs(diff) > 50) {
      setSwipeDirection(diff > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleMouseUp = () => {
    if (!isSwiping) return;
    const swipeThreshold = 100;
    if (Math.abs(swipeCurrentX) > swipeThreshold) {
      if (swipeCurrentX > 0) {
        handleSwipe('right');
      } else {
        handleSwipe('left');
      }
    }
    setIsSwiping(false);
    setSwipeCurrentX(0);
    setSwipeDirection(null);
    setSwipeStartX(0);
  };

  const handleRequestResponse = async (reqId, accept) => {
    const updated = requests.map(r => r.id === reqId ? { ...r, status: accept ? 'accepted' : 'rejected' } : r);
    setRequests(updated);
    try { localStorage.setItem('requests', JSON.stringify(updated)); 

    if (accept) {
      const req = requests.find(r => r.id === reqId);
      const match = { id: Date.now(), carId: req.carId, buyerId: req.buyerId, sellerId: req.sellerId, messages: [] };
      const updatedMatches = [...matches, match];
      setMatches(updatedMatches);
      try { localStorage.setItem('matches', JSON.stringify(updatedMatches)); 
      alert('Match erstellt!');
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    const updated = matches.map(m => {
      if (m.id === selectedChat.id) {
        return { ...m, messages: [...m.messages, { id: Date.now(), senderId: currentUser.id, text: messageText, timestamp: new Date().toISOString() }] };
      }
      return m;
    });
    setMatches(updated);
    try { localStorage.setItem('matches', JSON.stringify(updated)); 
    setSelectedChat(updated.find(m => m.id === selectedChat.id));
    setMessageText('');
  };

  const handleAddCar = async (carData) => {
    const newCar = { id: Date.now(), sellerId: currentUser.id, ...carData };
    const updated = [...cars, newCar];
    setCars(updated);
    try { localStorage.setItem('cars', JSON.stringify(updated)); 
    setView('dashboard');
    setCarForm({ marke: '', modell: '', karosserie: 'Limousine', zustand: 'Gebraucht', verkaeuferTyp: 'Privat', sitzplaetze: 5, tueren: 4, baujahr: 2020, preis: 20000, kraftstoffart: 'Benzin', km: 50000, farbe: '', beschreibung: '', getriebe: 'Schaltgetriebe', ps: 150, standort: '', ausstattung: [], bilder: [] });
  };

  const handleDeleteCar = async (carId) => {
    const updated = cars.filter(c => c.id !== carId);
    setCars(updated);
    try { localStorage.setItem('cars', JSON.stringify(updated)); 
  };

  const handleRegister = async (data) => {
    const newUser = { id: Date.now(), ...data };
    const updated = [...users, newUser];
    setUsers(updated);
    try { localStorage.setItem('users', JSON.stringify(updated)); 
    setCurrentUser(newUser);
    setView('swipe');
    
    // Save session for auto-login
    try {
      localStorage.setItem('currentSession', JSON.stringify({ userId: newUser.id, role: 'kaeufer' }));
    } catch (e) {
      console.error('Failed to save session:', e);
    }
  };

  const handleUpdateProfile = async () => {
    const updated = users.map(u => u.id === currentUser.id ? { ...u, ...profileForm } : u);
    setUsers(updated);
    try { localStorage.setItem('users', JSON.stringify(updated)); 
    setCurrentUser({ ...currentUser, ...profileForm });
    alert('Profil aktualisiert!');
  };

  const handleFavorite = async (carId) => {
    const fav = { id: Date.now(), carId, buyerId: currentUser.id };
    const updated = [...favorites, fav];
    setFavorites(updated);
    try { localStorage.setItem('favorites', JSON.stringify(updated)); 
  };

  const resetFilters = () => {
    setFilters({ marke: '', modell: '', karosserie: '', zustand: '', verkaeuferTyp: '', sitzplaetze: '', tueren: '', farbe: '', minPreis: 0, maxPreis: 100000, minBaujahr: 2000, maxBaujahr: 2025, kraftstoffart: '', minKm: 0, maxKm: 300000, getriebe: '', minPS: 0, maxPS: 500, umkreis: 0, ausstattung: [] });
  };

  const handleSaveSearch = async () => {
    if (!searchName.trim()) {
      alert('Bitte gib der Suche einen Namen!');
      return;
    }
    
    const newSearch = {
      id: Date.now(),
      name: searchName,
      filters: { ...filters },
      createdAt: new Date().toISOString()
    };
    
    const updated = [...savedSearches, newSearch];
    setSavedSearches(updated);
    try {
      localStorage.setItem('savedSearches', JSON.stringify(updated));
    
    
    setSearchName('');
    setShowSaveSearchModal(false);
    alert(`Suche "${searchName}" gespeichert!`);
  };

  const handleLoadSearch = (search) => {
    setFilters(search.filters);
    setCurrentCarIndex(0);
    setShowFilterModal(false);
  };

  const handleDeleteSearch = async (searchId) => {
    const updated = savedSearches.filter(s => s.id !== searchId);
    setSavedSearches(updated);
    try {
      localStorage.setItem('savedSearches', JSON.stringify(updated));
    
  };

  const analyzePriceQuality = (car) => {
    // Validate input
    if (!car || !car.marke || !car.preis || !car.baujahr || !car.km || !car.ps) {
      return {
        rating: 'unknown',
        label: 'Preis wird analysiert',
        icon: 'ℹ️',
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        message: 'Nicht genügend Daten',
        estimatedPrice: car?.preis || 0
      };
    }

    // Basis-Durchschnittspreis basierend auf Marke
    const brandBasePrice = {
      'BMW': 35000,
      'Mercedes': 38000,
      'Audi': 36000,
      'VW': 25000,
      'Tesla': 45000,
      'Porsche': 65000,
      'Opel': 18000,
      'Ford': 22000
    };

    const basePrice = brandBasePrice[car.marke] || 25000;
    
    // Faktor für Baujahr (neuere Autos teurer)
    const currentYear = 2025;
    const age = currentYear - car.baujahr;
    const yearFactor = Math.max(0.4, 1 - (age * 0.08)); // Pro Jahr ca. 8% Wertverlust
    
    // Faktor für Kilometerstand (weniger km = teurer)
    const kmFactor = car.km < 30000 ? 1.2 : 
                     car.km < 60000 ? 1.0 : 
                     car.km < 100000 ? 0.85 : 
                     car.km < 150000 ? 0.7 : 0.55;
    
    // Faktor für PS (mehr Leistung = teurer)
    const psFactor = car.ps > 250 ? 1.3 :
                     car.ps > 180 ? 1.15 :
                     car.ps > 120 ? 1.0 : 0.9;
    
    // Faktor für Zustand
    const conditionFactor = car.zustand === 'Neu' ? 1.5 :
                           car.zustand === 'Jahreswagen' ? 1.25 :
                           car.zustand === 'Vorführwagen' ? 1.2 :
                           car.zustand === 'Gebraucht' ? 1.0 : 0.8;
    
    // Geschätzter Marktwert
    const estimatedPrice = basePrice * yearFactor * kmFactor * psFactor * conditionFactor;
    
    // Preis-Differenz in Prozent
    const priceDiff = ((car.preis - estimatedPrice) / estimatedPrice) * 100;
    
    // Bewertung
    if (priceDiff < -15) {
      return {
        rating: 'excellent',
        label: 'Sehr guter Preis!',
        icon: '🎉',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        message: `${Math.abs(Math.round(priceDiff))}% unter Marktwert`,
        estimatedPrice: Math.round(estimatedPrice)
      };
    } else if (priceDiff < -5) {
      return {
        rating: 'good',
        label: 'Guter Preis',
        icon: '✅',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        message: `${Math.abs(Math.round(priceDiff))}% unter Marktwert`,
        estimatedPrice: Math.round(estimatedPrice)
      };
    } else if (priceDiff < 5) {
      return {
        rating: 'fair',
        label: 'Fairer Preis',
        icon: '✓',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        message: 'Marktüblicher Preis',
        estimatedPrice: Math.round(estimatedPrice)
      };
    } else if (priceDiff < 15) {
      return {
        rating: 'expensive',
        label: 'Etwas teuer',
        icon: '⚠️',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        message: `${Math.round(priceDiff)}% über Marktwert`,
        estimatedPrice: Math.round(estimatedPrice)
      };
    } else {
      return {
        rating: 'overpriced',
        label: 'Zu teuer',
        icon: '❌',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        message: `${Math.round(priceDiff)}% über Marktwert`,
        estimatedPrice: Math.round(estimatedPrice)
      };
    }
  };

  const getSellerRating = (sellerId) => {
    if (!sellerId || !Array.isArray(sellerRatings)) return null;
    
    const sellerReviews = sellerRatings.filter(r => r && r.sellerId === sellerId);
    if (sellerReviews.length === 0) return null;
    
    const avgStars = sellerReviews.reduce((sum, r) => sum + (r.stars || 0), 0) / sellerReviews.length;
    return {
      avgStars: avgStars.toFixed(1),
      count: sellerReviews.length,
      reviews: sellerReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    };
  };

  const handleSubmitRating = async () => {
    if (!ratingForm.comment.trim()) {
      alert('Bitte schreibe einen Kommentar!');
      return;
    }

    const newRating = {
      id: Date.now(),
      sellerId: ratingForm.sellerId,
      buyerId: currentUser.id,
      buyerName: currentUser.vorname || currentUser.name,
      stars: ratingForm.stars,
      comment: ratingForm.comment,
      createdAt: new Date().toISOString()
    };

    const updated = [...sellerRatings, newRating];
    setSellerRatings(updated);
    try {
      localStorage.setItem('sellerRatings', JSON.stringify(updated));
    

    setShowRatingModal(false);
    setRatingForm({ sellerId: '', stars: 5, comment: '' });
    alert('Bewertung abgegeben! Danke für dein Feedback.');
  };

  const getFilteredCars = () => {
    if (!Array.isArray(cars)) return [];
    
    return cars.filter(c => {
      if (!c) return false;
      if (filters.marke && c.marke !== filters.marke) return false;
      if (filters.modell && c.modell !== filters.modell) return false;
      if (filters.karosserie && c.karosserie !== filters.karosserie) return false;
      if (filters.zustand && c.zustand !== filters.zustand) return false;
      if (filters.verkaeuferTyp && c.verkaeuferTyp !== filters.verkaeuferTyp) return false;
      if (filters.sitzplaetze && c.sitzplaetze !== parseInt(filters.sitzplaetze)) return false;
      if (filters.tueren && c.tueren !== parseInt(filters.tueren)) return false;
      if (filters.farbe && c.farbe !== filters.farbe) return false;
      if (c.preis < filters.minPreis || c.preis > filters.maxPreis) return false;
      if (c.baujahr < filters.minBaujahr || c.baujahr > filters.maxBaujahr) return false;
      if (filters.kraftstoffart && c.kraftstoffart !== filters.kraftstoffart) return false;
      if (c.km < filters.minKm || c.km > filters.maxKm) return false;
      if (filters.getriebe && c.getriebe !== filters.getriebe) return false;
      if (c.ps < filters.minPS || c.ps > filters.maxPS) return false;
      if (filters.ausstattung.length > 0 && Array.isArray(c.ausstattung) && !filters.ausstattung.every(a => c.ausstattung.includes(a))) return false;
      return true;
    });
  };

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="bg-white border border-zinc-200 rounded-xl p-10 w-full max-w-md">
          <div className="text-center mb-10">
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Logo className="w-full h-full" />
            </div>
            <h1 className="text-4xl font-light text-blue-900 mb-2 tracking-tight">MatchMyRide</h1>
            <p className="text-zinc-600 text-sm font-light">Premium Automobile Matching</p>
          </div>
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="E-Mail" 
              value={loginEmail} 
              onChange={e => setLoginEmail(e.target.value)} 
              className="w-full px-5 py-4 bg-zinc-100 border border-zinc-300 text-blue-900 placeholder-zinc-400 rounded-lg focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 focus:outline-none transition font-light"
            />
            <input 
              type="password" 
              placeholder="Passwort" 
              value={loginPassword} 
              onChange={e => setLoginPassword(e.target.value)} 
              onKeyPress={e => e.key === 'Enter' && handleLogin(loginEmail, loginPassword)} 
              className="w-full px-5 py-4 bg-zinc-100 border border-zinc-300 text-blue-900 placeholder-zinc-400 rounded-lg focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 focus:outline-none transition font-light"
            />
            <button 
              onClick={() => handleLogin(loginEmail, loginPassword)} 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-normal transition tracking-wide"
            >
              Anmelden
            </button>
            <button 
              onClick={() => setView('register')} 
              className="w-full border border-zinc-300 text-blue-900 hover:bg-zinc-100 py-4 rounded-lg font-light transition"
            >
              Registrieren
            </button>
            
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-zinc-500 font-light">Demo-Zugang</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleLogin('kaeufer@demo.de', 'demo')} 
                className="bg-zinc-100 text-zinc-700 py-3 rounded-lg font-light text-sm hover:bg-zinc-200 transition border border-zinc-300"
              >
                Käufer
              </button>
              <button 
                onClick={() => handleLogin('verkaeufer@demo.de', 'demo')} 
                className="bg-zinc-100 text-zinc-700 py-3 rounded-lg font-light text-sm hover:bg-zinc-200 transition border border-zinc-300"
              >
                Verkäufer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'register') {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="bg-white border border-zinc-200 rounded-xl p-10 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <button onClick={() => setView('login')} className="mb-6 flex items-center gap-2 text-zinc-600 hover:text-blue-900 transition font-light">
            <ChevronLeft size={20} strokeWidth={1.5} /> Zurück
          </button>
          <h2 className="text-3xl font-light text-blue-900 mb-8 tracking-tight">Konto erstellen</h2>
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="E-Mail *" 
              value={regForm.email} 
              onChange={e => setRegForm({...regForm, email: e.target.value})} 
              className="w-full px-5 py-4 bg-zinc-100 border border-zinc-300 text-blue-900 placeholder-zinc-400 rounded-lg focus:ring-1 focus:ring-zinc-600 focus:outline-none transition font-light" 
              required 
            />
            <input 
              type="password" 
              placeholder="Passwort *" 
              value={regForm.password} 
              onChange={e => setRegForm({...regForm, password: e.target.value})} 
              className="w-full px-5 py-4 bg-zinc-100 border border-zinc-300 text-blue-900 placeholder-zinc-400 rounded-lg focus:ring-1 focus:ring-zinc-600 focus:outline-none transition font-light" 
              required 
            />
            
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="text" 
                placeholder="Vorname *" 
                value={regForm.vorname} 
                onChange={e => setRegForm({...regForm, vorname: e.target.value})} 
                className="w-full px-5 py-4 bg-zinc-100 border border-zinc-300 text-blue-900 placeholder-zinc-400 rounded-lg focus:ring-1 focus:ring-zinc-600 focus:outline-none transition font-light" 
                required 
              />
              <input 
                type="text" 
                placeholder="Nachname *" 
                value={regForm.name} 
                onChange={e => setRegForm({...regForm, name: e.target.value})} 
                className="w-full px-5 py-4 bg-zinc-100 border border-zinc-300 text-blue-900 placeholder-zinc-400 rounded-lg focus:ring-1 focus:ring-zinc-600 focus:outline-none transition font-light" 
                required 
              />
            </div>
            
            <input 
              type="date" 
              placeholder="Geburtsdatum" 
              value={regForm.geburtsdatum} 
              onChange={e => setRegForm({...regForm, geburtsdatum: e.target.value})} 
              className="w-full px-5 py-4 bg-zinc-100 border border-zinc-300 text-blue-900 placeholder-zinc-400 rounded-lg focus:ring-1 focus:ring-zinc-600 focus:outline-none transition font-light" 
            />
            
            <input 
              type="text" 
              placeholder="Straße & Hausnummer" 
              value={regForm.strasse} 
              onChange={e => setRegForm({...regForm, strasse: e.target.value})} 
              className="w-full px-5 py-4 bg-zinc-100 border border-zinc-300 text-blue-900 placeholder-zinc-400 rounded-lg focus:ring-1 focus:ring-zinc-600 focus:outline-none transition font-light" 
            />
            
            <div className="grid grid-cols-3 gap-3">
              <input 
                type="text" 
                placeholder="PLZ" 
                value={regForm.plz} 
                onChange={e => setRegForm({...regForm, plz: e.target.value})} 
                className="w-full px-5 py-4 bg-zinc-100 border border-zinc-300 text-blue-900 placeholder-zinc-400 rounded-lg focus:ring-1 focus:ring-zinc-600 focus:outline-none transition font-light" 
              />
              <input 
                type="text" 
                placeholder="Ort" 
                value={regForm.ort} 
                onChange={e => setRegForm({...regForm, ort: e.target.value})} 
                className="col-span-2 w-full px-5 py-4 bg-zinc-100 border border-zinc-300 text-blue-900 placeholder-zinc-400 rounded-lg focus:ring-1 focus:ring-zinc-600 focus:outline-none transition font-light" 
              />
            </div>
            
            <input 
              type="tel" 
              placeholder="Telefon" 
              value={regForm.telefon} 
              onChange={e => setRegForm({...regForm, telefon: e.target.value})} 
              className="w-full px-5 py-4 bg-zinc-100 border border-zinc-300 text-blue-900 placeholder-zinc-400 rounded-lg focus:ring-1 focus:ring-zinc-600 focus:outline-none transition font-light" 
            />
            
            <button 
              onClick={() => handleRegister(regForm)} 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-normal transition tracking-wide mt-6"
            >
              Konto erstellen
            </button>
            <p className="text-xs text-zinc-500 text-center font-light">* Pflichtfelder</p>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'profile') {
    return (
      <div className="min-h-screen bg-zinc-50">
        <header className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setView(currentRole === 'kaeufer' ? 'swipe' : 'dashboard')} className="p-2 hover:bg-zinc-100 rounded-lg transition">
            <ChevronLeft size={24} className="text-zinc-600" strokeWidth={1.5} />
          </button>
          <h1 className="text-xl font-light text-blue-900 tracking-wide">Profil</h1>
        </header>
        <div className="p-6">
          <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-6 shadow-sm">
            <div className="text-center mb-6">
              {profileForm.profilbild ? (
                <div className="relative inline-block">
                  <img src={profileForm.profilbild} alt="Profilbild" className="w-28 h-28 rounded-xl mx-auto mb-3 object-cover border-2 border-zinc-200" />
                  <button 
                    onClick={() => setProfileForm({...profileForm, profilbild: ''})}
                    className="absolute -top-2 -right-2 bg-white border border-zinc-300 text-red-500 rounded-lg p-1.5 hover:bg-red-50 transition shadow-sm"
                  >
                    <X size={16} strokeWidth={1.5} />
                  </button>
                </div>
              ) : (
                <div className="w-28 h-28 bg-zinc-100 rounded-xl mx-auto mb-3 flex items-center justify-center border-2 border-zinc-200">
                  <User size={48} className="text-zinc-600" strokeWidth={1.5} />
                </div>
              )}
              <h2 className="text-xl font-normal text-blue-900">{currentUser.vorname} {currentUser.name}</h2>
              <p className="text-zinc-600 font-light text-sm">{currentUser.email}</p>
              
              <label className="mt-4 inline-block cursor-pointer bg-zinc-100 text-zinc-700 px-5 py-2.5 rounded-lg hover:bg-zinc-200 transition border border-zinc-300 font-light">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageUpload(file, (base64) => {
                        setProfileForm({...profileForm, profilbild: base64});
                      });
                    }
                  }}
                />
                Profilbild hochladen
              </label>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-2">Vorname</label>
                <input type="text" placeholder="Vorname" value={profileForm.vorname} onChange={e => setProfileForm({...profileForm, vorname: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nachname</label>
                <input type="text" placeholder="Nachname" value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Geburtsdatum</label>
              <input type="date" value={profileForm.geburtsdatum} onChange={e => setProfileForm({...profileForm, geburtsdatum: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Adresse</label>
              <input type="text" placeholder="Straße & Hausnummer" value={profileForm.strasse} onChange={e => setProfileForm({...profileForm, strasse: e.target.value})} className="w-full px-4 py-3 border rounded-lg mb-3" />
              <div className="grid grid-cols-3 gap-3">
                <input type="text" placeholder="PLZ" value={profileForm.plz} onChange={e => setProfileForm({...profileForm, plz: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                <input type="text" placeholder="Ort" value={profileForm.ort} onChange={e => setProfileForm({...profileForm, ort: e.target.value})} className="col-span-2 w-full px-4 py-3 border rounded-lg" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Telefon</label>
              <input type="tel" placeholder="Telefon" value={profileForm.telefon} onChange={e => setProfileForm({...profileForm, telefon: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
            </div>
            
            <button onClick={handleUpdateProfile} className="w-full bg-orange-500 text-white py-4 rounded-lg font-normal hover:bg-orange-600 transition tracking-wide">Speichern</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'add-car') {
    return (
      <div className="min-h-screen bg-zinc-50">
        <header className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setView('dashboard')} className="p-2 hover:bg-zinc-100 rounded-lg transition">
            <ChevronLeft size={24} className="text-zinc-600" strokeWidth={1.5} />
          </button>
          <h1 className="text-xl font-light text-blue-900 tracking-wide">Auto hinzufügen</h1>
        </header>
        <div className="p-6">
          <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-6 shadow-sm">
            
            {/* Fahrzeug Grunddaten */}
            <div className="border-b border-zinc-200 pb-6">
              <h3 className="text-lg font-normal text-blue-900 mb-4">Fahrzeugdaten</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-normal text-zinc-700 mb-2">Marke *</label>
                  <input type="text" placeholder="z.B. BMW" value={carForm.marke} onChange={e => setCarForm({...carForm, marke: e.target.value})} className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 font-light" required />
                </div>
                
                <div>
                  <label className="block text-sm font-normal text-zinc-700 mb-2">Modell *</label>
                  <input type="text" placeholder="z.B. 3er" value={carForm.modell} onChange={e => setCarForm({...carForm, modell: e.target.value})} className="w-full px-4 py-3 border rounded-lg" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Karosserieform</label>
                  <select value={carForm.karosserie} onChange={e => setCarForm({...carForm, karosserie: e.target.value})} className="w-full px-4 py-3 border rounded-lg">
                    <option value="Limousine">Limousine</option>
                    <option value="Kombi">Kombi</option>
                    <option value="SUV">SUV</option>
                    <option value="Cabrio">Cabrio</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Kleinwagen">Kleinwagen</option>
                    <option value="Van">Van</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Farbe</label>
                  <select value={carForm.farbe} onChange={e => setCarForm({...carForm, farbe: e.target.value})} className="w-full px-4 py-3 border rounded-lg">
                    <option value="">Farbe wählen</option>
                    {standardFarben.map(farbe => (
                      <option key={farbe} value={farbe}>{farbe}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Sitzplätze</label>
                    <input type="number" placeholder="5" value={carForm.sitzplaetze} onChange={e => setCarForm({...carForm, sitzplaetze: parseInt(e.target.value)})} className="w-full px-4 py-3 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Türen</label>
                    <input type="number" placeholder="4" value={carForm.tueren} onChange={e => setCarForm({...carForm, tueren: parseInt(e.target.value)})} className="w-full px-4 py-3 border rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Zustand & Verkäufer */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-4 text-blue-900">Zustand & Verkauf</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Zustand</label>
                  <select value={carForm.zustand} onChange={e => setCarForm({...carForm, zustand: e.target.value})} className="w-full px-4 py-3 border rounded-lg">
                    <option value="Neu">Neu</option>
                    <option value="Gebraucht">Gebraucht</option>
                    <option value="Jahreswagen">Jahreswagen</option>
                    <option value="Vorführwagen">Vorführwagen</option>
                    <option value="Oldtimer">Oldtimer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Verkäufertyp</label>
                  <select value={carForm.verkaeuferTyp} onChange={e => setCarForm({...carForm, verkaeuferTyp: e.target.value})} className="w-full px-4 py-3 border rounded-lg">
                    <option value="Privat">Privat</option>
                    <option value="Händler">Händler</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Preis *</label>
                  <div className="relative">
                    <input type="number" placeholder="20000" value={carForm.preis} onChange={e => setCarForm({...carForm, preis: parseInt(e.target.value)})} className="w-full px-4 py-3 border rounded-lg" required />
                    <span className="absolute right-4 top-3 text-gray-500">€</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Technische Daten */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-4 text-blue-900">Technische Daten</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Erstzulassung</label>
                  <input type="number" placeholder="2020" value={carForm.baujahr} onChange={e => setCarForm({...carForm, baujahr: parseInt(e.target.value)})} className="w-full px-4 py-3 border rounded-lg" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Kilometerstand</label>
                  <div className="relative">
                    <input type="number" placeholder="50000" value={carForm.km} onChange={e => setCarForm({...carForm, km: parseInt(e.target.value)})} className="w-full px-4 py-3 border rounded-lg" />
                    <span className="absolute right-4 top-3 text-gray-500">km</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Kraftstoffart</label>
                  <select value={carForm.kraftstoffart} onChange={e => setCarForm({...carForm, kraftstoffart: e.target.value})} className="w-full px-4 py-3 border rounded-lg">
                    <option value="Benzin">Benzin</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Elektro">Elektro</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Autogas">Autogas</option>
                    <option value="Erdgas">Erdgas</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Getriebe</label>
                  <select value={carForm.getriebe} onChange={e => setCarForm({...carForm, getriebe: e.target.value})} className="w-full px-4 py-3 border rounded-lg">
                    <option value="Schaltgetriebe">Schaltgetriebe</option>
                    <option value="Automatik">Automatik</option>
                    <option value="Halbautomatik">Halbautomatik</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Leistung</label>
                  <div className="relative">
                    <input type="number" placeholder="150" value={carForm.ps} onChange={e => setCarForm({...carForm, ps: parseInt(e.target.value)})} className="w-full px-4 py-3 border rounded-lg" />
                    <span className="absolute right-4 top-3 text-gray-500">PS</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Standort & Beschreibung */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-4 text-blue-900">Weitere Informationen</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Standort</label>
                  <input type="text" placeholder="z.B. Berlin" value={carForm.standort} onChange={e => setCarForm({...carForm, standort: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Beschreibung</label>
                  <textarea placeholder="Beschreibe dein Auto..." value={carForm.beschreibung} onChange={e => setCarForm({...carForm, beschreibung: e.target.value})} className="w-full px-4 py-3 border rounded-lg" rows={4} />
                </div>
              </div>
            </div>
            
            {/* Ausstattung */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-4 text-blue-600">Ausstattung</h3>
              
              {/* Search Bar */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Ausstattung suchen... (z.B. Klimaanlage, LED, Bluetooth)"
                  value={equipmentSearch}
                  onChange={e => setEquipmentSearch(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {equipmentSearch && (
                  <button
                    onClick={() => setEquipmentSearch('')}
                    className="mt-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    ✕ Suche zurücksetzen
                  </button>
                )}
              </div>

              <div className="border rounded-lg p-4 max-h-80 overflow-y-auto space-y-4">
                {Object.entries(ausstattungsmerkmale).map(([category, features]) => {
                  const filteredFeatures = features.filter(feature =>
                    feature.toLowerCase().includes(equipmentSearch.toLowerCase())
                  );
                  
                  if (filteredFeatures.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h4 className="font-semibold text-blue-700 mb-2 text-sm">{category}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {filteredFeatures.map(feature => (
                          <label key={feature} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input 
                              type="checkbox" 
                              checked={carForm.ausstattung.includes(feature)}
                              onChange={e => {
                                if (e.target.checked) {
                                  setCarForm({...carForm, ausstattung: [...carForm.ausstattung, feature]});
                                } else {
                                  setCarForm({...carForm, ausstattung: carForm.ausstattung.filter(item => item !== feature)});
                                }
                              }}
                              className="rounded"
                            />
                            <span className="text-xs">{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                {equipmentSearch && Object.entries(ausstattungsmerkmale).every(([_, features]) => 
                  features.filter(f => f.toLowerCase().includes(equipmentSearch.toLowerCase())).length === 0
                ) && (
                  <div className="text-center text-gray-500 py-8">
                    Keine Ausstattung gefunden für "{equipmentSearch}"
                  </div>
                )}
              </div>
              {carForm.ausstattung.length > 0 && (
                <div className="mt-2 text-sm text-blue-600 font-medium">
                  {carForm.ausstattung.length} Merkmal{carForm.ausstattung.length !== 1 ? 'e' : ''} ausgewählt
                </div>
              )}
            </div>
            
            {/* Bilder Upload */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-900">Bilder</h3>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {carForm.bilder.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={img} alt={`Auto ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <button 
                      onClick={() => setCarForm({...carForm, bilder: carForm.bilder.filter((_, i) => i !== index)})}
                      className="absolute top-1 right-1 bg-white border-2 border-red-200 text-blue-900 rounded-lg p-1 hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              {carForm.bilder.length < 5 && (
                <label className="cursor-pointer bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-50 transition">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && carForm.bilder.length < 5) {
                        handleImageUpload(file, (base64) => {
                          setCarForm({...carForm, bilder: [...carForm.bilder, base64]});
                        });
                      }
                    }}
                  />
                  <Plus size={32} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Bild hinzufügen</span>
                  <span className="text-xs text-gray-400 mt-1">{carForm.bilder.length}/5 hochgeladen</span>
                </label>
              )}
            </div>
            
            <button onClick={() => handleAddCar(carForm)} className="w-full bg-orange-500 text-white py-4 rounded-lg font-normal mt-6 hover:bg-orange-600 transition tracking-wide">Auto hinzufügen</button>
            <p className="text-xs text-gray-500 text-center">* Pflichtfelder</p>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'favorites') {
    const userFavs = favorites.filter(f => f.buyerId === currentUser.id);
    return (
      <div className="min-h-screen bg-zinc-50">
        <header className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setView('swipe')} className="p-2 hover:bg-zinc-100 rounded-lg transition">
            <ChevronLeft size={24} className="text-zinc-600" strokeWidth={1.5} />
          </button>
          <h1 className="text-xl font-light text-blue-900 tracking-wide">Favoriten</h1>
        </header>
        <div className="p-6 space-y-3">
          {userFavs.length === 0 ? (
            <div className="text-center mt-12">
              <div className="w-16 h-16 bg-zinc-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Star size={32} className="text-zinc-400" strokeWidth={1.5} />
              </div>
              <p className="text-zinc-500 font-light">Keine Favoriten</p>
            </div>
          ) : userFavs.map(f => {
            const car = cars.find(c => c.id === f.carId);
            if (!car) return null;
            return (
              <div key={f.id} className="bg-white border border-zinc-200 p-5 rounded-xl flex items-center gap-4 hover:border-zinc-300 transition shadow-sm">
                <div className="w-14 h-14 bg-zinc-100 rounded-lg flex items-center justify-center">
                  <Car size={28} className="text-zinc-600" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-normal text-blue-900">{car.marke} {car.modell}</h3>
                  <p className="text-sm text-zinc-600 font-light">{car.preis.toLocaleString()} € • {car.km.toLocaleString()} km</p>
                </div>
                <Star size={20} className="text-orange-500 fill-orange-500" strokeWidth={1.5} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (view === 'swipe') {
    const filteredCars = getFilteredCars();
    if (currentCarIndex >= filteredCars.length) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <header className="bg-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">MatchMyRide</h1>
            <div className="flex gap-2">
              <button onClick={() => setView('favorites')} className="p-2"><Star size={20} /></button>
              <button onClick={() => setShowFilterModal(true)} className="p-2"><Filter size={20} /></button>
              <button onClick={() => setView('profile')} className="p-2"><User size={20} /></button>
              <button onClick={() => { setCurrentRole('verkaeufer'); setView('dashboard'); }} className="text-xs bg-gray-100 px-2 py-1 rounded">Verkäufer</button>
              <button onClick={() => setView('matches')} className="p-2"><MessageCircle size={20} /></button>
              <button onClick={handleLogout} className="text-xs text-red-600">Logout</button>
            </div>
          </header>
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Car size={40} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Keine weiteren Autos</h2>
              <p className="text-gray-600 mb-6">Probier andere Filter oder komm später wieder</p>
              <button onClick={() => { resetFilters(); setCurrentCarIndex(0); }} className="bg-blue-600 text-blue-900 px-6 py-3 rounded-lg font-semibold">Filter zurücksetzen</button>
            </div>
          </div>
        </div>
      );
    }

    const car = filteredCars[currentCarIndex];
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col">
        <header className="bg-white border-b border-zinc-200 px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-light text-blue-900 tracking-wide">MatchMyRide</h1>
          <div className="flex gap-1">
            <button onClick={() => setView('favorites')} className="p-2.5 hover:bg-zinc-100 rounded-lg transition">
              <Star size={20} className="text-zinc-600" strokeWidth={1.5} />
            </button>
            <button onClick={() => setShowFilterModal(true)} className="p-2.5 hover:bg-zinc-100 rounded-lg transition">
              <Filter size={20} className="text-zinc-600" strokeWidth={1.5} />
            </button>
            <button onClick={() => setView('profile')} className="p-2.5 hover:bg-zinc-100 rounded-lg transition">
              <User size={20} className="text-zinc-600" strokeWidth={1.5} />
            </button>
            <button onClick={() => { setCurrentRole('verkaeufer'); setView('dashboard'); }} className="text-sm bg-zinc-100 hover:bg-zinc-200 px-3 py-1 rounded-lg text-zinc-700 transition border border-zinc-300 font-light">
              Verkäufer
            </button>
            <button onClick={() => setView('matches')} className="p-2.5 hover:bg-zinc-100 rounded-lg transition">
              <MessageCircle size={20} className="text-zinc-600" strokeWidth={1.5} />
            </button>
            <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300 px-2 font-light">Logout</button>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center p-6">
          <div 
            className="bg-white rounded-xl border border-zinc-200 w-full max-w-md overflow-hidden shadow-2xl relative"
            style={{
              transform: `translateX(${swipeCurrentX}px) rotate(${swipeCurrentX * 0.03}deg)`,
              transition: isSwiping ? 'none' : 'transform 0.3s ease-out',
              cursor: isSwiping ? 'grabbing' : 'grab',
              userSelect: 'none',
              touchAction: 'pan-y'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Swipe Direction Indicators */}
            {swipeDirection === 'right' && (
              <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center z-10 pointer-events-none">
                <div className="bg-green-500 text-white px-8 py-4 rounded-2xl text-2xl font-bold rotate-12 border-4 border-white shadow-2xl">
                  ❤️ ANFRAGE
                </div>
              </div>
            )}
            {swipeDirection === 'left' && (
              <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center z-10 pointer-events-none">
                <div className="bg-red-500 text-white px-8 py-4 rounded-2xl text-2xl font-bold -rotate-12 border-4 border-white shadow-2xl">
                  ❌ SKIP
                </div>
              </div>
            )}
            {car.bilder && car.bilder.length > 0 ? (
              <div 
                className="h-80 relative bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCarForDetail(car);
                  setShowDetailView(true);
                  setCurrentImageIndex(0);
                }}
              >
                <img src={car.bilder[0]} alt={`${car.marke} ${car.modell}`} className="w-full h-full object-cover" />
                {car.bilder.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-zinc-50 bg-opacity-70 text-blue-900 px-3 py-1 rounded-lg text-sm">
                    +{car.bilder.length - 1} Bilder
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white bg-opacity-90 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Tippen für Details
                </div>
              </div>
            ) : (
              <div 
                className="h-80 bg-gray-100 flex items-center justify-center cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCarForDetail(car);
                  setShowDetailView(true);
                  setCurrentImageIndex(0);
                }}
              >
                <Car size={120} className="text-gray-400" />
              </div>
            )}
            <div className="p-6 bg-white">
              <h2 className="text-2xl font-light text-blue-900 mb-1 tracking-tight">{car.marke} {car.modell}</h2>
              <div className="text-3xl font-light text-blue-900 mb-3">{car.preis.toLocaleString()} €</div>
              
              {/* Price Analysis */}
              {(() => {
                const priceAnalysis = analyzePriceQuality(car);
                return (
                  <div className={`${priceAnalysis.bgColor} ${priceAnalysis.borderColor} border-2 rounded-lg p-3 mb-4`}>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{priceAnalysis.icon}</span>
                      <div className="flex-1">
                        <p className={`font-bold ${priceAnalysis.color}`}>{priceAnalysis.label}</p>
                        <p className="text-sm text-gray-600">{priceAnalysis.message}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Geschätzter Marktwert: ~{priceAnalysis.estimatedPrice.toLocaleString()} €
                    </p>
                  </div>
                );
              })()}
              
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-2"><span className="font-semibold">Baujahr:</span> {car.baujahr}</div>
                <div className="flex items-center gap-2"><span className="font-semibold">Kilometerstand:</span> {car.km.toLocaleString()} km</div>
                <div className="flex items-center gap-2"><span className="font-semibold">Kraftstoff:</span> {car.kraftstoffart}</div>
                <div className="flex items-center gap-2"><span className="font-semibold">Getriebe:</span> {car.getriebe}</div>
                <div className="flex items-center gap-2"><span className="font-semibold">Leistung:</span> {car.ps} PS</div>
                <div className="flex items-center gap-2"><span className="font-semibold">Karosserie:</span> {car.karosserie}</div>
                <div className="flex items-center gap-2"><span className="font-semibold">Zustand:</span> {car.zustand}</div>
                <div className="flex items-center gap-2"><span className="font-semibold">Verkäufer:</span> {car.verkaeuferTyp}</div>
                <div className="flex items-center gap-2"><span className="font-semibold">Standort:</span> {car.standort}</div>
                <div className="flex items-center gap-2"><span className="font-semibold">Farbe:</span> {car.farbe}</div>
              </div>
              {car.ausstattung && car.ausstattung.length > 0 && (
                <div className="mb-4">
                  <div className="font-semibold mb-2">Ausstattung:</div>
                  <div className="flex flex-wrap gap-2">
                    {car.ausstattung.map(item => (
                      <span key={item} className="bg-purple-100 text-blue-700 px-3 py-1 rounded-lg text-xs">{item}</span>
                    ))}
                  </div>
                </div>
              )}
              {car.beschreibung && (
                <div className="mb-4">
                  <div className="font-semibold mb-1">Beschreibung:</div>
                  <p className="text-gray-600 text-sm">{car.beschreibung}</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 p-6 pt-0 bg-white">
              <button onClick={(e) => { e.stopPropagation(); handleSwipe('left'); }} className="flex-1 bg-zinc-100 border border-zinc-300 text-zinc-700 p-4 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-200 transition font-light">
                <X size={20} strokeWidth={1.5} /> Ablehnen
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleFavorite(car.id); }} className="bg-zinc-100 border border-zinc-300 text-zinc-700 p-4 rounded-lg hover:bg-zinc-200 transition">
                <Star size={20} strokeWidth={1.5} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleSwipe('right'); }} className="flex-1 bg-orange-500 text-white p-4 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition font-normal">
                <Heart size={20} strokeWidth={1.5} /> Anfragen
              </button>
            </div>
          </div>
          {/* Swipe Instructions */}
          <div className="mt-4 text-center text-zinc-400 text-sm font-light flex items-center justify-center gap-4">
            <span>👉 Wische rechts für Anfrage</span>
            <span>•</span>
            <span>👈 Wische links zum Überspringen</span>
          </div>
        </div>

        {showFilterModal && (
          <>
            <style dangerouslySetInnerHTML={{__html: `
              .custom-scrollbar::-webkit-scrollbar {
                width: 16px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: #f1f5f9;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #9333ea;
                border-radius: 8px;
                border: 3px solid #f1f5f9;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #7c3aed;
              }
            `}} />
          <div className="fixed inset-0 bg-zinc-50 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl flex flex-col" style={{maxHeight: '90vh'}}>
              <div className="p-6 border-b flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Filter</h2>
                  <button onClick={() => setShowFilterModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <X size={24} />
                  </button>
                </div>
              </div>
              <div className="overflow-y-scroll p-6 custom-scrollbar" style={{flex: '1 1 auto'}}>
              <div className="space-y-6">
                
                {/* Gespeicherte Suchen */}
                {savedSearches.length > 0 && (
                  <div className="bg-purple-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                      <Bell size={20} /> Gespeicherte Suchen
                    </h3>
                    <div className="space-y-2">
                      {savedSearches.map(search => {
                        const matchingCars = cars.filter(c => {
                          const f = search.filters;
                          if (f.marke && c.marke !== f.marke) return false;
                          if (f.modell && c.modell !== f.modell) return false;
                          if (f.karosserie && c.karosserie !== f.karosserie) return false;
                          if (f.zustand && c.zustand !== f.zustand) return false;
                          if (f.verkaeuferTyp && c.verkaeuferTyp !== f.verkaeuferTyp) return false;
                          if (c.preis < f.minPreis || c.preis > f.maxPreis) return false;
                          if (c.baujahr < f.minBaujahr || c.baujahr > f.maxBaujahr) return false;
                          if (f.kraftstoffart && c.kraftstoffart !== f.kraftstoffart) return false;
                          if (c.km < f.minKm || c.km > f.maxKm) return false;
                          if (f.getriebe && c.getriebe !== f.getriebe) return false;
                          if (c.ps < f.minPS || c.ps > f.maxPS) return false;
                          return true;
                        });
                        
                        return (
                          <div key={search.id} className="flex items-center gap-2 bg-white p-3 rounded-lg border">
                            <button 
                              onClick={() => handleLoadSearch(search)}
                              className="flex-1 text-left"
                            >
                              <p className="font-medium">{search.name}</p>
                              <p className="text-xs text-gray-500">{matchingCars.length} Autos gefunden</p>
                            </button>
                            <button 
                              onClick={() => handleDeleteSearch(search.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* 1. Marke & Modell */}
                <div>
                  <label className="block text-sm font-medium mb-2">Marke</label>
                  <select value={filters.marke} onChange={e => setFilters({...filters, marke: e.target.value, modell: ''})} className="w-full px-4 py-2 border rounded-lg">
                    <option value="">Alle Marken</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes">Mercedes</option>
                    <option value="Audi">Audi</option>
                    <option value="VW">VW</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Porsche">Porsche</option>
                    <option value="Opel">Opel</option>
                    <option value="Ford">Ford</option>
                  </select>
                </div>

                {filters.marke && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Modell</label>
                    <select value={filters.modell} onChange={e => setFilters({...filters, modell: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                      <option value="">Alle Modelle</option>
                      {filters.marke === 'BMW' && (
                        <>
                          <option value="1er">1er</option>
                          <option value="3er">3er</option>
                          <option value="5er">5er</option>
                          <option value="X3">X3</option>
                          <option value="X5">X5</option>
                        </>
                      )}
                      {filters.marke === 'Mercedes' && (
                        <>
                          <option value="A-Klasse">A-Klasse</option>
                          <option value="C-Klasse">C-Klasse</option>
                          <option value="E-Klasse">E-Klasse</option>
                          <option value="GLC">GLC</option>
                        </>
                      )}
                      {filters.marke === 'Audi' && (
                        <>
                          <option value="A3">A3</option>
                          <option value="A4">A4</option>
                          <option value="A6">A6</option>
                          <option value="Q5">Q5</option>
                        </>
                      )}
                      {filters.marke === 'VW' && (
                        <>
                          <option value="Golf">Golf</option>
                          <option value="Passat">Passat</option>
                          <option value="Tiguan">Tiguan</option>
                          <option value="Polo">Polo</option>
                        </>
                      )}
                    </select>
                  </div>
                )}

                {/* 1b. Karosserieform */}
                <div>
                  <label className="block text-sm font-medium mb-2">Karosserieform</label>
                  <select value={filters.karosserie} onChange={e => setFilters({...filters, karosserie: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                    <option value="">Alle</option>
                    <option value="Limousine">Limousine</option>
                    <option value="Kombi">Kombi</option>
                    <option value="SUV">SUV / Geländewagen</option>
                    <option value="Cabrio">Cabrio</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Kleinwagen">Kleinwagen</option>
                    <option value="Van">Van / Transporter</option>
                  </select>
                </div>

                {/* 1c. Farbe */}
                <div>
                  <label className="block text-sm font-medium mb-2">Farbe</label>
                  <select value={filters.farbe} onChange={e => setFilters({...filters, farbe: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                    <option value="">Alle Farben</option>
                    {standardFarben.map(farbe => (
                      <option key={farbe} value={farbe}>{farbe}</option>
                    ))}
                  </select>
                </div>

                {/* 2. Preis */}
                <div>
                  <label className="block text-sm font-medium mb-2">Preis</label>
                  <div className="flex gap-3 items-center">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600 mb-1">Von (€)</label>
                      <input type="number" value={filters.minPreis} onChange={e => setFilters({...filters, minPreis: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 border rounded-lg" placeholder="0" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600 mb-1">Bis (€)</label>
                      <input type="number" value={filters.maxPreis} onChange={e => setFilters({...filters, maxPreis: parseInt(e.target.value) || 100000})} className="w-full px-4 py-2 border rounded-lg" placeholder="100000" />
                    </div>
                  </div>
                </div>

                {/* 3. Kilometerstand */}
                <div>
                  <label className="block text-sm font-medium mb-2">Kilometerstand</label>
                  <div className="flex gap-3 items-center">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600 mb-1">Von (km)</label>
                      <input type="number" value={filters.minKm} onChange={e => setFilters({...filters, minKm: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 border rounded-lg" placeholder="0" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600 mb-1">Bis (km)</label>
                      <input type="number" value={filters.maxKm} onChange={e => setFilters({...filters, maxKm: parseInt(e.target.value) || 300000})} className="w-full px-4 py-2 border rounded-lg" placeholder="300000" />
                    </div>
                  </div>
                </div>

                {/* 4. Baujahr */}
                <div>
                  <label className="block text-sm font-medium mb-2">Erstzulassung</label>
                  <div className="flex gap-3 items-center">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600 mb-1">Von</label>
                      <input type="number" value={filters.minBaujahr} onChange={e => setFilters({...filters, minBaujahr: parseInt(e.target.value) || 2000})} className="w-full px-4 py-2 border rounded-lg" placeholder="2000" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600 mb-1">Bis</label>
                      <input type="number" value={filters.maxBaujahr} onChange={e => setFilters({...filters, maxBaujahr: parseInt(e.target.value) || 2025})} className="w-full px-4 py-2 border rounded-lg" placeholder="2025" />
                    </div>
                  </div>
                </div>

                {/* 5. Kraftstoffart */}
                <div>
                  <label className="block text-sm font-medium mb-2">Kraftstoffart</label>
                  <select value={filters.kraftstoffart} onChange={e => setFilters({...filters, kraftstoffart: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                    <option value="">Alle</option>
                    <option value="Benzin">Benzin</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Elektro">Elektro</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Autogas">Autogas (LPG)</option>
                    <option value="Erdgas">Erdgas (CNG)</option>
                  </select>
                </div>

                {/* 6. Getriebe */}
                <div>
                  <label className="block text-sm font-medium mb-2">Getriebe</label>
                  <select value={filters.getriebe} onChange={e => setFilters({...filters, getriebe: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                    <option value="">Alle</option>
                    <option value="Schaltgetriebe">Schaltgetriebe</option>
                    <option value="Automatik">Automatik</option>
                    <option value="Halbautomatik">Halbautomatik</option>
                  </select>
                </div>

                {/* 7. Leistung (PS) */}
                <div>
                  <label className="block text-sm font-medium mb-2">Leistung</label>
                  <div className="flex gap-3 items-center">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600 mb-1">Von (PS)</label>
                      <input type="number" value={filters.minPS} onChange={e => setFilters({...filters, minPS: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 border rounded-lg" placeholder="0" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600 mb-1">Bis (PS)</label>
                      <input type="number" value={filters.maxPS} onChange={e => setFilters({...filters, maxPS: parseInt(e.target.value) || 500})} className="w-full px-4 py-2 border rounded-lg" placeholder="500" />
                    </div>
                  </div>
                </div>

                {/* 7. Zustand */}
                <div>
                  <label className="block text-sm font-medium mb-2">Zustand</label>
                  <select value={filters.zustand} onChange={e => setFilters({...filters, zustand: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                    <option value="">Alle</option>
                    <option value="Neu">Neu</option>
                    <option value="Jahreswagen">Jahreswagen</option>
                    <option value="Gebraucht">Gebraucht</option>
                    <option value="Vorführwagen">Vorführwagen</option>
                    <option value="Oldtimer">Oldtimer</option>
                  </select>
                </div>

                {/* 8. Verkäufertyp */}
                <div>
                  <label className="block text-sm font-medium mb-2">Verkäufer</label>
                  <select value={filters.verkaeuferTyp} onChange={e => setFilters({...filters, verkaeuferTyp: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                    <option value="">Alle</option>
                    <option value="Händler">Händler</option>
                    <option value="Privat">Privat</option>
                  </select>
                </div>

                {/* 9. Sitzplätze & Türen */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">Sitzplätze</label>
                    <select value={filters.sitzplaetze} onChange={e => setFilters({...filters, sitzplaetze: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                      <option value="">Alle</option>
                      <option value="2">2</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="7">7</option>
                      <option value="9">9</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">Türen</label>
                    <select value={filters.tueren} onChange={e => setFilters({...filters, tueren: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                      <option value="">Alle</option>
                      <option value="2">2/3</option>
                      <option value="4">4/5</option>
                      <option value="6">6/7</option>
                    </select>
                  </div>
                </div>

                {/* 10. Umkreis */}
                <div>
                  <label className="block text-sm font-medium mb-2">Umkreis</label>
                  <div>
                    <input type="number" value={filters.umkreis} onChange={e => setFilters({...filters, umkreis: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 border rounded-lg" placeholder="0" />
                    <p className="text-xs text-gray-500 mt-1">0 km = Ganz Deutschland</p>
                  </div>
                </div>

                {/* 11. Ausstattung */}
                <div>
                  <label className="block text-sm font-medium mb-2">Ausstattung</label>
                  
                  {/* Search Bar */}
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Ausstattung suchen..."
                      value={equipmentSearch}
                      onChange={e => setEquipmentSearch(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    {equipmentSearch && (
                      <button
                        onClick={() => setEquipmentSearch('')}
                        className="mt-1 text-xs text-gray-600 hover:text-gray-900"
                      >
                        ✕ Suche zurücksetzen
                      </button>
                    )}
                  </div>

                  <div className="border rounded-lg p-4 max-h-96 overflow-y-auto space-y-4">
                    {Object.entries(ausstattungsmerkmale).map(([category, features]) => {
                      const filteredFeatures = features.filter(feature =>
                        feature.toLowerCase().includes(equipmentSearch.toLowerCase())
                      );
                      
                      if (filteredFeatures.length === 0) return null;
                      
                      return (
                        <div key={category}>
                          <h4 className="font-semibold text-blue-700 mb-2 text-sm">{category}</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {filteredFeatures.map(feature => (
                              <label key={feature} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                                <input 
                                  type="checkbox" 
                                  checked={filters.ausstattung.includes(feature)}
                                  onChange={e => {
                                    if (e.target.checked) {
                                      setFilters({...filters, ausstattung: [...filters.ausstattung, feature]});
                                    } else {
                                      setFilters({...filters, ausstattung: filters.ausstattung.filter(item => item !== feature)});
                                    }
                                  }}
                                  className="rounded"
                                />
                                <span className="text-xs">{feature}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                    
                    {equipmentSearch && Object.entries(ausstattungsmerkmale).every(([_, features]) => 
                      features.filter(f => f.toLowerCase().includes(equipmentSearch.toLowerCase())).length === 0
                    ) && (
                      <div className="text-center text-gray-500 py-8 text-sm">
                        Keine Ausstattung gefunden für "{equipmentSearch}"
                      </div>
                    )}
                  </div>
                  {filters.ausstattung.length > 0 && (
                    <div className="mt-2 text-sm text-blue-600 font-medium">
                      {filters.ausstattung.length} Merkmal{filters.ausstattung.length !== 1 ? 'e' : ''} ausgewählt
                    </div>
                  )}
                </div>
              </div>
              </div>
              <div className="flex flex-col gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
                <button 
                  onClick={() => setShowSaveSearchModal(true)}
                  className="w-full bg-blue-500 text-blue-900 py-2 rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center gap-2 text-sm"
                >
                  <Bell size={18} /> Suche speichern
                </button>
                <div className="flex gap-3">
                  <button onClick={() => { resetFilters(); setShowFilterModal(false); }} className="flex-1 bg-gray-200 py-3 rounded-lg font-semibold">Zurücksetzen</button>
                  <button onClick={() => { setCurrentCarIndex(0); setShowFilterModal(false); }} className="flex-1 bg-blue-600 text-blue-900 py-3 rounded-lg font-semibold">Anwenden</button>
                </div>
              </div>
            </div>
          </div>
          </>
        )}

        {/* Save Search Modal */}
        {showSaveSearchModal && (
          <div className="fixed inset-0 bg-zinc-50 bg-opacity-50 flex items-center justify-center p-4" style={{zIndex: 10000}}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Suche speichern</h3>
              <p className="text-sm text-gray-600 mb-4">Gib deiner Suche einen Namen, um sie später schnell wieder zu laden.</p>
              <input 
                type="text" 
                placeholder="z.B. BMW unter 30.000€" 
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSaveSearch()}
                className="w-full px-4 py-3 border rounded-lg mb-4"
                autoFocus
              />
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setShowSaveSearchModal(false);
                    setSearchName('');
                  }}
                  className="flex-1 bg-gray-200 py-3 rounded-lg font-semibold"
                >
                  Abbrechen
                </button>
                <button 
                  onClick={handleSaveSearch}
                  className="flex-1 bg-blue-600 text-blue-900 py-3 rounded-lg font-semibold"
                >
                  Speichern
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rating Modal */}
        {showRatingModal && (
          <div className="fixed inset-0 bg-zinc-50 bg-opacity-50 flex items-center justify-center p-4" style={{zIndex: 10001}}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Verkäufer bewerten</h3>
              
              {/* Star Rating */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Bewertung</label>
                <div className="flex gap-2 justify-center">
                  {[1,2,3,4,5].map(star => (
                    <button
                      key={star}
                      onClick={() => setRatingForm({...ratingForm, stars: star})}
                      className="transition-transform hover:scale-110"
                      type="button"
                    >
                      <Star 
                        size={40} 
                        className={star <= ratingForm.stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  {ratingForm.stars === 5 ? 'Hervorragend!' : 
                   ratingForm.stars === 4 ? 'Sehr gut' :
                   ratingForm.stars === 3 ? 'Gut' :
                   ratingForm.stars === 2 ? 'Geht so' : 'Schlecht'}
                </p>
              </div>

              {/* Comment */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Deine Erfahrung</label>
                <textarea
                  placeholder="Beschreibe deine Erfahrung mit diesem Verkäufer..."
                  value={ratingForm.comment}
                  onChange={e => setRatingForm({...ratingForm, comment: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg"
                  rows={4}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setShowRatingModal(false);
                    setRatingForm({ sellerId: '', stars: 5, comment: '' });
                  }}
                  className="flex-1 bg-gray-200 py-3 rounded-lg font-semibold"
                  type="button"
                >
                  Abbrechen
                </button>
                <button 
                  onClick={handleSubmitRating}
                  className="flex-1 bg-blue-600 text-blue-900 py-3 rounded-lg font-semibold"
                  type="button"
                >
                  Bewerten
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Detail View Modal */}
        {showDetailView && selectedCarForDetail && (
          <div className="fixed inset-0 bg-zinc-50 bg-opacity-75 flex items-center justify-center" style={{zIndex: 9999}}>
            <div className="bg-white rounded-xl w-full h-full md:h-auto md:max-h-[90vh] md:max-w-2xl overflow-hidden flex flex-col">
              {/* Header - Fixed at top */}
              <div className="p-4 border-b flex items-center justify-between bg-white flex-shrink-0">
                <h2 className="text-lg md:text-xl font-bold truncate pr-4">{selectedCarForDetail.marke} {selectedCarForDetail.modell}</h2>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetailView(false);
                    setSelectedCarForDetail(null);
                    setCurrentImageIndex(0);
                  }} 
                  className="p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0 bg-gray-100"
                  type="button"
                >
                  <X size={24} className="text-gray-700" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Image Gallery */}
                {selectedCarForDetail.bilder && selectedCarForDetail.bilder.length > 0 ? (
                  <div className="relative">
                    <img 
                      src={selectedCarForDetail.bilder[currentImageIndex]} 
                      alt={`${selectedCarForDetail.marke} ${selectedCarForDetail.modell}`} 
                      className="w-full h-64 md:h-96 object-cover"
                    />
                    
                    {/* Image Navigation */}
                    {selectedCarForDetail.bilder.length > 1 && (
                      <>
                        <button 
                          onClick={() => setCurrentImageIndex(prev => prev === 0 ? selectedCarForDetail.bilder.length - 1 : prev - 1)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-zinc-50 bg-opacity-50 text-blue-900 p-3 rounded-lg hover:bg-opacity-70"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button 
                          onClick={() => setCurrentImageIndex(prev => prev === selectedCarForDetail.bilder.length - 1 ? 0 : prev + 1)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-zinc-50 bg-opacity-50 text-blue-900 p-3 rounded-lg hover:bg-opacity-70"
                        >
                          <ChevronLeft size={24} style={{transform: 'rotate(180deg)'}} />
                        </button>
                        
                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-50 bg-opacity-70 text-blue-900 px-4 py-2 rounded-lg text-sm">
                          {currentImageIndex + 1} / {selectedCarForDetail.bilder.length}
                        </div>

                        {/* Thumbnail dots */}
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          {selectedCarForDetail.bilder.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`w-2 h-2 rounded-lg transition ${
                                idx === currentImageIndex ? 'bg-white w-6' : 'bg-white bg-opacity-50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="h-64 md:h-96 bg-gray-100 flex items-center justify-center">
                    <Car size={120} className="text-gray-400" />
                  </div>
                )}

                {/* Car Details */}
                <div className="p-6 space-y-6">
                  {/* Price */}
                  <div className="border-b pb-4">
                    <h3 className="text-3xl font-bold text-blue-600 mb-1">{selectedCarForDetail.preis.toLocaleString()} €</h3>
                    <p className="text-sm text-gray-500 mb-3">{selectedCarForDetail.verkaeuferTyp}</p>
                    
                    {/* Price Analysis */}
                    {(() => {
                      const priceAnalysis = analyzePriceQuality(selectedCarForDetail);
                      return (
                        <div className={`${priceAnalysis.bgColor} ${priceAnalysis.borderColor} border-2 rounded-lg p-4`}>
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{priceAnalysis.icon}</span>
                            <div className="flex-1">
                              <p className={`font-bold text-lg ${priceAnalysis.color}`}>{priceAnalysis.label}</p>
                              <p className="text-sm text-gray-700">{priceAnalysis.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Geschätzter Marktwert: ~{priceAnalysis.estimatedPrice.toLocaleString()} €
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Key Facts */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Erstzulassung</p>
                      <p className="font-semibold">{selectedCarForDetail.baujahr}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Kilometerstand</p>
                      <p className="font-semibold">{selectedCarForDetail.km.toLocaleString()} km</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Leistung</p>
                      <p className="font-semibold">{selectedCarForDetail.ps} PS</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Kraftstoff</p>
                      <p className="font-semibold">{selectedCarForDetail.kraftstoffart}</p>
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Technische Daten</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b border-zinc-200">
                        <span className="text-gray-600">Karosserie</span>
                        <span className="font-medium">{selectedCarForDetail.karosserie}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-zinc-200">
                        <span className="text-gray-600">Getriebe</span>
                        <span className="font-medium">{selectedCarForDetail.getriebe}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-zinc-200">
                        <span className="text-gray-600">Zustand</span>
                        <span className="font-medium">{selectedCarForDetail.zustand}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-zinc-200">
                        <span className="text-gray-600">Farbe</span>
                        <span className="font-medium">{selectedCarForDetail.farbe}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-zinc-200">
                        <span className="text-gray-600">Türen</span>
                        <span className="font-medium">{selectedCarForDetail.tueren}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-zinc-200">
                        <span className="text-gray-600">Sitzplätze</span>
                        <span className="font-medium">{selectedCarForDetail.sitzplaetze}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-zinc-200">
                        <span className="text-gray-600">Standort</span>
                        <span className="font-medium">{selectedCarForDetail.standort}</span>
                      </div>
                    </div>
                  </div>

                  {/* Equipment */}
                  {selectedCarForDetail.ausstattung && selectedCarForDetail.ausstattung.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Ausstattung</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCarForDetail.ausstattung.map(item => (
                          <span key={item} className="bg-purple-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium">
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {selectedCarForDetail.beschreibung && (
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Beschreibung</h4>
                      <p className="text-gray-700 leading-relaxed">{selectedCarForDetail.beschreibung}</p>
                    </div>
                  )}

                  {/* Seller Rating */}
                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-lg mb-3">Verkäufer-Bewertungen</h4>
                    {(() => {
                      const seller = users.find(u => u.id === selectedCarForDetail.sellerId);
                      const rating = getSellerRating(selectedCarForDetail.sellerId);
                      
                      return (
                        <div>
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <p className="font-semibold">{seller?.vorname} {seller?.name}</p>
                                <p className="text-sm text-gray-600">{seller?.ort || 'Unbekannt'}</p>
                              </div>
                              {rating ? (
                                <div className="text-right">
                                  <div className="flex items-center gap-1">
                                    {[1,2,3,4,5].map(star => (
                                      <Star 
                                        key={star} 
                                        size={20} 
                                        className={star <= Math.round(parseFloat(rating.avgStars)) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                      />
                                    ))}
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">{rating.avgStars} / 5 ({rating.count} Bewertungen)</p>
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">Noch keine Bewertungen</p>
                              )}
                            </div>

                            {/* Reviews */}
                            {rating && rating.reviews.length > 0 && (
                              <div className="space-y-3 mt-4 border-t pt-4">
                                {rating.reviews.slice(0, 3).map(review => (
                                  <div key={review.id} className="bg-white rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="flex">
                                        {[1,2,3,4,5].map(star => (
                                          <Star 
                                            key={star} 
                                            size={14} 
                                            className={star <= review.stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-sm font-medium">{review.buyerName}</span>
                                      <span className="text-xs text-gray-400">
                                        {new Date(review.createdAt).toLocaleDateString('de-DE')}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700">{review.comment}</p>
                                  </div>
                                ))}
                                {rating.reviews.length > 3 && (
                                  <p className="text-sm text-gray-500 text-center">+{rating.reviews.length - 3} weitere Bewertungen</p>
                                )}
                              </div>
                            )}

                            {/* Rate Button */}
                            {currentUser.id !== selectedCarForDetail.sellerId && (
                              <button
                                onClick={() => {
                                  setRatingForm({ sellerId: selectedCarForDetail.sellerId, stars: 5, comment: '' });
                                  setShowRatingModal(true);
                                }}
                                className="w-full mt-4 bg-purple-100 text-blue-700 py-2 rounded-lg font-medium hover:bg-blue-200 transition"
                              >
                                Verkäufer bewerten
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Action Buttons - Fixed at bottom */}
              <div className="p-4 border-t bg-white flex gap-3 flex-shrink-0">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetailView(false);
                    setSelectedCarForDetail(null);
                    handleSwipe('left');
                  }}
                  className="flex-1 bg-white border-2 border-red-200 text-blue-900 py-3 rounded-lg font-semibold hover:bg-red-600 flex items-center justify-center gap-2"
                  type="button"
                >
                  <X size={20} /> Ablehnen
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(selectedCarForDetail.id);
                  }}
                  className="bg-white border-2 border-gray-300 text-blue-900 p-3 rounded-lg hover:bg-yellow-500"
                  type="button"
                >
                  <Star size={24} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetailView(false);
                    setSelectedCarForDetail(null);
                    handleSwipe('right');
                  }}
                  className="flex-1 bg-blue-600 text-blue-900 py-3 rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2"
                  type="button"
                >
                  <Heart size={20} /> Anfragen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (view === 'matches') {
    const userMatches = matches.filter(m => m.buyerId === currentUser.id || m.sellerId === currentUser.id);
    if (selectedChat) {
      const car = cars.find(c => c.id === selectedChat.carId);
      const chatPartner = users.find(u => 
        currentRole === 'kaeufer' ? u.id === selectedChat.sellerId : u.id === selectedChat.buyerId
      );
      return (
        <div className="min-h-screen bg-zinc-50 flex flex-col">
          <header className="bg-white border-b border-zinc-200 px-6 py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setSelectedChat(null)} className="p-2 hover:bg-zinc-100 rounded-lg transition">
                <ChevronLeft size={24} className="text-zinc-600" strokeWidth={1.5} />
              </button>
              <div className="flex-1">
                <h1 className="font-normal text-blue-900">{car && car.marke} {car && car.modell}</h1>
                {chatPartner && (
                  <p className="text-sm text-zinc-600 font-light flex items-center gap-1">
                    <User size={12} strokeWidth={1.5} />
                    {chatPartner.vorname} {chatPartner.name}
                  </p>
                )}
              </div>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {selectedChat.messages.length === 0 ? (
              <div className="text-center mt-12">
                <div className="w-16 h-16 bg-zinc-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <MessageCircle size={32} className="text-zinc-400" strokeWidth={1.5} />
                </div>
                <p className="text-zinc-500 font-light">Keine Nachrichten</p>
              </div>
            ) : selectedChat.messages.map(m => (
              <div key={m.id} className={`flex ${m.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-3 rounded-xl ${m.senderId === currentUser.id ? 'bg-orange-500 text-white' : 'bg-white border border-zinc-200'}`}>
                  <p className="text-sm font-light">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white border-t border-zinc-200 p-4 flex gap-3">
            <input 
              type="text" 
              placeholder="Nachricht..." 
              value={messageText} 
              onChange={e => setMessageText(e.target.value)} 
              onKeyPress={e => e.key === 'Enter' && handleSendMessage()} 
              className="flex-1 px-4 py-3 border border-zinc-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 font-light" 
            />
            <button onClick={handleSendMessage} className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition">
              <Send size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-zinc-50">
        <header className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setView(currentRole === 'kaeufer' ? 'swipe' : 'dashboard')} className="p-2 hover:bg-zinc-100 rounded-lg transition">
            <ChevronLeft size={24} className="text-zinc-600" strokeWidth={1.5} />
          </button>
          <h1 className="text-xl font-light text-blue-900 tracking-wide">Matches</h1>
        </header>
        <div className="p-6 space-y-3">
          {userMatches.length === 0 ? (
            <div className="text-center mt-12">
              <div className="w-16 h-16 bg-zinc-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Heart size={32} className="text-zinc-400" strokeWidth={1.5} />
              </div>
              <p className="text-zinc-500 font-light">Keine Matches</p>
            </div>
          ) : userMatches.map(m => {
            const car = cars.find(c => c.id === m.carId);
            const partner = users.find(u => 
              currentRole === 'kaeufer' ? u.id === m.sellerId : u.id === m.buyerId
            );
            return (
              <div key={m.id} onClick={() => setSelectedChat(m)} className="bg-white border border-zinc-200 p-5 rounded-xl cursor-pointer flex items-center gap-4 hover:border-zinc-300 transition shadow-sm">
                <div className="w-14 h-14 bg-zinc-100 rounded-lg flex items-center justify-center">
                  <Car size={28} className="text-zinc-600" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-normal text-blue-900">{car && car.marke} {car && car.modell}</h3>
                  <p className="text-sm text-zinc-600 font-light">
                    {car && car.preis.toLocaleString()} €
                    {partner && <span className="text-zinc-400"> • {partner.vorname} {partner.name}</span>}
                  </p>
                </div>
                <MessageCircle size={20} className="text-zinc-400" strokeWidth={1.5} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (currentRole === 'verkaeufer' && view === 'dashboard') {
    const sellerReqs = requests.filter(r => r.sellerId === currentUser.id && r.status === 'pending');
    const myCars = cars.filter(c => c.sellerId === currentUser.id);
    return (
      <div className="min-h-screen bg-zinc-50">
        <header className="bg-white border-b border-zinc-200 px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-light text-blue-900 tracking-wide">Dashboard</h1>
          <div className="flex gap-1">
            <button onClick={() => setView('profile')} className="p-2.5 hover:bg-zinc-100 rounded-lg transition">
              <User size={20} className="text-zinc-600" strokeWidth={1.5} />
            </button>
            <button onClick={() => { setCurrentRole('kaeufer'); setView('swipe'); }} className="text-sm bg-zinc-100 hover:bg-zinc-200 px-3 py-1 rounded-lg text-zinc-700 transition border border-zinc-300 font-light">
              Käufer
            </button>
            <button onClick={() => setView('matches')} className="p-2.5 hover:bg-zinc-100 rounded-lg transition">
              <MessageCircle size={20} className="text-zinc-600" strokeWidth={1.5} />
            </button>
            <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600 px-2 font-light">Logout</button>
          </div>
        </header>
        <div className="p-6">
          <div className="bg-white rounded-xl border border-zinc-200 p-6 mb-6 shadow-sm">
            <h2 className="text-lg font-normal text-blue-900 mb-4">Anfragen ({sellerReqs.length})</h2>
            {sellerReqs.length === 0 ? <p className="text-center text-zinc-500 py-8 font-light">Keine Anfragen</p> : sellerReqs.map(r => {
              const car = cars.find(c => c.id === r.carId);
              const buyer = users.find(u => u.id === r.buyerId);
              return (
                <div key={r.id} className="border border-zinc-200 rounded-lg p-4 mb-3 hover:border-zinc-300 transition">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
                      <Car size={24} className="text-zinc-600" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-normal text-blue-900">{car && car.marke} {car && car.modell}</h3>
                      <p className="text-sm text-zinc-600 font-light">{car && car.preis.toLocaleString()} €</p>
                    </div>
                  </div>
                  {buyer && (
                    <div className="flex items-center gap-2 mb-4 ml-16">
                      <User size={14} className="text-zinc-500" strokeWidth={1.5} />
                      <p className="text-sm text-zinc-600 font-light">
                        Anfrage von <span className="font-normal text-blue-900">{buyer.vorname} {buyer.name}</span>
                      </p>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button onClick={() => handleRequestResponse(r.id, false)} className="flex-1 bg-zinc-100 border border-zinc-300 text-zinc-700 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-200 transition font-light">
                      <X size={18} strokeWidth={1.5} /> Ablehnen
                    </button>
                    <button onClick={() => handleRequestResponse(r.id, true)} className="flex-1 bg-orange-500 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition font-normal">
                      <Check size={18} strokeWidth={1.5} /> Annehmen
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-normal text-blue-900">Meine Autos ({myCars.length})</h2>
              <button onClick={() => setView('add-car')} className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition font-normal">
                <Plus size={18} strokeWidth={1.5} /> Neu
              </button>
            </div>
            {myCars.map(c => (
              <div key={c.id} className="border border-zinc-200 rounded-lg p-4 mb-3 flex items-center gap-4 hover:border-zinc-300 transition">
                <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
                  <Car size={24} className="text-zinc-600" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-normal text-blue-900">{c.marke} {c.modell}</h3>
                  <p className="text-sm text-zinc-600 font-light">{c.preis.toLocaleString()} €</p>
                </div>
                <button onClick={() => handleDeleteCar(c.id)} className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition">
                  <Trash2 size={20} strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;
