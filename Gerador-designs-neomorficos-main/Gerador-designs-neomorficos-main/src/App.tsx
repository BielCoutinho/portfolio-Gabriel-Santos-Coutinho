/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StrictMode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import { RemoteConfigProvider } from './context/RemoteConfigContext';

export default function App() {
  return (
    <StrictMode>
      <RemoteConfigProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Router>
      </RemoteConfigProvider>
    </StrictMode>
  );
}
