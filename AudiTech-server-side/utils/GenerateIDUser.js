function generateCustomId(year, type, index) {
  const indexStr = index.toString().padStart(3, '0');
  const customId = `${year}${type}${indexStr}`;
  return customId;
}

module.exports = { generateCustomId };
