import { useEffect, useRef, useState } from "react"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [messages, setMessages] = useState(["Hi", "Hi there"])

  const [text, setText] = useState("")
  const [isSending, setIsSending] = useState(false);


  let inputRef = useRef(null)
  let wsRef = useRef()

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080")
    // @ts-ignore
    wsRef.current = ws;

    ws.onopen = () =>{
      toast("Connected to the chat!")
    }

    ws.onmessage = (event)=>{
      setMessages(x => [...x, event.data])
    }


    return ()=>{
      ws.close()
    }
    
   

  }, [])


  
  const handleSend = () =>{
    setIsSending(true)
    //@ts-ignore
    wsRef.current?.send(text)
    setText("")
    setIsSending(false)
  }


  

  

  
  return (
    <div className='h-screen w-full bg-black flex justify-center items-center text-white'>

      <div className='border-white/25 border w-96 h-3/4 rounded-lg flex flex-col items-center text-center'>
      
      <p className='p-2 w-full border-b-2 border-white/10 text-3xl'>Chat</p>

      <div className="w-full text-left ml-2 p-4 h-full ">

        <div >
          {messages.map((message, index)=>{
            return(
              <p key={index} className="py-1 px-3 w-fit  rounded-lg bg-white/30 my-2" >{message}</p>

            )
          })}
          </div>
      </div>

      <div className="border-t-2 w-full border-white/10 flex justify-between">
        <input ref={inputRef}
        onKeyDown={(e)=>{
          if(e.key == "Enter"){
            handleSend()
          }
        }}
        value={text}
        onChange={e => setText(e.target.value)}
        type="text" className="bg-black p-2 w-full border-none focus:outline-none rounded-md" />
          <button disabled={isSending}
          
        onClick={handleSend}className="py-1 px-2 bg-white m-1 text-black rounded-md">
            {isSending ? 'Sending...' : 'Send'}
          </button>
      </div>

      </div>
      
          <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          theme="dark"
          
          />
    </div>
  )
}

export default App