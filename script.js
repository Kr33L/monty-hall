function simulation(simulations) {
	const randomIndex = (array) => Math.floor(Math.random() * array.length);
	const doors = [1, 2, 3];
	let results = [];
	// Loop through simulations,
	for (let i = 0; i < simulations; i++) {
		const prize = randomIndex(doors);
		const choice = randomIndex(doors);

		// Filter monty's, and switch choices
		const monty = doors.filter((door) => door !== prize || choice)[0];
		const switchChoice = doors.filter((door) => door !== monty || choice)[0];

		// Filter wins with both methods
		const stayWin = choice === prize ? 1 : 0;
		const switchWin = switchChoice === prize ? 1 : 0;

		results.push({ switchWin, stayWin });
	}
	return results;
}


function calculate(results) {
	const decimal = (number) => number.toFixed(1);

	// Calculate the wins, average and percentages
	const switchWinTotal = results.filter((result) => result.switchWin === 1).length;
	const stayWinTotal = results.filter((result) => result.stayWin === 1).length;

	const switchWinAverage = switchWinTotal / results.length;
	const stayWinAverage = stayWinTotal / results.length;

	const switchWinPercentage = switchWinAverage * 100;
	const stayWinPercentage = stayWinAverage * 100;

	console.log(`Switch:
  average:    ${decimal(switchWinAverage)}
  percentage: ${decimal(switchWinPercentage)}%`);

	console.log(`Stay:
  average:    ${decimal(stayWinAverage)}
  percentage: ${decimal(stayWinPercentage)}%`);

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