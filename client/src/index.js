import React from 'react'
import { createRoot } from 'react-dom/client'

import { WebsiteNavigation } from './components'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fontsource-variable/jetbrains-mono'
import './style/main.css'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(<WebsiteNavigation />)
