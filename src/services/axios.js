import axios from "axios";
import {
    cacheAdapterEnhancer
} from "axios-extensions";

export const http = axios.create({
    baseURL: 'http://localhost:3000',
	/*headers: { 'Cache-Control': 'no-cache'},
	// cache will be enabled by default
	adapter: cacheAdapterEnhancer(axios.defaults.adapter)*/
});
