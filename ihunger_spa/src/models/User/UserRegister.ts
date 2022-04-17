import AddressRegister from '../Address/AddressRegister';
import ProfileRegister from '../Profile/ProfileRegister';

interface UserRegister {
  email: string;
  password: string;
  confirmPassword: string;
  profile: ProfileRegister;
  address: AddressRegister;
}

export default UserRegister;
