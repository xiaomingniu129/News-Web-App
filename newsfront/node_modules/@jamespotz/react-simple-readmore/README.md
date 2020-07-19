# React Simple Readmore

React component for animating height using Spring Factor.

## Quick start

Get it from npm

```
$ npm install --save @jamespotz/react-simple-readmore
```

## Note

For React >= 16.8 because of Hooks.

## How to use

```javascript
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReadMore from '@jamespotz/react-simple-readmore';
import text from './data';

const App = () => {
	const [shown, setShown] = useState(false);

	return (
		<ReadMore
			onClick={value => setShown(value)}
			fade
			btn={
				<button
					style={{
						background: `${shown ? 'red' : 'blue'}`,
						padding: '10px 15px',
						color: '#fff'
					}}
				>
					{shown ? 'Read Less' : 'Read More'}
				</button>
			}
			preset='wobbly'
		>
			<p
				dangerouslySetInnerHTML={{
					__html: text
				}}
			/>
		</ReadMore>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
```

## Demo

Live Demo: [https://codesandbox.io/embed/kind-night-bqd8e](https://codesandbox.io/embed/kind-night-bqd8e)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:3000`](http://localhost:3000) in your browser of choice.

## API

| Prop               | Type                                                                         |                  Default |
| :----------------- | :--------------------------------------------------------------------------- | -----------------------: |
| minHeight          | Number/String                                                                |                       50 |
| displayHeight      | Number/String                                                                |                   'auto' |
| btnText            | Text/Component (props ignored if btn is present)                             |                          |
| btnTextShown       | Text/Component (props ignored if btn is present)                             |                          |
| defaultShownOnLess | Text/Component                                                               |                          |
| btn                | Component                                                                    |                          |
| onClick            | Function                                                                     |                          |
| btnClassName       | String                                                                       |                          |
| btnStyles          | Object                                                                       |                          |
| fade               | Boolean                                                                      |                          |
| fadeHeight         | Number                                                                       |              minHeight/2 |
| colorStopTop       | String                                                                       | 'rgba(255, 255, 255, 0)' |
| colorStopBottom    | String                                                                       |                  'white' |
| precision          | Number                                                                       |                     0.01 |
| velocity           | Number                                                                       |                        0 |
| mass               | Number                                                                       |                        1 |
| stiffness          | Number                                                                       |                          |
| damping            | Number                                                                       |                          |
| prest              | String of type ['noWobble', 'gentle', 'wobbly', 'stiff', 'slow', 'molasses'] |                          |
