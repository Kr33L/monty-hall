const input = document.querySelector("input");
const submit = document.querySelector("button");
const pageResults = document.querySelector("#results");

// <====== On page load ======>

console.log(`To run the simulation, use the command "run(number of simulations, OPTIONAL depth of results)"
Example:
run(1000, 2)
run(1000)
Depth 0: Only the total
Depth 1: Total, average and percentage in a table
Depth 2: Wins and losses in a table for each simulation`);

// <====== Event listeners ======>
submit.addEventListener("click", (e) => {
	e.preventDefault();
	run(input.value);
});

// <====== Functions ======>

// <--- Simulation logic --->
function simulation(simulations) {
	let results = [];

	//<-- Loop through the simulations -->
	while (simulations--) {
		// <-- Create the doors -->
		const doors = [1, 2, 3];
		const randomDoor = (doors) => Math.floor(Math.random() * doors.length);

		// <-- Randomly assign the prize to a door -->
		const prize = randomDoor(doors);

		// <- Filter stay, monty, and switch choices ->
		const stayChoice = randomDoor(doors.filter((door) => door !== prize)); //not the prize
		const monty = doors.find((door) => door !== prize && door !== stayChoice); //not the prize or the stay choice
		const switchChoice = doors.find((door) => door !== monty && door !== stayChoice); //not monty or stay choice

		// <-- Check if the player won -->
		const switchWin = switchChoice === prize ? 1 : 0;
		const stayWin = stayChoice === prize ? 1 : 0;

		// <-- If switch or stay won, add the result to the results array else keep looping-->
		if (switchWin !== stayWin) {
			results.push({ switchWin, stayWin });
		} else {
			simulations++;
		}
	}
	return results;
}

// <--- Calculate the results --->
function calculate(results) {
	const decimal = (number) => number.toFixed(2);

	// <-- Wins -->
	const switchWinTotal = results.filter((result) => result.switchWin === 1).length;
	const stayWinTotal = results.filter((result) => result.stayWin === 1).length;

	// <-- Average -->
	const switchWinAverage = switchWinTotal / results.length;
	const stayWinAverage = stayWinTotal / results.length;

	// <-- Percentage -->
	const switchWinPercentage = switchWinAverage * 100;
	const stayWinPercentage = stayWinAverage * 100;

	// <-- Return the results as an object -->
	return {
		switch: {
			total: switchWinTotal,
			average: decimal(switchWinAverage),
			percentage: decimal(switchWinPercentage) + "%",
		},
		stay: {
			total: stayWinTotal,
			average: decimal(stayWinAverage),
			percentage: decimal(stayWinPercentage) + "%",
		},
	};
}

// <--- Run the simulation --->
function run(simulations, depth = 0) {
	const results = simulation(simulations);
	const wins = calculate(results);

	// <-- Log the results -->
	console.group(`Simulation Attempts: ${simulations} Passed: ${results.length}`);

	console.log(`Switch:
  average:    ${wins.switch.average}
  percentage: ${wins.switch.percentage}`);

	console.log(`Stay:
  average:    ${wins.stay.average}
  percentage: ${wins.stay.percentage}`);

	if (depth >= 1) {
		console.group("In depth results");
		console.table(wins);
		console.groupEnd();
	}
	if (depth >= 2) {
		console.group("In depther results");
		console.table(results);
		console.groupEnd();
	}

	console.groupEnd();

	// <-- Display the results -->
	pageResults.innerHTML = `
  <p>Switch wins: ${wins.switch.total}</p>
  <p>Stay wins: ${wins.stay.total}</p>
  `;
}
