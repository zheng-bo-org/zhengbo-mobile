## What is testing really?
```
Testing means make sure your APP is working as expcted.
The steps below is required under this definition.
```
## 1.Unit Testing
```
Write Unit Test for your js logic only as the cost to write Unit Test for UI logic is expensive.

We use Jest to testing js logic, for the purpose of make MOCK works easier, you'll write js logic in FP pattern only as possible.
If in some case you cant use FP pattern, you'll need to go to the __mocks__ folder to mock the dependeices of the testing function.
```

## 2.RC Testing
```
You'll need to build A testing version for this APP and install it on real device.
And you'll get the real data from backend API, But there will be a tool that able you to Mock the data for testing UI logic.
The DATA includes API data and AppContext data.

I dont know which tool or how to build that tool to let you mock the DATA yet, but I'll figure out that as soon as posibble when it become a real requirement.
```