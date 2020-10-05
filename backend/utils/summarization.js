const SummarizerManager = require("node-summarizer").SummarizerManager;

function summarize (text) {
  let Summarizer = new SummarizerManager(text.body, text.numSentences);
  Summarizer.getSummaryByRank().then(summary_obj => {
    return summary_obj.summary;
  });
}

module.exports = summarize;
