import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCross } from '@fortawesome/free-solid-svg-icons'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faTree } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faForwardStep } from '@fortawesome/free-solid-svg-icons'
import { faForward } from '@fortawesome/free-solid-svg-icons'
import { faForwardFast } from '@fortawesome/free-solid-svg-icons'
import { faCircleStop } from '@fortawesome/free-solid-svg-icons'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'

library.add(faCross)
library.add(faFire)
library.add(faTree)
library.add(faUpload)
library.add(faPlay)
library.add(faPause)
library.add(faForwardStep)
library.add(faForward)
library.add(faForwardFast)
library.add(faCircleStop)
library.add(faRotateRight)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
