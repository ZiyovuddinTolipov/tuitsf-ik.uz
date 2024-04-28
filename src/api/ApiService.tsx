/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_Url = 'https://voteappstaff.pythonanywhere.com'
interface Login {
  data: any;
  status: number;
  username: string;
  password: string;
}
interface NewUser {
  token: string;
}
interface NewPoll {
  poll_que: string;
  time: string;
  que1: string;
  que2: string;
  que3?: string;
  que4?: string;
  que5?: string;
  que6?: string;
  que7?: string;
}
interface PollAdmin {
  [x: string]: any;
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
interface Poll {
  id: number;
  poll_que: string;
  que1: string;
  que2: string;
  que3: string | null;
  que4: string | null;
  que5: string | null;
  que6: string | null;
  que7: string | null;
  time: number;
  created_at: string;
  statistic: {
    que1: number;
    que2: number;
    que3: number | null;
    que4: number | null;
    que5: number | null;
    que6: number | null;
    que7: number | null;
  };
}
interface Document {
  description: string;
  id: number;
  file: string;
}

// Define the ApiResponse interface representing the structure of the API response
interface GetAllPollAdminResponseInterface {
  data: Poll[];
  status: number;
  statusText: string;
  headers: {
    "content-type": string;
  };
  config: {
    // Define the configuration properties if needed
  };
}
interface UserData {
  id: number;
  username: string;
  firstname: string;
}

interface AllUserInterfaces {
  data: UserData[];
  status: number;
  statusText: string;
  headers: {
    [key: string]: string;
  };
  config: {
    transitional: {
      silentJSONParsing: boolean;
      forcedJSONParsing: boolean;
      clarifyTimeoutError: boolean;
    };
    adapter: string[];
    transformRequest: null[];
    transformResponse: null[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: object;
    headers: {
      Accept: string;
      Authorization: string;
    };
    method: string;
    url: string;
  };
  request: object;
}
interface addFileInterface {
  status: boolean;
}
const ApiService = {
  Login: async (username: string, password: string): Promise<Login> => {
    console.log(username + ' ' + password);
    const response = await axios.post(`${API_Url}/user/login/`, {}, {
      headers: {
        "Authorization": `Basic ${btoa(`${username}:${password}`)}`
      }
    });

    // Type assertion (cautious approach)
    return response.data as Login; // Cast the response data to Login
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
  GetAllPollAdmin: async (): Promise<PollAdmin> => {
    return axios.get(`${API_Url}/allpoll/get/`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem('token')}`
      }
    });
  },
  GetElectionResults: async (id: string): Promise<GetAllPollAdminResponseInterface> => {
    return axios.post(`${API_Url}/poll/statistic/`, { "id": id }, {
      headers: {
        "Authorization": `Token ${localStorage.getItem('token')}`
      }
    });
  },
  GetAllUsers: async (): Promise<AllUserInterfaces> => {
    return axios.get(`${API_Url}/get/all/users/`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem('token')}`
      }
    });
  },
  DeleteUser: async (id: number): Promise<any> => {
    try {
      const response = await axios.delete(`${API_Url}/user/delete/`, {
        data: { "user_id": id }, // Pass id in the data object
        headers: {
          "Authorization": `Token ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  },
  AddFile: async (file: File, description: string): Promise<addFileInterface> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', description);

      const response = await axios.post(`${API_Url}/add/file/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Token ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to add file");
    }
  },
  GetAllFiles: async (): Promise<Document[]> => {
    try {
      const response = await axios.get(`${API_Url}/allfiles/`, {
        headers: {
          "Authorization": `Token ${localStorage.getItem('token')}`
        }
      });
      return response.data as Document[];
    } catch (error) {
      throw new Error("Failed to fetch files");
    }
  }
};

export default ApiService;