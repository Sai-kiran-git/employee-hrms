// src/workers/standardEventWorker.js

console.log("Standard Event Worker initialized");

// If you're using Bull/Redis later, this is where you process jobs
const standardEventWorker = {
  process: async (job) => {
    console.log("Processing job:", job.data);

    // simulate work
    return {
      success: true,
      message: "Job processed successfully"
    };
  }
};

module.exports = standardEventWorker;