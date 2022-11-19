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
