import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'EduNestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
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
