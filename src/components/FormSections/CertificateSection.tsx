import { useResumeStore } from '../../store/ResumeStore';

const CertificationsSection = () => {
  const certifications = useResumeStore(state => state.certifications);
  const setCertifications = useResumeStore(state => state.setCertifications);
  const hasCertifications = useResumeStore(state => state.hasCerifications)
  const setHasCertifications = useResumeStore(state => state.setHasCertifications)

  const updateCertification = (index: number, value: string) => {
    const newCerts = [...certifications];
    newCerts[index] = value;
    setCertifications(newCerts);
  };

  const addCertification = () => {
    if (certifications.length >= 10) return;
    setCertifications([...certifications, '']);
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Certifications</h2>
         {hasCertifications && certifications.length === 0 && (
      <div className="mb-6 p-4 border border-yellow-300 bg-yellow-50 rounded-md">
        <p className="text-gray-700 mb-2">
          Don’t have any work cretifications to add right now?
        </p>
        <button
          type="button"
          onClick={() => setHasCertifications(false)}
          className="px-4 py-2 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 transition"
        >
          I don’t have cretifications
        </button>
      </div>
    )}

       {!hasCertifications && certifications.length === 0 && (
      <div className="mb-6 p-4 border border-yellow-300 bg-yellow-50 rounded-md">
        <p className="text-gray-700 mb-2">
          Don’t have any work experience to add right now?
        </p>
        <button
          type="button"
          onClick={() => setHasCertifications(true)}
          className="px-4 py-2 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 transition"
        >
          I have certifications
        </button>
      </div>
    )}

      {certifications.map((cert, idx) => (
        <div key={idx} className="flex items-center mb-3 gap-2">
          <input
            type="text"
            placeholder="Certification or License"
            className="flex-grow px-3 py-2 border rounded"
            value={cert}
            onChange={e => updateCertification(idx, e.target.value)}
          />
          <button
            type="button"
            onClick={() => removeCertification(idx)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
       {hasCertifications &&  <button
          type="button"
          onClick={addCertification}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Certification
        </button>} 
     
    </div>
  );
};

export default CertificationsSection;
