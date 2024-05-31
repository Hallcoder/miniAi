// src/pages/_app.js
import Layout from '@/components/Layout';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  return <Layout><Component {...pageProps} /></Layout>
}

export default MyApp;
