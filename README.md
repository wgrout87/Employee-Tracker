# Employee Tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This is a command line application for maintaining an employee database. It was written using JavaScript to run in Node.js. It also utilizes MYSQL and MYSQL2 to interact with a database that holds all of the employee, role, and department information. When run, the user is prompted to choose from a list of options that provide the means to interact with the database.

## Links

[Code repository](https://github.com/wgrout87/Employee-Tracker)
[Application Demo](https://drive.google.com/file/d/1AeK-bo2miMfLNGpDimnGuzuZ_xrPVFzV/view)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

To install this projects, after downloading the files, navigate to the root directory of the project and run the command "npm i" to install all of the necessary dependencies. Next open up a SQL terminal and run the db.sql and schema.sql files in the db folder. Using MYSQL, those commands are: "mysql -u root -p", "SOURCE ./db/db.sql;", and "SOURCE ./db/schema.sql". Additionally, a seeds.sql file was included to add information to the database for testing purposes.

## Usage

The application can be run from the command line while in the base driectory by inputting the command "npm start". The user will then be presented with a list of option to choose from to interact with the database. Depending on the option, the user will either be presented with information, such as a table of all departments, roles, or employees, or the user will be further prompted for input, if they are adding a department, or altering information about an employee, for example. After all processes conclude for the given option, the user will be prompted to return to the menu. Choosing not to do so will exit the application.

## License

Copyright 2022 William

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)

## Contributing

Any contributions to this open source project on GitHub are welcome. The standard fork and pull workflow that Git enables is the best way to contribute.

## Tests

Running "npm run test" in the command line will run a series of tests that were included to test the constructor functions that this application uses.

## Questions

My GitHub Profile: [https://github.com/wgrout87](https://github.com/wgrout87)

wgrout87@gmail.com

Please feel free to email me with questions. Mention the Employee Tracker in the subject line.