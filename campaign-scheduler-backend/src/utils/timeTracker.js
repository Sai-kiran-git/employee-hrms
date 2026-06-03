const startTimer = () => Date.now();

const endTimer = (startTime) => {
  return Date.now() - startTime;
};

module.exports = { startTimer, endTimer };