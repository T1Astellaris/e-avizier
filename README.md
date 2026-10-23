# Stellaris Residencias — Avizier digital

Site static publicat prin GitHub Pages, cu domeniul asociatiastellaris.ro.

## Fișiere

- `index.html`: structura paginii și textele fixe.
- `styles.css`: aspectul vizual și adaptarea pentru telefon.
- `config.js`: **aici se completează URL-urile documentelor**, anunțurile și contactul.
- `app.js`: funcțiile de afișare, selectorul de lună și vizualizatorul PDF.
- `assets/stellaris-residencias.png`: logo cu fundal transparent.
- `CNAME`: domeniul propriu; păstrați fișierul la publicare.

## Unde se introduc URL-urile

Deschideți **config.js** în GitHub și apăsați Edit. Căutați marcajele:

- **URL-URI DOCUMENTE STANDARD** pentru cele trei formulare.
- **PDF ÎNTREȚINERE** pentru lista lunară.

Lipiți linkul între ghilimelele câmpului `url: ""`. Aceste câmpuri sunt în cod, nu sunt formulare publice de încărcare. Un URL gol păstrează documentul nepublicat.

### PDF lunar

1. Încărcați PDF-ul anonimizat în Google Drive.
2. În Partajare, selectați „Oricine are linkul”, rol Cititor, cu descărcarea permisă.
3. Copiați linkul fișierului, nu al folderului.
4. Completați în `maintenance`:

```js
maintenance: [
  {
    label: "Octombrie 2026",
    url: "https://drive.google.com/file/d/ID_FISIER/view",
  },
],
```

Cel mai recent document se pune primul. Pentru arhivă, păstrați obiectele vechi și câte un fișier distinct pentru fiecare lună. Site-ul generează linkurile Drive pentru previzualizare, deschidere și descărcare. Se poate folosi și un URL HTTPS direct către PDF, dacă serverul permite încorporarea.

Pentru un link permanent fără arhivă, folosiți „Gestionați versiunile” în Drive pe același fișier; actualizați luna în configurație. Intrările vechi care folosesc același URL vor afișa ultima versiune, deci această metodă nu creează o arhivă.

### Documente standard

Completați fiecare `url` din `documents`. Puteți modifica și `title` și `description`. Un link gol afișează „În curs de publicare”.

### Anunțuri și contact

Adăugați anunțuri în `announcements`, cele recente primele:

```js
{ title: "Titlul anunțului", text: "Detalii", date: "23 octombrie 2026", important: true },
```

Completați `contactEmail` doar cu adresa confirmată. Câmpul este momentan gol. Nu inventați o adresă prin eliminarea unor litere din cea veche. Anunțurile istorice se editează în `index.html`.

Actualizați `updatedAt` când publicați informații noi. Salvați modificările pe `main`; GitHub Pages republică site-ul.

## Verificare

```sh
node --check config.js
node --check app.js
```

Verificați și în browser linkurile, selectorul lunii și afișarea pe telefon. Fișierele sunt publice; nu introduceți parole sau chei în configurație.
