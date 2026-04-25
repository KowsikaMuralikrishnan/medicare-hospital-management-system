import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Upload, FileText, X, CheckCircle, File } from 'lucide-react';

export default function UploadReports() {
  const { user } = useAuth();
  const { uploadDocument, getDocumentsByPatient } = useData();
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const documents = getDocumentsByPatient(user.id);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = Array.from(e.dataTransfer?.files || []);
    setFiles(prev => [...prev, ...dropped.map(f => ({ name: f.name, size: f.size, type: f.type }))]);
  };

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selected.map(f => ({ name: f.name, size: f.size, type: f.type }))]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    files.forEach(f => {
      uploadDocument({
        patientId: user.id,
        name: f.name,
        type: f.type?.includes('image') ? 'imaging' : 'lab-report',
        uploadedBy: user.name,
        mimeType: f.type || 'application/pdf',
      });
    });
    setFiles([]);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-800">Upload Reports</h1>
        <p className="text-surface-400 mt-1">Upload your medical reports and documents</p>
      </div>

      {uploadSuccess && (
        <div className="p-4 bg-success-50 border border-success-100 rounded-xl flex items-center gap-3 animate-slide-up">
          <CheckCircle className="w-5 h-5 text-success-500" />
          <p className="text-sm text-success-700 font-medium">Files uploaded successfully!</p>
        </div>
      )}

      {/* Drop Zone */}
      <div
        className={`card border-2 border-dashed transition-all ${dragActive ? 'border-primary-400 bg-primary-50' : 'border-surface-200'}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <div className="card-body text-center py-12">
          <Upload className={`w-12 h-12 mx-auto mb-4 ${dragActive ? 'text-primary-500' : 'text-surface-300'}`} />
          <h3 className="text-lg font-semibold text-surface-700 mb-1">Drag & Drop Files</h3>
          <p className="text-sm text-surface-400 mb-4">or click to browse your files</p>
          <label className="btn btn-primary cursor-pointer">
            <Upload className="w-4 h-4" /> Browse Files
            <input type="file" multiple className="hidden" onChange={handleFileSelect} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
          </label>
          <p className="text-xs text-surface-400 mt-3">Supported: PDF, JPG, PNG, DOC (Max 10MB)</p>
        </div>
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="card">
          <div className="card-body">
            <h3 className="font-semibold text-surface-800 mb-3">Selected Files ({files.length})</h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl">
                  <File className="w-5 h-5 text-accent-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-700 truncate">{file.name}</p>
                    <p className="text-xs text-surface-400">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button onClick={() => removeFile(index)} className="p-1 hover:bg-surface-200 rounded-lg transition-colors">
                    <X className="w-4 h-4 text-surface-400" />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={handleUpload} className="btn btn-primary w-full justify-center mt-4">
              <Upload className="w-4 h-4" /> Upload {files.length} File(s)
            </button>
          </div>
        </div>
      )}

      {/* Uploaded Documents */}
      <div className="card">
        <div className="card-body">
          <h2 className="text-lg font-semibold text-surface-800 mb-4">Previously Uploaded</h2>
          {documents.length === 0 ? (
            <p className="text-sm text-surface-400 text-center py-4">No documents uploaded yet</p>
          ) : (
            <div className="space-y-2">
              {documents.map(doc => (
                <div key={doc.id} className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl">
                  <FileText className="w-5 h-5 text-primary-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-surface-700 truncate">{doc.name}</p>
                    <p className="text-xs text-surface-400">{doc.uploadDate} · {doc.uploadedBy}</p>
                  </div>
                  <span className="badge badge-neutral text-[10px]">{doc.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
