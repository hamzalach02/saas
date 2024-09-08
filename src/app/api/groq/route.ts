// app/api/translate/route.ts
import { groq } from '@/lib/groq';
import { NextResponse } from 'next/server';


// Handle POST requests
export async function POST(request: Request) {
  try {
    // Parse the JSON body
    const { prompt } = await request.json();

    // Validate input
    if (!prompt ) {
      return NextResponse.json({ error: 'Prompt and format are required' }, { status: 400 });
    }

    // Generate the completion
    const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Generate ${prompt} with the following requirements:
              - Include all CRUD operations using Spring Data JPA (JPA repositories), services, and controllers.
              - Provide all necessary imports for each code section.
              - Do not return the application.properties or pom.xml configurations.
              - Do not include package names like (package com.example.controller).
              - For each code section, add (package com.example.demo;) at the top.
              - Ensure each code section or class is separated clearly from the other.
              - do not import a class in another like this for example (import com.example.demo.entity.User;) because all the classes are in the same package : package com.example.demo;
              - it's for mysql
              - don't give me the dependencies and the configuration files like application.properties and use the correct imports
              - give me complete code
              - make sure that the code and all the classes are correct because I'm using it for a real business
              - separate each class and each interface
              `,
                },
        ],
        model: "llama3-8b-8192",
      });



    // Return the generated Java code
    return NextResponse.json({ code: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}
