import { useData } from '../../context/DataContext';
import { ListOrdered, Play, CheckCircle, Trash2, Clock, User } from 'lucide-react';

const statusColors = {
  waiting: { badge: 'badge-info', bg: 'bg-accent-50', text: 'text-accent-600' },
  'in-progress': { badge: 'badge-warning', bg: 'bg-warning-50', text: 'text-warning-600' },
  completed: { badge: 'badge-success', bg: 'bg-success-50', text: 'text-success-600' },
};

export default function QueueManagement() {
  const { queue, updateQueueEntry, removeFromQueue } = useData();

  const waiting = queue.filter(q => q.status === 'waiting');
  const inProgress = queue.filter(q => q.status === 'in-progress');
  const completed = queue.filter(q => q.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-800">Queue Management</h1>
          <p className="text-surface-400 mt-1">Manage patient waiting room tokens and queue status</p>
        </div>
        <div className="flex gap-2">
          <span className="badge badge-info">Waiting: {waiting.length}</span>
          <span className="badge badge-warning">In Progress: {inProgress.length}</span>
          <span className="badge badge-success">Done: {completed.length}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Waiting */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-accent-500" />
            <h2 className="font-semibold text-surface-700">Waiting ({waiting.length})</h2>
          </div>
          <div className="space-y-3">
            {waiting.map(q => (
              <div key={q.id} className="card animate-fade-in">
                <div className="card-body p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center text-accent-600 font-bold text-sm">
                      #{q.tokenNo}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-surface-800">{q.patientName}</p>
                      <p className="text-[11px] text-surface-400">{q.doctorName}</p>
                    </div>
                    <span className={`badge ${q.type === 'walk-in' ? 'badge-warning' : 'badge-info'} text-[10px]`}>{q.type}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-surface-400 mb-3">
                    <Clock className="w-3 h-3" /> Checked in at {q.checkInTime}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => updateQueueEntry(q.id, { status: 'in-progress' })} className="btn btn-primary btn-sm flex-1">
                      <Play className="w-3 h-3" /> Start
                    </button>
                    <button onClick={() => removeFromQueue(q.id)} className="btn btn-danger btn-sm">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {waiting.length === 0 && (
              <div className="text-center py-8 text-surface-300">
                <User className="w-8 h-8 mx-auto mb-2" />
                <p className="text-xs">No patients waiting</p>
              </div>
            )}
          </div>
        </div>

        {/* In Progress */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-warning-500" />
            <h2 className="font-semibold text-surface-700">In Progress ({inProgress.length})</h2>
          </div>
          <div className="space-y-3">
            {inProgress.map(q => (
              <div key={q.id} className="card border-warning-200 animate-fade-in">
                <div className="card-body p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-warning-100 flex items-center justify-center text-warning-600 font-bold text-sm animate-pulse-slow">
                      #{q.tokenNo}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-surface-800">{q.patientName}</p>
                      <p className="text-[11px] text-surface-400">{q.doctorName}</p>
                    </div>
                  </div>
                  <button onClick={() => updateQueueEntry(q.id, { status: 'completed' })} className="btn btn-primary btn-sm w-full justify-center">
                    <CheckCircle className="w-3 h-3" /> Mark Done
                  </button>
                </div>
              </div>
            ))}
            {inProgress.length === 0 && (
              <div className="text-center py-8 text-surface-300">
                <ListOrdered className="w-8 h-8 mx-auto mb-2" />
                <p className="text-xs">No active consultations</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-success-500" />
            <h2 className="font-semibold text-surface-700">Completed ({completed.length})</h2>
          </div>
          <div className="space-y-3">
            {completed.map(q => (
              <div key={q.id} className="card opacity-60 animate-fade-in">
                <div className="card-body p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center text-success-600 font-bold text-sm">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-surface-800">{q.patientName}</p>
                      <p className="text-[11px] text-surface-400">Token #{q.tokenNo} · {q.doctorName}</p>
                    </div>
                    <button onClick={() => removeFromQueue(q.id)} className="p-1 hover:bg-surface-100 rounded-lg">
                      <Trash2 className="w-3.5 h-3.5 text-surface-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {completed.length === 0 && (
              <div className="text-center py-8 text-surface-300">
                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                <p className="text-xs">No completed visits</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
