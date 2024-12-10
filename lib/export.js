const fs = require('fs');
const path = require('path');

function  exportAsJson(title , data) {
  const timestamp = Date.now();
  const fileName = `${timestamp}-${title.replace(/\s+/g, '-').toLowerCase()}.json`;
  const articlesDir = path.join(__dirname, '../articles');
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir);
  }
  const filePath = path.join(articlesDir, fileName);

  fs.writeFileSync(filePath, data);
  console.log(`Exported data to ${filePath}`);
}


module.exports = {
  exportAsJson,
};
