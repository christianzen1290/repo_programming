# TASK: Use numpy to check how many rolls were greater than 2. For example if dice_rolls=[1,2,3] then the answer is 1.
# NOTE: Many different ways to do this! Your final answer should be an integer.
# MAKE SURE TO READ THE FULL INSTRUCTIONS ABOVE CAREFULLY, AS THE EVALUATION SCRIPT IS VERY STRICT.
# Link to Solution: https://gist.github.com/Pierian-Data/ea3121efac5dd3338c280ff10068f9c8

import numpy as np

import numpy as np

myarray = np.linspace(0, 10, 101)

dice_rolls = np.array([3, 1, 5, 2, 5, 1, 1, 5, 1, 4, 2, 1, 4, 5, 3, 4, 5, 2, 4, 2, 6, 6, 3, 6, 2, 3, 5, 6, 5])

# total_rolls_over_two = # This should be a single integer
mask = dice_rolls > 2

# Count the number of True values in the mask
total_rolls_over_two = np.sum(mask)
arr = np.arange(0,10)

x = np.arange(0,25).reshape(5,5)
account_transactions = np.array([100,-200,300,-400,100,100,-230,450,500,2000])

array_1d = np.zeros(10)

array_1dx = np.ones(10) * 5

array_1 = np.arange(10,51)

array_step_2 = np.arange(10,51,2)

array_3x3 = np.arange(9).reshape(3,3)

diagnonal_1 = np.eye(3)

rand_between_1 = np.random.uniform(0,5)

random_number_25 = np.random.randn(25)

arange_10x10 = np.arange(1,101).reshape(10,10)

matrix_slice = arange_10x10[3:,9:]

linspace_example = np.linspace(1,21,20).reshape(10,2)

gen_arr = np.arange(1,26).reshape(5,5)
print(gen_arr)


