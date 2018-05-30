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
      base('Project Tracking').select({
        view: "Main View"
      }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
            projects.push(record);
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
            teams.push(record);
        });

        fetchNextPage();
        
      }, function done(err) {
        if (err) { reject(err); return; }
        resolve(teams);
    });
  });
};

function fetchProjectManagers() {
  Airtable.configure({
    endpointUrl: config.api,
    apiKey: config.key
  });

  const base = Airtable.base(config.base);

  let pms = [];

  return new Promise ((resolve, reject) => {
      base('Project Managers').select({
        view: "Grid view"
      }).eachPage(function page(records, fetchNextPage) {

        records.forEach(function(record) {
            pms.push(record);
        });

        fetchNextPage();
        
      }, function done(err) {
        if (err) { reject(err); return; }
        resolve(pms);
    });
  });
};

function lookupTeamById (ts, tid) {
  try {
    const tObj = ts.find(t => t.id === tid);
    // fields prop is specific to Airtable
    // "Team Name" is BW field
    const tName = tObj.fields["Team Name"];
    return tName;
  } catch (err) {
    return "Unassigned";
  }
};

function lookupPmById (pms, pmid) {
  try {
    const pmObj = pms.find(pm => pm.id === pmid);
    // fields prop is specific to Airtable
    // "Name" is BW field
    const pmName = pmObj.fields["Name"];
    return pmName;
  } catch (err) {
    return "Unassigned";
  }
};

module.exports = { 
  fetchProjectRecords, 
  fetchTeams, 
  fetchProjectManagers,
  lookupTeamById,
  lookupPmById
};
