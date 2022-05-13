import React from 'react'

import { Routes, Route } from 'react-router-dom'

import PrivateRoutes from './PrivateRoutes'

import AuthOrApp from '../authOrApp'
import Profile from '../pages/profile'
import Home from '../pages/home'
import Create from '../pages/Create'

function Router() {
    return (
        <Routes>
            <Route path="/" element={<AuthOrApp />} />
            <Route path="/home" element={<PrivateRoutes component={<Home />} />} />
            <Route path="/profile" element={<PrivateRoutes component={<Profile />} />} />
            <Route path="/create" element={<PrivateRoutes component={<Create />} />} />
        </Routes>
    )
}

export default Router