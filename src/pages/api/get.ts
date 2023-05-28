import { NextApiRequest,NextApiResponse } from "next";
import { openAi } from "@/config/openAI";


export default async (req:NextApiRequest,res:NextApiResponse) =>{
    

    type Input = {
        question:string
        prompt:string
    }

    const { question, prompt }:Input = req.body;

    const premessage :string = 'You are study buddy , you will help students with studies. Do not use this "As an  AI language model" Give me answer of following question.'
    const postmessage :string = `${question} , ${prompt}`

    const response = await openAi.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages:[
            {"role":"system","content":`${premessage}`},
            {"role": "user", "content": `${postmessage}`}

        ]
    })

    res.status(200).json(response.data.choices[0].message?.content);  

    
}