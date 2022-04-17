import { Address } from 'cluster';
import Profile from '../Profile/Profile';

interface User {
  id: string;
  email: string;
  password: string;
  confirmPassword: string;
  profile: Profile;
  address: Address;
}

export default User;
