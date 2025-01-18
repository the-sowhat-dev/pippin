import ReactMarkdown from 'react-markdown';

async function getPrivacyPolicy() {
  const response = await fetch(
    'https://abkqohkbpzpaafojdzqg.supabase.co/storage/v1/object/sign/legal/latest/privacy_policy/1_0_0.md?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsZWdhbC9sYXRlc3QvcHJpdmFjeV9wb2xpY3kvMV8wXzAubWQiLCJpYXQiOjE3MzcyMjA2MjQsImV4cCI6MTc2ODc1NjYyNH0.pRB68dalmwVHOCITKzAxnpjIGoMd1jPXbLJrxK-4R5E&t=2025-01-18T17%3A17%3A04.141Z',
    {
      next: {
        revalidate: 3600, // Revalidate every hour
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch privacy policy');
  }

  return response.text();
}

export default async function PrivacyPage() {
  const markdown = await getPrivacyPolicy();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="prose prose-lg">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </article>
    </div>
  );
}
