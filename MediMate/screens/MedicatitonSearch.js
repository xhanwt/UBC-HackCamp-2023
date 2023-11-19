// MedicationSearch.js
import React, { useState, useEffect } from 'react';
import RxNorm from 'rxnorm-js';
import axios from 'axios';

const MedicationSearch = () => {
  const [medicationName, setMedicationName] = useState('');
  const [medicationData, setMedicationData] = useState(null);

  useEffect(() => {
    if (medicationName.trim() !== '') {
      RxNorm.queryRxNormName(medicationName)
        .then((response) => {
          const rxcui = response.idGroup.rxnormId;
          return RxNorm.queryRxImageCode(rxcui);
        })
        .then((imageResponse) => {
          setMedicationData(imageResponse.nlmRxImages[0]);
        })
        .catch((error) => {
          console.error('Error fetching medication data:', error);
          setMedicationData(null);
        });
    }
  }, [medicationName]);

  const handleInputChange = (event) => {
    setMedicationName(event.target.value);
  };

  return (
    <div>
      <label>
        Medication Name:
        <input type="text" value={medicationName} onChange={handleInputChange} />
      </label>
      <div>
        {medicationData && (
          <div>
            <h2>{medicationData.name}</h2>
            <img src={medicationData.imageUrl} alt="Medication" style={{ maxWidth: '200px' }} />
            <p>
              <strong>Usage:</strong> {medicationData.usage}
            </p>
            <p>
              <strong>Description:</strong> {medicationData.description}
            </p>
            <p>
              <strong>Suggested Dosage:</strong> {medicationData.dosage}
            </p>
            <p>
              <strong>Suggested Time:</strong> {medicationData.time}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationSearch;
