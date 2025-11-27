import { getRandomImage } from "../lib/utils"

const ProfileImage = ({ width = 25, number }) => {
  return <img src={getRandomImage(number)} alt="user" width={width} />
}

export default ProfileImage