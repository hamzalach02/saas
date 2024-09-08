import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, groupId, artifactId, dependencies, bootVersion, javaVersion } = body;

    // Construct the query parameters
    const queryParams = new URLSearchParams({
      name,
      groupId,
      artifactId,
      dependencies: dependencies.join(','),
      type: 'maven-project',
      language: 'java',
      bootVersion,
      packaging: 'jar',
      javaVersion
    });

    // Fetch the project from Spring Initializr
    const response = await fetch(`https://start.spring.io/starter.zip?${queryParams.toString()}`);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to generate project' }, { status: response.status });
    }

    // Create a ReadableStream from the response body
    const readableStream = new ReadableStream({
      start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.error(new Error('Failed to read response body'));
          return;
        }
        reader.read().then(function processText({ done, value }) {
          if (done) {
            controller.close();
            return;
          }
          controller.enqueue(value);
          reader.read().then(processText);
        });
      }
    });

    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename=project.zip'
      }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
