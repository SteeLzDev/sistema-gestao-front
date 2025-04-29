(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_825efc48._.js", {

"[project]/components/theme-provider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeProvider": (()=>ThemeProvider),
    "useTheme": (()=>useTheme)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const initialState = {
    theme: "system",
    setTheme: ()=>null
};
const ThemeProviderContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(initialState);
// Helper function to check if code is running in browser
const isBrowser = ()=>"object" !== "undefined";
function ThemeProvider({ children, defaultTheme = "system", storageKey = "theme", attribute = "class", enableSystem = true, disableTransitionOnChange = false, ...props }) {
    _s();
    // Adicionar estado de montagem para evitar problemas de hidratação
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Initialize with defaultTheme and then update in useEffect
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultTheme);
    // Marcar componente como montado após a renderização inicial
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            setMounted(true);
        }
    }["ThemeProvider.useEffect"], []);
    // Initialize theme from localStorage only on client-side
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            if (isBrowser()) {
                const savedTheme = localStorage.getItem(storageKey);
                if (savedTheme) {
                    setTheme(savedTheme);
                }
            }
        }
    }["ThemeProvider.useEffect"], [
        defaultTheme,
        storageKey
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            if (!isBrowser() || !mounted) return;
            const root = window.document.documentElement;
            // Remover classes anteriores
            root.classList.remove("light", "dark");
            // Se for system, detectar preferência do sistema
            if (theme === "system" && enableSystem) {
                const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                root.classList.add(systemTheme);
                return;
            }
            // Adicionar classe do tema
            root.classList.add(theme);
            // Desabilitar transições durante a mudança de tema
            if (disableTransitionOnChange) {
                root.classList.add("no-transitions");
                window.setTimeout({
                    "ThemeProvider.useEffect": ()=>{
                        root.classList.remove("no-transitions");
                    }
                }["ThemeProvider.useEffect"], 0);
            }
        }
    }["ThemeProvider.useEffect"], [
        theme,
        enableSystem,
        disableTransitionOnChange,
        mounted
    ]);
    const value = {
        theme,
        setTheme: (theme)=>{
            if (isBrowser()) {
                localStorage.setItem(storageKey, theme);
            }
            setTheme(theme);
        }
    };
    // Renderizar children sem modificações durante SSR ou antes da montagem
    // para evitar problemas de hidratação
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeProviderContext.Provider, {
        ...props,
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/theme-provider.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "7Pq/FiQ2FwZGhQgtZHV4fjqiFGo=");
_c = ThemeProvider;
const useTheme = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeProviderContext);
    if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
_s1(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": (()=>cn),
    "formatarData": (()=>formatarData),
    "formatarMoeda": (()=>formatarMoeda)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatarData(data) {
    if (!data) return "";
    const dataObj = typeof data === "string" ? new Date(data) : data;
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }).format(dataObj);
}
function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valor);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ui/toast.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Toast": (()=>Toast),
    "ToastAction": (()=>ToastAction),
    "ToastClose": (()=>ToastClose),
    "ToastDescription": (()=>ToastDescription),
    "ToastProvider": (()=>ToastProvider),
    "ToastTitle": (()=>ToastTitle),
    "ToastViewport": (()=>ToastViewport),
    "useToast": (()=>useToast)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const ToastProvider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"];
const ToastViewport = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 16,
        columnNumber: 3
    }, this));
_c1 = ToastViewport;
ToastViewport.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"].displayName;
const toastVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
    variants: {
        variant: {
            default: "border bg-background text-foreground",
            destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const Toast = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c2 = ({ className, variant, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(toastVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 46,
        columnNumber: 10
    }, this);
});
_c3 = Toast;
Toast.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
const ToastAction = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 54,
        columnNumber: 3
    }, this));
_c5 = ToastAction;
ToastAction.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"].displayName;
const ToastClose = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", className),
        "toast-close": "",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/toast.tsx",
            lineNumber: 78,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 69,
        columnNumber: 3
    }, this));
_c7 = ToastClose;
ToastClose.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"].displayName;
const ToastTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 87,
        columnNumber: 3
    }, this));
_c9 = ToastTitle;
ToastTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"].displayName;
const ToastDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm opacity-90", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 95,
        columnNumber: 3
    }, this));
_c11 = ToastDescription;
ToastDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"].displayName;
;
const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000;
const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST"
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
const toastTimeouts = new Map();
const reducer = (state, action)=>{
    switch(action.type){
        case actionTypes.ADD_TOAST:
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case actionTypes.UPDATE_TOAST:
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case actionTypes.DISMISS_TOAST:
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toastId || action.toastId === undefined ? {
                        ...t,
                        open: false
                    } : t)
            };
        case actionTypes.REMOVE_TOAST:
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const useToast = ()=>{
    _s();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(reducer, {
        toasts: []
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useToast.useEffect": ()=>{
            state.toasts.forEach({
                "useToast.useEffect": (toast)=>{
                    if (toast.open) {
                        const timeout = setTimeout({
                            "useToast.useEffect.timeout": ()=>{
                                dispatch({
                                    type: actionTypes.DISMISS_TOAST,
                                    toastId: toast.id
                                });
                            }
                        }["useToast.useEffect.timeout"], TOAST_REMOVE_DELAY);
                        toastTimeouts.set(toast.id, timeout);
                    } else {
                        const timeout = setTimeout({
                            "useToast.useEffect.timeout": ()=>{
                                dispatch({
                                    type: actionTypes.REMOVE_TOAST,
                                    toastId: toast.id
                                });
                            }
                        }["useToast.useEffect.timeout"], 300);
                        toastTimeouts.set(toast.id, timeout);
                    }
                }
            }["useToast.useEffect"]);
            return ({
                "useToast.useEffect": ()=>{
                    toastTimeouts.forEach({
                        "useToast.useEffect": (timeout)=>clearTimeout(timeout)
                    }["useToast.useEffect"]);
                    toastTimeouts.clear();
                }
            })["useToast.useEffect"];
        }
    }["useToast.useEffect"], [
        state.toasts
    ]);
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useToast.useCallback[toast]": ({ ...props })=>{
            const id = genId();
            dispatch({
                type: actionTypes.ADD_TOAST,
                toast: {
                    ...props,
                    id,
                    open: true
                }
            });
            return id;
        }
    }["useToast.useCallback[toast]"], [
        dispatch
    ]);
    const dismiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useToast.useCallback[dismiss]": (toastId)=>{
            dispatch({
                type: actionTypes.DISMISS_TOAST,
                toastId
            });
        }
    }["useToast.useCallback[dismiss]"], [
        dispatch
    ]);
    return {
        toast,
        dismiss,
        toasts: state.toasts
    };
};
_s(useToast, "wFzwF3XxEWJfblgUD4OGzjlrnwY=");
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "ToastViewport$React.forwardRef");
__turbopack_context__.k.register(_c1, "ToastViewport");
__turbopack_context__.k.register(_c2, "Toast$React.forwardRef");
__turbopack_context__.k.register(_c3, "Toast");
__turbopack_context__.k.register(_c4, "ToastAction$React.forwardRef");
__turbopack_context__.k.register(_c5, "ToastAction");
__turbopack_context__.k.register(_c6, "ToastClose$React.forwardRef");
__turbopack_context__.k.register(_c7, "ToastClose");
__turbopack_context__.k.register(_c8, "ToastTitle$React.forwardRef");
__turbopack_context__.k.register(_c9, "ToastTitle");
__turbopack_context__.k.register(_c10, "ToastDescription$React.forwardRef");
__turbopack_context__.k.register(_c11, "ToastDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ui/toaster.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Toaster": (()=>Toaster)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/toast.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Toaster() {
    _s();
    const { toasts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastProvider"], {
        children: [
            toasts.map(({ id, title, description, action, open, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toast"], {
                    open: open,
                    ...props,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-1",
                            children: [
                                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastTitle"], {
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/toaster.tsx",
                                    lineNumber: 14,
                                    columnNumber: 23
                                }, this),
                                description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastDescription"], {
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/toaster.tsx",
                                    lineNumber: 15,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/toaster.tsx",
                            lineNumber: 13,
                            columnNumber: 11
                        }, this),
                        action,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastClose"], {}, void 0, false, {
                            fileName: "[project]/components/ui/toaster.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this)
                    ]
                }, id, true, {
                    fileName: "[project]/components/ui/toaster.tsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastViewport"], {}, void 0, false, {
                fileName: "[project]/components/ui/toaster.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/toaster.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(Toaster, "1YTCnXrq2qRowe0H/LBWLjtXoYc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = Toaster;
var _c;
__turbopack_context__.k.register(_c, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ui/use-toast.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "reducer": (()=>reducer),
    "toast": (()=>toast),
    "useToast": (()=>useToast)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST"
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_VALUE;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case "DISMISS_TOAST":
            {
                const { toastId } = action;
                // ! Side effects ! //
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((toast)=>{
                        addToRemoveQueue(toast.id);
                    });
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>{
        listener(memoryState);
    });
}
function toast({ ...props }) {
    const id = genId();
    const update = (props)=>dispatch({
            type: "UPDATE_TOAST",
            toast: {
                ...props,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: "DISMISS_TOAST",
            toastId: id
        });
    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>{
                if (!open) dismiss();
            }
        }
    });
    return {
        id: id,
        dismiss,
        update
    };
}
function useToast() {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(memoryState);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useToast.useEffect": ()=>{
            listeners.push(setState);
            return ({
                "useToast.useEffect": ()=>{
                    const index = listeners.indexOf(setState);
                    if (index > -1) {
                        listeners.splice(index, 1);
                    }
                }
            })["useToast.useEffect"];
        }
    }["useToast.useEffect"], [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: "DISMISS_TOAST",
                toastId
            })
    };
}
_s(useToast, "SPWE98mLGnlsnNfIwu/IAKTSZtk=");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/services/apiClient.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
// URL base com o contexto correto
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8080/sistema-gestao/api") || "http://localhost:8080/sistema-gestao";
console.log("API Base URL:", API_BASE_URL);
// Criar uma instância do axios sem interceptors
const apiClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});
// Adicionar função para verificar token (para compatibilidade)
apiClient.verificarToken = ()=>{
    const token = localStorage.getItem("token");
    if (!token) {
        console.warn("Token não encontrado no localStorage");
        return false;
    }
    // Verificar se o token é válido (pelo menos não está vazio)
    if (token.trim() === "") {
        console.error("Token vazio encontrado, removendo...");
        localStorage.removeItem("token");
        return false;
    }
    return true;
};
// Função para obter o token atual - corrigida para corresponder ao tipo
apiClient.getAuthHeader = ()=>{
    const token = localStorage.getItem("token");
    // Verificar se o token é válido (pelo menos não está vazio)
    if (!token || token.trim() === "") {
        console.warn("Token inválido ou vazio encontrado em getAuthHeader");
        return {};
    }
    return {
        Authorization: `Bearer ${token}`
    };
};
// Adicionar request interceptor para incluir o token automaticamente
apiClient.interceptors.request.use((config)=>{
    // Não logar se for uma requisição silenciosa
    if (!config.silent) {
        console.log(`[API] Enviando requisição para: ${config.method?.toUpperCase()} ${config.url}`);
    }
    // Add authentication token if available
    const token = localStorage.getItem("token");
    if (token && token.trim() !== "") {
        if (!config.silent) {
            console.log("[API] Token encontrado:", token.substring(0, 10) + "...");
        }
        config.headers.Authorization = `Bearer ${token.trim()}`;
        // Adicionar cabeçalhos para depuração CORS
        config.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
        config.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
    } else if (!config.silent) {
        console.warn("[API] Token não encontrado ou vazio!");
        // Se o token estiver vazio, removê-lo
        if (token && token.trim() === "") {
            console.error("[API] Token vazio encontrado, removendo...");
            localStorage.removeItem("token");
        }
    }
    return config;
}, (error)=>{
    if (!error.config?.silent) {
        console.error("[API] Erro no interceptor de requisição:", error);
    }
    return Promise.reject(error);
});
// Função para fazer requisições silenciosas (sem logs)
apiClient.silentRequest = async (config)=>{
    try {
        return await apiClient({
            ...config,
            silent: true
        });
    } catch (error) {
        // Não logar erros para requisições silenciosas
        return Promise.reject(error);
    }
};
// Função para renovar o token automaticamente
apiClient.renovarToken = async ()=>{
    try {
        // Verificar se há um token atual
        const tokenAtual = localStorage.getItem("token");
        if (!tokenAtual || tokenAtual.trim() === "") {
            console.error("[API] Não há token válido para renovar");
            // Remover token inválido
            if (tokenAtual && tokenAtual.trim() === "") {
                localStorage.removeItem("token");
            }
            return false;
        }
        // Verificar se há um usuário atual
        const userStr = localStorage.getItem("user");
        if (!userStr) {
            console.error("[API] Não há usuário para renovar token");
            return false;
        }
        const user = JSON.parse(userStr);
        // Fazer uma requisição para verificar e renovar o token
        try {
            // Corrigir a URL para evitar duplicação de /api/
            // Usar requisição silenciosa para evitar logs de erro
            const response = await apiClient.silentRequest({
                method: "get",
                url: "/auth/refresh",
                headers: {
                    Authorization: `Bearer ${tokenAtual}`
                }
            });
            // Se a requisição for bem-sucedida e retornar um novo token
            if (response.data && response.data.token) {
                // Verificar se o token é válido
                if (response.data.token.trim() === "") {
                    console.error("[API] Token vazio recebido do servidor");
                    return false;
                }
                // Atualizar o token no localStorage
                localStorage.setItem("token", response.data.token);
                console.log("[API] Token renovado com sucesso");
                // Atualizar o token no objeto do usuário
                user.token = response.data.token;
                localStorage.setItem("user", JSON.stringify(user));
                return true;
            }
            // Se não retornar um novo token, mas a requisição for bem-sucedida
            // significa que o token atual ainda é válido
            console.log("[API] Token atual ainda é válido");
            return true;
        } catch (error) {
            // Não logar o erro completo para evitar poluição do console
            console.warn("[API] Não foi possível renovar o token");
            // Se o erro for 401, o token está inválido e deve ser removido
            if (error.response && error.response.status === 401) {
                console.error("[API] Token inválido (401), removendo token do localStorage");
                localStorage.removeItem("token");
                // Não redirecionar automaticamente para evitar loops
                return false;
            }
            return false;
        }
    } catch (error) {
        console.error("[API] Erro ao renovar token");
        return false;
    }
};
// Modificar o interceptor de resposta para tentar renovar o token em caso de erro 401
apiClient.interceptors.response.use((response)=>{
    // Não logar se for uma requisição silenciosa
    if (!response.config.silent) {
        console.log(`[API] Resposta recebida: ${response.status} ${response.statusText}`);
    }
    return response;
}, async (error)=>{
    // Não logar se for uma requisição silenciosa
    if (!error.config?.silent) {
        console.error("[API] Erro na resposta:", error.message);
        if (error.response) {
            console.error(`[API] Status: ${error.response.status}`);
            if (error.response.data) {
                console.error(`[API] Dados: ${JSON.stringify(error.response.data)}`);
            }
        }
    }
    // Tentar renovar o token em caso de erro 401
    if (error.response && error.response.status === 401) {
        // Não logar se for uma requisição silenciosa
        if (!error.config?.silent) {
            console.warn("[API] Erro 401: Não autorizado. Tentando renovar token...");
        }
        const tokenRenovado = await apiClient.renovarToken();
        if (tokenRenovado) {
            // Se o token foi renovado com sucesso, tentar a requisição novamente
            if (!error.config?.silent) {
                console.log("[API] Token renovado, tentando requisição novamente...");
            }
            // Obter o novo token
            const novoToken = localStorage.getItem("token");
            // Verificar se o token é válido
            if (!novoToken || novoToken.trim() === "") {
                console.error("[API] Novo token inválido ou vazio");
                return Promise.reject(error);
            }
            // Configurar o cabeçalho de autorização com o novo token
            error.config.headers.Authorization = `Bearer ${novoToken}`;
            // Tentar a requisição novamente
            return apiClient(error.config);
        } else {
            // Se não foi possível renovar o token, limpar o token inválido
            localStorage.removeItem("token");
            // Propagar o erro para que a página possa redirecionar para login
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = apiClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/contexts/AuthContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": (()=>AuthProvider),
    "useAuth": (()=>useAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/use-toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/apiClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Helper function to check if we're in browser
const isBrowser = ()=>"object" !== "undefined";
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Função para carregar o usuário do localStorage
    const loadUserFromStorage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[loadUserFromStorage]": ()=>{
            if (!isBrowser()) {
                "TURBOPACK unreachable";
            }
            try {
                const storedUser = localStorage.getItem("user");
                const token = localStorage.getItem("token");
                if (!token || !storedUser) {
                    console.warn("Token ou usuário não encontrado no localStorage");
                    return false;
                }
                // Recuperar usuário armazenado
                const parsedUser = JSON.parse(storedUser);
                // Garantir que o usuário tenha um array de permissões
                if (!parsedUser.permissoes) {
                    parsedUser.permissoes = [];
                }
                // Verificar se o usuário tem perfil ADMIN
                if (parsedUser.perfil === "ADMIN") {
                    // Adicionar todas as permissões possíveis para ADMIN
                    const todasPermissoes = [
                        "ESTOQUE_VISUALIZAR",
                        "ESTOQUE_ADICIONAR",
                        "ESTOQUE_EDITAR",
                        "ESTOQUE_REMOVER",
                        "VENDAS_VISUALIZAR",
                        "VENDAS_CRIAR",
                        "VENDAS_CANCELAR",
                        "FILA_VISUALIZAR",
                        "FILA_GERENCIAR",
                        "RELATORIOS_VISUALIZAR",
                        "RELATORIOS_EXPORTAR",
                        "USUARIOS_VISUALIZAR",
                        "USUARIOS_CRIAR",
                        "USUARIOS_EDITAR",
                        "USUARIOS_REMOVER",
                        "USUARIOS_PERMISSOES",
                        "CONFIGURACOES_VISUALIZAR",
                        "CONFIGURACOES_EDITAR"
                    ];
                    // Adicionar permissões que não existem ainda
                    todasPermissoes.forEach({
                        "AuthProvider.useCallback[loadUserFromStorage]": (perm)=>{
                            if (!parsedUser.permissoes.includes(perm)) {
                                parsedUser.permissoes.push(perm);
                            }
                        }
                    }["AuthProvider.useCallback[loadUserFromStorage]"]);
                }
                setUser(parsedUser);
                return true;
            } catch (e) {
                console.error("Erro ao parsear usuário armazenado:", e);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                return false;
            }
        }
    }["AuthProvider.useCallback[loadUserFromStorage]"], []);
    // Check if user is authenticated on page load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if (isBrowser()) {
                const success = loadUserFromStorage();
                setLoading(false);
            }
        }
    }["AuthProvider.useEffect"], [
        loadUserFromStorage
    ]);
    // Function to check authentication status
    const checkAuth = async ()=>{
        if (!isBrowser()) {
            "TURBOPACK unreachable";
        }
        const token = localStorage.getItem("token");
        return !!token;
    };
    // Função para atualizar a autenticação
    const refreshAuth = async ()=>{
        if (!isBrowser()) {
            "TURBOPACK unreachable";
        }
        try {
            setLoading(true);
            // Verificar se há token
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token não encontrado");
            }
            // Fazer uma requisição para verificar a autenticação
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data) {
                // Garantir que permissões seja um array
                const permissoes = Array.isArray(response.data.permissoes) ? response.data.permissoes : [];
                // Se o usuário for ADMIN, adicionar todas as permissões
                if (response.data.perfil === "ADMIN") {
                    const todasPermissoes = [
                        "ESTOQUE_VISUALIZAR",
                        "ESTOQUE_ADICIONAR",
                        "ESTOQUE_EDITAR",
                        "ESTOQUE_REMOVER",
                        "VENDAS_VISUALIZAR",
                        "VENDAS_CRIAR",
                        "VENDAS_CANCELAR",
                        "FILA_VISUALIZAR",
                        "FILA_GERENCIAR",
                        "RELATORIOS_VISUALIZAR",
                        "RELATORIOS_EXPORTAR",
                        "USUARIOS_VISUALIZAR",
                        "USUARIOS_CRIAR",
                        "USUARIOS_EDITAR",
                        "USUARIOS_REMOVER",
                        "USUARIOS_PERMISSOES",
                        "CONFIGURACOES_VISUALIZAR",
                        "CONFIGURACOES_EDITAR"
                    ];
                    // Adicionar permissões que não existem ainda
                    todasPermissoes.forEach((perm)=>{
                        if (!permissoes.includes(perm)) {
                            permissoes.push(perm);
                        }
                    });
                }
                // Atualizar o usuário com os dados mais recentes
                const updatedUser = {
                    ...response.data,
                    permissoes: permissoes,
                    token
                };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);
                console.log("Autenticação atualizada com sucesso");
            }
        } catch (error) {
            console.error("Erro ao atualizar autenticação:", error);
            // Tentar carregar do localStorage
            const success = loadUserFromStorage();
            if (!success) {
                // Se não conseguir carregar do localStorage, fazer logout
                // Mas não redirecionar automaticamente
                if (isBrowser()) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
                setUser(null);
            }
        } finally{
            setLoading(false);
        }
    };
    // Login function
    const login = async (credentials)=>{
        try {
            setLoading(true);
            console.log("Iniciando login com:", credentials.username);
            // URL sem /api/ para evitar duplicação
            const baseUrl = ("TURBOPACK compile-time value", "http://localhost:8080/sistema-gestao/api") || "http://localhost:8080/sistema-gestao";
            // Caminho corrigido para login (sem /api/ duplicado)
            const loginUrl = `${baseUrl}/auth/login`;
            console.log("URL de login:", loginUrl);
            // Dados a serem enviados - garantir que o campo seja 'senha'
            const loginData = {
                username: credentials.username,
                senha: credentials.senha || credentials.password
            };
            console.log("Dados de login:", JSON.stringify(loginData, null, 2));
            // Usar Axios com depuração detalhada
            try {
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
                    method: "post",
                    url: loginUrl,
                    data: loginData,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log("Resposta do login:", response.data);
                // Extract token and user data
                const { token, user } = response.data;
                console.log("Token recebido:", token ? "Sim (comprimento: " + token.length + ")" : "Não");
                console.log("Usuário recebido:", user);
                console.log("Permissões recebidas:", user.permissoes);
                // Garantir que permissões seja um array
                const permissoes = Array.isArray(user.permissoes) ? user.permissoes : [];
                // Se o usuário for ADMIN, adicionar todas as permissões
                if (user.perfil === "ADMIN") {
                    const todasPermissoes = [
                        "ESTOQUE_VISUALIZAR",
                        "ESTOQUE_ADICIONAR",
                        "ESTOQUE_EDITAR",
                        "ESTOQUE_REMOVER",
                        "VENDAS_VISUALIZAR",
                        "VENDAS_CRIAR",
                        "VENDAS_CANCELAR",
                        "FILA_VISUALIZAR",
                        "FILA_GERENCIAR",
                        "RELATORIOS_VISUALIZAR",
                        "RELATORIOS_EXPORTAR",
                        "USUARIOS_VISUALIZAR",
                        "USUARIOS_CRIAR",
                        "USUARIOS_EDITAR",
                        "USUARIOS_REMOVER",
                        "USUARIOS_PERMISSOES",
                        "CONFIGURACOES_VISUALIZAR",
                        "CONFIGURACOES_EDITAR"
                    ];
                    // Adicionar permissões que não existem ainda
                    todasPermissoes.forEach((perm)=>{
                        if (!permissoes.includes(perm)) {
                            permissoes.push(perm);
                        }
                    });
                }
                // Create user object
                const loggedUser = {
                    id: user.id,
                    username: user.username,
                    nome: user.nome || user.username,
                    perfil: user.perfil || "USER",
                    permissoes: permissoes,
                    token
                };
                // Store in localStorage
                if (isBrowser()) {
                    localStorage.setItem("token", token);
                    console.log("Token armazenado em localStorage:", token.substring(0, 10) + "...");
                    localStorage.setItem("user", JSON.stringify(loggedUser));
                    console.log("Usuário armazenado em localStorage");
                }
                setUser(loggedUser);
                toast({
                    title: "Login realizado com sucesso",
                    description: `Bem-vindo, ${loggedUser.nome || loggedUser.username}!`
                });
                // Redirecionar para a página inicial após o login bem-sucedido
                router.push("/dashboard");
            } catch (axiosError) {
                console.error("Erro do Axios:", axiosError);
                if (axiosError.response) {
                    console.error("Resposta de erro:", axiosError.response.data);
                    console.error("Status:", axiosError.response.status);
                    console.error("Cabeçalhos:", axiosError.response.headers);
                    throw new Error(axiosError.response.data?.message || axiosError.response.data || "Falha na autenticação");
                } else if (axiosError.request) {
                    console.error("Requisição sem resposta:", axiosError.request);
                    throw new Error("Não foi possível conectar ao servidor");
                } else {
                    console.error("Erro na configuração da requisição:", axiosError.message);
                    throw new Error("Erro na configuração da requisição");
                }
            }
        } catch (error) {
            console.error("Erro no login:", error);
            toast({
                title: "Erro no login",
                description: error.message || "Credenciais inválidas. Tente novamente.",
                variant: "destructive"
            });
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // Logout function
    const logout = ()=>{
        if (isBrowser()) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        setUser(null);
        toast({
            title: "Logout realizado",
            description: "Você foi desconectado com sucesso."
        });
        // Redirecionar para a página de login
        router.push("/login");
    };
    // Modificar a função hasPermission para ser mais flexível e evitar redirecionamentos automáticos
    // Função para verificar se o usuário tem uma permissão específica
    const hasPermission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[hasPermission]": (permission)=>{
            if (!user || !user.permissoes) {
                console.warn("Verificação de permissão falhou: usuário ou permissões não definidos");
                return false;
            }
            // Verificar se o usuário é ADMIN (tem todas as permissões)
            if (user.perfil === "ADMIN") {
                return true;
            }
            // Verificar se a permissão existe diretamente
            if (user.permissoes.includes(permission)) {
                return true;
            }
            // Mapeamentos comuns (frontend para backend e vice-versa)
            const mappings = {
                // Frontend para Backend
                view_inventory: "ESTOQUE_VISUALIZAR",
                add_inventory: "ESTOQUE_ADICIONAR",
                edit_inventory: "ESTOQUE_EDITAR",
                delete_inventory: "ESTOQUE_REMOVER",
                view_sales: "VENDAS_VISUALIZAR",
                create_sale: "VENDAS_CRIAR",
                cancel_sale: "VENDAS_CANCELAR",
                view_queue: "FILA_VISUALIZAR",
                manage_queue: "FILA_GERENCIAR",
                view_reports: "RELATORIOS_VISUALIZAR",
                export_reports: "RELATORIOS_EXPORTAR",
                view_users: "USUARIOS_VISUALIZAR",
                create_user: "USUARIOS_CRIAR",
                edit_user: "USUARIOS_EDITAR",
                delete_user: "USUARIOS_REMOVER",
                manage_permissions: "USUARIOS_PERMISSOES",
                view_settings: "CONFIGURACOES_VISUALIZAR",
                edit_settings: "CONFIGURACOES_EDITAR",
                // Backend para Frontend
                ESTOQUE_VISUALIZAR: "view_inventory",
                ESTOQUE_ADICIONAR: "add_inventory",
                ESTOQUE_EDITAR: "edit_inventory",
                ESTOQUE_REMOVER: "delete_inventory",
                VENDAS_VISUALIZAR: "view_sales",
                VENDA_VISUALIZAR: "view_sales",
                VENDAS_CRIAR: "create_sale",
                VENDA_CRIAR: "create_sale",
                VENDAS_CANCELAR: "cancel_sale",
                VENDA_CANCELAR: "cancel_sale",
                FILA_VISUALIZAR: "view_queue",
                FILA_GERENCIAR: "manage_queue",
                RELATORIOS_VISUALIZAR: "view_reports",
                RELATORIOS_EXPORTAR: "export_reports",
                USUARIOS_VISUALIZAR: "view_users",
                USUARIOS_CRIAR: "create_user",
                USUARIOS_EDITAR: "edit_user",
                USUARIOS_REMOVER: "delete_user",
                USUARIOS_PERMISSOES: "manage_permissions",
                CONFIGURACOES_VISUALIZAR: "view_settings",
                CONFIGURACOES_EDITAR: "edit_settings"
            };
            // Verificar se existe um mapeamento para a permissão
            const mappedPermission = mappings[permission];
            if (mappedPermission && user.permissoes.includes(mappedPermission)) {
                return true;
            }
            // Verificar se a permissão sem o "S" existe (para compatibilidade com o backend)
            if (permission === "VENDAS_VISUALIZAR" && user.permissoes.includes("VENDA_VISUALIZAR")) {
                return true;
            }
            if (permission === "VENDAS_CRIAR" && user.permissoes.includes("VENDA_CRIAR")) {
                return true;
            }
            if (permission === "VENDAS_CANCELAR" && user.permissoes.includes("VENDA_CANCELAR")) {
                return true;
            }
            // Verificar se a permissão com o "S" existe (para compatibilidade com o backend)
            if (permission === "VENDA_VISUALIZAR" && user.permissoes.includes("VENDAS_VISUALIZAR")) {
                return true;
            }
            if (permission === "VENDA_CRIAR" && user.permissoes.includes("VENDAS_CRIAR")) {
                return true;
            }
            if (permission === "VENDA_CANCELAR" && user.permissoes.includes("VENDAS_CANCELAR")) {
                return true;
            }
            // Verificações adicionais para a permissão de fila
            if (permission === "VIEW_QUEUE" && user.permissoes.includes("FILA_GERENCIAR")) {
                return true;
            }
            if (permission === "FILA_VISUALIZAR" && user.permissoes.includes("FILA_GERENCIAR")) {
                return true;
            }
            return false;
        }
    }["AuthProvider.useCallback[hasPermission]"], [
        user
    ]);
    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuth,
        hasPermission,
        refreshAuth
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/AuthContext.tsx",
        lineNumber: 485,
        columnNumber: 10
    }, this);
}
_s(AuthProvider, "oHYlRLEf0vPOA1AZZOtwFKPAwzE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_825efc48._.js.map