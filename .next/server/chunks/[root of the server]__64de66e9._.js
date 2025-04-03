module.exports = {

"[project]/.next-internal/server/app/api/test/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/app/api/fila/mock-data.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Dados mockados para a API de fila
// Este arquivo simula um banco de dados para testes
__turbopack_context__.s({
    "mockFilaService": (()=>mockFilaService)
});
// Clientes na fila
let clientesNaFila = [
    {
        id: 1,
        nome: "João Silva",
        servico: "Troca de Óleo",
        chegada: new Date(Date.now() - 45 * 60000).toISOString(),
        prioridade: "normal",
        telefone: "(11) 98765-4321"
    },
    {
        id: 2,
        nome: "Maria Oliveira",
        servico: "Revisão Completa",
        chegada: new Date(Date.now() - 20 * 60000).toISOString(),
        prioridade: "alta",
        telefone: "(11) 91234-5678"
    },
    {
        id: 3,
        nome: "Pedro Santos",
        servico: "Alinhamento e Balanceamento",
        chegada: new Date(Date.now() - 10 * 60000).toISOString(),
        prioridade: "normal",
        telefone: "(11) 99876-5432"
    }
];
// Clientes em atendimento
let clientesEmAtendimento = [
    {
        id: 4,
        nome: "Ana Souza",
        servico: "Troca de Pastilhas de Freio",
        inicio: new Date(Date.now() - 35 * 60000).toISOString(),
        atendente: "Carlos Mecânico",
        status: "em_atendimento"
    }
];
// Próximo ID para novos clientes
let nextId = 5;
const mockFilaService = {
    // Obter todos os clientes na fila
    getClientesNaFila: ()=>{
        return [
            ...clientesNaFila
        ];
    },
    // Obter todos os clientes em atendimento
    getClientesEmAtendimento: ()=>{
        return [
            ...clientesEmAtendimento
        ];
    },
    // Adicionar um cliente à fila
    adicionarClienteNaFila: (cliente)=>{
        const novoCliente = {
            id: nextId++,
            nome: cliente.nome,
            servico: cliente.servico,
            prioridade: cliente.prioridade,
            telefone: cliente.telefone,
            chegada: new Date().toISOString()
        };
        clientesNaFila.push(novoCliente);
        return novoCliente;
    },
    // Iniciar atendimento de um cliente
    iniciarAtendimento: (id, atendente)=>{
        // Encontrar o cliente na fila
        const index = clientesNaFila.findIndex((c)=>c.id === id);
        if (index === -1) {
            throw new Error("Cliente não encontrado na fila");
        }
        // Remover o cliente da fila
        const cliente = clientesNaFila.splice(index, 1)[0];
        // Criar um novo atendimento
        const novoAtendimento = {
            id: cliente.id,
            nome: cliente.nome,
            servico: cliente.servico,
            inicio: new Date().toISOString(),
            atendente: atendente,
            status: "em_atendimento"
        };
        // Adicionar à lista de atendimentos
        clientesEmAtendimento.push(novoAtendimento);
        return novoAtendimento;
    },
    // Finalizar atendimento
    finalizarAtendimento: (id)=>{
        // Encontrar o atendimento
        const index = clientesEmAtendimento.findIndex((a)=>a.id === id);
        if (index === -1) {
            throw new Error("Atendimento não encontrado");
        }
        // Remover o atendimento
        clientesEmAtendimento.splice(index, 1);
        return {
            success: true
        };
    },
    // Remover cliente da fila
    removerClienteDaFila: (id)=>{
        // Encontrar o cliente na fila
        const index = clientesNaFila.findIndex((c)=>c.id === id);
        if (index === -1) {
            throw new Error("Cliente não encontrado na fila");
        }
        // Remover o cliente da fila
        clientesNaFila.splice(index, 1);
        return {
            success: true
        };
    },
    // Resetar dados (para testes)
    resetarDados: ()=>{
        clientesNaFila = [
            {
                id: 1,
                nome: "João Silva",
                servico: "Troca de Óleo",
                chegada: new Date(Date.now() - 45 * 60000).toISOString(),
                prioridade: "normal",
                telefone: "(11) 98765-4321"
            },
            {
                id: 2,
                nome: "Maria Oliveira",
                servico: "Revisão Completa",
                chegada: new Date(Date.now() - 20 * 60000).toISOString(),
                prioridade: "alta",
                telefone: "(11) 91234-5678"
            }
        ];
        clientesEmAtendimento = [
            {
                id: 3,
                nome: "Ana Souza",
                servico: "Troca de Pastilhas de Freio",
                inicio: new Date(Date.now() - 35 * 60000).toISOString(),
                atendente: "Carlos Mecânico",
                status: "em_atendimento"
            }
        ];
        nextId = 4;
        return {
            success: true
        };
    }
};
}}),
"[project]/app/api/test/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$fila$2f$mock$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/api/fila/mock-data.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        // Obter dados diretamente do mock service
        const clientesNaFila = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$fila$2f$mock$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockFilaService"].getClientesNaFila();
        const clientesEmAtendimento = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$fila$2f$mock$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockFilaService"].getClientesEmAtendimento();
        // Retornar dados com timestamp para evitar cache
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            clientesNaFila,
            clientesEmAtendimento,
            clientesNaFilaLength: clientesNaFila.length,
            clientesEmAtendimentoLength: clientesEmAtendimento.length,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Erro no endpoint de teste:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Erro ao buscar dados de teste"
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__64de66e9._.js.map