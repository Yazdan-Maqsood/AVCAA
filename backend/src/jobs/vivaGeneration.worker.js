// Worker to generate viva questions asynchronously
// Uses BullMQ (scaffolding)
export const vivaGenerationWorker = async (job) => {
  const { submissionId } = job.data;
  try {
    // Logic to call Python AI and generate questions
    console.log(`Processing viva generation for submission ${submissionId}`);
  } catch (error) {
    console.error('Viva Generation Worker Error:', error);
  }
};