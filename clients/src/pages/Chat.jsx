
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