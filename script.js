// Create a random index for the list,
const randomIndex = (array) => Math.floor(Math.random() * array.length);
// Create a list of doors,
const doors = [1, 2, 3];
const simulations = 100000;
// Loop through simulations with the following operation:
// const results = simulations.map(() => {});
// Randomly choose a prize door
const prize = randomIndex(doors);
// Randomly choose the staying door
const choice = randomIndex(doors);
// Filter through the doors to get Monty's door which is:
//  a. not the prize door
//  b. not the staying door
const monty = doors.filter((door) => door !== prize && door !== choice)[0];
// Filter through the doors to get the switched door, which is:
//  a. not the staying door
//  b. not Monty's door
const switchChoice = doors.filter((door) => door !== choice && door !== monty)[0];
// Separate variables for win and loss returning true or false on the following conditions:
//  a. switchWin = (switched choice = prize)
const switchWin = switchChoice === prize ? 1 : 0;
//  b. stayWin = (stay choice = prize)
const stayWin = choice === prize ? 1 : 0;

// Return the wins for both. return { switchWin, stayWin };

// For each result, find the number of times the player won by staying or switching:
// Get the average
// Get the percentage

// Log the results.
