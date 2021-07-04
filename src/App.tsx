import React from "react"
import "./App.css"
import { Level1To3 } from "./Level1To3"
import { ScoreAndLevel, ScoreAndLevelContext } from "./ScoreAndLevelContext"

export const App = () => {
	const scoreAndLevelState = React.useState<ScoreAndLevel>([0, 1])

	return (
		<ScoreAndLevelContext.Provider value={scoreAndLevelState}>
			<Level1To3 />
		</ScoreAndLevelContext.Provider>
	)
}
