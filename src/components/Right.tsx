import { Complete } from "./Complete"
import { Views } from "./Views"


export const Right = () => {
  return (
    <div className="flex flex-col gap-2 fixed w-80">
      <Complete/>
      <Views/>
      
    </div>
  )
}
