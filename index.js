const { createArticle } = require('./lib/articles');
const { exportAsJson } = require('./lib/export');

async function main() {
  const role = 'Senior Software Engineer';
  const instructions = `the article should be detailed and informative,the should be a good quality article, the article should be detailed explaining the topic use this as guidline "https://codahale.com/a-lesson-in-timing-attacks/", use code blocks and specify the language used in the code block `;
  const articleTopic = "Timing attacks and how to prevent them";
  const article = await createArticle(role, articleTopic, instructions, 1);

  exportAsJson(articleTopic, article);

  console.log('Done');
}

main();
