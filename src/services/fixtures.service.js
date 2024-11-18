const axios = require('axios');
const cheerio = require('cheerio');

const getFixtures = async () => {
  try {
    const response = await axios.get('https://www.bola.net/jadwal-pertandingan/indonesia.html');
    const html = response.data;
    const $ = cheerio.load(html);
    const fixtures = [];
    const stadiumPromises = [];

    $('.ligaList_item').each((i, ligaItem) => {
      const date = $(ligaItem).find('.main-table thead th').first().text().trim();

      $(ligaItem).find('.main-table tbody tr').each((i, element) => {
          const homeTeam = $(element).find('.team-row-name').first().text().trim();
          const awayTeam = $(element).find('.team-row-name').last().text().trim();
          const time = $(element).find('td').eq(1).text().trim();
          const detailLink = $(element).find('.table_link').attr('href');

          if (detailLink) {
            const fullDetailLink = detailLink.startsWith('http') ? detailLink : `https://www.bola.net${detailLink}`;

            const stadiumPromise = getStadium(fullDetailLink)
              .then((stadium) => {
                fixtures.push({
                  date,
                  homeTeam,
                  awayTeam,
                  time,
                  detailLink: fullDetailLink,
                  stadium,
                });
              })
              .catch((err) => {
                console.error(`Error fetching stadium from ${fullDetailLink}:`,err);
                fixtures.push({
                  date,
                  homeTeam,
                  awayTeam,
                  time,
                  detailLink: fullDetailLink,
                  stadium: null,
                });
              });

            stadiumPromises.push(stadiumPromise);
          }
        });
    });

    await Promise.all(stadiumPromises);
    return fixtures;
  } catch (error) {
    throw new Error(`Error fetching schedule: ${error.message}`);
  }
};

const getStadium = async (detailLink) => {
  try {
    const response = await axios.get(detailLink);
    const html = response.data;
    const $ = cheerio.load(html);
    const stadium = $('.team-full').text().trim();
    return stadium;
  } catch (error) {
    console.error('Error fetching stadium:', error);
    return null;
  }
};

module.exports = {
  getFixtures,
};
