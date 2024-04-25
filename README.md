## Ger: Geocaching - Nachbau

App verfügbar unter https://geocaching-amberg.netlify.app

Die App ist eine Studienleistung, die unter folgenden Vorgaben entwickelt wurde: Die Aufgabe bestand darin, eine Geocaching-App zu erstellen, die auf React (PWA) oder React Native basiert und eine Online-Karte verwendet. Die App sollte QR-Code- oder NFC-Unterstützung, eine XML-Ausgabe sowie Sprachausgabe bieten. Die Entwicklung war nur für eine Plattform (Android oder iOS) erforderlich. Hier sind die genaueren Aufgaben:

  ### 1. Verstecken-Phase:

  Bei der Auswahl eines Geocaches, der im Bereich des Amberger Gartenschaugeländes versteckt werden soll, sollte dieser Gegenstand zusammen mit den aktuellen geographischen Koordinaten gespeichert werden.

  Die Auswahl des Geocaches konnte auf zwei Arten erfolgen:
    - Durch das Scannen eines QR-Codes oder das Einlesen eines NFC-Tags.
    - Durch die Auswahl aus einer Dropdown-Liste (sodass man die Funktionalität auch ohne Kamera testen kann).

  Anschließend sollte der Geocache auf der Karte als Marker mit einem Symbol an der entsprechenden Position angezeigt werden. Dabei waren insgesamt 10 unterschiedliche Symbolbilder verfügbar.

 ### 2. Suchphase:
  
  Alle Marker mussten von der Karte entfernt werden.
  Bei aktiviertem GPS und Annäherung an einen Geocache innerhalb eines bestimmten Radius sollte die App die Bezeichnung des Geocaches per Sprachausgabe vorlesen und in einem Pop-Up anzeigen.
  Wenn der passende QR-Code gescannt wurde, markierte die App den Cache als gefunden und zeigte den entsprechenden Marker auf der Karte an.

 ### 3. Einstellungsmenü:
  
  Es sollte eine Liste der bisher gefundenen und noch ausstehenden Geocaches angezeigt werden können. Der Suchradius sollte einstellbar sein. Außerdem sollte es eine Möglichkeit geben, die Sprachausgabe ein- oder auszuschalten. Des Weiteren sollten die Caches als XML-Datei im GPX-Format exportiert und lokal gespeichert werden können. Dabei sollte die Datei Informationen wie Bezeichnung, Geokoordinaten, Status (gefunden / nicht gefunden) und die Uhrzeit, zu der der Cache gefunden wurde, enthalten.

  ## Eng: Geocaching - Replica

App available at https://geocaching-amberg.netlify.app

The app is a study achievement that was developed under the following specifications: The task was to create a geocaching app that is based on React (PWA) or React Native and uses an online map. The app was to offer QR code or NFC support, XML output and voice output. Development was only required for one platform (Android or iOS). Here are the more detailed tasks:

 ### 1. Hiding phase:

  When selecting a geocache to be hidden in the Amberg Garden Show area, this item should be saved together with the current geographical coordinates.

  The geocache could be selected in two ways:
    - By scanning a QR code or by scanning an NFC tag.
    - By selecting from a drop-down list (so that the functionality can also be tested without a camera).

  The geocache should then be displayed on the map as a marker with an icon at the corresponding position. A total of 10 different symbol images were available.

 ### 2. search phase:
  
  All markers had to be removed from the map.
  With GPS activated and approaching a geocache within a certain radius, the app should read out the name of the geocache via voice output and display it in a pop-up.
  When the matching QR code was scanned, the app marked the cache as found and displayed the corresponding marker on the map.

 ### 3. settings menu:
  
  It should be possible to display a list of previously found and pending geocaches. The search radius should be adjustable. There should also be an option to switch the voice output on or off. It should also be possible to export the caches as an XML file in GPX format and save them locally. The file should contain information such as name, geocoordinates, status (found / not found) and the time at which the cache was found.

