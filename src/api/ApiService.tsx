import axios, { AxiosResponse } from 'axios';
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
const API_Url = 'https://voteappstaff.pythonanywhere.com'
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
interface Login {
  status: number;
  username: string;
  password: string;
}
interface NewUser {
  token: string;
}
interface NewPoll {
  poll_que:string;
  time:string;
  que1:string;
  que2:string;
  que3?:string;
  que4?:string;
  que5?:string;
  que6?:string;
  que7?:string;
}
interface PollAdmin {
  id: number;
  poll_que: string;
  que1: string | null;
  que2: string | null;
  que3: string | null;
  que4: string | null;
  que5: string | null;
  que6: string | null;
  que7: string | null;
  time: number;
  created_at: string;
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
  },
  Login: async (username: string, password: string): Promise<Login> => {
    return axios.post(`${API_Url}/user/login/`, null, {
      headers: {
        "Authorization": `Basic ${btoa(`${username}:${password}`)}`
      }
    });
  },
  CreateNewUser: async (username: string, password: string, first_name: string): Promise<NewUser> => {
    return axios.post(`${API_Url}/user/create/`,
      {
        "username": username,
        "password": password,
        "first_name": first_name
      }
      , {
        headers: {
          "Authorization": `Token ${localStorage.getItem('token')}`
        }
      });
  },
  CreateNewPoll: async (obj: object): Promise<NewPoll> => {
    return axios.post(`${API_Url}/poll/create/`,
      obj
      , {
        headers: {
          "Authorization": `Token ${localStorage.getItem('token')}`
        }
      });
  },
  GetAllPollAdmin :async (): Promise<PollAdmin> => {
    return axios.get(`${API_Url}/allpoll/get/`, {
        headers: {
          "Authorization": `Token ${localStorage.getItem('token')}`
        }
      });
  },
};

export default ApiService;