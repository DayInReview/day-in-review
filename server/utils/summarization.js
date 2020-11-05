const SummarizerManager = require("node-summarizer").SummarizerManager;

async function summarize (text) {
  let Summarizer = new SummarizerManager(text.body, text.numSentences);
  const summary_obj = await Summarizer.getSummaryByRank();
  return summary_obj.summary;
}

module.exports = summarize;
