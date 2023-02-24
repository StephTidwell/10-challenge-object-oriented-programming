# 10-challenge-object-oriented-programming
10-challenge-object-oriented-programming
10 Object-Oriented Programming: Team Profile Generator
Github license

```Description
The task is to build a Node.js command-line application that takes in information about employees on a software engineering team, then generates an HTML webpage that displays summaries for each person. Testing is key to making code maintainable, so you’ll also write a unit test for every part of your code and ensure that it passes each test.```

User Story
AS A manager
I WANT to generate a webpage that displays my team's basic info
SO THAT I have quick access to their emails and GitHub profiles
Acceptance Criteria
GIVEN a command-line application that accepts user input
WHEN I am prompted for my team members and their information
THEN an HTML file is generated that displays a nicely formatted team roster based on user input
WHEN I click on an email address in the HTML
THEN my default email program opens and populates the TO field of the email with the address
WHEN I click on the GitHub username
THEN that GitHub profile opens in a new tab
WHEN I start the application
THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
WHEN I enter the team manager’s name, employee ID, email address, and office number
THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
WHEN I select the engineer option
THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
WHEN I select the intern option
THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
WHEN I decide to finish building my team
THEN I exit the application, and the HTML is generated
Installation
clone repo

npm init

npm install inquirer

install jest (for testing)

Built with
HTML

CSS

BOOTSRAP

JavaScript

Node.js

inquirer*

jest*

*installation required to run app

Screenshot
<img width="1081" alt="Screen Shot 2023-02-24 at 11 42 55 AM" src="https://user-images.githubusercontent.com/113862737/221237042-694797cc-c148-41fc-8bb7-904f207b5c7e.png">
