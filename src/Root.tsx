import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage';
import { CatalogPage } from './pages/CatalogPage';
import { ChoicesPage } from './pages/ChoicesPage';
import { HomePage } from './pages/HomePage';
import { RecepyDetailPage } from './pages/RecepyDetailPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route index element={<HomePage />} />
        <Route path="catalog">
          <Route index element={<CatalogPage />} />
          <Route path=":idMeal" element={<RecepyDetailPage />} />
        </Route>
        <Route path="choices" element={<ChoicesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
