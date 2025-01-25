import { useState } from 'react';

export const useFormData = (fieldsData, initialForm = {}) => {
  const [formData, setFormData] = useState(
    fieldsData.reduce((acc, { field }) => {
      acc[field] = initialForm[field] || '';
      return acc;
    }, {})
  );

  return [formData, setFormData];
};
