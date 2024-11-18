const standingsService = require('../services/standings.service');

const getStandings = async (req, res, next) => {
  try {
    const standings = await standingsService.getStandings();
    res.json(standings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStandings,
};
