[![wakatime](https://wakatime.com/badge/github/Kr33L/monty-hall.svg)](https://wakatime.com/badge/github/Kr33L/monty-hall)

# Monty Hall Problem

Vos Savant presented a solution that was initially rejected by popular media. This project will attempt to demonstrate that Vos Savant was correct.

### _Branching:_
There are two branches:
- **Main** branch is the main working code
- **Functional** branch is an attempt to rewrite the main code using pure functional programming.

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
