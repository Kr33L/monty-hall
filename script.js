const input = document.querySelector("input");
const submit = document.querySelector("button");
const pageResults = document.querySelector("#results");

// <====== Event listeners ======>
submit.addEventListener("click", (e) => {
	e.preventDefault();
	run(input.value);
});

// <====== Functions ======>

// <--- Simulation logic --->
function simulation(simulations) {
	const randomIndex = (array) => Math.floor(Math.random() * array.length);
	const doors = [1, 2, 3];
	let results = [];

	//<-- Loop through the simulations -->
	for (let i = 0; i < simulations; i++) {
		const prize = randomIndex(doors);
		const choice = randomIndex(doors);

		// <- Filter monty's, and switch choices ->
		const monty = doors.filter((door) => door !== prize || choice)[0];
		const switchChoice = doors.filter((door) => door !== monty || choice)[0];

		// <- Filter wins with both methods ->
		const stayWin = choice === prize ? 1 : 0;
		const switchWin = switchChoice === prize ? 1 : 0;

		results.push({ switchWin, stayWin });
	}
	return results;
}

// <--- Calculate the results --->
function calculate(results) {
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
	return (wins = {
		switch: {
			total: switchWinTotal,
			average: switchWinAverage,
			percentage: switchWinPercentage,
		},
		stay: {
			total: stayWinTotal,
			average: stayWinAverage,
			percentage: stayWinPercentage,
		},
	});
}

// <--- Run the simulation --->
function run(simulations, depth = 0) {
	const decimal = (number) => number.toFixed(1);
	const results = simulation(simulations);
	const wins = calculate(results);

	// <-- Log the results -->
	console.group(`Simulations: ${simulations}`);

	console.log(`Switch:
  average:    ${decimal(wins.switch.average)}
  percentage: ${decimal(wins.switch.percentage)}%`);

	console.log(`Stay:
  average:    ${decimal(wins.stay.average)}
  percentage: ${decimal(wins.stay.percentage)}%`);

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

// <====== On page load ======>

console.log(`To run the simulation, use the command "run(number of simulations, OPTIONAL depth of results)"
Example:
run(1000, 2)
run(1000)

Depth 0: Only the total
Depth 1: Total, average and percentage in a table
Depth 2: Wins and losses in a table for each simulation`);
