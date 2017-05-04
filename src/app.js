import 'normalize.css';
import './main.css';
import React from 'react';
import {render} from 'react-dom';
import Board from './Board/Board';

render(
	<Board />,
	document.getElementById('app')
);
