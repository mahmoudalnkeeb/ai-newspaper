const { GROQ_MODEL } = require('../config');
const { chatCompletion } = require('./completions');
const { articleSchema } = require('./schemas');

async function createArticle(role, topic, instructions, uniqunessLevel = 0.5) {
  if (!role || !topic || !instructions) {
    throw new Error('Missing required parameters');
  }
  if (typeof uniqunessLevel !== 'number' || uniqunessLevel < 0 || uniqunessLevel > 1) {
    console.log(uniqunessLevel);

    throw new Error('Uniquness level must be a number between 0 and 1');
  }

  const messages = [
    {
      role: 'system',
      content: `You are ${role} also has a good journalism and writing skills, the outputs should be highly accurate and informative in JSON.\n'The JSON object must use this exact schema: ${JSON.stringify(
        articleSchema,
        null,
        2
      )}`,
    },
    {
      role: 'system',
      content: `consider those guidelines: ${instructions} \n it's highly important if characters can break json they must be esacaped example of character that can break json is the colon ":" example of character that can break json is the double quote " " and single quote ' ' example of character that can break json is the backslash "\\" also if the character is not escaped it must be removed`,
    },
    {
      role: 'user',
      content: topic,
    },
  ];

  const response = await chatCompletion(messages, GROQ_MODEL, uniqunessLevel, 2048);
  const [choice, ..._rest] = response.choices;

  return choice?.message?.content || '{}';
}

module.exports = {
  createArticle,
};
