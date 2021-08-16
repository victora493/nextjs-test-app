import '../styles/globals.css'
import Layout from '../components/layout/Layout'

// wont let me push
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
