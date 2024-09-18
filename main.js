//import fs module
const fs = require('fs');

//assign file path to css file to cssFilePath variable
const cssFilePath = 'styles.css';
//read the content of cssFilePath and store in cssContenct variable as utf-8 string
const cssContent = fs.readFileSync(cssFilePath, 'utf-8');

//define regular expression that matches CSS variable declarations 
//starting with '--' and followed by one or more alphanumeric characters
const variableRegex = /--([a-zA-Z0-9-_]+):/g;
//same as above, but for variable references
const usedVariableRegex = /var\(--([a-zA-Z0-9-_]+)\)/g;

//create empty array to store declared vars
const declaredVariables = [];
//declare variable ti store restuls of matched regex
let match;
//execute regex to cssContent until no more matches are found
while ((match = variableRegex.exec(cssContent)) !== null) {
    //add found matches to decvalredVariables array
    declaredVariables.push(match[1]);
}

//create a set to store used variables
const usedVariables = new Set();
//same as above while loop, but added to usedVariables Set instead
while ((match = usedVariableRegex.exec(cssContent)) !== null) {
    usedVariables.add(match[1]);
}

//filter through declaredVariables array, keeping only the variables not present in
//usedVariables set,
const unusedVariables = declaredVariables.filter(variable => !usedVariables.has(variable));

//check if there are unused variables
if (unusedVariables.length > 0) {
    //print them to the console
    console.log('Unused variables:', unusedVariables);
} else {
    console.log('No unused variables found.');
}
