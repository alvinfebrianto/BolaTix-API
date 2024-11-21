const axios = require("axios");
const Papa = require("papaparse");

async function getPurchaseHistory() {
  try {
    const response = await axios.get(
      "https://docs.google.com/spreadsheets/d/1CJNqkkjJyAO-xipum8i9pl9PtJPCXs3v2CLw9DZ-_S8/gviz/tq?tqx=out:csv"
    );

    const parsedData = Papa.parse(response.data, {
      header: false,
      skipEmptyLines: true,
    });
    const schedule = [];

    for (let i = 1; i < parsedData.data.length; i++) {
      const row = parsedData.data[i];

      if (row.length < 12) continue;

      const matchData = {
        idMatch: row[1],
        home: row[2],
        away: row[3],
        match: row[4],
        jumlahTiketTerjual: row[5],
        stadion: row[6],
        lokasi: row[7],
        hari: row[8],
        waktu: row[9],
        tanggal: row[10],
        jam: row[11],
      };

      schedule.push(matchData);
    }
    const purchaseHistory = generatePurchaseHistory(schedule).slice(0, 5);

    return purchaseHistory;
  } catch (error) {
    throw new Error(`Error fetching purchase history: ${error.message}`);
  }
}

function generatePurchaseHistory(schedule) {
  const users = [
    { userId: 1, name: "Aransha" },
    { userId: 2, name: "Aryo" },
    { userId: 3, name: "Jeffry" },
    { userId: 4, name: "Kiki" },
  ];

  const purchaseHistory = [];

  schedule.forEach((match) => {
    if (users.length === 0) return;

    const randomUser = users.pop();

    purchaseHistory.push({
      userId: randomUser.userId,
      userName: randomUser.name,
      idMatch: match.idMatch.replace(/^"|"$/g, ""),
      match: `${match.home.replace(/^"|"$/g, "")} vs ${match.away.replace(
        /^"|"$/g,
        ""
      )}`,
      date: match.tanggal.replace(/^"|"$/g, ""),
      time: match.jam.replace(/^"|"$/g, "").split(":").slice(0, 2).join(":"),
      stadium: match.stadion.replace(/^"|"$/g, ""),
    });
  });

  return purchaseHistory;
}

module.exports = {
  getPurchaseHistory,
};
