import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var state = {
	playVideo: false
};

const mutations = {
	playVideo(state) {
		state.playVideo = true;
	}
};

const actions = {
	cartAdd: ({commit}) => {
		commit('cartAdd');
	}
};

const getters = {
	swiper(state) {
		return state;
	}
};

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
});