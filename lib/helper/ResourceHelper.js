const parse = require('csv-parse');

const conv = require('iconv-lite');
const http = require('http');

module.exports.getSourceUrl = function (locationTag, week) {
  return `http://www.stwno.de/infomax/daten-extern/csv/${locationTag}/${week}.csv`;
};

module.exports.getCurrentWeek = function () {
  return new Date().getWeek();
};

module.exports.fetchMenuAsync = async function (locationTag, week) {
  let url = this.getSourceUrl(locationTag, week);
  const response = await getContent(url);
  return response;
};

module.exports.parseMenu = function (response) {
  return new Promise((resolve, reject) => {
    parse(response, {
      delimiter: ';',
      columns: true
    }, function (err, out) {
      if (err) {
        reject(err);
      }

      let cleaned = [];
      out.forEach(item => {
        let details = [];
        let rawDetails = item.name.match(/(?=\().+?(?:\))/);
        if (rawDetails && rawDetails[0]) {
          details = rawDetails[0].replace(/[{()}]/g, '').split(',');
        }

        let day;
        switch (item.tag.toLowerCase()) {
          case 'mo':
            day = 'monday';
            break;

          case 'di':
            day = 'tuesday';
            break;

          case 'mi':
            day = 'wednesday';
            break;

          case 'do':
            day = 'thursday';
            break;

          case 'fr':
            day = 'friday';
            break;

          case 'sa':
            day = 'saturday';
            break;

          case 'so':
            day = 'sunday';
            break;
        }

        cleaned.push({
          name: item.name.replace(/(?=\().+?(?:\))/g, "").trim(),
          date: item.datum,
          day: day,
          category: item.warengruppe,
          labels: item.kennz.split(','),
          details: details,
          price: {
            students: item.stud,
            employees: item.bed,
            guests: item.gast
          },

          // For debugging
          //origin: item
        });
      });

      resolve(cleaned);
    });
  });
};

Date.prototype.getWeek = function () {
  var onejan = new Date(this.getFullYear(), 0, 1);
  var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
  var dayOfYear = ((today - onejan + 86400000) / 86400000);
  return Math.ceil(dayOfYear / 7);
};

const getContent = function (url) {
  return new Promise((resolve, reject) => {
    const request = http.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, error: ' + response.statusCode + ' Url: ' + url));
      }
      const body = [];
      response.on('data', (chunk) => body.push(conv.decode(new Buffer(chunk), "ISO-8859-1")));
      response.on('end', () => resolve(body.join('')));
    });

    request.on('error', (err) => reject(err));
  });
};
