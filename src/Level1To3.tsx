import React from "react"
import "./App.css"
import { useScoreAndLevel } from "./ScoreAndLevelContext"

const COLOR_ON = "green"
const COLOR_OFF = "rgb(0, 37, 0)"

const LEVEL3_BUTTON_COLORS = [
	"green",
	"green",
	"green",
	"red",
	"blue",
	"yellow",
	"pink",
	"orange",
	"cyan",
	"magenta",
	"black",
	"white",
]

export const Level1To3 = () => {
	const [score, level, incrementScore, decrementScore] = useScoreAndLevel()
	const [buttonColor, setButtonColor] = React.useState(COLOR_ON)
	const level3IntervalRef = React.useRef<NodeJS.Timeout | undefined>()

	// Level 3 interval:
	React.useEffect(() => {
		if (level === 3 && !level3IntervalRef.current) {
			level3IntervalRef.current = setInterval(() => {
				const i = Math.floor(Math.random() * LEVEL3_BUTTON_COLORS.length)
				const color = LEVEL3_BUTTON_COLORS[i]
				setButtonColor(color)
			}, 1000)
		}

		if (level !== 3 && !!level3IntervalRef.current) {
			clearInterval(level3IntervalRef.current)
		}
	}, [level])

	const handleClick = () => {
		if (level === 2 || level === 3) {
			if (buttonColor !== COLOR_ON) {
				decrementScore()
				return
			}
		}
		incrementScore()
		if (level === 2) {
			const timeout = Math.max(0, score * 100 - 1000) /* 10 < score < 20 */
			setButtonColor(COLOR_OFF)
			setTimeout(() => {
				setButtonColor(COLOR_ON)
			}, timeout)
		}
	}

	return (
		<div className="App">
			<header className="App-header">
				<p>Vihreän napin klikkaus peli</p>
				<button
					className="nappi"
					style={{ background: buttonColor }}
					onClick={handleClick}
				>
					paina tost
				</button>
				<button
					className="nappi"
					style={{ background: "red" }}
					onClick={decrementScore}
				>
					älä paina
				</button>

				<p>Sul on nyt ton verran skoree: {score}</p>
				<p>Oot nyt tasolla {level}</p>
			</header>
		</div>
	)
}
