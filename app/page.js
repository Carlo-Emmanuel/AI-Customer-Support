"use client";

import Image from "next/image";
import { Box, Button, Flex, Input, Text, Stack, TextField} from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: `Hi! I am the Headstarter Support Agent. How may I assist you today?`,
  }]);

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    setMessage('') // resets the message textfield
    setMessages((messages) =>
    [
      ...messages,
      {role: 'user', content: message},
      {role: 'assistant', content:''}
    ])
    const response = fetch('/api/chat',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, {role:'user', content: message}])
    }).then( async (res) => {
      const read = res.body.getReader()
      const decoder = new TextDecoder()

      let result = ''
      return Readex_Pro.read().then(function processText({done, value}){ // read the stream
        if(done){
          return result
        }
        const text = decoder.decode(value || new Int8Array(), {stream:true})
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messaage.slide(0, messages.length - 1)
          return [
            ...otherMessages,
            {content: lastMessage.content + text}
          ]
        })
      }
    })
  }


  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
        overflow="auto"
      >
        <Stack direction="column" spacing={2} flexGrow={1} overflow='auto' maxHeight='100%'>
          {
            messages.map((msg, index) => (
              // if its the assistant, it starts on the left and if its the user it starts on the right
              <Box key={index} display='flex' justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}>  
                <Box bgcolor={message.role === 'assistant' ? 'primary.main' : 'secondary.main'} color='white' borderRadius={16} p={3}>
                  {msg.content}
                </Box>
              </Box>
            ))
          }
        </Stack>
        <Stack direction='row' spacing={2}>
          <TextField label='message' fullWidth value={message} onChange={(e) => setMessage(e.target.value)}/>
            <Button>Send</Button>
        </Stack>
      </Stack>
    </Box>
  );
}
