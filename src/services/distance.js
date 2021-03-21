export const assignDistances = (items, currentLocation) =>{
    items.forEach(item => {
        const lat1 = Math.PI * item.location[0].lat / 180;
        const lat2 = Math.PI * currentLocation.lat / 180;

        const lng1 = Math.PI * item.location[0].lng / 180;
        const lng2 = Math.PI * currentLocation.lng / 180;

        const theta = lng1 - lng2;
        const radtheta = Math.PI * theta / 180;
        let dist = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(radtheta);
        dist = Math.acos(dist) * 180 / Math.PI * 60 * 1.1515 * 1.609344;

        item['distance'] = dist;
    });
    return items;
}


export default assignDistances;
