class Person:
    def __init__(self, name, age, mvalue=0):
        self.name = name
        self.age = age
        self.__cmane = mvalue
    def __str__(self):
        return f"{self.name}({self.age}){self.__cmane}"    
    def get_pr_var(self):
  	    return self.__cmane
    def set_pr_var(self, nvalue):
  	    self.__cmane = nvalue

p1 = Person("John", 36)
print(p1)
print(p1.get_pr_var())
p1.set_pr_var(100)
print(p1.get_pr_var())
print(p1)