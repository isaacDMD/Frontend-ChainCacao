import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ROLE_LABELS = {
  AGRICULTEUR:   'Agriculteur',
  COOPERATIVE:   'Coopérative',
  TRANSFORMATEUR:'Transformateur',
  EXPORTATEUR:   'Exportateur',
  ADMIN:         'Admin',
};

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  const links = [
    { to: '/',          label: 'Dashboard' },
    { to: '/lots/new',  label: 'Créer un lot' },
    { to: '/verify',    label: 'Vérifier un lot' },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="bg-green-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-8">
          <span className="font-bold text-lg tracking-tight">
            ChainCacao
          </span>
          <div className="flex gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  pathname === l.to
                    ? 'bg-green-700 font-medium'
                    : 'hover:bg-green-800'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-green-300">
            {ROLE_LABELS[user?.role]} — {user?.prenom} {user?.nom}
          </span>
          <button
            onClick={handleLogout}
            className="bg-green-700 hover:bg-green-600 px-3 py-1.5 rounded-md transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}