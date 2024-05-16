import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

// Import BlockNote CSS
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

// Dynamically import the BlockNote components with SSR disabled
const BlockNoteView = dynamic(() => import('@blocknote/mantine').then((mod) => mod.BlockNoteView), {
  ssr: false,
});

const useCreateBlockNote = dynamic(() => import('@blocknote/react').then((mod) => mod.useCreateBlockNote), {
  ssr: false,
  // This loading component is optional but can enhance user experience
  loading: () => <p>Loading editor...</p>,
});

function Home() {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    // Dynamically import useCreateBlockNote in useEffect to ensure it's only executed client-side
    import('@blocknote/react').then((blockNote) => {
      const newEditor = blockNote.useCreateBlockNote({
        initialContent: [
          { type: "paragraph", content: "Welcome to the BlockNote editor in Next.js!" },
          { type: "heading", content: "Edit your content here" },
          { type: "paragraph", content: "You can add more blocks as needed." }
        ]
      });
      setEditor(newEditor);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>BlockNote Editor in Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.editor}>
          {editor ? <BlockNoteView editor={editor} /> : <p>Loading editor...</p>}
        </div>
      </main>
    </div>
  );
}

export default Home;
