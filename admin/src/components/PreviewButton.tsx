import React from 'react';
import type { PanelComponent, PanelComponentProps } from '@strapi/content-manager/strapi-admin';
import qs from 'qs';

const buttonStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 500,
  cursor: 'pointer',
  display: 'inline-block',
  width: '100%',
  height: '3.2rem',
  textDecoration: 'none',
  border: '1px solid #d9d8ff',
  background: '#f0f0ff',
  color: '#271fe0',
};

const buttonHoverFocusStyle: React.CSSProperties = {
  background: '#FFFFFF',
};

const buttonDisabledStyle: React.CSSProperties = {
  border: '1px solid #dcdce4',
  background: '#eaeaef',
  color: '#666687',
  cursor: 'default',
};

const handleClick = ({
  model,
  isDraft,
  documentId,
  slug,
}: {
  model: string;
  isDraft: boolean;
  documentId: string | undefined;
  slug: string | undefined;
}) => {
  if (!documentId) {
    return;
  }

  if(!slug){
    alert('slug value is required')
    return
  }

  const baseUrl = process.env.STRAPI_ADMIN_PREVIEW_URL;
  const secret = process.env.STRAPI_ADMIN_PREVIEW_URL_SECRET;

  const params = {
    secret,
    collectionName: model,
    documentId,
    slug,
    isDraft
  };

  const fullUrl = `${baseUrl}?${qs.stringify(params,{ encode: true })}`;
  window.open(fullUrl, '_blank');
};

const MyPanel: PanelComponent = ({
  activeTab,
  collectionType,
  document,
  documentId,
  meta,
  model,
}: PanelComponentProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const isDraft = activeTab === 'draft';
  const isDisabled = !documentId;

  return {
    title: 'Preview',
    content: (
      <button
        style={{
          ...buttonStyle,
          ...(isHovered ? buttonHoverFocusStyle : {}),
          ...(isDisabled ? buttonDisabledStyle : {}),
        }}
        disabled={isDisabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleClick({ model, isDraft, documentId, slug: document?.slug })}
      >
        {isDraft ? 'Draft Preview' : 'Live Preview'}
      </button>
    ),
  };
};

export default MyPanel;
