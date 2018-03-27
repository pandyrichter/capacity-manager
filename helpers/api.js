const Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyMMhm1hEx7OtaIC'}).base('apputYC83th3otdfX');

module.exports = {
  retriveBase () {
    base('Team Tracking').select({
      // Selecting the first 3 records in Main View:
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      const projects = []
      records.forEach(function(record) {
          projects.push(record);
      });
    
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
      console.log(projects);
      return projects;
    }, function done(err) {
      if (err) { console.error(err); return; }
    });
  }
}