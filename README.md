# Sephora Support Hub

This branch (`reference`) contains template code with following features which will be implemented by the team during active development.

- Usage of React Hooks (useState, useRef) with typescript
- Usage of React Context with typescript
- Usage of React Router dom for routing
- Integration of tailwind, vite, eslint
- React testing library + Jest
- Husky integration for pre-commit validation.
- Simple Bar chart integartion (chart.js)

### Note:

- This branch is just a bare mininum template of React + typescript to get started with.
- #### If you have any suggestions or best practises to be implemented in the project, kindly raise an MR against this branch and inform me of the same.

##### Tech stack:

- Node version: 18+
- Language: Javascript, React.js, Typescript
- Bundler: Vite
- Test-cases: Jest, React Testing Library
- CSS: tailwindcss
- CSS post-processor: postcss
- Linter : eslint

##### Steps to run the repository locally:

1. Install node.js
2. Clone the repository.
3. From the root folder, run `npm i`
4. To start the repo in development mode, run `npm run dev`
5. To start the repo in staging mode, run `npm run staging`
6. To start the repo in production mode, run `npm run build && npm run prod`
7. To run test cases, run `npm run test`

##### Reference for developers :

- Before making any css changes, open a new terminal and run `npm run postcss:watch`
