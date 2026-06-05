const redis = require("../config/redis"); // your existing redis client

const QUEUE_KEY = "standard_events_queue";

/** Push single event to Redis queue*/
const pushToQueue = async (event) => {
  await redis.rpush(QUEUE_KEY, JSON.stringify(event));
};

/*** Drain all events from Redis queue (used by cron)*/
const drainQueue = async () => {
  const total = await redis.llen(QUEUE_KEY);
  if (total === 0) return [];

  const pipeline = redis.pipeline();
  pipeline.lrange(QUEUE_KEY, 0, total - 1);
  pipeline.ltrim(QUEUE_KEY, total, -1);
  const [[, rawItems]] = await pipeline.exec();

  return rawItems
    .map((item) => {
      try { return JSON.parse(item); }
      catch { return null; }
    })
    .filter(Boolean);
};

/*** Get current queue length (for monitoring)*/
const getQueueLength = async () => {
  return await redis.llen(QUEUE_KEY);
};

module.exports = { pushToQueue, drainQueue, getQueueLength };