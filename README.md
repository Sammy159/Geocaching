 Die App ist eine Studienleistung, die unter folgenden Vorgaben entwickelt wurde: Die Aufgabe bestand darin, eine Geocaching-App zu erstellen, die auf React (PWA) oder React Native basiert und eine Online-Karte verwendet. Die App sollte QR-Code- oder NFC-Unterstützung, eine XML-Ausgabe sowie Sprachausgabe bieten. Die Entwicklung war nur für eine Plattform (Android oder iOS) erforderlich. Hier sind die genaueren Aufgaben:

  1. Verstecken-Phase:

  Bei der Auswahl eines Geocaches, der im Bereich des Amberger Gartenschaugeländes versteckt werden soll, sollte dieser Gegenstand zusammen mit den aktuellen geographischen Koordinaten gespeichert werden.

  Die Auswahl des Geocaches konnte auf zwei Arten erfolgen:
    - Durch das Scannen eines QR-Codes oder das Einlesen eines NFC-Tags.
    - Durch die Auswahl aus einer Dropdown-Liste (sodass man die Funktionalität auch ohne Kamera testen kann).

  Anschließend sollte der Geocache auf der Karte als Marker mit einem Symbol an der entsprechenden Position angezeigt werden. Dabei waren insgesamt 10 unterschiedliche Symbolbilder verfügbar.

  2. Suchphase:
  
  Alle Marker mussten von der Karte entfernt werden.
  Bei aktiviertem GPS und Annäherung an einen Geocache innerhalb eines bestimmten Radius sollte die App die Bezeichnung des Geocaches per Sprachausgabe vorlesen und in einem Pop-Up anzeigen.
  Wenn der passende QR-Code gescannt wurde, markierte die App den Cache als gefunden und zeigte den entsprechenden Marker auf der Karte an.

  3. Einstellungsmenü:
  
  Es sollte eine Liste der bisher gefundenen und noch ausstehenden Geocaches angezeigt werden können. Der Suchradius sollte einstellbar sein. Außerdem sollte es eine Möglichkeit geben, die Sprachausgabe ein- oder auszuschalten. Des Weiteren sollten die Caches als XML-Datei im GPX-Format exportiert und lokal gespeichert werden können. Dabei sollte die Datei Informationen wie Bezeichnung, Geokoordinaten, Status (gefunden / nicht gefunden) und die Uhrzeit, zu der der Cache gefunden wurde, enthalten.
