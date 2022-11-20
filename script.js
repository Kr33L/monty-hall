const input = document.querySelector("input");
const submit = document.querySelector("button");
const pageResults = document.querySelector("#results");
const doors = [1, 2, 3];

// <====== On page load ======>

console.log(startingLog());
submitHandler();

// <====== Event listeners ======>

function submitHandler() {
	submit.addEventListener("click", (e) => {
		e.preventDefault();
		run(input.value);
	});
}

// <====== Functions ======>

// <--- Simulation loop --->
function simulation(simulations) {
	let results = [];
	loop(simulations, results);
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

function startingLog() {
	return `To run the simulation, use the command "run(number of simulations, OPTIONAL depth of results)"
  Example:
    run(1000, 2)
    run(1000)

    Depth 0: Only the total
    Depth 1: Total, average and percentage in a table
    Depth 2: Wins and losses in a table for each simulation`;
}

// <--- Helper functions --->

const randomDoor = (array) => Math.floor(Math.random() * array.length);

const prizeDoor = () => randomDoor(doors);

const stayDoor = () => randomDoor(doors.filter((door) => door !== prizeDoor()));

const switchDoor = () => randomDoor(doors.filter((door) => door !== montyDoor() && door !== stayDoor()));

const montyDoor = () => randomDoor(doors.filter((door) => door !== prizeDoor() && door !== stayDoor()));

const switchWin = () => switchDoor() === prizeDoor();

const stayWin = () => stayDoor() === prizeDoor();

const win = (type) => (type === prizeDoor() ? 1 : 0);

function loop(number, array) {
	while (number--) {
		prizeDoor();
		stayDoor();
		montyDoor();
		switchDoor();
		if (win(switchDoor()) === win(stayDoor())) {
			array.push({ switchWin: win(switchDoor()), stayWin: win(stayDoor()) });
		} else {
			number++;
		}
	}
}
