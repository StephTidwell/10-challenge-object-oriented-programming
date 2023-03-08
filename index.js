const path = require("path");

const Manager = require("./employee/Manager");
const Engineer = require("./employee/Engineer");
const Intern = require("./employee/Intern");

const inquirer = require("inquirer");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "output.html");

const render = require("./src/generate-page-html.js");

const teamMembers = [];
const idArray = [];

const appMenu = () => {
  const addManager = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "Please enter the team manager's name:",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "The manager's name is required. Please enter the team manager's name:";
          },
        },
        {
          type: "input",
          name: "managerId",
          message: "Please enter the team manager's id:",
          validate: (idInput) => {
            if (isNaN(idInput) || !idInput || idInput < 1) {
              console.log("Please enter valid id number:");
              return false;
            } else return true;
          },
        },
        {
          type: "input",
          name: "managerEmail",
          message: "What is the team manager's email?",
          validate: (answer) => {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const pass = answer.match(mailformat);
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          },
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "What is the team manager's office number?",
          validate: (answer) => {
            let officeNumber = /^[1-9]\d*$/;
            const pass = answer.match(officeNumber);
            if (pass) {
              return true;
            }
            return "Please enter a positive number greater than zero.";
          },
        },
      ])
      .then((managerInfo) => {
        const manager = new Manager(
          managerInfo.managerName,
          managerInfo.managerId,
          managerInfo.managerEmail,
          managerInfo.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(managerInfo.managerId);
        console.log(manager);
        createTeam();
      });
  };

  const createTeam = () => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "I do not want to add any more team members.",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  };

  const addEngineer = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What is your engineer's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "The engineers's name is required. Please enter the engineer's name:";
          },
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is your engineer's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return "This ID is already taken. Please enter a different number.";
              } else {
                return true;
              }
            }
            return "Please enter a positive number greater than zero.";
          },
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "What is your engineer's email?",
          validate: (answer) => {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const pass = answer.match(mailformat);
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          },
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "What is your engineer's GitHub username?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          },
        },
      ])
      .then((managerInfo) => {
        const engineer = new Engineer(
          managerInfo.engineerName,
          managerInfo.engineerId,
          managerInfo.engineerEmail,
          managerInfo.engineerGithub
        );
        teamMembers.push(engineer);
        idArray.push(managerInfo.engineerId);
        console.log(engineer);
        createTeam();
      });
  };

  const addIntern = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What is your intern's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          },
        },
        {
          type: "input",
          name: "internId",
          message: "What is your intern's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return "This ID is already taken. Please enter a different number.";
              } else {
                return true;
              }
            }
            return "Please enter a positive number greater than zero.";
          },
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is your intern's email?",
          validate: (answer) => {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const pass = answer.match(mailformat);
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          },
        },
        {
          type: "input",
          name: "internSchool",
          message: "What is your intern's school?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "A school name is required. Please enter the intern's school:";
          },
        },
      ])
      .then((managerInfo) => {
        const intern = new Intern(
          managerInfo.internName,
          managerInfo.internId,
          managerInfo.internEmail,
          managerInfo.internSchool
        );
        teamMembers.push(intern);
        idArray.push(managerInfo.internId);
        console.log(intern);
        createTeam();
      });
  };

  const buildTeam = () => {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  };
  console.log(outputPath);

  addManager();
};

appMenu();
