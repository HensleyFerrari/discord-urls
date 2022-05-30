import React from 'react'

import { Routes, Route } from 'react-router-dom'

import PrivateRoutes from './PrivateRoutes'

import AuthOrApp from '../authOrApp'
import Profile from '../pages/profile'
import Home from '../pages/home'
import Create from '../pages/Create'
import InfoEdit from '../pages/InfoEdit'
import Popular from '../pages/Popular'

import HomeAdmin from '../pages/Admin/Home'

function Router() {
    return (
        <Routes>
            <Route path="/" element={<AuthOrApp />} />
            <Route path="/home" element={<PrivateRoutes component={<Popular />} />} />
            <Route path="/search" element={<PrivateRoutes component={<Home />} />} />
            <Route path="/admin/home" element={<PrivateRoutes component={<HomeAdmin />} />} />
            <Route path="/profile" element={<PrivateRoutes component={<Profile />} />} />
            <Route path="/create" element={<PrivateRoutes component={<Create />} />} />
            <Route path="/:id/edit" element={<PrivateRoutes component={<InfoEdit />} />} />
        </Routes>
    )
}

export default Router