import { polyline } from 'leaflet';

export const assignDistances = (items, currentLocation) => {
	if (items){
		items.forEach(item => {
			if (item.location && item.location.length){
				const center = polyline(item.location).getBounds().getCenter();
				var radlat1 = Math.PI * center.lat / 180;
				var radlat2 = Math.PI * currentLocation.lat / 180;
				var theta = center.lng - currentLocation.lng;
	
				var radtheta = Math.PI * theta / 180;
	
				var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
				if (dist > 1) {
					dist = 1;
				}
				dist = Math.acos(dist);
				dist = dist * 180 / Math.PI;
				dist = dist * 60 * 1.1515;
	
				item['distance'] = dist * 1.609344;
			}
			else{
				item['distance'] = null;
			}
		});

		return items;
	}
	return [];
}

export default assignDistances;
