import config from "../config";
import Airtable from "airtable";

function fetchProjectRecords() {
  Airtable.configure({
    endpointUrl: config.api,
    apiKey: config.key
  });

  const base = Airtable.base(config.base);

  let projects = [];

  return new Promise ((resolve, reject) => {
      base('Team Tracking').select({
        view: "Main View"
      }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
            projects.push(record.fields);
        });

        fetchNextPage();
        
      }, function done(err) {
        if (err) { reject(err); return; }
        resolve(projects);
    });
  });
};

function fetchTeams() {
  Airtable.configure({
    endpointUrl: config.api,
    apiKey: config.key
  });

  const base = Airtable.base(config.base);

  let teams = [];

  return new Promise ((resolve, reject) => {
      base('Teams').select({
        view: "Grid view"
      }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
            teams.push(record.fields);
        });

        fetchNextPage();
        
      }, function done(err) {
        if (err) { reject(err); return; }
        resolve(teams);
    });
  });
};

module.exports = { fetchProjectRecords, fetchTeams };
