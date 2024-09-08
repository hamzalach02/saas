import Link from "next/link"
import { Add } from "./Add"
import { MyCard } from "./MyCard"

const user = {
    "name": "John Doe",
    "email": "john@example.com",
    "profile": "data scientist",
    "avatar": "",
    "userId": "11223",
    "userBio": "Back-end developer with expertise in Node.js and database management.",
    "experience": "2 years",
    "stars":5,
    "views":12,
    "location":"Marrakech",
    "school":"M6",
    "work":"Apple"
  }
export const Left = () => {
  return (
    
    <div className='flex flex-col gap-4 fixed'>
   
  
    <MyCard
          key={user.userId}
          name={user.name}
          email={user.email}
          profile={user.profile}
          avatar={user.avatar}
          userId={user.userId}
          userBio={user.userBio}
          experience={user.experience}
          stars={user.stars}
          views={user.views}
          location={user.location}
          school= {user.school}
          work= {user.work}
        />
    <Add/>

    




   



  
</div>
  
  )
}
