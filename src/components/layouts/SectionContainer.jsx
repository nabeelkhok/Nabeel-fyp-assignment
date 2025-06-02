import React from 'react';

const SectionContainer = ({ title, subtitle, children }) => {
  return (
    <section className="mb-8">
      <div className="mb-4">
        {title && <h2 className="text-xl font-bold text-gray-800">{title}</h2>}
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;