# Stellaris T1A — Avizier digital

Site static publicat prin GitHub Pages: https://t1astellaris.github.io/e-avizier/

## Actualizarea conținutului
Deschideți index.html în GitHub, apăsați Edit și căutați const SITE =.
Salvați modificările pe main. GitHub Pages va republica site-ul.

### PDF lunar
1. Încărcați PDF-ul anonimizat în Google Drive.
2. În Partajare, selectați „Oricine are linkul” cu rol Cititor. Permiteți descărcarea.
3. Copiați linkul fișierului (nu linkul unui folder).
4. În maintenance adăugați primul obiect:
   {label:"Septembrie 2026", url:"https://drive.google.com/file/d/ID_FISIER/view"},
5. Păstrați obiectele lunilor anterioare pentru arhivă. Primul apare implicit.
Site-ul transformă automat linkul Drive în preview și link de descărcare.
Se poate folosi și un URL HTTPS direct către un PDF, dacă serverul permite încorporarea.

Pentru un link permanent, în Drive folosiți „Gestionați versiunile” pe același fișier și încărcați noua versiune. Actualizați eticheta lunii în site. Dacă doriți o arhivă lunară, păstrați separat fiecare PDF; altfel intrările vechi către același fișier vor afișa și ele ultima versiune.

### Documente
În documents completați url cu linkul Drive al fiecărui formular.
Puteți schimba title și description. Un link gol afișează „În curs de publicare”.

### Anunțuri
În announcements adăugați obiecte de forma:
{title:"Titlul anunțului", text:"Conținutul anunțului.", date:"22 octombrie 2026", important:true},
Cele mai recente se pun primele. Textul este afișat ca text simplu.
Anunțurile istorice sunt în secțiunea HTML „Arhiva anunțurilor”.

### Contact
Adresa existentă a asociației este păstrată. Programul și telefonul trebuie completate numai după confirmare.
Actualizați și data „Site actualizat” când publicați informații noi.

Nu există încărcare directă din pagina publică sau panou de administrare.
Publicarea se face prin Drive și editarea configurației din GitHub.
Nu introduceți parole sau chei în site: toate fișierele sunt publice.
