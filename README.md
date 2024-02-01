# Forest Fire Simulation

The goal is to simulate a fire spreading in a forest, given a probability for a burning tree to burn each of its neighbours.

## Configuration

Upload a .txt or a .properties configuration file containing appropriate informations to initialize the forest parameters.  
As long as the simulation does not start,  
- burn probability can be modified with the dedicated range picker  
- initial state for each tree can be modified by clicking on the trees  
 
### .txt configuration file

First line is burn probability  
Other lines are forest rows of trees, with 0 for living tree and 1 for burning tree

### .properties configuration file
probability={burn probability}  
height={number of rows>}  
width={number of trees in each rows}  
burning={list of burning trees separated by ',' (coordinates separated by ';')>}  

## Simulation

Launch the simulation by clicking on one of the buttons in the bottom of the page:  
- play/pause: animate the map with 2 seconds between each step  
- forward: animate the map with 0.2 second between each step  
- forward-fast: get to the final step of the simulation  
- forward-step: get to next step of the simulation  

The simulation stops when there is no burning tree left.

