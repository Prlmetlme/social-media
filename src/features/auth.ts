import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean,
  username: string,
  loading: boolean,
  registered: boolean,
  account: User | null,
}

export interface RootState {
  user: AuthState
  resetRegistered: Function
}

export interface User {
  banner_image: string | null;
  bio: string;
  birthday: string | null;
  date_joined: string;
  email: string;
  first_name: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_active: string;
  last_name: string;
  occupation: string;
  phone: string;
  profile_picture: string | null;
  static_user_id: string;
  username: string;
  password: ''
}

export interface Post {
  title: string,
  post_ID: string,
  author: string,
  tldr: string,
  content: string,
  picture: string | null,
  created: string,
  last_edited: string,
  edited: boolean,
  likes: number,
  liked_by: string[],
  disliked_by: string[],
  type: 'post'
}

export interface PaginatedRespone<type> {
  count: number,
  next: string,
  previous: string,
  results: [type]
}

let swe = {} as PaginatedRespone<Post>

const initialState = { 
  isAuthenticated: false,
  username: '',
  loading: true,
  registered: false,
  account: {},
} as AuthState


const getUser = createAsyncThunk( 'auth/info', 
  async (_, thunkAPI) => {
    try {
      const res = await fetch('/api/auth/info', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await res.json();

      if (res.status === 200) {
        return data;
      }
      else {
        return thunkAPI.rejectWithValue(data);
      }
    }
    catch(err:any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)


export const login = createAsyncThunk( 'auth/login',
  async ({ username, password }:any, thunkAPI) => {
    const body = JSON.stringify({ 
      username, 
      password,
    });

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    })

    const data = await res.json();

  
    if (res.status === 200) {
      const { dispatch } = thunkAPI;
    
      dispatch(getUser());
    
      return data;
    }
  
    else {
      return thunkAPI.rejectWithValue(data);
    }
  }
  
  catch(err:any) {
    return thunkAPI.rejectWithValue(err)
  }
});

export const logout = createAsyncThunk( 'auth/logout', 
  async (_, thunkAPI) => {
    try {
      const res = await fetch('/api/logout', {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      })
      const data = await res.json()

      if (res.status === 200) {
        return data
      }
      else return thunkAPI.rejectWithValue(data)
    }
    catch(err:any) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)


export const refresh = createAsyncThunk( 'auth/refresh', 
  async (refresh, thunkAPI) => {
    const body:any = JSON.stringify({ refresh });
    try {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });

      const data = await res.json()

      if (res.status === 200) {

        const { dispatch } = thunkAPI;

        dispatch(checkVerification()) 
        return data;
      }
      else {
        return thunkAPI.rejectWithValue(data);
      }
    }
    catch(err:any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)


export const register = createAsyncThunk( 'auth/register',
  async (arg:any, thunkAPI) => {

    const body = JSON.stringify(arg);

    try {
      const res = await fetch('/api/auth/register',  {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });
      const data = await res.json()

      if (res.status === 201) {
        return data;
      }
        else {
          return thunkAPI.rejectWithValue(data);
        }
      }
    catch(err:any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }

  })


export const checkVerification = createAsyncThunk( 'auth/verify', 
  async (_, thunkAPI) => {
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      const data = await res.json();

      if (res.status === 200) {
        const { dispatch } = thunkAPI;

        dispatch(getUser());

        return data;
      }

      else if (res.status === 401) {
        const { dispatch } = thunkAPI;

        dispatch(refresh())
      }
      else {
        return thunkAPI.rejectWithValue(data);
      }
    }
    catch(err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
 )




export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRegistered: state => {
      state.registered = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
          state.loading = true;
      })
      .addCase(register.fulfilled, state => {
        state.loading = false;
        state.registered = true;
      })
      .addCase(register.rejected, state => {
        state.loading = false;
      })


      .addCase(login.pending, state => {
        state.loading = true;
      })
      .addCase(login.fulfilled, state => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, state => {
        state.loading = false;
      })


      .addCase(getUser.pending, state => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.account = action.payload;
      })
      .addCase(getUser.rejected, state => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      
      
      .addCase(checkVerification.pending, state => {
        state.loading = true;
      })
      .addCase(checkVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(checkVerification.rejected, state => {
        state.loading = false;
        state.isAuthenticated = false;
      })


      .addCase(refresh.pending, state => {
        state.loading = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(refresh.rejected, state => {
        state.loading = false;
        state.isAuthenticated = false;
      })


      .addCase(logout.pending, state => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.username = ''
        state.account = null
      })
      .addCase(logout.rejected, state => {
        state.loading = false;
      })
  }
})


export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;