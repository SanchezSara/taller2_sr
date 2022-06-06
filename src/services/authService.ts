import axios from 'axios';

class AuthService {
  handleAuthentication = () => {
    const accessToken = this.getAccessToken();
    if (!accessToken || !this.isValidToken(accessToken)) return;
    this.setSession('accessToken', accessToken);
  };

  loginWithAuth0 = async (username: string, roleUser: string) => {
    const accessToken = '1929312831903129321';
    this.setSession('accessToken', accessToken);
    const userStringify = JSON.stringify({ username, roleUser });
    this.setSession('user', userStringify);
    return {
      user: username,
      role: roleUser,
    };
  };

  loginWithUsername = async (username: string, roleUser: string): Promise<any> => {
    try {
    //  const response = await axios.get(`https://sr-taller-1-backend.herokuapp.com/v2/users/user_${username}`);
      const accessToken = '1929312831903129321';
      this.setSession('accessToken', accessToken);
      const userStringify = JSON.stringify({ username: '1', roleUser: 'ADMIN' });
      this.setSession('user', userStringify);
      return { user: '1', role: 'ADMIN' };
    } catch (error) {
      this.setSession('error', 'Nombre de usuario inválido');
      return { error: 'Nombre de usuario inválido' };
    }
  };

  loginWithToken = async () => {
    return {
      user: '',
    };
  };

  setSession = (key: string, accessToken: string) => {
    localStorage.setItem(key, accessToken);
  };

  logOut = () => {
    localStorage.clear();
  };

  getUser = () => {
    const user = localStorage.getItem('user') || '';
    return user;
  };

  getAccessToken = () => localStorage.getItem('accessToken');

  isAuthenticated = () => !!this.getAccessToken();

  isValidToken = (accessToken: string | null) => {
    const expireTime = 1606275140.897;
    if (!accessToken) return false;

    const currentTime = Date.now() / 1000;

    return expireTime < currentTime;
  };
}

const authService = new AuthService();

export default authService;
