import axios from "axios";
import config from "../config";

/* 
LOAD DATA
1 Load initial batch from Airtable
2 Save records from inital batch to projects array
3 If batch contains offset:
  Load records using offset in params
  Save records to state
4 If batch doesnt contain offset:
  Stop
*/

// TODO: Replace projects - this is placeholder for state only
async function loadProjectsFromAirtable () {
  console.log('Calling Airtable');
  let firstBatch = await checkForBatch();
  console.log('First batch:', firstBatch);
}

// each offset requires a call back to Airtable
// can't run a forEach/map because number of offsets is unknown
// need to return the batch and indicate whether an offset exists

function checkForBatch(offset = "") {
  const apiUrl = `${config.api}${offset}`;
  const apiAuth = `${config.key}`;

  return axios
    .get(apiUrl, {
      headers: { Authorization: apiAuth }
    })
    .then(res => {
      let batchrecords = res.data.records;
      console.log(batchrecords);
      return batchrecords;
    });
}

// function checkForOffset(offset) {
//   // offset indicates additional records in Airtable
//   offset
//     ? checkForBatch(`?offset=${offset}`)
//     : console.log("No more offsets");
// }

module.exports = { loadProjectsFromAirtable, checkForBatch };
