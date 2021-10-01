# Etch - functional visual programing environment

Etch is an experiment to see if we can address the issues with some other visual programing languages by using functional programing

![GitHub Logo](/public/screenshot.png)

You can jump in and try it [here](https://letset.ch/)

## Design Principles

Etch is designed as a next generation language. There are some key principles that have guided the design choices.

### `Low floor & wide walls`

EtcH is designed to be instantly more accessible than traditional
textual languages but also has the potential to become a serious
programming environment capable of all the same tasks. Currently
output is limited in functionality but that will be expanded.

### `Visual all the way down`

Many visual coding tools allow you to type "real" code into the boxes
when you need additional functionality. EtcH is designed from first
principles to be able to compose complex functionality from simple
base parts as a complete solution.

### `Modern functional paradigm`

EtcH takes a pure functional approach to programming separating data
from computation. An EtcH program is built entirely out of the same
simple composable building blocks (functions). This reduces the
concepts needed to be understood and alow certain key features (auto
function creation).

### `Inclusive and collaborative`

A rich UI and features such as type safety and
realtime debugging are designed to make creating software a more
intuitive experience especially for new programers. If possible no runtime errors ever. My hope is we can also open up new ways to collaborate by sharing functions and libraries in new ways.

## Features

Built (at least partially)

- Functions are project wide and can be nested
- Simple type system
- Project wide shared types
- Nested inspection and wiring
- Everything can be renamed safely
- Type aware static value input
- Live project debugging
- multi drag selections (clone / make function)
- Duplicate / Delete projects

On the todo list

- Map / Reduce and general first class function support
- Save and share project on the "cloud"
- Tutorials and Example projects
- Search / Share functions (modules?)
- Undo / Redo
- multi drag selections (delete )
- zoom and pan function view
- Expanded type system (lists & unions)
- Scene functionality (images / sounds / layers)
- Effects (network, time, scene events, random numbers)
- Output html?
- mobile / tablet support
- performance optimisations

## Run it

project is uses create react You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
