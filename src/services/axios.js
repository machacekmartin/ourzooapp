import axios from "axios";
import {
    setupCache
} from "axios-cache-adapter";

const cache = setupCache({
	maxAge: 5 * 60 * 1000
})

export const http = axios.create({
    baseURL: 'https://ourzoo.eu',
	//headers: { 'Cache-Control': 'no-cache'},
	// cache will be enabled by default
	//adapter: cache.adapter
});
