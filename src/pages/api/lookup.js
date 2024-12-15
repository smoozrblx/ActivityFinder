import fs from 'fs';
import path from 'path';
import removeAccents from 'remove-accents';
import { TfIdf } from 'natural';
import fuzzy from 'fuzzy';

const directoryPath = path.join(process.cwd(), './src/db/');

let TfIdfInstance = undefined;
let Activities = {};


async function getDataSetTFIDF() {

  const tfidfFile = path.join(directoryPath, 'tfidf.json');
  const tfidfExists = (fs.existsSync(tfidfFile));

  if (TfIdfInstance != undefined && tfidfExists) {
    return undefined;
  }

  try {

    if (tfidfExists) {
      let fileContent = fs.readFileSync(tfidfFile);
      let data = JSON.parse(fileContent);
      TfIdfInstance = new TfIdf(data.tfidf);
      Activities = data.activities;
      return;
    }

    const files = (await fs.promises.readdir(directoryPath)).filter(file => file.startsWith('list') && file.endsWith('.json'));

    let allActivities = [];
    
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const activities = JSON.parse(fileContent);
      allActivities = [...allActivities, ...activities];
    }

    allActivities = removeDuplicates(allActivities);

    TfIdfInstance = new TfIdf();
    allActivities.forEach((activity, index) => {
      const keywords = activity.keywords ? activity.keywords.join(" ") : " ";
      TfIdfInstance.addDocument(removeAccents(activity.name + " " + keywords + activity.description + (activity.price.free ? " gratuit" : "")));
      Activities[index] = activity;
    });

    const result = { activities: Activities, tfidf: TfIdfInstance };
    await fs.promises.writeFile(tfidfFile, JSON.stringify(result));

  } catch (error) {
    console.error('Error processing files:', error);
  }
}

function removeDuplicates(activities) {
  const normalizedActivities = [];
  const seen = new Map();

  activities.forEach(activity => {
    const normalizedName = normalizeText(activity.name);

    const existing = Array.from(seen.keys()).find(existingName => fuzzy.match(normalizedName, existingName));

    if (existing) {
      const existingActivity = seen.get(existing);
      existingActivity.description += ' ' + activity.description;
    } else {
      seen.set(normalizedName, activity);
      normalizedActivities.push(activity);
    }
  });

  return normalizedActivities;
}

function normalizeText(text) {
  return removeAccents(text.toLowerCase().replaceAll("'", " ")).split(" ").map(word => word.endsWith('s') ? word.substring(0, word.length - 1) : word).join(" ");
}


export default async function handler(req, res) {

  await getDataSetTFIDF();
  const { query } = req.query;

  if (query) {
    const normalizedQuery = normalizeText(query);
    let result = [];
    TfIdfInstance.tfidfs(normalizedQuery, function(i, measure) {
      let activity = Activities[i];
      activity.score = measure;
      if (measure > 0) result.push(activity);
    });
    result = result.sort((a, b) => b.score - a.score).slice(0, 10);
    res.status(200).json(result);
  } 

  res.status(200).json([]);
}
