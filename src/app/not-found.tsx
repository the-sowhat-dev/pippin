import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Not Found</title>
        <meta name="robots" content="noindex" key="notfoundpage" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-400 to-yellow-300">
        <h1 className="w-full py-4 p-8 text-3xl text-center">404 - Page non trouvée.</h1>
      </div>
    </>
  );
}
