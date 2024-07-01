import React, { useEffect } from 'react'
import { useContext } from 'react';
import { AutoCompleteContext } from './Other/SearchUsersInput';
import '../styles/AutoComplete.css'

function AutoComplete( { match } ) {
	const {value, setValue} = useContext(AutoCompleteContext);
	const previousMatches = value.split(' ').slice(0, -1).join(' ');
	useEffect(() => {
		console.log(match);
	}, [match]);
  return (
	<div className='auto-complete' onClick={() => setValue(match)}>
		<div className='auto-complete-match'>{`${(previousMatches ? previousMatches + " ": "") + match} `}</div>
	</div>
  )
}

export default AutoComplete;