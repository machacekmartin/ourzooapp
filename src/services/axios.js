import axios from "axios";
import {
    setupCache
} from "axios-cache-adapter";

const cache = setupCache({
	maxAge: 0.1 * 60 * 1000
})

export const http = axios.create({
    baseURL: 'https://ourzoo.eu',
	//headers: { 'Cache-Control': 'no-cache'},
	// cache will be enabled by default
	//adapter: cache.adapter
});
