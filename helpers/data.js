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

 function checkForBatch(offset = "") {
  const apiUrl = `${config.api}${offset}`;
  const apiAuth = `${config.key}`;
  let projects = []

  axios
    .get(apiUrl, {
      headers: { Authorization: apiAuth }
    })
    .then(res => {
      projects = [...res.data.records];
      checkForOffset(res.data.offset);
      console.log(projects);
    });
}

function checkForOffset(offset) {
  // offset indicates additional records in Airtable
  offset
    ? checkForBatch(`?offset=${offset}`)
    : console.log("No more offsets");
}

module.exports = { checkForBatch };
