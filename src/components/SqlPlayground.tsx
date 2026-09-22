import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Download, 
  Clock, 
  Sparkles, 
  Check, 
  FileText, 
  Table, 
  History, 
  Info,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { DatabaseKey, sqlEngine, QueryResult } from '../services/sqlEngine';

interface SqlPlaygroundProps {
  initialSql?: string;
  initialDb?: DatabaseKey;
  onAskAiTutorForQuery?: (query: string, result?: QueryResult) => void;
  onQueryExecuted?: () => void;
}

export const SqlPlayground: React.FC<SqlPlaygroundProps> = ({
  initialSql = 'SELECT d.department_name, COUNT(s.id) AS student_count, AVG(s.marks) AS avg_marks\nFROM departments d\nLEFT JOIN students s ON d.id = s.department_id\nGROUP BY d.department_name\nORDER BY avg_marks DESC;',
  initialDb = 'college',
  onAskAiTutorForQuery,
  onQueryExecuted
}) => {
  const [activeDb, setActiveDb] = useState<DatabaseKey>(initialDb);
  const [sql, setSql] = useState<string>(initialSql);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [activeTab, setActiveTab] = useState<'table' | 'explain' | 'json'>('table');
  const [history, setHistory] = useState<string[]>([initialSql]);
  const [tablesList, setTablesList] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tableColumns, setTableColumns] = useState<{ name: string; type: string }[]>([]);
  const [copied, setCopied] = useState(false);

  // Sync initial props if changed from navigation
  useEffect(() => {
    if (initialSql) setSql(initialSql);
    if (initialDb) setActiveDb(initialDb);
  }, [initialSql, initialDb]);

  // Update table list when database changes
  useEffect(() => {
    refreshTables();
  }, [activeDb]);

  const refreshTables = () => {
    const tbls = sqlEngine.getTableList(activeDb);
    setTablesList(tbls);
    if (tbls.length > 0) {
      inspectTable(tbls[0]);
    }
  };

  const inspectTable = (tblName: string) => {
    setSelectedTable(tblName);
    const cols = sqlEngine.getTableSchema(activeDb, tblName);
    setTableColumns(cols);
  };

  const handleRunQuery = () => {
    const res = sqlEngine.executeQuery(sql, activeDb);
    setResult(res);

    if (res.success) {
      setHistory(prev => [sql, ...prev.filter(q => q !== sql)].slice(0, 15));
      if (onQueryExecuted) onQueryExecuted();
      refreshTables(); // In case query was CREATE/INSERT/DROP
    }
  };

  // Run on mount
  useEffect(() => {
    handleRunQuery();
  }, [activeDb]);

  const handleResetDatabase = () => {
    sqlEngine.resetDatabase(activeDb);
    refreshTables();
    handleRunQuery();
  };

  const formatSql = () => {
    // Clean, uppercase common SQL keywords
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'GROUP BY', 'HAVING',
      'ORDER BY', 'LIMIT', 'OFFSET', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN',
      'INNER JOIN', 'FULL JOIN', 'ON', 'AS', 'INSERT INTO', 'VALUES',
      'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'DROP TABLE', 'WITH',
      'UNION ALL', 'UNION', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'OVER', 'PARTITION BY'
    ];

    let formatted = sql;
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      formatted = formatted.replace(regex, kw);
    });
    setSql(formatted);
  };

  const exportCSV = () => {
    if (!result || !result.rows || result.rows.length === 0) return;
    const cols = result.columns;
    const header = cols.join(',');
    const rows = result.rows.map(row => 
      cols.map(c => JSON.stringify(row[c] ?? '')).join(',')
    );
    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `query_result_${activeDb}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const quickTemplates = [
    { label: 'SELECT *', query: `SELECT * FROM ${selectedTable || 'students'} LIMIT 10;` },
    { label: 'COUNT & GROUP', query: `SELECT department_id, COUNT(*) AS total FROM students GROUP BY department_id;` },
    { label: 'INNER JOIN', query: `SELECT s.name, d.department_name FROM students s JOIN departments d ON s.department_id = d.id;` },
    { label: 'AVG & FILTER', query: `SELECT name, marks FROM students WHERE marks > (SELECT AVG(marks) FROM students);` }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header & DB Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">Interactive SQL Playground</h2>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
              IN-MEMORY SANDBOX
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real SQL execution engine with zero latency, full DDL/DML, and explain plan analyzer
          </p>
        </div>

        {/* Database Selector & Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <label className="text-xs font-semibold text-slate-400">Target Database:</label>
          <select
            value={activeDb}
            onChange={(e) => setActiveDb(e.target.value as DatabaseKey)}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500"
          >
            <option value="college">🎓 College ERP (students, departments, courses)</option>
            <option value="ecommerce">🛒 E-Commerce (customers, products, orders)</option>
            <option value="hospital">🏥 Hospital EHR (doctors, patients, appointments)</option>
            <option value="banking">🏦 Core Banking (accounts, transactions)</option>
            <option value="library">📚 Public Library (books, authors, borrow_records)</option>
          </select>

          <button
            onClick={handleResetDatabase}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
            title="Reset active database to original state"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Database</span>
          </button>
        </div>
      </div>

      {/* Editor + Schema Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Schema & Table Inspector */}
        <div className="lg:col-span-3 bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sticky top-20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Table className="h-3.5 w-3.5 text-indigo-400" />
              Tables in {activeDb}
            </span>
            <span className="text-[10px] text-indigo-400 font-mono">{tablesList.length} tables</span>
          </div>

          <div className="space-y-1 max-h-48 overflow-y-auto mb-4 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
            {tablesList.map(tbl => (
              <button
                key={tbl}
                onClick={() => inspectTable(tbl)}
                className={`w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedTable === tbl
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{tbl}</span>
                <ChevronRight className="h-3 w-3 text-slate-600" />
              </button>
            ))}
          </div>

          {/* Column metadata inspector */}
          {selectedTable && (
            <div className="border-t border-slate-800 pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-400">
                  Columns: <strong className="text-white font-mono">{selectedTable}</strong>
                </span>
                <button
                  onClick={() => setSql(`SELECT * FROM ${selectedTable} LIMIT 10;`)}
                  className="text-[10px] text-indigo-400 hover:text-indigo-300"
                >
                  Quick SELECT
                </button>
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1 text-[11px] font-mono">
                {tableColumns.map(c => (
                  <div key={c.name} className="flex items-center justify-between bg-slate-950/60 px-2 py-1 rounded border border-slate-800/60 text-slate-300">
                    <span className="truncate">{c.name}</span>
                    <span className="text-[10px] text-slate-500">{c.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Snippets */}
          <div className="border-t border-slate-800 pt-3 mt-3">
            <span className="text-[11px] font-bold text-slate-400 block mb-2">Quick SQL Snippets</span>
            <div className="grid grid-cols-2 gap-1.5">
              {quickTemplates.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSql(item.query)}
                  className="px-2 py-1 text-[10px] font-mono font-medium rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white truncate border border-slate-700/60"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: SQL Editor & Query Results */}
        <div className="lg:col-span-9 space-y-4">
          {/* SQL Editor Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            {/* Editor Toolbar */}
            <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SQL Query Console</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={formatSql}
                  className="px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Format and capitalize SQL keywords"
                >
                  Format SQL
                </button>

                <button
                  onClick={() => setSql('')}
                  className="px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-rose-400 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Clear
                </button>

                {onAskAiTutorForQuery && (
                  <button
                    onClick={() => onAskAiTutorForQuery(sql, result || undefined)}
                    className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg transition-colors"
                  >
                    <Sparkles className="h-3 w-3 text-purple-400" />
                    <span>AI Diagnosis</span>
                  </button>
                )}

                <button
                  onClick={handleRunQuery}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-lg shadow-sm shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>RUN QUERY</span>
                </button>
              </div>
            </div>

            {/* Code Input */}
            <div className="relative">
              <textarea
                value={sql}
                onChange={(e) => setSql(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    handleRunQuery();
                  }
                }}
                rows={7}
                placeholder="Type any standard ANSI SQL or AlaSQL query here... (Press Ctrl+Enter to execute)"
                className="w-full bg-slate-950 p-4 font-mono text-sm text-sky-200 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y border-none"
                spellCheck={false}
              />
              <span className="absolute bottom-2 right-3 text-[10px] text-slate-600 pointer-events-none font-mono">
                Press Ctrl+Enter to Run
              </span>
            </div>
          </div>

          {/* Results Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            {/* Results Header Bar */}
            <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setActiveTab('table')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                      activeTab === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Table className="h-3 w-3" />
                    <span>Table View</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('explain')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                      activeTab === 'explain' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Info className="h-3 w-3" />
                    <span>EXPLAIN Plan</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('json')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                      activeTab === 'json' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileText className="h-3 w-3" />
                    <span>Raw JSON</span>
                  </button>
                </div>

                {result && result.success && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <span className="text-emerald-400 font-semibold">{result.rowCount} row{result.rowCount !== 1 ? 's' : ''}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="h-3 w-3" /> {result.executionTimeMs} ms
                    </span>
                  </div>
                )}
              </div>

              {result && result.success && result.rows.length > 0 && (
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-medium transition-colors"
                >
                  <Download className="h-3 w-3" />
                  <span>Export CSV</span>
                </button>
              )}
            </div>

            {/* Content Area: Table / Explain / JSON / Error */}
            <div className="p-4">
              {result && !result.success && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-400 text-sm">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>SQL Syntax / Execution Error</span>
                  </div>
                  <pre className="font-mono bg-slate-950 p-3 rounded-lg border border-rose-500/20 text-rose-200 overflow-x-auto">
                    {result.error}
                  </pre>
                  <p className="text-slate-400 text-[11px]">
                    Tip: Check column spelling against the Schema Inspector, verify table joins have matching keys, and check comma placements.
                  </p>
                </div>
              )}

              {result && result.success && activeTab === 'table' && (
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 max-h-96">
                  {result.rows.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs">
                      Query executed successfully with 0 matching rows returned.
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900 text-slate-300 font-semibold border-b border-slate-800 sticky top-0">
                        <tr>
                          {result.columns.map((col, idx) => (
                            <th key={idx} className="px-4 py-2.5 font-mono text-indigo-300 whitespace-nowrap">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                        {result.rows.map((row, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-slate-900/50">
                            {result.columns.map((col, colIdx) => (
                              <td key={colIdx} className="px-4 py-2 whitespace-nowrap">
                                {row[col] === null ? (
                                  <span className="italic text-slate-500 font-sans">NULL</span>
                                ) : (
                                  String(row[col])
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {result && result.success && activeTab === 'explain' && (
                <div className="space-y-2 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 font-bold mb-2">Cost-Based Query Execution Plan:</div>
                  {result.explainPlan?.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-indigo-300 bg-slate-900/50 p-2 rounded border border-slate-800/40">
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}

              {result && result.success && activeTab === 'json' && (
                <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 max-h-80 overflow-y-auto">
                  {JSON.stringify(result.rows, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
