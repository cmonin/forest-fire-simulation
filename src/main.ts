import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCross } from '@fortawesome/free-solid-svg-icons'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faTree } from '@fortawesome/free-solid-svg-icons'

library.add(faCross)
library.add(faFire)
library.add(faTree)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
