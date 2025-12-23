# MatchMyRide 🚗

Premium Automobile Matching App - Finde dein perfektes Auto!

## 🚀 Deployment zu Vercel

### Voraussetzungen
- GitHub Account
- Vercel Account (kostenlos bei vercel.com)

### Schritt 1: GitHub Repository erstellen
1. Gehe zu https://github.com/new
2. Repository Name: `matchmyride`
3. Wähle "Public" oder "Private"
4. Klicke "Create repository"

### Schritt 2: Code hochladen
```bash
# In diesem Projekt-Ordner:
git init
git add .
git commit -m "Initial commit - MatchMyRide"
git branch -M main
git remote add origin https://github.com/DEIN_USERNAME/matchmyride.git
git push -u origin main
```

### Schritt 3: Mit Vercel verbinden
1. Gehe zu https://vercel.com
2. Klicke "Add New..." → "Project"
3. Import dein GitHub Repository "matchmyride"
4. Framework Preset: **Create React App**
5. Klicke "Deploy"
6. ✅ Fertig! Deine App ist live!

### Deine URL
Nach dem Deploy bekommst du eine URL wie:
```
https://matchmyride.vercel.app
```

Diese URL kannst du an deine Freunde zum Testen schicken!

## 📱 Features
- Swipe-Interface für Autos (Tinder-Style)
- Live-Chat zwischen Käufer & Verkäufer
- Favoriten & Matches
- Umfangreiche Filter (13 Kategorien)
- AI-Preis-Analyse
- Verkäufer-Bewertungen
- 100+ Ausstattungsmerkmale

## 🎨 Design
- Premium Blau/Orange Farbschema
- Inspiriert von Apple, Porsche & Audi
- Elegant & minimalistisch

## 🔧 Technologie
- React 18
- Lucide Icons
- Tailwind CSS (via CDN)
- LocalStorage für Daten

## ⚠️ Hinweis
Aktuell nutzt die App LocalStorage - jeder Nutzer hat seine eigene Daten-Instanz.
Für echtes Multi-User Testing brauchst du ein Backend (Firebase/Supabase).

## 📧 Support
Bei Fragen oder Problemen, melde dich!

---
Made with ❤️ by Jonas
