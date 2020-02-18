// include node fs module
const fs = require('fs');
const axios = require("axios");//set axios
const inquirer = require("inquirer");//set inquirer (install)
const questions = [//block scope
  {
    type: 'input',
    name: 'title',
    message: 'Please add title of your project',
    default: 'README PROJECT'
  },

  {
    type: 'input',
    name: 'description',
    message: 'Please describe your project',
    default: 'A Project for creating a readme file after taking some user input'
  },

  {
    type: 'checkbox',
    name: 'table',
    message: 'Please select what to include in your table of contents',
    choices: ['Installation', 'Usage', 'License', 'Contributing', 'Tests', 'Questions'],
    default: ['Installation', 'Usage', 'License', 'Contributing', 'Tests', 'Questions']
  },
  {
    type: 'input',
    name: 'usage',
    message: 'What does the user need to know about using the repository?',//Github + Nodejs + Git
    default: 'Nothing at all'
  },
  {
    type: 'input',
    name: 'installation',
    message: 'What command should be run to install dependencies?',//npm install
    default: 'npm install'
  },

  {
    type: 'list',
    name: 'licence',
    message: 'What is this project licensed under?',
    choices: ['MIT', 'GNU', 'Apache'],
    default: 'MIT'
  },
  {
    type: 'input',
    name: 'test',
    message: 'What command should be run to run tests?', //npm test
    default: 'npm test'
  }]


// writeFile function with filename, content and callback function
function writeFile(data) {
  console.log(data)
  let table ='';
  data.table.map(item=> table+=`* [${item}](#${item.toLowerCase()})\n \n`)//template literal
  let content = `
  ${data.title} 
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](${data.html_url})
​

​
${data.description}
​
## Table of Contents 
​${table}
​
## Installation
​
To install necessary dependencies, run the following command:
​
${data.installation}
​
## Usage

${data.usage}
​
## License
​
This project is licensed under the ${data.licence} license.
  
## Contributing
​
GitHub + NodeJS + Git + Javascript + Hands
​
## Tests
​
To run tests, run the following command:
​Insta

npm test
​
## Questions
​
<img src="${data.avatar_url}" alt="avatar" style="border-radius: 16px" width="30" />
​
If you have any questions about the repo, open an issue or contact [clam1987](https://api.github.com/users/clam1987) directly at null.
  `
  fs.writeFile(`${data.title}.md`, content, function (err) {//asynch
    if (err) throw err;
    console.log('File is created successfully.');
  });
}
inquirer//remember to install npm. Module!Module!Module!
  .prompt({
    message: "Enter your GitHub username",
    name: "username",
    default: 'JoanneUK'
  })
  .then(({ username }) => {//returns promise
    let apiData;
    const queryUrl = `https://api.github.com/users/${username}`;
    axios
      .get(queryUrl)
      .then(function (res) {
        apiData = res.data
      }).catch(err=>console.log(err));

    inquirer
      .prompt(questions).then(answers=>writeFile({...apiData,...answers})).catch(err=>console.log(err))
  });
