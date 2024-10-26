'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface EmailAddressProps {
  email: string;
}

const EmailAddress = ({ email }: EmailAddressProps) => {
  const [copied, setCopied] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(email);
    setCopied(true);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <div
        style={{
          color: '#1D1B20',
          backgroundColor: '#fde047',
          borderWidth: 1,
          borderColor: '#facc15',
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
        }}
        className="text-sm sm:text-base px-4 py-4 sm:px-8"
      >
        <div className="text-nowrap">{email}</div>
      </div>
      <button
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          backgroundColor: '#facc15',
          borderWidth: 1,
          borderColor: '#facc15',
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        }}
        onMouseLeave={() => setCopied(false)}
        onClick={copyToClipboard}
        className="text-sm sm:text-base"
      >
        {!copied ? (
          <>
            <Image
              src="/icons/copy.svg"
              alt="Copy icon"
              width={20}
              height={20}
              style={{ objectFit: 'contain' }}
              className="w-[14px] sm:w-[20px]"
            />
            &nbsp;&nbsp;{'copier'}
          </>
        ) : (
          <>
            <Image
              src="/icons/checked.svg"
              alt="Copy icon"
              width={20}
              height={20}
              style={{ objectFit: 'contain' }}
              className="w-[14px] sm:w-[20px]"
            />
            &nbsp;&nbsp;<span className="text-green-600">{'copié'}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default EmailAddress;
