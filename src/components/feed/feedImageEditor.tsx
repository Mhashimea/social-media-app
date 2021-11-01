import React, { useEffect, useState } from 'react';
import FilerobotImageEditor from 'filerobot-image-editor';
import { Button } from 'antd';

interface FeedImageEditorInterface {
  onNext?: () => void;
  onBack: () => void;
  defaultValue?: string;
  onDoneEdit?: (value) => void;
}

export default function FeedImageEditor({
  onNext,
  onBack,
  defaultValue,
  onDoneEdit,
}: FeedImageEditorInterface) {
  const [src, setSrc] = useState<any>('');
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

  const shortenTheBase64 = async (e) => {
    const src = e.canvas.toDataURL('image/png');
    setSrc(src);
    if (onDoneEdit) {
      onDoneEdit(src);
      return;
    }
  };

  useEffect(() => {
    if (defaultValue) setSrc(defaultValue);
  }, []);

  return (
    <div className="feed-image-editor">
      {src && (
        <FilerobotImageEditor
          show={true}
          src={src}
          config={config}
          onComplete={(e) => {
            shortenTheBase64(e);
          }}
        />
      )}

      <div className="feed-modal-footer">
        <Button onClick={() => (onBack ? onBack() : null)}>Back</Button>
        <Button onClick={() => (onNext ? onNext() : null)}>Next</Button>
      </div>
    </div>
  );
}
