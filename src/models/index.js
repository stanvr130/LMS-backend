// src/models/index.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import sequelize from '../config/database.js';

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

// Dynamically import all model files
const modelFiles = fs.readdirSync(__dirname).filter(
  file => file !== 'index.js' && file.endsWith('.js')
);

for (const file of modelFiles) {
  const { default: modelDefiner } = await import(path.join(__dirname, file));
  const model = modelDefiner(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Run associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;