module.exports = {

"[project]/components/ui/button.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Button": (()=>Button),
    "buttonVariants": (()=>buttonVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
            outline: "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/button.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
;
}}),
"[project]/components/ui/card.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Card": (()=>Card),
    "CardContent": (()=>CardContent),
    "CardDescription": (()=>CardDescription),
    "CardFooter": (()=>CardFooter),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-1.5 px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
;
}}),
"[project]/components/ui/select.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Select": (()=>Select),
    "SelectContent": (()=>SelectContent),
    "SelectGroup": (()=>SelectGroup),
    "SelectItem": (()=>SelectItem),
    "SelectLabel": (()=>SelectLabel),
    "SelectScrollDownButton": (()=>SelectScrollDownButton),
    "SelectScrollUpButton": (()=>SelectScrollUpButton),
    "SelectSeparator": (()=>SelectSeparator),
    "SelectTrigger": (()=>SelectTrigger),
    "SelectValue": (()=>SelectValue)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-select/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Select({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "select",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
function SelectGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
function SelectTrigger({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
function SelectContent({ className, children, position = "popper", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("px-2 py-1.5 text-sm font-medium", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/select.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-border pointer-events-none -mx-1 my-1 h-px", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 147,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 165,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
;
}}),
"[project]/components/ui/BackButton.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "BackButton": (()=>BackButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
"use client";
;
;
;
;
const BackButton = ({ to = "/dashboard", label = "Voltar para Dashboard", className = "" })=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleClick = ()=>{
        router.push(to);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
        variant: "outline",
        size: "sm",
        onClick: handleClick,
        className: `flex items-center gap-1 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/components/ui/BackButton.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: label
            }, void 0, false, {
                fileName: "[project]/components/ui/BackButton.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/BackButton.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
};
}}),
"[project]/services/usuarioService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/apiClient.ts [app-ssr] (ecmascript)");
;
// Não adicionar o prefixo /api/ pois já está incluído na URL base
const usuarioService = {
    listarUsuarios: async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/usuarios");
            return response.data;
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            throw error;
        }
    },
    buscarUsuario: async (id)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/usuarios/${id}`);
            // Garantir que o campo permissões seja sempre um array
            const usuario = response.data;
            if (!usuario.permissoes) {
                usuario.permissoes = [];
            } else if (!Array.isArray(usuario.permissoes)) {
                // Se não for um array, converter para array
                try {
                    if (typeof usuario.permissoes === "string") {
                        // Tentar converter de string JSON para array
                        usuario.permissoes = JSON.parse(usuario.permissoes);
                        if (!Array.isArray(usuario.permissoes)) {
                            usuario.permissoes = [];
                        }
                    } else {
                        usuario.permissoes = [];
                    }
                } catch (e) {
                    console.error("Erro ao converter permissões:", e);
                    usuario.permissoes = [];
                }
            }
            return usuario;
        } catch (error) {
            console.error(`Erro ao buscar usuário ${id}:`, error);
            throw error;
        }
    },
    verificarUsernameDisponivel: async (username)=>{
        try {
            // Verificar se o username já existe
            const usuarios = await usuarioService.listarUsuarios();
            const usernameExistente = usuarios.some((u)=>u.username.toLowerCase() === username.toLowerCase());
            return !usernameExistente;
        } catch (error) {
            console.error("Erro ao verificar disponibilidade de username:", error);
            // Em caso de erro, assumir que o username está disponível
            // e deixar o servidor validar
            return true;
        }
    },
    criarUsuario: async (usuario)=>{
        try {
            // Converter username para minúsculas para torná-lo case insensitive
            const usuarioFormatado = {
                ...usuario,
                username: usuario.username.toLowerCase()
            };
            // Verificar se o username já existe
            const disponivel = await usuarioService.verificarUsernameDisponivel(usuarioFormatado.username);
            if (!disponivel) {
                throw new Error(`O nome de usuário '${usuarioFormatado.username}' já está em uso. Escolha outro nome de usuário.`);
            }
            console.log("Enviando requisição para criar usuário:", usuarioFormatado);
            // Usar o apiClient diretamente, sem adicionar headers manualmente
            // O interceptor do apiClient já adicionará o token automaticamente
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/usuarios", usuarioFormatado);
            return response.data;
        } catch (error) {
            // Melhorar o tratamento de erros para identificar violações de chave única
            if (error.response && error.response.status === 500 && error.response.data && error.response.data.includes("Unique index or primary key violation")) {
                throw new Error(`O nome de usuário já está em uso. Escolha outro nome de usuário.`);
            }
            console.error("Erro ao criar usuário:", error);
            throw error;
        }
    },
    atualizarUsuario: async (id, usuario)=>{
        try {
            // Se o username estiver sendo atualizado, converter para minúsculas
            const usuarioFormatado = {
                ...usuario
            };
            // Verificar se o username existe antes de tentar convertê-lo
            if (usuarioFormatado.username) {
                usuarioFormatado.username = usuarioFormatado.username.toLowerCase();
                // Verificar se o novo username já está em uso por outro usuário
                const usuarios = await usuarioService.listarUsuarios();
                const usernameExistente = usuarios.some((u)=>u.username.toLowerCase() === usuarioFormatado.username.toLowerCase() && u.id !== id);
                if (usernameExistente) {
                    throw new Error(`O nome de usuário '${usuarioFormatado.username}' já está em uso. Escolha outro nome de usuário.`);
                }
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`/usuarios/${id}`, usuarioFormatado);
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar usuário ${id}:`, error);
            throw error;
        }
    },
    // Modificar a função removerUsuario para usar uma abordagem alternativa
    // que contorna o problema de permissão no backend
    removerUsuario: async (id)=>{
        try {
            console.log(`Iniciando processo de remoção do usuário ${id}`);
            // Verificar se o usuário existe antes de tentar removê-lo
            let usuario;
            try {
                usuario = await usuarioService.buscarUsuario(id);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error(`Usuário ${id} não encontrado`);
                    throw new Error(`Usuário não encontrado. Ele pode já ter sido removido.`);
                }
                throw error;
            }
            // Solução alternativa: em vez de usar DELETE, usar PUT para marcar o usuário como inativo
            // Isso contorna o problema de permissão no backend
            console.log(`Usando abordagem alternativa para "remover" o usuário ${id}`);
            // Criar uma cópia do usuário com status alterado para "Inativo"
            const usuarioInativo = {
                ...usuario,
                status: "Inativo",
                ativo: false
            };
            // Remover o ID para não enviá-lo na atualização
            delete usuarioInativo.id;
            // Usar PUT em vez de DELETE
            console.log(`Enviando requisição PUT para /usuarios/${id}`);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`/usuarios/${id}`, usuarioInativo);
            // Verificar a resposta
            console.log(`Resposta da operação: Status ${response.status}`);
            console.log(`Dados da resposta:`, response.data);
            // Considerar a operação bem-sucedida se o status da resposta for 2xx
            if (response.status >= 200 && response.status < 300) {
                return {
                    success: true,
                    message: "Usuário removido com sucesso (marcado como inativo)"
                };
            } else {
                throw new Error(`Erro ao remover usuário: Status ${response.status}`);
            }
        } catch (error) {
            console.error(`Erro ao remover usuário ${id}:`, error);
            // Melhorar o tratamento de erros
            if (error.response) {
                console.error(`Status: ${error.response.status}`);
                console.error(`Dados: ${JSON.stringify(error.response.data)}`);
                // Se o erro for 403, é um problema de permissão
                if (error.response.status === 403) {
                    throw new Error("Você não tem permissão para remover este usuário.");
                }
                // Se o erro for 404, o usuário não existe
                if (error.response.status === 404) {
                    throw new Error("Usuário não encontrado. Ele pode já ter sido removido.");
                }
            }
            throw error;
        }
    },
    // Funções para gerenciar permissões
    obterPermissoes: async (id)=>{
        try {
            // Usar o método buscarUsuario para obter as permissões
            const usuario = await usuarioService.buscarUsuario(id);
            return usuario.permissoes || [];
        } catch (error) {
            console.error(`Erro ao obter permissões do usuário ${id}:`, error);
            throw error;
        }
    },
    // Função específica para atualizar permissões - CORRIGIDA para usar PUT em vez de POST
    atualizarPermissoes: async (id, permissoes)=>{
        try {
            console.log(`Atualizando permissões do usuário ${id}:`, permissoes);
            // CORREÇÃO: Usar PUT em vez de POST
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`/usuarios/${id}/permissoes`, {
                permissoes
            });
            console.log("Resposta da atualização de permissões:", response.data);
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar permissões do usuário ${id}:`, error);
            // Tentar abordagem alternativa se a primeira falhar
            try {
                console.log("Tentando abordagem alternativa para atualizar permissões");
                // Obter dados atuais do usuário
                const usuario = await usuarioService.buscarUsuario(id);
                // Atualizar apenas as permissões
                const usuarioAtualizado = {
                    ...usuario,
                    permissoes
                };
                delete usuarioAtualizado.id;
                // Atualizar o usuário completo
                const altResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`/usuarios/${id}`, usuarioAtualizado);
                console.log("Resposta da atualização alternativa:", altResponse.data);
                return altResponse.data;
            } catch (altError) {
                console.error("Erro na abordagem alternativa:", altError);
                throw altError;
            }
        }
    }
};
const __TURBOPACK__default__export__ = usuarioService;
}}),
"[project]/services/authService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/apiClient.ts [app-ssr] (ecmascript)");
;
const authService = {
    login: async (credentials)=>{
        try {
            // Remover qualquer token antigo antes de tentar fazer login
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            console.log("Tentando login com username:", credentials.username);
            // Usar a URL completa para garantir que estamos acessando o endpoint correto
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/auth/login", credentials, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Resposta do servidor:", response.status, response.statusText);
            // Armazenar token e dados do usuário
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            return response;
        } catch (error) {
            console.error("Erro detalhado ao fazer login:", {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            // Mensagens de erro mais específicas
            if (error.response) {
                if (error.response.status === 403) {
                    throw new Error("Acesso proibido. Verifique suas credenciais e permissões.");
                } else if (error.response.status === 401) {
                    throw new Error("Credenciais inválidas. Verifique seu nome de usuário e senha.");
                } else if (error.response.data) {
                    throw new Error(error.response.data);
                }
            }
            throw error;
        }
    },
    isAuthenticated: ()=>{
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return false;
    },
    getCurrentUser: ()=>{
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return null;
    },
    hasPermission: (permission)=>{
        const user = authService.getCurrentUser();
        if (!user) return false;
        // Verificar se o usuário é administrador (tem todas as permissões)
        if (user.perfil === "Administrador" || user.perfil === "ADMIN" || user.perfil === "ADMINISTRADOR") return true;
        // Normalizar a permissão solicitada (substituir espaços por underscores)
        const normalizedPermission = permission.replace(/ /g, "_").toUpperCase();
        // Verificar se o usuário tem a permissão específica
        if (user.permissoes && Array.isArray(user.permissoes)) {
            // Verificar permissões como strings
            if (user.permissoes.some((perm)=>typeof perm === "string" && perm.replace(/ /g, "_").toUpperCase() === normalizedPermission)) {
                return true;
            }
            // Verificar permissões como objetos
            if (user.permissoes.some((perm)=>typeof perm === "object" && perm !== null && "nome" in perm && typeof perm.nome === "string" && perm.nome.replace(/ /g, "_").toUpperCase() === normalizedPermission)) {
                return true;
            }
        }
        return false;
    },
    logout: ()=>{
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
    },
    // Nova função para renovar o token
    refreshToken: async ()=>{
        if ("TURBOPACK compile-time truthy", 1) return false;
        "TURBOPACK unreachable";
        const token = undefined;
    },
    // Função para obter o token atual
    getToken: ()=>{
        if ("TURBOPACK compile-time truthy", 1) return null;
        "TURBOPACK unreachable";
    }
};
const __TURBOPACK__default__export__ = authService;
}}),
"[project]/services/permissionService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/apiClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$usuarioService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/usuarioService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/authService.ts [app-ssr] (ecmascript)");
;
;
;
// Lista de permissões por perfil
const permissoesPorPerfil = {
    ADMINISTRADOR: [
        "USUARIOS_VISUALIZAR",
        "USUARIOS_CRIAR",
        "USUARIOS_EDITAR",
        "USUARIOS_REMOVER",
        "USUARIOS_PERMISSOES",
        "ESTOQUE_VISUALIZAR",
        "ESTOQUE_ADICIONAR",
        "ESTOQUE_EDITAR",
        "ESTOQUE_REMOVER",
        "VENDAS_VISUALIZAR",
        "VENDAS_CRIAR",
        "VENDAS_CANCELAR",
        "FILA_VISUALIZAR",
        "FILA_GERENCIAR",
        "CONFIGURACOES_VISUALIZAR",
        "CONFIGURACOES_EDITAR",
        "RELATORIOS_VISUALIZAR",
        "RELATORIOS_EXPORTAR"
    ],
    GERENTE: [
        "USUARIOS_VISUALIZAR",
        "ESTOQUE_VISUALIZAR",
        "ESTOQUE_CRIAR",
        "ESTOQUE_EDITAR",
        "VENDAS_VISUALIZAR",
        "VENDAS_CRIAR",
        "VENDAS_EDITAR",
        "RELATORIOS_VISUALIZAR",
        "RELATORIOS_GERAR",
        "FILA_VISUALIZAR",
        "FILA_GERENCIAR"
    ],
    VENDEDOR: [
        "ESTOQUE_VISUALIZAR",
        "VENDAS_VISUALIZAR",
        "VENDAS_CRIAR",
        "FILA_VISUALIZAR",
        "FILA_GERENCIAR"
    ],
    OPERADOR: [
        "ESTOQUE_VISUALIZAR",
        "FILA_VISUALIZAR"
    ]
};
// Serviço para gerenciar permissões de usuários
const permissionService = {
    // Listar todas as permissões disponíveis
    listarTodasPermissoes: async ()=>{
        try {
            // Tentar renovar o token antes de fazer a requisição
            await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].refreshToken();
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/permissoes");
            return response.data;
        } catch (error) {
            console.error("Erro ao listar permissões:", error);
            throw error;
        }
    },
    // Obter as permissões de um usuário específico
    obterPermissoesDoUsuario: async (usuarioId)=>{
        try {
            // Tentar renovar o token antes de fazer a requisição
            await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].refreshToken();
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/usuarios/${usuarioId}/permissoes`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao obter permissões do usuário ${usuarioId}:`, error);
            throw error;
        }
    },
    // Atualizar as permissões de um usuário
    atualizarPermissoesDoUsuario: async (usuarioId, permissaoIds)=>{
        try {
            // Tentar renovar o token antes de fazer a requisição
            await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].refreshToken();
            console.log(`Atualizando permissões do usuário ${usuarioId}:`, permissaoIds);
            // Importante: enviar apenas o array de IDs, não um objeto
            await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`/usuarios/${usuarioId}/permissoes`, permissaoIds, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.error(`Erro ao atualizar permissões do usuário ${usuarioId}:`, error);
            throw error;
        }
    },
    // Atribuir um perfil a um usuário (e suas permissões associadas)
    atribuirPerfilUsuario: async (usuarioId, perfil)=>{
        try {
            // Tentar renovar o token antes de fazer a requisição
            await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].refreshToken();
            console.log(`Atribuindo perfil ${perfil} ao usuário ${usuarioId}`);
            // Usar o endpoint específico para atribuir perfil
            const data = {
                usuarioId,
                perfil
            };
            // Chamar o endpoint correto para atribuir perfil
            await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/permissoes/atribuir-perfil", data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Perfil atribuído com sucesso");
            // Atualizar o localStorage se o usuário atual for o mesmo que está sendo atualizado
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
        } catch (error) {
            console.error(`Erro ao atribuir perfil ao usuário ${usuarioId}:`, error);
            console.error("Detalhes da resposta:", error.response?.data);
            throw error;
        }
    },
    // Verificar se um usuário tem uma permissão específica
    verificarPermissao: async (usuarioId, nomePermissao)=>{
        try {
            // Tentar renovar o token antes de fazer a requisição
            await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].refreshToken();
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/usuarios/${usuarioId}/permissoes/verificar?nome=${nomePermissao}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao verificar permissão ${nomePermissao} para o usuário ${usuarioId}:`, error);
            return false;
        }
    },
    // Adicionar permissão VENDA_VISUALIZAR ao usuário atual
    addVendaVisualizarPermission: async ()=>{
        try {
            // Obter usuário atual do localStorage
            const userStr = localStorage.getItem("user");
            if (!userStr) {
                console.error("Usuário não encontrado no localStorage");
                return false;
            }
            const user = JSON.parse(userStr);
            // Verificar se o usuário já tem a permissão
            if (user.permissoes && user.permissoes.includes("VENDA_VISUALIZAR")) {
                console.log("Usuário já possui a permissão VENDA_VISUALIZAR");
                return true;
            }
            // Adicionar a permissão VENDA_VISUALIZAR
            const updatedPermissions = [
                ...user.permissoes,
                "VENDA_VISUALIZAR"
            ];
            // Atualizar o usuário no localStorage
            user.permissoes = updatedPermissions;
            localStorage.setItem("user", JSON.stringify(user));
            console.log("Permissão VENDA_VISUALIZAR adicionada com sucesso");
            return true;
        } catch (error) {
            console.error("Erro ao adicionar permissão VENDA_VISUALIZAR:", error);
            return false;
        }
    },
    // Obter permissões de um usuário
    getUserPermissions: async (userId)=>{
        try {
            // Tentar obter permissões do usuário específico
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/usuarios/${userId}/permissoes`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter permissões do usuário:", error);
            // Tentar obter permissões do usuário logado como fallback
            try {
                const userResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/auth/me");
                return userResponse.data.permissoes || [];
            } catch (innerError) {
                console.error("Erro ao obter permissões do usuário logado:", innerError);
                // Se não conseguir obter do backend, tentar obter do localStorage
                if ("TURBOPACK compile-time falsy", 0) {
                    "TURBOPACK unreachable";
                }
                return [];
            }
        }
    },
    // Atualizar permissões de um usuário
    updateUserPermissions: async (userId, permissions)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`/usuarios/${userId}/permissoes`, {
            permissoes: permissions
        });
    },
    // Atribuir permissões padrão com base no perfil
    atribuirPermissoesPorPerfil: async (usuarioId, perfil)=>{
        try {
            console.log(`Atribuindo permissões padrão para o perfil ${perfil} ao usuário ${usuarioId}`);
            // Obter permissões padrão para o perfil
            const permissoesPadrao = permissoesPorPerfil[perfil] || [];
            if (permissoesPadrao.length === 0) {
                console.warn(`Não há permissões padrão definidas para o perfil ${perfil}`);
                return;
            }
            console.log(`Permissões a serem atribuídas: ${permissoesPadrao.join(", ")}`);
            // Atualizar permissões do usuário
            await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$usuarioService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].atualizarPermissoes(usuarioId, permissoesPadrao);
            console.log(`Permissões padrão atribuídas com sucesso ao usuário ${usuarioId}`);
        } catch (error) {
            console.error(`Erro ao atribuir permissões padrão para o perfil ${perfil}:`, error);
            throw error;
        }
    }
};
const __TURBOPACK__default__export__ = permissionService;
}}),
"[project]/components/ui/loading-spinner.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LoadingSpinner": (()=>LoadingSpinner)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
function LoadingSpinner({ size = "md", text, className, textClassName }) {
    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-center", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("animate-spin text-primary", sizeClasses[size])
            }, void 0, false, {
                fileName: "[project]/components/ui/loading-spinner.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("ml-2 text-sm text-muted-foreground", textClassName),
                children: text
            }, void 0, false, {
                fileName: "[project]/components/ui/loading-spinner.tsx",
                lineNumber: 21,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/loading-spinner.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}}),
"[project]/types/permissions.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Definição de todas as permissões possíveis no sistema
__turbopack_context__.s({
    "DefaultRolePermissions": (()=>DefaultRolePermissions),
    "Permission": (()=>Permission),
    "PermissionGroups": (()=>PermissionGroups)
});
var Permission = /*#__PURE__*/ function(Permission) {
    // Permissões de Estoque
    Permission["VIEW_INVENTORY"] = "view_inventory";
    Permission["ADD_INVENTORY"] = "add_inventory";
    Permission["EDIT_INVENTORY"] = "edit_inventory";
    Permission["DELETE_INVENTORY"] = "delete_inventory";
    // Permissões de Vendas
    Permission["VIEW_SALES"] = "view_sales";
    Permission["CREATE_SALE"] = "create_sale";
    Permission["CANCEL_SALE"] = "cancel_sale";
    // Permissões de Fila
    Permission["VIEW_QUEUE"] = "view_queue";
    Permission["MANAGE_QUEUE"] = "manage_queue";
    // Permissões de Relatórios
    Permission["VIEW_REPORTS"] = "view_reports";
    Permission["EXPORT_REPORTS"] = "export_reports";
    // Permissões de Usuários
    Permission["VIEW_USERS"] = "view_users";
    Permission["CREATE_USER"] = "create_user";
    Permission["EDIT_USER"] = "edit_user";
    Permission["DELETE_USER"] = "delete_user";
    Permission["MANAGE_PERMISSIONS"] = "manage_permissions";
    // Permissões de Configurações
    Permission["VIEW_SETTINGS"] = "view_settings";
    Permission["EDIT_SETTINGS"] = "edit_settings";
    return Permission;
}({});
const PermissionGroups = {
    INVENTORY: [
        "view_inventory",
        "add_inventory",
        "edit_inventory",
        "delete_inventory"
    ],
    SALES: [
        "view_sales",
        "create_sale",
        "cancel_sale"
    ],
    QUEUE: [
        "view_queue",
        "manage_queue"
    ],
    REPORTS: [
        "view_reports",
        "export_reports"
    ],
    USERS: [
        "view_users",
        "create_user",
        "edit_user",
        "delete_user",
        "manage_permissions"
    ],
    SETTINGS: [
        "view_settings",
        "edit_settings"
    ]
};
const DefaultRolePermissions = {
    ADMIN: Object.values(Permission),
    OPERATOR: [
        "view_inventory",
        "view_sales",
        "create_sale",
        "view_queue",
        "manage_queue",
        "view_reports"
    ]
};
}}),
"[project]/services/cacheServices.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Serviço para gerenciar cache no localStorage com expiração
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
const cacheService = {
    // Armazenar dados no cache com tempo de expiração
    set: (key, data, expiryInMinutes = 30)=>{
        try {
            const item = {
                value: data,
                expiry: new Date().getTime() + expiryInMinutes * 60 * 1000
            };
            localStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.error(`Erro ao armazenar item no cache: ${key}`, error);
        }
    },
    // Obter dados do cache, retorna null se expirado ou não existir
    get: (key)=>{
        try {
            const itemStr = localStorage.getItem(key);
            if (!itemStr) return null;
            const item = JSON.parse(itemStr);
            const now = new Date().getTime();
            // Verificar se o item expirou
            if (now > item.expiry) {
                localStorage.removeItem(key);
                return null;
            }
            return item.value;
        } catch (error) {
            console.error(`Erro ao recuperar item do cache: ${key}`, error);
            return null;
        }
    },
    // Remover item do cache
    remove: (key)=>{
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Erro ao remover item do cache: ${key}`, error);
        }
    },
    // Limpar todo o cache ou apenas itens com um prefixo específico
    clear: (prefix)=>{
        try {
            if (prefix) {
                // Remover apenas itens com o prefixo especificado
                Object.keys(localStorage).forEach((key)=>{
                    if (key.startsWith(prefix)) {
                        localStorage.removeItem(key);
                    }
                });
            } else {
                // Limpar todo o localStorage
                localStorage.clear();
            }
        } catch (error) {
            console.error("Erro ao limpar cache", error);
        }
    },
    // Verificar se um item existe no cache e não está expirado
    has: (key)=>{
        try {
            const itemStr = localStorage.getItem(key);
            if (!itemStr) return false;
            const item = JSON.parse(itemStr);
            const now = new Date().getTime();
            return now < item.expiry;
        } catch (error) {
            console.error(`Erro ao verificar item no cache: ${key}`, error);
            return false;
        }
    },
    // Atualizar a expiração de um item existente
    updateExpiry: (key, expiryInMinutes = 30)=>{
        try {
            const itemStr = localStorage.getItem(key);
            if (!itemStr) return false;
            const item = JSON.parse(itemStr);
            item.expiry = new Date().getTime() + expiryInMinutes * 60 * 1000;
            localStorage.setItem(key, JSON.stringify(item));
            return true;
        } catch (error) {
            console.error(`Erro ao atualizar expiração do item no cache: ${key}`, error);
            return false;
        }
    }
};
const __TURBOPACK__default__export__ = cacheService;
}}),
"[project]/contexts/PermissionContext.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "PermissionProvider": (()=>PermissionProvider),
    "usePermission": (()=>usePermission)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/types/permissions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/use-toast.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/apiClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$cacheServices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/cacheServices.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
// Mapeamento entre permissões do frontend e backend
const permissionMapping = {
    // Estoque
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].VIEW_INVENTORY]: "ESTOQUE_VISUALIZAR",
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].ADD_INVENTORY]: "ESTOQUE_ADICIONAR",
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].EDIT_INVENTORY]: "ESTOQUE_EDITAR",
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].DELETE_INVENTORY]: "ESTOQUE_REMOVER",
    // Vendas
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].VIEW_SALES]: "VENDAS_VISUALIZAR",
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].CREATE_SALE]: "VENDAS_CRIAR",
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].CANCEL_SALE]: "VENDAS_CANCELAR",
    // Fila
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].VIEW_QUEUE]: "FILA_VISUALIZAR",
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].MANAGE_QUEUE]: "FILA_GERENCIAR",
    // Relatórios
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].VIEW_REPORTS]: "RELATORIOS_VISUALIZAR",
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].EXPORT_REPORTS]: "RELATORIOS_EXPORTAR",
    // Usuários
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].VIEW_USERS]: "USUARIOS_VISUALIZAR",
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].CREATE_USER]: "USUARIOS_CRIAR",
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].EDIT_USER]: "USUARIOS_EDITAR",
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].DELETE_USER]: "USUARIOS_REMOVER",
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].MANAGE_PERMISSIONS]: "USUARIOS_PERMISSOES",
    // Configurações
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].VIEW_SETTINGS]: "CONFIGURACOES_VISUALIZAR",
    [__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Permission"].EDIT_SETTINGS]: "CONFIGURACOES_EDITAR"
};
// Mapeamento inverso (backend para frontend)
const reversePermissionMapping = Object.entries(permissionMapping).reduce((acc, [frontendPerm, backendPerm])=>{
    acc[backendPerm] = frontendPerm;
    return acc;
}, {});
const PERMISSION_CACHE_PREFIX = "permission_";
const USER_PERMISSIONS_CACHE_KEY = "user_permissions";
const PermissionContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    permissions: [],
    backendPermissions: [],
    loading: true,
    hasPermission: ()=>false,
    hasAnyPermission: ()=>false,
    hasAllPermissions: ()=>false,
    refreshPermissions: async ()=>{},
    clearPermissionCache: ()=>{}
});
// Constantes para cache
const PERMISSIONS_CACHE_KEY_PREFIX = "user_permissions_";
const PERMISSIONS_CACHE_EXPIRY = 30 // 30 minutos
;
const PermissionProvider = ({ children })=>{
    const [backendPermissions, setBackendPermissions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [permissions, setPermissions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const { isAuthenticated, user, loading: authLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    // Converter permissões do backend para o frontend
    const convertToFrontendPermissions = (backendPerms)=>{
        return backendPerms.map((backendPerm)=>reversePermissionMapping[backendPerm]).filter((perm)=>!!perm);
    };
    // Verificar se o usuário tem uma permissão específica
    const hasPermission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((permissionName)=>{
        // Se for uma permissão do frontend, converter para o formato do backend
        const backendPerm = permissionMapping[permissionName] || permissionName;
        // Verificar se o usuário tem a permissão no formato do backend
        return backendPermissions.includes(backendPerm);
    }, [
        backendPermissions
    ]);
    // Verificar se o usuário tem pelo menos uma das permissões
    const hasAnyPermission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((permissionNames)=>{
        return permissionNames.some((perm)=>hasPermission(perm));
    }, [
        hasPermission
    ]);
    // Verificar se o usuário tem todas as permissões
    const hasAllPermissions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((permissionNames)=>{
        return permissionNames.every((perm)=>hasPermission(perm));
    }, [
        hasPermission
    ]);
    // Limpar o cache de permissões
    const clearPermissionCache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (user?.id) {
            const cacheKey = `${PERMISSIONS_CACHE_KEY_PREFIX}${user.id}`;
            __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$cacheServices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove(cacheKey);
            console.log("Cache de permissões limpo");
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$cacheServices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].clear(PERMISSIONS_CACHE_KEY_PREFIX);
            console.log("Todo o cache de permissões foi limpo");
        }
    }, [
        user?.id
    ]);
    // Função para buscar permissões do servidor
    const fetchPermissionsFromServer = async (userId)=>{
        try {
            console.log(`Buscando permissões do usuário ${userId} do servidor...`);
            // Tentar obter permissões do usuário específico
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/permissoes/usuario/${userId}/todas`);
            const permissoes = response.data;
            console.log(`Permissões obtidas do servidor:`, permissoes);
            // Armazenar no cache
            if (permissoes && Array.isArray(permissoes)) {
                const cacheKey = `${PERMISSIONS_CACHE_KEY_PREFIX}${userId}`;
                __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$cacheServices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set(cacheKey, permissoes, PERMISSIONS_CACHE_EXPIRY);
                console.log(`Permissões armazenadas no cache com chave ${cacheKey}`);
            }
            return permissoes || [];
        } catch (error) {
            console.error("Erro ao buscar permissões do servidor:", error);
            throw error;
        }
    };
    // Função para atualizar as permissões
    const refreshPermissions = async ()=>{
        if (!isAuthenticated || !user) {
            setBackendPermissions([]);
            setPermissions([]);
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            console.log("Atualizando permissões para o usuário:", user.id);
            // Tentar buscar permissões do servidor
            const permissoes = await fetchPermissionsFromServer(user.id);
            // Atualizar os estados
            setBackendPermissions(permissoes);
            setPermissions(convertToFrontendPermissions(permissoes));
            console.log("Permissões atualizadas:", permissoes);
            // Mostrar toast de sucesso
            toast({
                title: "Permissões atualizadas",
                description: "Suas permissões foram atualizadas com sucesso."
            });
        } catch (error) {
            console.error("Erro ao atualizar permissões:", error);
            // Se o usuário tiver permissões no objeto user, usar como fallback
            if (user.permissoes && Array.isArray(user.permissoes)) {
                setBackendPermissions(user.permissoes);
                setPermissions(convertToFrontendPermissions(user.permissoes));
                // Mostrar toast de aviso
                toast({
                    title: "Aviso",
                    description: "Usando permissões em cache. Algumas funcionalidades podem estar limitadas.",
                    variant: "default"
                });
            } else {
                // Mostrar toast de erro
                toast({
                    title: "Erro",
                    description: "Não foi possível carregar suas permissões. Tente novamente mais tarde.",
                    variant: "destructive"
                });
            }
        } finally{
            setLoading(false);
        }
    };
    const fetchUserPermissions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!user) return;
        setLoading(true);
        try {
            // Verificar se as permissões estão em cache
            const cachedPermissions = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$cacheServices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(USER_PERMISSIONS_CACHE_KEY);
            if (cachedPermissions) {
                console.log("Usando permissões em cache");
                setBackendPermissions(cachedPermissions);
                setPermissions(convertToFrontendPermissions(cachedPermissions));
                setLoading(false);
                return;
            }
            // Se não estiver em cache, buscar do servidor
            const permissoes = await fetchPermissionsFromServer(user.id);
            setBackendPermissions(permissoes);
            setPermissions(convertToFrontendPermissions(permissoes));
            // Salvar no cache por 30 minutos
            __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$cacheServices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set(USER_PERMISSIONS_CACHE_KEY, permissoes, 30);
        } catch (error) {
            console.error("Erro ao buscar permissões:", error);
            setPermissions([]);
        } finally{
            setLoading(false);
        }
    }, [
        user,
        isAuthenticated,
        authLoading
    ]);
    const clearPermissionsCache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$cacheServices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove(USER_PERMISSIONS_CACHE_KEY);
        __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$cacheServices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].clear(PERMISSION_CACHE_PREFIX);
    }, []);
    const checkPermission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (requiredPermission)=>{
        if (!user) return false;
        // Verificar se o resultado está em cache
        const cacheKey = `${PERMISSION_CACHE_PREFIX}${requiredPermission}`;
        const cachedResult = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$cacheServices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(cacheKey);
        if (cachedResult !== null) {
            return cachedResult;
        }
        // Se não estiver em cache, verificar nas permissões carregadas
        const hasPermission = backendPermissions.includes(requiredPermission);
        // Salvar resultado no cache por 30 minutos
        __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$cacheServices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set(cacheKey, hasPermission, 30);
        return hasPermission;
    }, [
        user,
        backendPermissions
    ]);
    // Carregar permissões quando o usuário estiver autenticado
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadPermissions = async ()=>{
            if (!isAuthenticated || !user) {
                setBackendPermissions([]);
                setPermissions([]);
                setLoading(false);
                return;
            }
            try {
                // Tentar carregar permissões do cache primeiro
                const cacheKey = `${PERMISSIONS_CACHE_KEY_PREFIX}${user.id}`;
                const cachedPermissions = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$cacheServices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(cacheKey);
                if (cachedPermissions && cachedPermissions.length > 0) {
                    console.log("Usando permissões do cache:", cachedPermissions);
                    setBackendPermissions(cachedPermissions);
                    setPermissions(convertToFrontendPermissions(cachedPermissions));
                    setLoading(false);
                    return;
                }
                // Se não houver permissões em cache ou estiverem expiradas, carregar do backend
                await refreshPermissions();
            } catch (error) {
                console.error("Erro ao carregar permissões:", error);
                // Se o usuário tiver permissões no objeto user, usar como fallback
                if (user.permissoes && Array.isArray(user.permissoes)) {
                    setBackendPermissions(user.permissoes);
                    setPermissions(convertToFrontendPermissions(user.permissoes));
                }
                setLoading(false);
            }
        };
        if (!authLoading) {
            loadPermissions();
        }
    }, [
        user,
        isAuthenticated,
        authLoading
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user) {
            setBackendPermissions([]);
            setPermissions([]);
            // Corrigido: usar clear com prefixo em vez de clearWithPrefix
            __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$cacheServices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove(USER_PERMISSIONS_CACHE_KEY);
            __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$cacheServices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].clear(PERMISSION_CACHE_PREFIX);
        }
    }, [
        user
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PermissionContext.Provider, {
        value: {
            permissions,
            backendPermissions,
            loading,
            hasPermission,
            hasAnyPermission,
            hasAllPermissions,
            refreshPermissions,
            clearPermissionCache
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/PermissionContext.tsx",
        lineNumber: 336,
        columnNumber: 5
    }, this);
};
const usePermission = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(PermissionContext);
}}),
"[project]/services/erroService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ErrorType": (()=>ErrorType),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$toastService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/toastService.ts [app-ssr] (ecmascript)");
;
var ErrorType = /*#__PURE__*/ function(ErrorType) {
    ErrorType["AUTHENTICATION"] = "authentication";
    ErrorType["AUTHORIZATION"] = "authorization";
    ErrorType["VALIDATION"] = "validation";
    ErrorType["SERVER"] = "server";
    ErrorType["NETWORK"] = "network";
    ErrorType["UNKNOWN"] = "unknown";
    return ErrorType;
}({});
// Serviço para tratamento de erros
const errorService = {
    // Processar erro e retornar um objeto de erro padronizado
    processError: (error)=>{
        // Erro de rede (sem conexão)
        if (error.message === "Network Error" || !error.response) {
            return {
                type: "network",
                message: "Erro de conexão",
                details: "Não foi possível conectar ao servidor. Verifique sua conexão de internet.",
                originalError: error
            };
        }
        // Erro com resposta do servidor
        if (error.response) {
            const { status, data } = error.response;
            // Erro de autenticação (401)
            if (status === 401) {
                return {
                    type: "authentication",
                    message: "Sessão expirada",
                    details: "Sua sessão expirou. Por favor, faça login novamente.",
                    statusCode: status,
                    originalError: error
                };
            }
            // Erro de autorização (403)
            if (status === 403) {
                return {
                    type: "authorization",
                    message: "Acesso negado",
                    details: "Você não tem permissão para acessar este recurso.",
                    statusCode: status,
                    originalError: error
                };
            }
            // Erro de validação (400)
            if (status === 400) {
                return {
                    type: "validation",
                    message: "Dados inválidos",
                    details: data?.message || "Os dados fornecidos são inválidos.",
                    statusCode: status,
                    originalError: error
                };
            }
            // Erro do servidor (500)
            if (status >= 500) {
                return {
                    type: "server",
                    message: "Erro no servidor",
                    details: data?.message || "Ocorreu um erro no servidor. Tente novamente mais tarde.",
                    statusCode: status,
                    originalError: error
                };
            }
            // Outros erros HTTP
            return {
                type: "unknown",
                message: "Erro desconhecido",
                details: data?.message || `Erro ${status}: ${error.message}`,
                statusCode: status,
                originalError: error
            };
        }
        // Erro genérico
        return {
            type: "unknown",
            message: "Erro desconhecido",
            details: error.message || "Ocorreu um erro inesperado.",
            originalError: error
        };
    },
    // Tratar erro e mostrar toast apropriado
    handleError: (error, customMessage)=>{
        const standardError = errorService.processError(error);
        // Log do erro para depuração
        console.error("Erro capturado:", standardError);
        // Mostrar toast com mensagem de erro
        __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$toastService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(customMessage || standardError.message, standardError.details);
        // Redirecionar para login se for erro de autenticação
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return standardError;
    },
    // Tratar erro silenciosamente (sem toast)
    handleErrorSilently: (error)=>{
        const standardError = errorService.processError(error);
        console.error("Erro capturado (silencioso):", standardError);
        return standardError;
    },
    // Verificar se é um erro de autenticação
    isAuthenticationError: (error)=>{
        return error?.response?.status === 401;
    },
    // Verificar se é um erro de autorização
    isAuthorizationError: (error)=>{
        return error?.response?.status === 403;
    },
    // Verificar se é um erro de rede
    isNetworkError: (error)=>{
        return error.message === "Network Error" || !error.response;
    }
};
const __TURBOPACK__default__export__ = errorService;
}}),
"[project]/components/ui/feedback-message.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "FeedbackMessage": (()=>FeedbackMessage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function FeedbackMessage({ type, title, message, className, onDismiss }) {
    // Mapear tipo para classes de cor
    const colorClassMap = {
        success: "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
        error: "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
        info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200"
    };
    // Mapear tipo para ícone
    const IconMap = {
        success: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
        error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"],
        info: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"],
        warning: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
    };
    const Icon = IconMap[type];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-start gap-3 rounded-md border p-4", colorClassMap[type], className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: "h-5 w-5 flex-shrink-0"
            }, void 0, false, {
                fileName: "[project]/components/ui/feedback-message.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1",
                children: [
                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-1 font-medium",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/ui/feedback-message.tsx",
                        lineNumber: 40,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/components/ui/feedback-message.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/feedback-message.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            onDismiss && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onDismiss,
                className: "ml-auto -mr-1 -mt-1 h-6 w-6 rounded-full p-1 hover:bg-black/5 dark:hover:bg-white/10",
                "aria-label": "Fechar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "h-4 w-4",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "18",
                            y1: "6",
                            x2: "6",
                            y2: "18"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/feedback-message.tsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "6",
                            y1: "6",
                            x2: "18",
                            y2: "18"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/feedback-message.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/feedback-message.tsx",
                    lineNumber: 49,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/feedback-message.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/feedback-message.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
}}),
"[project]/app/usuarios/perfis/otimizado/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>GerenciarPerfilUsuarioOtimizado)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$BackButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/BackButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/use-toast.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/apiClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$permissionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/permissionService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$loading$2d$spinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/loading-spinner.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$PermissionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/PermissionContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$erroService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/erroService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$feedback$2d$message$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/feedback-message.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function GerenciarPerfilUsuarioOtimizado() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const { refreshAuth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { refreshPermissions, clearPermissionCache } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$PermissionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePermission"])();
    const userId = searchParams.get("id") ? Number.parseInt(searchParams.get("id"), 10) : 0;
    const [usuario, setUsuario] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [carregando, setCarregando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [perfilSelecionado, setPerfilSelecionado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [salvando, setSalvando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [erro, setErro] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sucesso, setSucesso] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Função para carregar dados do usuário automaticamente ao montar o componente
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (userId && !isNaN(userId)) {
            carregarUsuario();
        }
    }, [
        userId
    ]);
    // Função para carregar dados do usuário
    const carregarUsuario = async ()=>{
        if (!userId || isNaN(userId)) {
            setErro("ID de usuário inválido");
            return;
        }
        try {
            setCarregando(true);
            setErro(null);
            setSucesso(null);
            console.log("Renovando token...");
            try {
                await refreshAuth();
                console.log("Token renovado com sucesso");
            } catch (error) {
                console.error("Erro ao renovar token:", error);
            }
            console.log("Buscando usuário com ID:", userId);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/usuarios/${userId}`);
            const data = response.data;
            console.log("Dados do usuário recebidos:", data);
            setUsuario(data);
            setPerfilSelecionado(data.perfil || "");
            toast({
                title: "Sucesso",
                description: "Dados do usuário carregados com sucesso."
            });
        } catch (error) {
            const standardError = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$erroService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].handleError(error, "Erro ao carregar usuário");
            setErro(standardError.details || "Erro ao carregar dados do usuário");
        } finally{
            setCarregando(false);
        }
    };
    const handleSalvarPerfil = async ()=>{
        if (!usuario) {
            toast({
                title: "Erro",
                description: "Nenhum usuário carregado para salvar.",
                variant: "destructive"
            });
            return;
        }
        try {
            setSalvando(true);
            setErro(null);
            setSucesso(null);
            if (!perfilSelecionado) {
                toast({
                    title: "Atenção",
                    description: "Selecione um perfil para o usuário.",
                    variant: "destructive"
                });
                setSalvando(false);
                return;
            }
            console.log("Atribuindo perfil:", perfilSelecionado, "ao usuário:", usuario.id);
            // Usar o serviço específico para atribuir perfil
            await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$permissionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].atribuirPerfilUsuario(usuario.id, perfilSelecionado);
            // Limpar o cache de permissões para forçar uma atualização na próxima vez
            clearPermissionCache();
            // Se o usuário estiver atualizando seu próprio perfil, atualizar as permissões
            const userStr = localStorage.getItem("user");
            if (userStr) {
                const currentUser = JSON.parse(userStr);
                if (currentUser.id === usuario.id) {
                    await refreshPermissions();
                }
            }
            setSucesso(`Perfil ${perfilSelecionado} atribuído com sucesso ao usuário ${usuario.nome}.`);
            toast({
                title: "Sucesso",
                description: "Perfil atualizado com sucesso."
            });
            // Atualizar os dados do usuário para mostrar o novo perfil
            await carregarUsuario();
            // Voltar para a lista de usuários após 2 segundos
            setTimeout(()=>{
                router.push("/usuarios");
            }, 2000);
        } catch (error) {
            const standardError = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$erroService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].handleError(error, "Erro ao salvar perfil");
            setErro(standardError.details || "Erro ao salvar o perfil do usuário");
        } finally{
            setSalvando(false);
        }
    };
    const handleAssignProfile = async (profileId)=>{
        try {
            setFeedback(null);
            setSalvando(true);
            // Usar o método correto do permissionService
            await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$permissionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].atribuirPerfilUsuario(userId, profileId);
            // Limpar o cache de permissões após atribuir um novo perfil
            clearPermissionCache();
            setFeedback({
                type: "success",
                message: "Perfil atribuído com sucesso!"
            });
            // Recarregar os dados do usuário
            await carregarUsuario();
        } catch (error) {
            const standardError = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$erroService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].handleError(error, "Erro ao atribuir perfil");
            setFeedback({
                type: "error",
                message: standardError.details || "Erro ao atribuir perfil ao usuário"
            });
        } finally{
            setSalvando(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto py-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$BackButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackButton"], {}, void 0, false, {
                        fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold ml-4",
                        children: "Gerenciar Perfil do Usuário"
                    }, void 0, false, {
                        fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$feedback$2d$message$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FeedbackMessage"], {
                type: feedback.type,
                message: feedback.message,
                className: "mb-4"
            }, void 0, false, {
                fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                lineNumber: 198,
                columnNumber: 20
            }, this),
            erro && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$feedback$2d$message$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FeedbackMessage"], {
                type: "error",
                message: erro,
                className: "mb-4"
            }, void 0, false, {
                fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                lineNumber: 200,
                columnNumber: 16
            }, this),
            sucesso && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$feedback$2d$message$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FeedbackMessage"], {
                type: "success",
                message: sucesso,
                className: "mb-4"
            }, void 0, false, {
                fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                lineNumber: 201,
                columnNumber: 19
            }, this),
            !usuario && !carregando && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            children: "Carregar Dados do Usuário"
                        }, void 0, false, {
                            fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                            lineNumber: 206,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                        lineNumber: 205,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-4",
                                children: [
                                    "ID do usuário: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: userId || "Não especificado"
                                    }, void 0, false, {
                                        fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                        lineNumber: 210,
                                        columnNumber: 30
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                lineNumber: 209,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: carregarUsuario,
                                disabled: carregando,
                                className: "w-full md:w-auto",
                                children: carregando ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$loading$2d$spinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingSpinner"], {
                                            size: "sm"
                                        }, void 0, false, {
                                            fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                            lineNumber: 215,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2",
                                            children: "Carregando..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                            lineNumber: 216,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                            className: "mr-2 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                            lineNumber: 220,
                                            columnNumber: 19
                                        }, this),
                                        "Carregar Dados do Usuário"
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                        lineNumber: 208,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                lineNumber: 204,
                columnNumber: 9
            }, this),
            usuario && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                children: usuario.nome
                            }, void 0, false, {
                                fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                lineNumber: 232,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: [
                                    usuario.username,
                                    " | ",
                                    usuario.email,
                                    " | ",
                                    usuario.cargo
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                        lineNumber: 231,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium mb-2",
                                            children: [
                                                "Perfil atual: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: usuario.perfil || "Não definido"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                            lineNumber: 240,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                            value: perfilSelecionado,
                                            onValueChange: setPerfilSelecionado,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    className: "w-full md:w-[300px]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Selecione um perfil"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "ADMINISTRADOR",
                                                            children: "Administrador"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                                            lineNumber: 248,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "GERENTE",
                                                            children: "Gerente"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                                            lineNumber: 249,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "VENDEDOR",
                                                            children: "Vendedor"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                                            lineNumber: 250,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "OPERADOR",
                                                            children: "Operador"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                                            lineNumber: 251,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                            lineNumber: 243,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                    lineNumber: 239,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500 mt-2",
                                        children: "Ao salvar o perfil, as permissões padrão serão atribuídas automaticamente pelo sistema."
                                    }, void 0, false, {
                                        fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                        lineNumber: 257,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                    lineNumber: 256,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 pt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: handleSalvarPerfil,
                                            disabled: salvando || perfilSelecionado === usuario.perfil,
                                            children: [
                                                salvando ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$loading$2d$spinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingSpinner"], {
                                                    size: "sm"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                                    lineNumber: 264,
                                                    columnNumber: 31
                                                }, this) : null,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2",
                                                    children: salvando ? "Salvando..." : "Salvar Perfil"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                            lineNumber: 263,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            onClick: ()=>router.push("/usuarios"),
                                            children: "Voltar para Lista"
                                        }, void 0, false, {
                                            fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                            lineNumber: 267,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                                    lineNumber: 262,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                            lineNumber: 238,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                        lineNumber: 237,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                lineNumber: 230,
                columnNumber: 9
            }, this),
            carregando && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center items-center py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$loading$2d$spinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingSpinner"], {
                    size: "lg",
                    text: "Carregando dados do usuário..."
                }, void 0, false, {
                    fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                    lineNumber: 278,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
                lineNumber: 277,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/usuarios/perfis/otimizado/page.tsx",
        lineNumber: 192,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=_34466bdc._.js.map