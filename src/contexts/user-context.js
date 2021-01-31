import {createContext} from 'react';
const UserContext = createContext({
  id: 1000,
  isAuth: false,
})
UserContext.displayName = 'UserInfoContext';
export default UserContext;