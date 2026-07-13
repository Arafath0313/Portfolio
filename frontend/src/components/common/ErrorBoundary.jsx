import { Component } from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

/**
 * Application-level Error Boundary.
 * Catches runtime rendering errors in its child component tree.
 * Displays a professional fallback UI with recovery options.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary] Caught error:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 dark:bg-slate-900">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-slate-800">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
              <FiAlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>

            {/* Title */}
            <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
              Something went wrong
            </h1>

            {/* Description */}
            <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
              An unexpected error occurred while rendering this page. You can try
              refreshing the page or navigating back to recover.
            </p>

            {/* Error detail (dev only) */}
            {this.state.error && (
              <pre className="mb-6 overflow-auto rounded-xl bg-slate-100 p-3 text-left text-xs text-red-600 dark:bg-slate-700 dark:text-red-400">
                {this.state.error.toString()}
              </pre>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FiRefreshCw className="h-4 w-4" />
                Reload Page
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
