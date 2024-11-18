const fixturesService = require('../services/fixtures.service');

const getFixtures = async (req, res, next) => {
  try {
    const fixtures = await fixturesService.getFixtures();
    res.json(fixtures);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFixtures,
};
