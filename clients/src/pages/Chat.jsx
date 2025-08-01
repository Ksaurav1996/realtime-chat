// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import Model from '../components/Model';
// import { BsEmojiSmile, BsFillEmojiSmileFill } from "react-icons/bs"
// import { fetchMessages, sendMessage } from '../apis/messages';
// import { useEffect } from 'react';
// import MessageHistory from '../components/MessageHistory';
// import io from "socket.io-client"
// import "./home.css"
// import { fetchChats, setNotifications } from '../redux/chatsSlice';
// import Loading from '../components/ui/Loading';
// import data from '@emoji-mart/data'
// import Picker from '@emoji-mart/react'
// import { getChatName } from '../utils/logics';
// import Typing from '../components/ui/Typing';
// import { validUser } from '../apis/auth';
// const ENDPOINT = process.env.REACT_APP_SERVER_URL
// let socket, selectedChatCompare;

// function Chat(props) {
//   const { activeChat, notifications } = useSelector((state) => state.chats)
//   const dispatch = useDispatch()
//   const [message, setMessage] = useState("")
//   const [messages, setMessages] = useState([])
//   const [socketConnected, setSocketConnected] = useState(false)
//   const [typing, setTyping] = useState(false)
//   const [isTyping, setIsTyping] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [showPicker, setShowPicker] = useState(false);
//   const activeUser = useSelector((state) => state.activeUser)

//   const keyDownFunction = async (e) => {
//     if ((e.key === "Enter" || e.type === "click") && (message)) {
//       setMessage("")
//       socket.emit("stop typing", activeChat._id)
//       const data = await sendMessage({ chatId: activeChat._id, message })
//       socket.emit("new message", data)
//       setMessages([...messages, data])
//       dispatch(fetchChats())
//     }
//   }


//   useEffect(() => {
//     socket = io(ENDPOINT)
//     socket.on("typing", () => setIsTyping(true))
//     socket.on("stop typing", () => setIsTyping(false))
//   }, [])

//   useEffect(() => {
//     socket.emit("setup", activeUser)
//     socket.on("connected", () => {
//       setSocketConnected(true)
//     })
//   }, [messages, activeUser])
//   useEffect(() => {
//     const fetchMessagesFunc = async () => {
//       if (activeChat) {
//         setLoading(true)
//         const data = await fetchMessages(activeChat._id)
//         setMessages(data)
//         socket.emit("join room", activeChat._id)
//         setLoading(false)

//       }
//       return
//     }
//     fetchMessagesFunc()
//     selectedChatCompare = activeChat

//   }, [activeChat])
//   useEffect(() => {
//     socket.on("message recieved", (newMessageRecieved) => {
//       if ((!selectedChatCompare || selectedChatCompare._id) !== newMessageRecieved.chatId._id) {
//         if (!notifications.includes(newMessageRecieved)) {
//           dispatch(setNotifications([newMessageRecieved, ...notifications]))
//         }
//       }
//       else {
//         setMessages([...messages, newMessageRecieved])
//       }
//       dispatch(fetchChats())
//     })
//   })
//   useEffect(() => {
//     const isValid = async () => {
//       const data = await validUser()
//       if (!data?.user) {
//         window.location.href = "/login"
//       }

//     }
//     isValid()
//   }, [])
//   if (loading) {
//     return <div className={props.className}>
//       <Loading />
//     </div>
//   }
//   return (
//     <>
//       {
//         activeChat ?
//           <div className={props.className}>
//             <div className='flex justify-between items-center px-5 bg-[#ffff] w-[100%]'>
//               <div className='flex items-center gap-x-[10px]'>
//                 <div className='flex flex-col items-start justify-center'>
//                   <h5 className='text-[17px] text-[#2b2e33] font-bold tracking-wide'>{getChatName(activeChat, activeUser)}</h5>
//                   {/* <p className='text-[11px] text-[#aabac8]'>Last seen 5 min ago</p> */}
//                 </div>
//               </div>
//               <div>
//                 <Model />
//               </div>
//             </div>
//             <div className='scrollbar-hide w-[100%] h-[70vh] md:h-[66vh] lg:h-[69vh] flex flex-col overflow-y-scroll p-4'>
//               <MessageHistory typing={isTyping} messages={messages} />
//               <div className='ml-7 -mb-10'>
//                 {
//                   isTyping ?
//                     <Typing width="100" height="100" /> : ""
//                 }

//               </div>
//             </div>
//             <div className='absolute left-[31%] bottom-[8%]'>
//               {
//                 showPicker && <Picker data={data} onEmojiSelect={(e) => setMessage(message + e.native)} />
//               }
//               <div className='border-[1px] border-[#aabac8] px-6 py-3 w-[360px] sm:w-[400px] md:w-[350px] h-[50px] lg:w-[400px] rounded-t-[10px]'>

//                 <form onKeyDown={(e) => keyDownFunction(e)} onSubmit={(e) => e.preventDefault()}>
//                   <input onChange={(e) => {
//                     setMessage(e.target.value)
//                     if (!socketConnected) return
//                     if (!typing) {
//                       setTyping(true)
//                       socket.emit('typing', activeChat._id)
//                     }
//                     let lastTime = new Date().getTime()
//                     var time = 3000
//                     setTimeout(() => {
//                       var timeNow = new Date().getTime()
//                       var timeDiff = timeNow - lastTime
//                       if (timeDiff >= time && typing) {
//                         socket.emit("stop typing", activeChat._id)
//                         setTyping(false)
//                       }
//                     }, time)
//                   }} className='focus:outline-0 w-[100%] bg-[#f8f9fa]' type="text" name="message" placeholder="Enter message" value={message} />
//                 </form>

//               </div>

//               <div className='border-x-[1px] border-b-[1px] bg-[#f8f9fa] border-[#aabac8] px-6 py-3 w-[360px] sm:w-[400px] md:w-[350px] lg:w-[400px] rounded-b-[10px] h-[50px]'>
//                 {/* {
//                   isTyping ? <div>Loading</div> : ""
//                 } */}
//                 <div className='flex justify-between items-start'>

//                   <div className='cursor-pointer' onClick={() => setShowPicker(!showPicker)}>

//                     {showPicker ? <BsFillEmojiSmileFill className='w-[20px] h-[20px] text-[#ffb02e] border-[black]' /> : <BsEmojiSmile className='w-[20px] h-[20px]' />}
//                   </div>
//                   <button onClick={(e) => keyDownFunction(e)} className='bg-[#f8f9fa] border-[2px] border-[#d4d4d4] text-[14px] px-2 py-[3px] text-[#9e9e9e] font-medium rounded-[7px] -mt-1'>Send</button>
//                 </div>
//               </div>
//             </div>
//           </div> :
//           <div className={props.className}>
//             <div className='relative'>
//               <div className='absolute top-[40vh] left-[44%] flex flex-col items-center justify-center gap-y-3'>
//                 <img className='w-[50px] h-[50px] rounded-[25px]' alt="User profile" src={activeUser.profilePic} />
//                 <h3 className='text-[#111b21] text-[20px] font-medium tracking-wider'>Welcome <span className='text-[#166e48] text-[19px] font-bold'> {activeUser.name}</span></h3>
//               </div>
//             </div>
//           </div>

//       }
//     </>
//   )
// }

// export default Chat
// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import Model from '../components/Model'
// import { BsEmojiSmile, BsFillEmojiSmileFill } from 'react-icons/bs'
// import { fetchMessages, sendMessage } from '../apis/messages'
// import MessageHistory from '../components/MessageHistory'
// import io from 'socket.io-client'
// import './home.css'
// import { fetchChats, setNotifications } from '../redux/chatsSlice'
// import Loading from '../components/ui/Loading'
// import data from '@emoji-mart/data'
// import Picker from '@emoji-mart/react'
// import { getChatName } from '../utils/logics'
// import Typing from '../components/ui/Typing'
// import { validUser } from '../apis/auth'

// const ENDPOINT = process.env.REACT_APP_SERVER_URL
// let socket, selectedChatCompare

// function Chat(props) {
//   const { activeChat, notifications } = useSelector((state) => state.chats)
//   const dispatch = useDispatch()
//   const [message, setMessage] = useState('')
//   const [messages, setMessages] = useState([])
//   const [socketConnected, setSocketConnected] = useState(false)
//   const [typing, setTyping] = useState(false)
//   const [isTyping, setIsTyping] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [showPicker, setShowPicker] = useState(false)
//   const activeUser = useSelector((state) => state.activeUser)

//   const keyDownFunction = async (e) => {
//     if ((e.key === 'Enter' || e.type === 'click') && message) {
//       setMessage('')
//       socket.emit('stop typing', activeChat._id)
//       const data = await sendMessage({ chatId: activeChat._id, message })
//       socket.emit('new message', data)
//       setMessages([...messages, data])
//       dispatch(fetchChats())
//     }
//   }

//   useEffect(() => {
//     socket = io(ENDPOINT)
//     socket.on('typing', () => setIsTyping(true))
//     socket.on('stop typing', () => setIsTyping(false))
//   }, [])

//   useEffect(() => {
//     socket.emit('setup', activeUser)
//     socket.on('connected', () => {
//       setSocketConnected(true)
//     })
//   }, [messages, activeUser])

//   useEffect(() => {
//     const fetchMessagesFunc = async () => {
//       if (activeChat) {
//         setLoading(true)
//         const data = await fetchMessages(activeChat._id)
//         setMessages(data)
//         socket.emit('join room', activeChat._id)
//         setLoading(false)
//       }
//       return
//     }
//     fetchMessagesFunc()
//     selectedChatCompare = activeChat
//   }, [activeChat])

//   useEffect(() => {
//     socket.on('message recieved', (newMessageRecieved) => {
//       if ((!selectedChatCompare || selectedChatCompare._id) !== newMessageRecieved.chatId._id) {
//         if (!notifications.includes(newMessageRecieved)) {
//           dispatch(setNotifications([newMessageRecieved, ...notifications]))
//         }
//       } else {
//         setMessages([...messages, newMessageRecieved])
//       }
//       dispatch(fetchChats())
//     })
//   })

//   useEffect(() => {
//     const isValid = async () => {
//       const data = await validUser()
//       if (!data?.user) {
//         window.location.href = '/login'
//       }
//     }
//     isValid()
//   }, [])

//   if (loading) {
//     return (
//       <div className={props.className}>
//         <Loading />
//       </div>
//     )
//   }

//   return (
//     <>
//       {activeChat ? (
//         <div className={`${props.className} bg-[#54c4e3] w-full h-[100vh] flex flex-col relative`}>
//           {/* Header */}
//           <div className='w-full p-4 bg-white border-b shadow flex justify-between items-center'>
//             <div className='flex items-center gap-3'>
//               <div className='flex flex-col'>
//                 <h5 className='text-[18px] font-semibold text-[#2b2e33]'>
//                   {getChatName(activeChat, activeUser)}
//                 </h5>
//               </div>
//             </div>
//             <Model />
//           </div>

//           {/* Messages */}
//           <div className='flex-1 w-full overflow-y-scroll px-4 py-3'>
//             <MessageHistory typing={isTyping} messages={messages} />
//             <div className='ml-7 mt-2'>{isTyping && <Typing width="100" height="100" />}</div>
//           </div>

//           {/* Emoji Picker */}
//           {showPicker && (
//             <div className='absolute bottom-[120px] left-4 z-50'>
//               <Picker data={data} onEmojiSelect={(e) => setMessage(message + e.native)} />
//             </div>
//           )}

//           {/* Message Input */}
//           <div className='w-full px-4 py-3 bg-white border-t'>
//             <form
//               onKeyDown={(e) => keyDownFunction(e)}
//               onSubmit={(e) => e.preventDefault()}
//               className='w-full max-w-[500px] mx-auto'
//             >
//               <div className='flex flex-col sm:flex-row items-center gap-2'>
//                 <div className='flex flex-grow items-center border border-[#aabac8] rounded-md px-4 py-2 bg-[#f8f9fa]'>
//                   <input
//                     onChange={(e) => {
//                       setMessage(e.target.value)
//                       if (!socketConnected) return
//                       if (!typing) {
//                         setTyping(true)
//                         socket.emit('typing', activeChat._id)
//                       }
//                       let lastTime = new Date().getTime()
//                       const time = 3000
//                       setTimeout(() => {
//                         let timeNow = new Date().getTime()
//                         let timeDiff = timeNow - lastTime
//                         if (timeDiff >= time && typing) {
//                           socket.emit('stop typing', activeChat._id)
//                           setTyping(false)
//                         }
//                       }, time)
//                     }}
//                     className='flex-grow bg-[#f8f9fa] text-sm focus:outline-none'
//                     type='text'
//                     name='message'
//                     placeholder='Enter message'
//                     value={message}
//                   />
//                   <div onClick={() => setShowPicker(!showPicker)} className='ml-2 cursor-pointer'>
//                     {showPicker ? (
//                       <BsFillEmojiSmileFill className='w-[20px] h-[20px] text-yellow-500' />
//                     ) : (
//                       <BsEmojiSmile className='w-[20px] h-[20px] text-gray-500' />
//                     )}
//                   </div>
//                 </div>

//                 <button
//                   onClick={(e) => keyDownFunction(e)}
//                   className='bg-blue-500 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-600 transition duration-200 w-full sm:w-auto'
//                 >
//                   Send
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       ) : (
//         <div className={props.className}>
//           <div className='w-full h-full flex justify-center items-center bg-[#f9fafb]'>
//             <div className='text-center'>
//               <img className='w-[50px] h-[50px] rounded-full mx-auto mb-4' alt='User profile' src={activeUser.profilePic} />
//               <h3 className='text-[#111b21] text-[20px] font-medium'>
//                 Welcome <span className='text-[#166e48] font-bold'> {activeUser.name}</span>
//               </h3>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default Chat
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Model from '../components/Model'
import { BsEmojiSmile, BsFillEmojiSmileFill, BsArrowLeft } from 'react-icons/bs'
import { fetchMessages, sendMessage } from '../apis/messages'
import MessageHistory from '../components/MessageHistory'
import io from 'socket.io-client'
import './home.css'
import { fetchChats, setNotifications } from '../redux/chatsSlice'
import Loading from '../components/ui/Loading'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { getChatName } from '../utils/logics'
import Typing from '../components/ui/Typing'
import { validUser } from '../apis/auth'

const ENDPOINT = process.env.REACT_APP_SERVER_URL
let socket, selectedChatCompare

function Chat(props) {
  const { activeChat, notifications } = useSelector((state) => state.chats)
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [socketConnected, setSocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const activeUser = useSelector((state) => state.activeUser)

  const keyDownFunction = async (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && message) {
      setMessage('')
      socket.emit('stop typing', activeChat._id)
      const data = await sendMessage({ chatId: activeChat._id, message })
      socket.emit('new message', data)
      setMessages([...messages, data])
      dispatch(fetchChats())
    }
  }

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.on('typing', () => setIsTyping(true))
    socket.on('stop typing', () => setIsTyping(false))
  }, [])

  useEffect(() => {
    socket.emit('setup', activeUser)
    socket.on('connected', () => {
      setSocketConnected(true)
    })
  }, [messages, activeUser])

  useEffect(() => {
    const fetchMessagesFunc = async () => {
      if (activeChat) {
        setLoading(true)
        const data = await fetchMessages(activeChat._id)
        setMessages(data)
        socket.emit('join room', activeChat._id)
        setLoading(false)
      }
      return
    }
    fetchMessagesFunc()
    selectedChatCompare = activeChat
  }, [activeChat])

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved) => {
      if ((!selectedChatCompare || selectedChatCompare._id) !== newMessageRecieved.chatId._id) {
        if (!notifications.includes(newMessageRecieved)) {
          dispatch(setNotifications([newMessageRecieved, ...notifications]))
        }
      } else {
        setMessages([...messages, newMessageRecieved])
      }
      dispatch(fetchChats())
    })
  })

  useEffect(() => {
    const isValid = async () => {
      const data = await validUser()
      if (!data?.user) {
        window.location.href = '/login'
      }
    }
    isValid()
  }, [])

  if (loading) {
    return (
      <div className={props.className}>
        <Loading />
      </div>
    )
  }

  return (
    <>
      {activeChat ? (
        <div className={`${props.className} w-full h-[100vh] flex flex-col relative bg-[#ebf5fa]`}>
          {/* Header */}
          <div className="w-full flex items-center justify-between bg-white border-b shadow p-4 min-h-[68px]">
            {/* Back button for mobile */}
            <div className="flex items-center gap-2">
              <button
                className="block lg:hidden mr-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                onClick={() => props.onBack && props.onBack()}
                aria-label="Back"
              >
                <BsArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h5 className="text-[18px] font-semibold text-[#2b2e33] truncate max-w-[200px] md:max-w-xs">
                  {getChatName(activeChat, activeUser)}
                </h5>
              </div>
            </div>
            <Model />
          </div>

          {/* Messages */}
          <div className="flex-1 w-full overflow-y-auto px-4 py-3">
            <MessageHistory typing={isTyping} messages={messages} />
            <div className="ml-7 mt-2">{isTyping && <Typing width="100" height="100" />}</div>
          </div>

          {/* Emoji Picker */}
          {showPicker && (
            <div className="absolute bottom-[100px] left-4 z-40">
              <Picker data={data} onEmojiSelect={(e) => setMessage(message + e.native)} />
            </div>
          )}

          {/* Message Input */}
          <div className="w-full px-4 py-3 bg-white border-t">
            <form
              onKeyDown={(e) => keyDownFunction(e)}
              onSubmit={(e) => e.preventDefault()}
              className="w-full max-w-[600px] mx-auto"
            >
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="flex flex-grow items-center border border-[#d2dee4] rounded-md px-4 py-2 bg-[#f8fafb]">
                  <input
                    onChange={(e) => {
                      setMessage(e.target.value)
                      if (!socketConnected) return
                      if (!typing) {
                        setTyping(true)
                        socket.emit('typing', activeChat._id)
                      }
                      let lastTime = new Date().getTime()
                      const time = 3000
                      setTimeout(() => {
                        let timeNow = new Date().getTime()
                        let timeDiff = timeNow - lastTime
                        if (timeDiff >= time && typing) {
                          socket.emit('stop typing', activeChat._id)
                          setTyping(false)
                        }
                      }, time)
                    }}
                    className="flex-grow bg-[#f8fafb] text-sm focus:outline-none"
                    type="text"
                    name="message"
                    placeholder="Enter message"
                    value={message}
                  />
                  <div onClick={() => setShowPicker(!showPicker)} className="ml-2 cursor-pointer">
                    {showPicker ? (
                      <BsFillEmojiSmileFill className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <BsEmojiSmile className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => keyDownFunction(e)}
                  className="bg-[#3682e6] text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-[#2864ad] transition duration-200 w-full sm:w-auto"
                  type="button"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className={props.className}>
          <div className="w-full h-full flex justify-center items-center bg-[#f9fafb]">
            <div className="text-center">
              <img className="w-[50px] h-[50px] rounded-full mx-auto mb-4" alt="User profile" src={activeUser.profilePic} />
              <h3 className="text-[#111b21] text-[20px] font-medium">
                Welcome <span className="text-[#166e48] font-bold">{activeUser.name}</span>
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chat