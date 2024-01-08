const mongoose = require("mongoose");

/*async function getHighestId(modelName) {
  const Model = mongoose.model(modelName);
  const highestEntry = await Model.findOne().sort("-id").exec();
  if (highestEntry && highestEntry.id) {
    return parseInt(highestEntry.id.substring(3));
  }
  return 0;
}

async function generateCustomId(modelName, prefix) {
  const lastId = await getHighestId(modelName);
  const nextId = lastId + 1;
  const paddedId = nextId.toString().padStart(3, "0");
  return `${prefix}${paddedId}`;
}*/


async function getHighestId(modelName, idPath) {
  const Model = mongoose.model(modelName);
  const highestEntry = await Model.findOne().sort(`-${idPath}`).exec();
  if (highestEntry && highestEntry[idPath]) {
    return parseInt(highestEntry[idPath].substring(3));
  }
  return 0;
};

async function generateCustomId(modelName, prefix, idPath) {
  const lastId = await getHighestId(modelName, idPath);
  const nextId = lastId + 1;
  const paddedId = nextId.toString().padStart(3, "0");
  return `${prefix}${paddedId}`;
};


module.exports = { generateCustomId };
