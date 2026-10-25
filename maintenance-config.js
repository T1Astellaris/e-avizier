/** Selectarea blocurilor pentru listele de întreținere. */
// Pentru a afișa T1B / T2B, schimbați enabled: false în enabled: true.
SITE.maintenanceBuildings = [
  { id: "T1A", enabled: true },
  { id: "T2A", enabled: true },
  { id: "T1B", enabled: false },
  { id: "T2B", enabled: false },
];

// Listele existente fără câmpul building aparțin T1A.
// La listele noi din config.js, adăugați building: "T2A" (sau blocul dorit).
SITE.maintenanceDefaultBuilding = "T1A";
