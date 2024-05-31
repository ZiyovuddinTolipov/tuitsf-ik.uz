/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_Url = 'https://ebozorapi.pythonanywhere.com/'
interface Login {
  token: string;
  staff: string;
  status: boolean;
  username: string;
  password: string;
}
interface NewUser {
  token: string;
}
interface NewPoll {
  status: number;
  statusText: string;
  data: {
    status: number;
  }
}
interface PollAdmin {
  [x: string]: any;
  id: number;
  poll_que: string;
  que1: string;
  que2: string | null;
  que3: string;
  que4: string | null;
  que5: string | null;
  que6: string | null;
  que7: string | null;
  time: number;
  created_at: string;
}

interface Document {
  description: string;
  id: number;
  file: string;
}

// Define the ApiResponse interface representing the structure of the API response
interface GetAllPollAdminResponseInterface {
  data: {
    poll: {
      id: number;
      poll_que: string;
      created_at: string;
      que1: string;
      que2: string | null;
      que3: string | null;
      que4: string | null;
      que5: string | null;
      que6: string | null;
      que7: string | null;
      time: number;
    };
    all_users: number;
    voted_users: number;
    neutral: number;
    num: number;
    yes1: number;
    yes2: number;
    no?: number;
    yes?: number;
  }
}
interface GetAllPollUserResponseInterface {
  data: {
    id: number;
    poll_que: string;
    created_at: string;
    que1: string | null;
    que2: string | null;
    que3: string | null;
    que4: string | null;
    que5: string | null;
    que6: string | null;
    que7: string | null;
    time: number;
  }
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
  GetAllPollUser: async (): Promise<PollAdmin> => {
    return axios.get(`${API_Url}/polls/`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem('token')}`
      }
    });
  },
  GetElectionResults: async (id: number): Promise<GetAllPollAdminResponseInterface> => {
    return axios.post(`${API_Url}/poll/statistic/`, { "id": id }, {
      headers: {
        "Authorization": `Token ${localStorage.getItem('token')}`
      }
    });
  },
  GetElectionUser: async (id: number): Promise<GetAllPollUserResponseInterface> => {

    return axios.post(`${API_Url}/get/poll/${id}`, { "id": "asdasd" }, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
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
  },
  VotePoll: async (id: number, ans: string) => {
    try {
      console.log(id, ans);
      const response = await axios.put(`${API_Url}/vote/poll/`, {
        "id": id,
        "answer": ans
      }, {
        headers: {
          "Authorization": `Token ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error("Error: " + error);
    }
  }

};

export default ApiService;