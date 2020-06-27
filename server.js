const http = require('http');
const url = require('url');

const PORT = 8080;

const routes = require('./routes');

const server = http.createServer(function (req, res) {
  // grabs url data + querystring
  const parsedURL = url.parse(req.url, true);

  // strip leading and trailing slashes if path is not '/'
  let pathname = parsedURL.pathname;
  if (parsedURL.pathname !== '/') {
    pathname = parsedURL.pathname.replace(/^\/+|\/+$/g, '');
  }

  // get query object from url
  const queryString = parsedURL.query;
  const method = req.method;

  if (method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      // read buffer to string
      body += chunk.toString(); 
    });

    req.on('end', () => {
      if (pathname === 'user') {
        routes.createUser(res, JSON.parse(body));
      } else if (pathname === 'event') {
        routes.createEvent(res, JSON.parse(body));
      } else {
        routes.notFound(res)
      }
    });
  }
  if (method === 'GET') {
    if (pathname === 'user') {
      routes.getUsers(res);
    } else if (pathname === 'event' && queryString.identifier) {
      // return all login events for a single user
      const id = decodeURI(queryString.identifier);
      routes.getEventsById(res, id);
    } else if (pathname === 'event' && queryString.daybeforelast === true) {
      // return all events for the day before last
      routes.getEventsDayBeforeLast(res);
    } else if (pathname === 'event' && queryString.weeks) {
      // return all events for the week before not including session timeout
      const weeks = decodeURI(queryString.weeks);
      routes.getEventsLastWeek(res, weeks);
    } else if (pathname === 'event' && queryString.type) {
      // return all events of a type
      routes.getEventsByType(res, queryString.type);
    } else if (pathname === 'event') {
      // return all events
      routes.getEvents(res);
    } else {
      routes.notFound(res)
    }
  }
});

server.listen(PORT, () => {
  console.log('Server running on port:', PORT);
})