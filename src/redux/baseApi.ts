import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'EduNestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://study-platform-backend-drxm.onrender.com',
    prepareHeaders: (headers, { getState }) => {
      
      const token = (getState() as { user: { token: string } }).user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); 
      }
      return headers;
    }
    
  }),
  endpoints: () => ({}),
});
