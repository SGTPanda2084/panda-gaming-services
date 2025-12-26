import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const streamUrl = https://02c77d52de9b.us-east-1.playback.live-video.net/api/video/v1/us-east-1.016230494190.channel.PVsOZSvpaX54.m3u8

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>SGT Panda Streaming Services</h1>
      <div className="card">
        <p>Welcome to SGT Panda Streaming Services.</p>
        <p>You’re learning React step by step.</p>
      </div>
   <video
     controls
     autoPlay
     playsInline
     style={{ width: '100%', maxWidth: '800px', borderRadius: '8px', marginTop: '1rem' }}
   >
     <source src={streamUrl} type="application/x-mpegURL" />
     Your browser does not support the video tag.
   </video>
    </>
  )
}

export default App
