import React, { useEffect } from 'react'
import { useContext } from 'react';
import { AutoCompleteContext } from './Other/SearchUsersInput';
import '../styles/MatchDropDown.css'

function MatchDropDown( { match } ) {
	const {setValue} = useContext(AutoCompleteContext);
	useEffect(() => {
		console.log(match);
	}, [match]);
  return (
	<div className='auto-complete' onClick={() => setValue(match)}>
			<div className='auto-complete-value'>{match}</div>
	</div>
  )
}

export default MatchDropDown;