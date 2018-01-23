import axios from "axios";
const base = "http://localhost:3001/words";

export default {
	search: function() {
		return axios.get(base);
	}
};