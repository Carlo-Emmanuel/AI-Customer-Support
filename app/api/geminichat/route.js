import { NextResponse } from "next/server"

const systemPrompt = `You are a career coach for Computer Science and STEM College majors`

export async function POST(req){
    
    const apiKey = process.env.GEMINI_API_KEY
    const data = await req.json()
    const { messages = []} = data

    if (!Array.isArray(messages)) {
        throw new Error('Invalid request. Messages must be an array.')
    }

    const prompt = [    //prompt for the model
        {
            role: 'system',
            content: systemPrompt,
        },
        ...messages,
    ];

    console.log('API Key:', apiKey)

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateText', {
        method: 'POST',
        headers: {
            'Content': 
            'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'gemini-1.5-flash',      //can update this later if better model needed
            messages: prompt,
        }),
    })

    if(!response.ok){
        throw new Error(`Failed to fetch response. Error:: ${response.status}`);
    }

    const responseData = await response.json()

    const stream = new ReadableStream({ //streaming the response
        async start(controller){
            const encoder = new TextEncoder()
            try{
                let responseText = ''
                for (const message of responseData.choices){
                    responseText += message.message.content
                }
                const context = responseData.choices[0].message.content
                const text = encoder.encode(context)
                controller.enqueue(text)
            }
            catch(err){
                controller.error(err)
            }
            finally{    //close the stream when done
                controller.close()
            }
        },
    })

    return new NextResponse(stream)
}