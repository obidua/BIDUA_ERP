import React, { useState } from 'react';
import DocumentationPage from './DocumentationPage';

interface DocumentationPortalProps {
  currentUser: any;
  onLogout: () => void;
}

const DocumentationPortal: React.FC<DocumentationPortalProps> = ({
  currentUser,
  onLogout
}) => {
  return (
    <DocumentationPage />
  );
};

export default DocumentationPortal;