import axios from "axios";
import config from "../config";
import configAlt from "../config-alt";
import Airtable from "airtable";

function callAirtableLibrary() {
  Airtable.configure({
    endpointUrl: configAlt.api,
    apiKey: configAlt.key
  });

  const base = Airtable.base(configAlt.base);

  let projects = [];

  base('Team Tracking').select({
    view: "Main View"
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        projects.push(record.fields);
    });
    fetchNextPage();
    
  }, function done(err) {
    if (err) { console.error(err); return; }
    return projects;
});
}

function loadProjectsFromAirtable () {
  loadNextBatch();
}

async function loadNextBatch() {
  // this needs to be a recursive function...
  let projects = [];
  let firstBatch = await loadSingleBatch();
  projects = [...projects, ...firstBatch.records];
  
  if (firstBatch.offset) {
    let secondBatch = await loadSingleBatch(`?offset=${firstBatch.offset}`);
    projects = [...projects, ...secondBatch.records];
    console.log(projects);
  }
}

function loadSingleBatch(offset = "") {
  const apiUrl = `${config.api}${offset}`;
  const apiAuth = `${config.key}`;

  return axios
    .get(apiUrl, {
      headers: { Authorization: apiAuth }
    })
    .then(res => {
      const batch = {
        records: res.data.records,
        offset: res.data.offset
      }
      return batch;
    });
}

function pushBatch(batch, arr) {
  return arr = [...arr, ...batch]
}

function checkForOffset(offset, target) {
  // offset indicates additional records in Airtable
  offset
    ? loadNextBatch(`?offset=${offset}`, target)
    : "No offset";
}

export default loadProjectsFromAirtable;
