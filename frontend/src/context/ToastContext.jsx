import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext(undefined);

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const STYLES = {
  success: "bg-primary text-secondary border-secondary/10",
  error: "bg-red-600 text-white border-red-500",
  info: "bg-secondary text-primary border-primary/10",
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef(null);

  const showToast = useCallback(
    (message, { type = "success", duration = 3000 } = {}) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const id = crypto.randomUUID();
      setToast({ id, message, type });

      if (duration > 0) {
        timeoutRef.current = setTimeout(() => {
          setToast((prev) => (prev?.id === id ? null : prev));
        }, duration);
      }
    },
    [],
  );

  const dismissToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setToast(null);
  }, []);

  const Icon = toast ? (ICONS[toast.type] ?? Info) : null;

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[999] w-[calc(100%-2.5rem)] max-w-sm">
          <div
            key={toast.id}
            className={`flex items-center gap-3 rounded-lg border shadow-lg px-4 py-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${STYLES[toast.type]}`}
          >
            <Icon size={18} className="shrink-0" />
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
              type="button"
              onClick={dismissToast}
              aria-label="Dismiss"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default ToastContext;
