import Vue from 'vue';
import App from './App.vue';
// @ts-ignore
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_API_TOKEN',
    libraries: 'places',
  },
});

new Vue({
  render: h => h(App),
}).$mount('#app');


