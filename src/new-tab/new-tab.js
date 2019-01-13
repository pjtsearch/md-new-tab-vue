import Vue from 'vue';
import App from './App';
import store from '../store';
import router from './router';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import '../assets/mdi/mdi.css';

Vue.use(MuseUI);


/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
