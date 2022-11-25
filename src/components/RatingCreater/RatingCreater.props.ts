import IRating from '../../interfaces/rating.interface'
import { IUser } from './../../interfaces/user.interface'
export default interface RatingCreaterProps {
    user?: IUser
    rating?: IRating
}
