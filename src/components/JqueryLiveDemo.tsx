import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface JqueryLiveDemoProps {
  programNumber: number;
}

export const JqueryLiveDemo: React.FC<JqueryLiveDemoProps> = ({ programNumber }) => {
  // Program 1: Hide & Show
  const [p1Visible, setP1Visible] = useState(true);

  // Program 2: Toggle
  const [p2Visible, setP2Visible] = useState(true);

  // Program 3: CSS change
  const [p3Styled, setP3Styled] = useState(false);

  // Program 4: text()
  const [p4Text, setP4Text] = useState('Old Text');

  // Program 5: html()
  const [p5Updated, setP5Updated] = useState(false);

  // Program 6: addClass / removeClass
  const [p6Highlighted, setP6Highlighted] = useState(false);

  // Program 7: fadeIn / fadeOut
  const [p7Visible, setP7Visible] = useState(true);

  // Program 8: slideUp / slideDown
  const [p8Open, setP8Open] = useState(true);

  // Program 9: Form validation
  const [p9Name, setP9Name] = useState('');
  const [p9Feedback, setP9Feedback] = useState<{ type: 'error' | 'success'; message: string } | null>(
    null
  );

  // Program 10: AJAX load
  const [p10Loaded, setP10Loaded] = useState(false);

  const handleReset = () => {
    setP1Visible(true);
    setP2Visible(true);
    setP3Styled(false);
    setP4Text('Old Text');
    setP5Updated(false);
    setP6Highlighted(false);
    setP7Visible(true);
    setP8Open(true);
    setP9Name('');
    setP9Feedback(null);
    setP10Loaded(false);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <span className="text-xs font-semibold text-slate-700">
          Interactive Live Output Simulator
        </span>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Output</span>
        </button>
      </div>

      {/* 1. Hide & Show Element */}
      {programNumber === 1 && (
        <div className="space-y-3">
          <div className="min-h-[32px] flex items-center">
            {p1Visible ? (
              <p className="text-sm font-medium text-slate-900">Hello jQuery</p>
            ) : (
              <span className="text-xs italic text-slate-400">(Element hidden via #text.hide())</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setP1Visible(false)}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded hover:bg-slate-100 cursor-pointer"
            >
              Hide
            </button>
            <button
              type="button"
              onClick={() => setP1Visible(true)}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded hover:bg-slate-100 cursor-pointer"
            >
              Show
            </button>
          </div>
        </div>
      )}

      {/* 2. Toggle Element */}
      {programNumber === 2 && (
        <div className="space-y-3">
          <div className="min-h-[32px] flex items-center">
            {p2Visible ? (
              <p className="text-sm font-medium text-slate-900">Welcome to jQuery</p>
            ) : (
              <span className="text-xs italic text-slate-400">(Toggled hidden)</span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setP2Visible((v) => !v)}
            className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded hover:bg-slate-100 cursor-pointer"
          >
            Toggle
          </button>
        </div>
      )}

      {/* 3. Change CSS Using jQuery */}
      {programNumber === 3 && (
        <div className="space-y-3">
          <div className="min-h-[44px] flex items-center">
            <p
              className={
                p3Styled
                  ? 'text-red-600 text-[30px] bg-yellow-300 px-2 py-0.5 rounded font-medium transition-all duration-150'
                  : 'text-sm text-slate-900 transition-all duration-150'
              }
            >
              Hello World
            </p>
          </div>
          <button
            type="button"
            onClick={() => setP3Styled(true)}
            className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded hover:bg-slate-100 cursor-pointer"
          >
            Change Style
          </button>
        </div>
      )}

      {/* 4. Change Text Using text() */}
      {programNumber === 4 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-900">{p4Text}</p>
          <button
            type="button"
            onClick={() => setP4Text('New Text')}
            className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded hover:bg-slate-100 cursor-pointer"
          >
            Change Text
          </button>
        </div>
      )}

      {/* 5. Change HTML Using html() */}
      {programNumber === 5 && (
        <div className="space-y-3">
          <div className="text-sm text-slate-900">
            {p5Updated ? <b>New Content</b> : 'Old Content'}
          </div>
          <button
            type="button"
            onClick={() => setP5Updated(true)}
            className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded hover:bg-slate-100 cursor-pointer"
          >
            Change
          </button>
        </div>
      )}

      {/* 6. Add / Remove Class */}
      {programNumber === 6 && (
        <div className="space-y-3">
          <div className="min-h-[38px] flex items-center">
            <p
              className={
                p6Highlighted
                  ? 'text-red-600 text-[25px] font-medium transition-all duration-150'
                  : 'text-sm text-slate-900 transition-all duration-150'
              }
            >
              Hello
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setP6Highlighted(true)}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded hover:bg-slate-100 cursor-pointer"
            >
              Add Class
            </button>
            <button
              type="button"
              onClick={() => setP6Highlighted(false)}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded hover:bg-slate-100 cursor-pointer"
            >
              Remove Class
            </button>
          </div>
        </div>
      )}

      {/* 7. Fade In / Fade Out */}
      {programNumber === 7 && (
        <div className="space-y-3">
          <div className="min-h-[32px] flex items-center">
            <div
              className={`text-sm font-medium text-slate-900 transition-opacity duration-200 ${
                p7Visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              Hello jQuery
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setP7Visible(true)}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded hover:bg-slate-100 cursor-pointer"
            >
              Fade In
            </button>
            <button
              type="button"
              onClick={() => setP7Visible(false)}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded hover:bg-slate-100 cursor-pointer"
            >
              Fade Out
            </button>
          </div>
        </div>
      )}

      {/* 8. Slide Up / Slide Down */}
      {programNumber === 8 && (
        <div className="space-y-3">
          <div
            className={`overflow-hidden transition-all duration-200 ${
              p8Open ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-sm font-medium text-slate-900 py-1">
              This is sliding content.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setP8Open(false)}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded hover:bg-slate-100 cursor-pointer"
            >
              Slide Up
            </button>
            <button
              type="button"
              onClick={() => setP8Open(true)}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded hover:bg-slate-100 cursor-pointer"
            >
              Slide Down
            </button>
          </div>
        </div>
      )}

      {/* 9. Form Validation */}
      {programNumber === 9 && (
        <div className="space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (p9Name.trim() === '') {
                setP9Feedback({ type: 'error', message: 'Alert: Name is required' });
              } else {
                setP9Feedback({
                  type: 'success',
                  message: 'Alert: Form submitted successfully',
                });
              }
            }}
            className="flex flex-wrap items-center gap-2"
          >
            <label className="text-xs font-medium text-slate-700">Name:</label>
            <input
              type="text"
              value={p9Name}
              onChange={(e) => setP9Name(e.target.value)}
              placeholder="Enter name..."
              className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button
              type="submit"
              className="px-3 py-1 text-xs font-semibold bg-slate-900 text-white rounded hover:bg-slate-800 cursor-pointer"
            >
              Submit
            </button>
          </form>
          {p9Feedback && (
            <div
              className={`px-3 py-1.5 rounded text-xs font-mono ${
                p9Feedback.type === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              {p9Feedback.message}
            </div>
          )}
        </div>
      )}

      {/* 10. AJAX — Load Data Without Refresh */}
      {programNumber === 10 && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setP10Loaded(true)}
            className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded hover:bg-slate-100 cursor-pointer"
          >
            Load Data
          </button>
          <div className="min-h-[32px] p-2.5 bg-white border border-slate-200 rounded text-xs font-mono text-slate-800">
            {p10Loaded ? (
              <span className="text-emerald-700 font-semibold">Welcome to jQuery AJAX</span>
            ) : (
              <span className="text-slate-400">
                #result is empty — click &quot;Load Data&quot; to fetch data.txt without page refresh
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
