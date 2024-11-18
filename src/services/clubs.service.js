const axios = require("axios");
const cheerio = require("cheerio");

const getClubs = async () => {
  try {
    const response = await axios.get("https://www.transfermarkt.co.id/bri-liga-1-indonesia/startseite/wettbewerb/IN1L");
    const html = response.data;
    const $ = cheerio.load(html);
    const data = [];
    
    $("table.items tbody tr").each((index, element) => {
      const logo = $(element).find("td:nth-child(1) img").attr("src");
      const club = $(element).find("td:nth-child(2) a").first().text().trim();
      const squadSize = $(element).find("td:nth-child(3) a").text().trim();
      const averageAge = $(element).find("td:nth-child(4)").text().trim();
      const foreigners = $(element).find("td:nth-child(5)").text().trim();
      const averageMarketValue = $(element).find("td:nth-child(6)").text().trim();
      const totalMarketValue = $(element).find("td:nth-child(7) a").text().trim();

      if (logo && club && squadSize && averageAge && foreigners && averageMarketValue && totalMarketValue) {
        data.push({
          logo: logo ? logo : null,
          club,
          squadSize: parseInt(squadSize) || 0,
          averageAge: parseFloat(averageAge.replace(",", ".")) || 0,
          foreigners: parseInt(foreigners) || 0,
          averageMarketValue,
          totalMarketValue,
        });
      }
    });

    return data;
  } catch (error) {
    throw new Error(`Error fetching clubs: ${error.message}`);
  }
};

module.exports = {
  getClubs
};
