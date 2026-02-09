import { Route, Routes } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { Questionnaire } from '@/components/Questionnaire';
import { ResultsView } from '@/components/ResultsView';

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 px-4 py-10 text-slate-100">
      <div className="mx-auto mb-8 max-w-5xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sky-300">
          <Brain className="h-4 w-4" /> Brainstorming Engine App
        </div>
        <h1 className="text-3xl font-bold md:text-4xl">Creative, practical idea generation in structured categories</h1>
      </div>

      <Routes>
        <Route path="/" element={<Questionnaire />} />
        <Route path="/results" element={<ResultsView />} />
      </Routes>
    </main>
  );
}

export default App;
