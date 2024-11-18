const express = require('express');
const clubsRoutes = require('./routes/clubs.route');
const fixturesRoutes = require('./routes/fixtures.route');
const standingsRoutes = require('./routes/standings.route');
const errorHandler = require('./middleware/error.middleware');

const app = express();

app.use(express.json());

const API_ENDPOINTS = [
  {
    path: '/api/clubs',
    method: 'GET',
    response: [
      {
        logo: 'string | null',
        club: 'string',
        squadSize: 'number',
        averageAge: 'number',
        foreigners: 'number',
        averageMarketValue: 'string',
        totalMarketValue: 'string',
      },
    ],
  },
  {
    path: '/api/fixtures',
    method: 'GET',
    response: [
      {
        date: 'string',
        homeTeam: 'string',
        awayTeam: 'string',
        time: 'string',
        detailLink: 'string',
        stadium: 'string',
      },
    ],
  },
  {
    path: '/api/standings',
    method: 'GET',
    response: [
      {
        position: 'string',
        club: 'string',
        logo: 'string',
        played: 'string',
        won: 'string',
        drawn: 'string',
        lost: 'string',
        goals: 'string',
        goalDifference: 'string',
        points: 'string',
      },
    ],
  },
];

app.get('/', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const endpoints = API_ENDPOINTS.map((endpoint) => ({
    ...endpoint,
    fullPath: `${baseUrl}${endpoint.path}`,
  }));

  res.json({
    name: 'BolaTix API',
    endpoints,
  });
});

app.use('/api/clubs', clubsRoutes);
app.use('/api/fixtures', fixturesRoutes);
app.use('/api/standings', standingsRoutes);

app.use(errorHandler);

module.exports = app;
