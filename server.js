/*jshint esnext: true */
const connect = require('connect');
const serveStatic = require('serve-static');
const port = process.env.PORT || 3000;

connect().use(serveStatic('./public')).listen(port, () => {
  console.log(`Server running on port ${port}`);
});
