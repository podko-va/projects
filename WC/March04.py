class Solution(object):
    def removeDuplicates(nums):
        if not nums:
            return 0
    #Initialize two pointers, current and next_unique, both pointing to index 0.
        next_unique = 0
        #Iterate through the array starting from index 1.
        for current in range(1, len(nums)):
            #Compare the current element with the element at the next_unique index.
            if nums[current] != nums[next_unique]:
                #If they are different, increment next_unique and update the element at that index with the current element.
                #Continue this process until you reach the end of the array.
                next_unique += 1
                nums[next_unique] = nums[current]
                #Return this count and modify the original array to contain only the unique elements up to index next_unique.
        nums[next_unique+1:] = ""
        #The number of unique elements will be equal to next_unique + 1.   
        return next_unique + 1
        
    
#print(Solution.removeDuplicates([0,0,1,1,1,2,2,3,3,4]))
'''
### **Complexity Analysis**

Let N be the size of the input array.

- Time Complexity: O(N), since we only have 2 pointers, and both the pointers will traverse the array at most once.
- Space Complexity: O(1), since we are not using any extra space.
'''
#------------------------
'''
A **happy number** is a number defined by the following process:

- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it **loops endlessly in a cycle** which does not include 1.
- Those numbers for which this process **ends in 1** are happy.

Return `true` *if* 'n` *is a happy number, and* `false` *if not*.
'''
class Solution:
    def isHappy(self, n: int) -> bool:
        # Initialize an empty set to keep track of the numbers encountered during the process.
        my_set = set()
        #define loop to calculate next sum of digit till n==1 or n in a set
        while n!=1 and (n not in my_set):
            my_set.add(n)
            #devide int to str and to list by digit
            new_list = list(str(n))
            sum=0
            #define for sent to calculate sum of digit
            for i in new_list:
                sum+=int(i)**2       
            n=sum
        #retur bool
        return n==1 
    
#print(Solution.isHappy(1,2))  
#---------------------------------------------
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        if len(needle)>len(haystack):
            return -1
        #if needle == haystack:
        #    return 0
        for i in range(len(haystack)+1):
            if haystack[i:i+len(needle)] == needle:
                return i
        return -1
print(Solution.strStr(1,"sadbutsad","sad"))  