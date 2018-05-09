import config from "../config";
import Airtable from "airtable";

function retrieveAirtableData() {
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

export default retrieveAirtableData;
