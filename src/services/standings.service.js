const axios = require('axios');
const cheerio = require('cheerio');

const getStandings = async () => {
  try {
    const response = await axios.get('https://www.bola.net/klasemen/indonesia.html');
    const html = response.data;
    const $ = cheerio.load(html);
    const standings = [];

    $('.main-table tbody tr').each((index, element) => {
      const position = $(element).find('.team-row-pos').text().trim();
      const club = $(element).find('.clubBox-name').text().trim();
      const logo = $(element).find('.clubBox-logo img').attr('src');
      const played = $(element).find('td').eq(0).text().trim();
      const won = $(element).find('td').eq(2).text().trim();
      const drawn = $(element).find('td').eq(3).text().trim();
      const lost = $(element).find('td').eq(4).text().trim();
      const goals = $(element).find('td').eq(5).text().trim();
      const goalDifference = $(element).find('td').eq(6).text().trim();
      const points = $(element).find('td').eq(1).text().trim();

      standings.push({
        position,
        club,
        logo,
        played,
        won,
        drawn,
        lost,
        goals,
        goalDifference,
        points,
      });
    });

    return standings;
  } catch (error) {
    throw new Error(`Error fetching standings: ${error.message}`);
  }
};

module.exports = {
  getStandings,
};
