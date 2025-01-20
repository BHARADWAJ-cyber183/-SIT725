const VulnerabilityModel = require('../models/vulnerabilityModel');

const scan = (socket) => {
  socket.on('start-scan', (data) => {
    const { url } = data;
    if (!url) {
      socket.emit('scan-update', { message: 'URL is required' });
      return;
    }

    VulnerabilityModel.scanWebsite(url, (update) => {
      socket.emit('scan-update', update);
    });
  });
};

module.exports = { scan };
