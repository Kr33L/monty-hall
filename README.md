# Monty Hall Problem

Vos Savant presented a solution that was initially rejected by popular media. This project will attempt to demonstrate that Vos Savant was correct.

### _Steps:_

- Gain an understanding of the problem,
- Convince yourself that Vos Savant was correct,
- Run sample games employing either the stick or switch strategy,
- Show that the switch strategy is statistically the best option.

### _Methodology:_

1. Create a list of doors,
2. Create a random index for the list,
3. Loop through x amount of simulations with the following operation: (results mapped to an array)
  - Randomly choose a prize door
  - Randomly choose the staying door
  - Filter through the doors to get Monty's door which is:<br>
    a. not the prize door<br>
    b. not the staying door
    
  - Filter through the doors to get the switched door, which is:<br>
    a. not the staying door<br>
    b. not Monty's door
    
  - Separate variables for win and loss returning true or false on the following conditions:<br>
    a. switchWin = (switched choice = prize)<br>
    b. stayWin = (stay choice = prize)
  
  - Return the wins for both.
  
3. For each result, find the number of times the player won by staying or switching:
  - Get the average
  - Get the percentage
  
4. Log the results.
