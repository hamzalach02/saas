import React from 'react'
import { DeveloperCard } from './DeveloperCard'

const data = [
    {
      "name": "Hamza Lachgar",
      "email": "hamza@example.com",
      "profile": "backend developer",
      "avatar": "",
      "userId": "12345",
      "userBio": "A passionate full-stack developer with experience in Java, Spring Boot, and React.",
      "experience": "4 years",
      "stars":5,
      "views":122,
      "location":"Marrakech",
      "school":"M6",
      "work":"Apple"
    },
    {
      "name": "Sarah Ahmed",
      "email": "sarah@example.com",
      "profile": "developer",
      "avatar": "",
      "userId": "67890",
      "userBio": "Front-end developer with a strong focus on responsive design and user experience.",
      "experience": "4 mounths",
      "stars":5,
      "views":122,
      "location":"Marrakech",
      "school":"M6",
       "work":"Apple"
    },
    {
      "name": "John Doe",
      "email": "john@example.com",
      "profile": "data scientist",
      "avatar": "",
      "userId": "11223",
      "userBio": "Back-end developer with expertise in Node.js and database management.",
      "experience": "2 years",
      "stars":5,
      "views":122,
      "location":"Marrakech",
      "school":"M6",
       "work":"Apple"
    },

  



  ]
  

export const MiddleSide = () => {
  return (
  <div className="grid grid-cols-1  2xl:grid-cols-2 gap-4">
     {data.map((developer) => (
        <DeveloperCard
          key={developer.userId}
          name={developer.name}
          email={developer.email}
          profile={developer.profile}
          avatar={developer.avatar}
          userId={developer.userId}
          userBio={developer.userBio}
          experience={developer.experience}
          stars={developer.stars}
          views={developer.views}
          location={developer.location}
          school= {developer.school}
          work={developer.work}
        />
      ))}
  </div>
  )
}
