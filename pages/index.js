import Head from 'next/head'
import Card from '../components/Card'

export default function Home() {
  return (
    <div className="container">
      <Card />

      <style jsx>{`
        .container {
          margin: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background: #fcfdfc;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
