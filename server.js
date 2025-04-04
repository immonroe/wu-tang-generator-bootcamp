const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
      
    });
  }
  else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    const { firstName, lastName, faveAnimal, faveSeason, faveColor } = params

    const nameParts1 = ["RZA", "Mystic", "Ol' Dirty", "Blunted", "Iron", "Golden", "Silent", "Ghost"]
    const nameParts2 = ["Monk", "Samurai", "Warlord", "Disciple", "Shogun", "Poet", "Bandit", "Phantom"]
    const animalParts = ["of the Wolf", "the Panther Style", "Crane Killa", "Tiger Fist", "Bear Claw", "Dragon Breath"]
    const seasonParts = ["in the Spring", "of Autumn Flame", "of the Winter Wind", "during Summer Madness"]
    const colorParts = ["Wearing Crimson", "Dressed in Gold", "Cloaked in Shadow", "Wielding Silver", "Bleeding Black"]
  
    // function to find the index of an array comparing array position to string.length
    // added trim to account for edge cases where users include white space in answer
    function getIndex(str, arr) {
      return str?.trim().length % arr.length
    }
  
    // CG easter egg
    function generateWuName(first, last, animal, season, color) {
      if (first?.toLowerCase() === "donald" && last?.toLowerCase() === "glover") {
        return "Childish Gambino"
      }
      
      // Plug in arrays to get indexes for each part of the values inputted - getIndex() also can idenify if value is not found
      const part1 = nameParts1[getIndex(first, nameParts1)]
      const part2 = nameParts2[getIndex(last, nameParts2)]
      const part3 = animalParts[getIndex(animal, animalParts)]
      const part4 = seasonParts[getIndex(season, seasonParts)]
      const part5 = colorParts[getIndex(color, colorParts)]
  
      return `${part1} ${part2} ${part3} ${part4} ${part5}`
    }
  
    const wuName = generateWuName(firstName, lastName, faveAnimal, faveSeason, faveColor)
  
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({name:wuName}))

    // if('cardOne' in params){
    //   console.log(params['cardOne'])
    //   if (params['cardOne'] === params['cardTwo']) {
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     const objToJson = {
    //       name: `You selected: ${params['cardOne']} and ${params['cardTwo']}`,
    //       status: "This is a palindrome!",
    //       currentOccupation: "test"
    //     }
    //     res.end(JSON.stringify(objToJson));
    //   }//student = leon
      
    //   else if (params['cardOne'] != params['cardTwo']){
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     const objToJson = {
    //       name: `You selected: ${params['cardOne']} and ${params['cardTwo']}`,
    //       status: "This is not a palindrome...",
    //       currentOccupation: "test two"
    //     }
    //     res.end(JSON.stringify(objToJson));
    //   }//student != leon
    // }//student if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
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

server.listen(8000);