import { baseApi } from './baseApi'; 

const EduNestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (userInfo) => ({
        url: '/api/v1/user',
        method: 'POST',
        body: userInfo,
      }),
    }),

    // login route here
    login: build.mutation({
      query: (userInfo) => ({
        url: '/api/v1/login',
        method: 'POST',
        body: userInfo,
      }),
    }),

    // all user get route
    allUser: build.query({
      query: () => ({
        url: '/api/v1/user',
        method: 'GET',
      }),
    }),

    // tutor get route
    allTutor: build.query({
      query: () => ({
        url: '/api/v1/tutor',
        method: 'GET',
      }),
    }),

    // create note for student
    createNote: build.mutation({
      query: () =>({
        url: '/api/v1/note',
        method:"POST"
      })
    })
  }),
});

export const { useSignUpMutation, useLoginMutation, useAllUserQuery, useAllTutorQuery, useCreateNoteMutation } =
  EduNestApi;
