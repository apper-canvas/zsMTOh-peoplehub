import { Link } from "react-router-dom";
import { Home } from "lucide-react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-2">Page Not Found</h2>
      <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="btn btn-primary flex items-center"
      >
        <Home size={18} className="mr-2" />
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;