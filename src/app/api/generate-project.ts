import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch'; // or import axios from 'axios';
import { PassThrough } from 'stream';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, groupId, artifactId, dependencies, bootVersion, javaVersion } = req.body;

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
        res.status(response.status).json({ error: 'Failed to generate project' });
        return;
      }

      // Stream the response to the client
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename=project.zip');

      const stream = new PassThrough();
      response.body?.pipe(stream);

      stream.pipe(res);

    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
