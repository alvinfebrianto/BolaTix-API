const clubsService = require('../services/clubs.service');

const getClubs = async (req, res, next) => {
  try {
    const clubs = await clubsService.getClubs();
    res.json(clubs);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getClubs,
};
