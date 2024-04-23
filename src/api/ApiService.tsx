import axios, { AxiosResponse } from 'axios';
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface Photos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string
}
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const ApiService = {
  getPost: async (): Promise<AxiosResponse<Post[]>> => { // Interfeysni qo'llash
    return axios.get(`${API_BASE_URL}/posts`);
  },
  getPhotos: async (): Promise<Photos[]> => {
    return axios.get(`${API_BASE_URL}/photos`);
  },
  getUsers: async (): Promise<User[]> => {
    return axios.get(`${API_BASE_URL}/users`);
  }
};

export default ApiService;