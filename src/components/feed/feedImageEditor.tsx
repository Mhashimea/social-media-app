import React, { useState } from 'react';
import FilerobotImageEditor from 'filerobot-image-editor';

export default function FeedImageEditor() {
  const config = {
    tools: ['adjust', 'effects', 'filters', 'rotate'],
    reduceBeforeEdit: {
      mode: 'manual',
      widthLimit: 500,
      heightLimit: 500,
    },
    colorScheme: 'light',
    showInModal: false,
    finishButtonLabel: 'Save',
    translations: {
      en: {
        toolbar: {
          save: 'dlkfh',
          apply: 'dlfjh',
        },
      },
    },
  };

  const [src, setSrc] = useState(
    'https://images.pexels.com/photos/9849841/pexels-photo-9849841.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
  );
  const shortenTheBase64 = async (e) => {
    const src = e.canvas.toDataURL('image/png');
    setSrc(src);
  };
  return (
    <div className="feed-image-editor">
      <FilerobotImageEditor
        show={true}
        src={src}
        config={config}
        onComplete={(e) => {
          shortenTheBase64(e);
        }}
      />
    </div>
  );
}
