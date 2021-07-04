import React from "react"

export type ScoreAndLevel = [number, number]
type ScoreAndLevelState = [
	ScoreAndLevel,
	React.Dispatch<React.SetStateAction<ScoreAndLevel>>
]
export const ScoreAndLevelContext = React.createContext<ScoreAndLevelState>([
	[0, 1],
	() => {},
])

export const useScoreAndLevel = () => {
	const [scoreAndLevel, setScoreAndLevel] =
		React.useContext(ScoreAndLevelContext)

	const incrementScore = () => {
		setScoreAndLevel(([previousScore, previousLevel]) => {
			const score = previousScore + 1
			const level = Math.max(previousLevel, Math.floor(score / 10) + 1)
			return [score, level]
		})
	}

	const decrementScore = () => {
		setScoreAndLevel(([previousScore, previousLevel]) => {
			const score = previousScore - 1
			return [score, previousLevel]
		})
	}

	return [...scoreAndLevel, incrementScore, decrementScore] as const
}
