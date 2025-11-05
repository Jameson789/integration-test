# Integration Testing

## What is integration testing?
Integration testing is when we test how individual modules or components of the project work together.

## How are we doing integration testing?
- Using Jest and SuperTest we were able to do integration testing on our API making sure that all of the routes work how they are meant to.
- We used a library called `databases/mysql-test` that utilizes docker to create temporary lightweight MySQL databases, cutting down on the amount of mocking that is necessary.

## Troubles we ran into:
- 'NODE_OPTIONS' is not recognized as an internal or external command was one error we ran into, trying to inject ENV variables meant we had to consider cross compatibility.
  - Using cross-env we were able to just add it in front of the command script we were running.
 
## Steps we took:
1. Install Jest and Supertest.
2. Edit scrips in the package.json to run the tests
3. Add this below to your package.json
4. Run a sanity check test to make sure you have everything installed properly.


