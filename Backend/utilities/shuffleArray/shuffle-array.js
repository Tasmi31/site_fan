// --- Main

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(array)
{
	let loopLength = array.length
	let toShuffle = array
    let shuffled = []

    for (let i = 0; i < loopLength; i++)
    {
    	let randIndex = Math.floor(Math.random() * toShuffle.length)
		let randItem = toShuffle[randIndex]
		shuffled.push(randItem)
		toShuffle.splice(randIndex, 1)
    }

    return shuffled
}
	

// --- Export
	module.exports = shuffle;