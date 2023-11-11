const http = require('http');//allows node.js to transfer data over to the hyper text transfer protocol. listen respond,create network requests

const fs = require('fs') //enables interacting with the file system

const url = require('url');//module provides utilities for URL resolution and parsing,listens to what url the client requested

const querystring = require('querystring');//module provides utilities for parsing and formatting url query strings,like fetch using query parameters

const figlet = require('figlet')
//depending on what is being passed or entered on the page, telling the server what to deliver back



const server = http.createServer((req, res) => {
//create a function where you pass in the file and the content type to it and preform actions depending on the arguments passed
  const readWrite = (file,contentType)=>{
    fs.readFile(file, function(err, data) {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(data);
      res.end();
    });
  }
  //url.parse takes a url string,parses it and returns a url object 
  //page stores the url 
  const page = url.parse(req.url).pathname;

  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    readWrite('index.html',"text/html")
  }
  else if (page == '/otherpage') {
    readWrite('otherpage.html',"text/html")
  }
  else if (page == '/otherotherpage') {
    readWrite('otherptherpage.html',"text/html")
  }
  else if (page == '/api') {
        // let personName = 'unknown'
        // let personStatus = "unknown"
        // let personOccupation = "unknown"
        let flipResult="type flip in the input box"
      if(params['student']=='flip'){
        flipResults = Math.random()<=.5?"heads":"tails"
      }
      res.writeHead(200, {'Content-Type': 'application/json'});
      const objToJson = {
        name: flipResult
      }
      //converts to json to be used in the main.js file for the fetch 
      res.end(JSON.stringify(objToJson));
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    readWrite('js/main.js','text/javascript')
   
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(9000);
