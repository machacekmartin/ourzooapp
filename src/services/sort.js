export const sortByDistance = (items) => {
	return items.sort((a, b) => {
        return (a.distance !== null ? a.distance : Infinity) - (b.distance !== null ? b.distance : Infinity)
    });
}

export default sortByDistance;
