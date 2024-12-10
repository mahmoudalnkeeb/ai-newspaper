const { GROQ_API_KEY } = require('../config');

const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: GROQ_API_KEY });

async function chatCompletion(messages, model, temperature, max_tokens) {
  return await groq.chat.completions.create({
    messages,
    model,
    temperature,
    max_tokens,
    response_format: { type: "json_object" }
  });
}

module.exports = {
  chatCompletion,
};
