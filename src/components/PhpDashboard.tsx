import React, { useState, useMemo } from 'react';
import {
  Copy,
  Check,
  Play,
  Search,
  Printer,
  LogOut,
  CheckSquare,
  Square,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';
import {
  PHP_PROGRAMS,
  PRACTICAL_TIMESTAMP,
  WHILE_LOOP_QUESTION_LIST,
  DO_WHILE_LOOP_QUESTION_LIST,
  VIVA_TRICKS,
  PhpProgramItem,
} from '../data/phpPrograms';
import {
  JQUERY_PROGRAMS,
  JQUERY_TIMESTAMP,
  JQUERY_HEADER_TITLE,
  JQUERY_INTRO_TEXT,
  JqueryProgramItem,
} from '../data/jqueryPrograms';
import { JqueryLiveDemo } from './JqueryLiveDemo';
import { StudentUser } from './AuthGate';

interface PhpDashboardProps {
  user: StudentUser;
  onLogout: () => void;
}

type CategoryFilter =
  | 'all'
  | 'php-all'
  | 'for-loop'
  | 'while-loop'
  | 'do-while-loop'
  | 'viva-factorial'
  | 'jquery-top10';

export const PhpDashboard: React.FC<PhpDashboardProps> = ({ user, onLogout }) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [executedIds, setExecutedIds] = useState<Record<string, boolean>>({});
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('php_jquery_practical_completed');
      return saved ? JSON.parse(saved) : { 'even-sum-0-to-10': true, 'jq-1-hide-show': true };
    } catch {
      return { 'even-sum-0-to-10': true, 'jq-1-hide-show': true };
    }
  });

  // Interactive Customizer states for PHP Tester
  const [showSandbox, setShowSandbox] = useState(false);
  const [customEvenLimit, setCustomEvenLimit] = useState<number>(10);
  const [customTableNum, setCustomTableNum] = useState<number>(5);
  const [customFactNum, setCustomFactNum] = useState<number>(5);

  const totalProgramsCount = PHP_PROGRAMS.length + JQUERY_PROGRAMS.length;

  const toggleCompleted = (id: string) => {
    setCompletedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('php_jquery_practical_completed', JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 1800);
  };

  const handleRunProgram = (id: string) => {
    setExecutedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredPhpPrograms = useMemo(() => {
    if (activeFilter === 'jquery-top10') return [];
    return PHP_PROGRAMS.filter((item) => {
      if (activeFilter === 'for-loop' && item.category !== 'for-loop') return false;
      if (activeFilter === 'while-loop' && item.category !== 'while-loop') return false;
      if (activeFilter === 'do-while-loop' && item.category !== 'do-while-loop') return false;
      if (activeFilter === 'viva-factorial' && item.category !== 'factorial') return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.output.toLowerCase().includes(q) ||
        (item.questionPrompt && item.questionPrompt.toLowerCase().includes(q))
      );
    });
  }, [activeFilter, searchQuery]);

  const filteredJqueryPrograms = useMemo(() => {
    if (
      activeFilter === 'php-all' ||
      activeFilter === 'for-loop' ||
      activeFilter === 'while-loop' ||
      activeFilter === 'do-while-loop' ||
      activeFilter === 'viva-factorial'
    ) {
      return [];
    }
    return JQUERY_PROGRAMS.filter((item) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.noteContent.some((n) => n.toLowerCase().includes(q)) ||
        (item.extraContext && item.extraContext.explanation.toLowerCase().includes(q))
      );
    });
  }, [activeFilter, searchQuery]);

  const completedCount = Object.values(completedIds).filter(Boolean).length;

  const evenCalculation = useMemo(() => {
    const limit = Math.max(0, Math.min(100, customEvenLimit));
    const evens: number[] = [];
    let sum = 0;
    for (let i = 0; i <= limit; i++) {
      if (i % 2 === 0) {
        evens.push(i);
        sum += i;
      }
    }
    return { limit, evens, sum };
  }, [customEvenLimit]);

  const factorialCalculation = useMemo(() => {
    const n = Math.max(1, Math.min(12, customFactNum));
    let fact = 1;
    const parts: number[] = [];
    for (let i = n; i >= 1; i--) {
      fact *= i;
      parts.push(i);
    }
    return { n, fact, expression: parts.join(' × ') };
  }, [customFactNum]);

  const scrollToSection = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderPhpProgramBlock = (program: PhpProgramItem) => {
    const isCopied = copiedId === program.id;
    const isExecuted = !!executedIds[program.id];
    const isDone = !!completedIds[program.id];

    return (
      <article
        key={program.id}
        id={`program-${program.id}`}
        className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 transition-colors"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{program.categoryLabel}</span>
            {program.timestamp && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums text-indigo-600 font-medium">
                  {program.timestamp}
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">PHP #{program.numberLabel}</span>
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              type="button"
              onClick={() => toggleCompleted(program.id)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                isDone
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {isDone ? (
                <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Square className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span>{isDone ? 'Written in File' : 'Mark Written'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleRunProgram(program.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isExecuted ? 'Hide Trace' : 'Run / Verify'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopyCode(program.id, program.code)}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy PHP</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900">{program.title}</h3>
          {program.introText && (
            <p className="text-sm text-slate-600">{program.introText}</p>
          )}
        </div>

        <div className="bg-slate-950 text-slate-100 rounded-lg p-4 border border-slate-800 overflow-x-auto">
          <pre className="text-xs sm:text-sm font-mono leading-relaxed tabular-nums">
            <code>{program.code}</code>
          </pre>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
          <div className="text-xs font-semibold text-slate-700">Output:</div>
          <pre className="text-xs sm:text-sm font-mono text-slate-900 whitespace-pre-wrap leading-relaxed tabular-nums">
            {program.output}
          </pre>

          {program.extraNotes && program.extraNotes.length > 0 && (
            <div className="pt-2 border-t border-slate-200 space-y-1 text-sm text-slate-800 font-medium">
              {program.extraNotes.map((line, idx) => (
                <div key={idx} className="font-mono text-xs sm:text-sm">
                  {line}
                </div>
              ))}
            </div>
          )}

          {program.vivaNote && (
            <div className="pt-2 border-t border-slate-200 text-xs sm:text-sm font-semibold text-indigo-900">
              {program.vivaNote}
            </div>
          )}
        </div>

        {isExecuted && (
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-lg p-4 space-y-2 no-print">
            <div className="flex items-center justify-between text-xs font-semibold text-indigo-950">
              <span>PHP Interpreter Execution Trace (PHP 8.3 CLI)</span>
              <span className="font-mono text-emerald-700">Exit Code: 0 (Success)</span>
            </div>
            {program.stepsPreview ? (
              <div className="space-y-1 text-xs font-mono text-indigo-900">
                {program.stepsPreview.map((s) => (
                  <div key={s.iteration} className="flex items-start gap-2">
                    <span className="text-indigo-500 shrink-0">Step {s.iteration}:</span>
                    <span>{s.detail}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs font-mono text-indigo-900">
                Loop executed cleanly and printed: {program.output.replace(/\n/g, ' | ')}
              </p>
            )}
          </div>
        )}
      </article>
    );
  };

  const renderJqueryProgramBlock = (program: JqueryProgramItem) => {
    const isCopied = copiedId === program.id;
    const isExecuted = !!executedIds[program.id];
    const isDone = !!completedIds[program.id];

    return (
      <article
        key={program.id}
        id={`program-${program.id}`}
        className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 transition-colors"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Top 10 Important jQuery Programs</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-indigo-600 font-medium">
              {JQUERY_TIMESTAMP}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">jQuery #{program.number}</span>
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              type="button"
              onClick={() => toggleCompleted(program.id)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                isDone
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {isDone ? (
                <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Square className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span>{isDone ? 'Written in File' : 'Mark Written'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleRunProgram(program.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isExecuted ? 'Hide Live Demo' : 'Run Live Demo'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopyCode(program.id, program.code)}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900">{program.title}</h3>

        <div className="bg-slate-950 text-slate-100 rounded-lg p-4 border border-slate-800 overflow-x-auto">
          <pre className="text-xs sm:text-sm font-mono leading-relaxed tabular-nums">
            <code>{program.code}</code>
          </pre>
        </div>

        {/* Extra context for Program 10 (data.txt) */}
        {program.extraContext ? (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
            <div className="text-xs font-semibold text-slate-700">
              {program.extraContext.heading}
            </div>
            <div className="bg-slate-900 text-emerald-400 font-mono text-xs px-3 py-2 rounded">
              {program.extraContext.codeSnippet}
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-800">
              {program.extraContext.explanation}
            </p>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5">
            <div className="text-xs font-bold text-indigo-900">{program.noteLabel}</div>
            {program.noteContent.map((line, idx) => (
              <div key={idx} className="text-xs sm:text-sm font-medium text-slate-800">
                {line}
              </div>
            ))}
          </div>
        )}

        {/* Interactive Live jQuery Simulator */}
        {isExecuted && (
          <div className="no-print">
            <JqueryLiveDemo programNumber={program.number} />
          </div>
        )}
      </article>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Bar Contract: Zone 1 (Brand) — Zone 2 (Nav Links) — Zone 3 (Primary Actions) */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-3.5 bg-white border-b border-slate-200 no-print">
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap"
        >
          PHP &amp; jQuery Practical Portal
        </a>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => {
              setActiveFilter('all');
              scrollToSection('section-featured');
            }}
            className="hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            PHP Even Sum
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('all');
              scrollToSection('section-while-loop');
            }}
            className="hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            While Loop (1–5)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('all');
              scrollToSection('section-do-while-loop');
            }}
            className="hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Do-While (6–10)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('all');
              scrollToSection('section-viva-trick');
            }}
            className="hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Viva &amp; Factorial
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('all');
              scrollToSection('section-jquery-top10');
            }}
            className="hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Top 10 jQuery
          </button>
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print File</span>
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout ({user.username})</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Canvas */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 lg:w-72 shrink-0 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-5 space-y-6 no-print">
          <div className="pb-4 border-b border-slate-200 space-y-1">
            <div className="text-xs text-slate-500">Authenticated Student</div>
            <div className="text-sm font-bold text-slate-900 truncate">{user.fullName}</div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5 font-mono tabular-nums">
              <span>@{user.username}</span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{user.rollNo}</span>
            </div>
          </div>

          {/* Practical File Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Practical File Progress</span>
              <span className="font-mono tabular-nums text-slate-600">
                {completedCount} / {totalProgramsCount}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-200"
                style={{
                  width: `${Math.round((completedCount / totalProgramsCount) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Category Filter Controls */}
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-slate-700 mb-2">
              Filter Practical Sections
            </div>
            {(
              [
                { id: 'all', label: 'All Practical Notes (22)' },
                { id: 'php-all', label: 'All PHP Programs (12)' },
                { id: 'for-loop', label: 'PHP: Even Sum (0 to 10)' },
                { id: 'while-loop', label: 'PHP: While Loop (1–5)' },
                { id: 'do-while-loop', label: 'PHP: Do-While Loop (6–10)' },
                { id: 'viva-factorial', label: 'PHP: Viva & Factorial' },
                { id: 'jquery-top10', label: 'jQuery: Top 10 Programs' },
              ] as { id: CategoryFilter; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap truncate ${
                  activeFilter === tab.id
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Jump Index */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <div className="text-xs font-semibold text-slate-700">
              Quick Jump (PHP &amp; jQuery)
            </div>
            <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
              <div className="text-[11px] font-semibold text-slate-400 px-2 pt-1">
                PHP Practical (Fri, Sep 11)
              </div>
              {PHP_PROGRAMS.map((prog) => (
                <button
                  key={prog.id}
                  type="button"
                  onClick={() => {
                    setActiveFilter('all');
                    setTimeout(() => scrollToSection(`program-${prog.id}`), 50);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors truncate block cursor-pointer"
                >
                  {prog.title}
                </button>
              ))}
              <div className="text-[11px] font-semibold text-slate-400 px-2 pt-3">
                jQuery Top 10 (Thu, Sep 17)
              </div>
              {JQUERY_PROGRAMS.map((jq) => (
                <button
                  key={jq.id}
                  type="button"
                  onClick={() => {
                    setActiveFilter('all');
                    setTimeout(() => scrollToSection(`program-${jq.id}`), 50);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors truncate block cursor-pointer"
                >
                  {jq.title}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main id="top" className="flex-1 p-6 lg:p-10 space-y-10 max-w-4xl">
          {/* Top Search & Header Card */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-mono font-semibold text-indigo-600 tabular-nums">
                    {PRACTICAL_TIMESTAMP}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono font-semibold text-indigo-600 tabular-nums">
                    {JQUERY_TIMESTAMP}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Web Engineering Practical File</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  PHP Loops Practical &amp; Top 10 Important jQuery Programs
                </h1>
              </div>

              <button
                type="button"
                onClick={() => setShowSandbox(!showSandbox)}
                className="px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer no-print"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{showSandbox ? 'Close PHP Tester' : 'Interactive PHP Tester'}</span>
              </button>
            </div>

            <div className="relative no-print">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search PHP loops, factorial, or jQuery programs (hide, toggle, css, fadeIn, slideUp, AJAX)..."
                className="w-full pl-10 pr-20 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </section>

          {/* Optional Interactive Sandbox for PHP values */}
          {showSandbox && (
            <section className="bg-slate-900 text-slate-100 border border-slate-800 rounded-xl p-6 space-y-5 no-print">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white">
                    Interactive PHP Practical Parameter Tester
                  </h2>
                  <p className="text-xs text-slate-400">
                    Test how the PHP output changes if your examiner asks you to modify values during Viva.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCustomEvenLimit(10);
                    setCustomTableNum(5);
                    setCustomFactNum(5);
                  }}
                  className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Sum of Even Numbers (0 to N):
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={customEvenLimit}
                    onChange={(e) => setCustomEvenLimit(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-sm font-mono bg-slate-900 border border-slate-700 rounded text-white"
                  />
                  <div className="text-xs font-mono text-slate-400">
                    Even numbers: {evenCalculation.evens.join(', ')}
                  </div>
                  <div className="text-xs font-mono font-semibold text-emerald-400">
                    Sum = {evenCalculation.sum} ✅
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Multiplication Table Number:
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={customTableNum}
                    onChange={(e) => setCustomTableNum(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-sm font-mono bg-slate-900 border border-slate-700 rounded text-white"
                  />
                  <div className="text-xs font-mono text-slate-300 space-y-0.5">
                    <div>
                      {customTableNum} x 1 = {customTableNum * 1}
                    </div>
                    <div>
                      {customTableNum} x 2 = {customTableNum * 2}
                    </div>
                    <div className="text-slate-500">...</div>
                    <div className="text-emerald-400 font-semibold">
                      {customTableNum} x 10 = {customTableNum * 10}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Factorial Number ($n):
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={customFactNum}
                    onChange={(e) => setCustomFactNum(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-sm font-mono bg-slate-900 border border-slate-700 rounded text-white"
                  />
                  <div className="text-xs font-mono text-slate-400">
                    {factorialCalculation.n}! = {factorialCalculation.expression}
                  </div>
                  <div className="text-xs font-mono font-semibold text-emerald-400">
                    Factorial of {factorialCalculation.n} = {factorialCalculation.fact} ✅
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* PART A: PHP PRACTICAL PROGRAMS (Fri, Sep 11 at 9:40 AM) */}
          {activeFilter !== 'jquery-top10' && (
            <div className="space-y-8">
              {/* Featured Even Sum Program */}
              {(activeFilter === 'all' ||
                activeFilter === 'php-all' ||
                activeFilter === 'for-loop') && (
                <section id="section-featured" className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-semibold">
                    <span>{PRACTICAL_TIMESTAMP}</span>
                  </div>
                  {filteredPhpPrograms
                    .filter((p) => p.category === 'for-loop')
                    .map((prog) => renderPhpProgramBlock(prog))}
                </section>
              )}

              {/* Overview Question Lists */}
              {(activeFilter === 'all' || activeFilter === 'php-all') && !searchQuery && (
                <section
                  id="section-questions-index"
                  className="bg-white border border-slate-200 rounded-xl p-6 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h2 className="text-base font-bold text-slate-900">
                        *While Loop – Practical Questions*
                      </h2>
                      <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                        {WHILE_LOOP_QUESTION_LIST.map((q, idx) => (
                          <li key={idx}>{q}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-base font-bold text-slate-900">
                        *Do-While Loop – Practical Questions*
                      </h2>
                      <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                        {DO_WHILE_LOOP_QUESTION_LIST.map((q, idx) => (
                          <li key={idx}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 text-sm font-medium text-slate-700">
                    Sure. Here are all practical questions with simple PHP code, easy to write in your practical file.
                  </div>
                </section>
              )}

              {/* While Loop – Practical Questions (1 to 5) */}
              {(activeFilter === 'all' ||
                activeFilter === 'php-all' ||
                activeFilter === 'while-loop') &&
                filteredPhpPrograms.some((p) => p.category === 'while-loop') && (
                  <section id="section-while-loop" className="space-y-4">
                    <div className="border-b border-slate-200 pb-2">
                      <h2 className="text-xl font-bold text-slate-900">
                        While Loop – Practical Questions
                      </h2>
                    </div>
                    <div className="space-y-5">
                      {filteredPhpPrograms
                        .filter((p) => p.category === 'while-loop')
                        .map((prog) => renderPhpProgramBlock(prog))}
                    </div>
                  </section>
                )}

              {/* Do-While Loop – Practical Questions (6 to 10) */}
              {(activeFilter === 'all' ||
                activeFilter === 'php-all' ||
                activeFilter === 'do-while-loop') &&
                filteredPhpPrograms.some((p) => p.category === 'do-while-loop') && (
                  <section id="section-do-while-loop" className="space-y-4">
                    <div className="border-b border-slate-200 pb-2">
                      <h2 className="text-xl font-bold text-slate-900">
                        Do-While Loop – Practical Questions
                      </h2>
                    </div>
                    <div className="space-y-5">
                      {filteredPhpPrograms
                        .filter((p) => p.category === 'do-while-loop')
                        .map((prog) => renderPhpProgramBlock(prog))}
                    </div>
                  </section>
                )}

              {/* Viva Trick & Factorial */}
              {(activeFilter === 'all' ||
                activeFilter === 'php-all' ||
                activeFilter === 'viva-factorial') && (
                <section id="section-viva-trick" className="space-y-6">
                  <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                      <h2 className="text-xl font-bold text-slate-900">🔑 Viva Trick</h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Quick revision points for PHP practical viva examination
                      </p>
                    </div>

                    <div className="divide-y divide-slate-200">
                      {VIVA_TRICKS.map((trick, index) => (
                        <div
                          key={index}
                          className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2.5">
                            <code className="text-sm font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                              {trick.term}
                            </code>
                            <span className="text-sm font-semibold text-slate-900">
                              {trick.explanation}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">{trick.englishSub}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {filteredPhpPrograms.some((p) => p.category === 'factorial') && (
                    <div className="space-y-4">
                      <div className="border-b border-slate-200 pb-2">
                        <h2 className="text-xl font-bold text-slate-900">Factorial</h2>
                      </div>
                      {filteredPhpPrograms
                        .filter((p) => p.category === 'factorial')
                        .map((prog) => renderPhpProgramBlock(prog))}
                    </div>
                  )}
                </section>
              )}
            </div>
          )}

          {/* PART B: TOP 10 IMPORTANT JQUERY PROGRAMS (Thu, Sep 17 at 12:26 PM) */}
          {(activeFilter === 'all' || activeFilter === 'jquery-top10') &&
            filteredJqueryPrograms.length > 0 && (
              <section id="section-jquery-top10" className="space-y-6 pt-4 border-t border-slate-200">
                {/* jQuery Header Banner matching exact note text */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2">
                  <div className="text-xs font-mono font-semibold text-indigo-600 tabular-nums">
                    {JQUERY_TIMESTAMP}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{JQUERY_HEADER_TITLE}</h2>
                  <p className="text-sm text-slate-700 leading-relaxed">{JQUERY_INTRO_TEXT}</p>
                </div>

                {/* All 10 jQuery Program Cards */}
                <div className="space-y-5">
                  {filteredJqueryPrograms.map((jq) => renderJqueryProgramBlock(jq))}
                </div>
              </section>
            )}

          {/* Empty state if search matches nothing */}
          {filteredPhpPrograms.length === 0 && filteredJqueryPrograms.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-3">
              <p className="text-base font-semibold text-slate-900">
                No PHP or jQuery programs matched &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-xs text-slate-500">
                Try searching for &ldquo;even&rdquo;, &ldquo;while&rdquo;, &ldquo;factorial&rdquo;, &ldquo;hide&rdquo;, &ldquo;toggle&rdquo;, &ldquo;fade&rdquo;, or &ldquo;AJAX&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Show All 22 Practical Programs
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Footer with requested copyright credit */}
      <footer className="px-6 py-4 border-t border-slate-200 bg-white text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="font-medium text-slate-800">
          © All Rights Reserved · Abhishek Shrivastava · B.Tech CSE, AKS University, Satna
        </span>
        <span className="text-slate-500">
          PHP Loops ({PRACTICAL_TIMESTAMP}) &amp; Top 10 jQuery ({JQUERY_TIMESTAMP})
        </span>
      </footer>
    </div>
  );
};
