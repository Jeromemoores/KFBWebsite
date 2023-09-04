import React from 'react'
import { createRoot } from 'react-dom/client'

import { WebsiteNavigation } from './components'

import '@fontsource-variable/jetbrains-mono'
import './style/main.css'

createRoot(document.getElementById('root')).render(<WebsiteNavigation />)
