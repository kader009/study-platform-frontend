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
      query: (body) => ({
        url: '/api/v1/note',
        method: 'POST',
        body,
      }),
    }),

    // get note based on email
    userNote: build.query({
      query: (email) => ({
        url: `/api/v1/note/${email}`,
        method: 'GET',
      }),
    }),

    // delete note based on id
    deleteNote: build.mutation({
      query: (id) => ({
        url: `/api/v1/note/${id}`,
        method: 'DELETE',
      }),
    }),

    // update note based on id
    updateNote: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/note/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    // update user role from user/tutor to admin
    updateUser: build.mutation({
      query: ({ id, role }) => ({
        url: `/api/v1/user/${id}`,
        method: 'PATCH',
        body: { role },
      }),
    }),

    // post session route for tutor
    postSession: build.mutation({
      query: (body) =>({
        url:'/api/v1/session',
        method: 'POST',
        body
      })
    }),

    // all session data for admin role
    allSession: build.query({
      query: () => ({
        url: '/api/v1/session',
        method: 'GET',
      }),
    }),

    // delete session from the admin
    deleteSession: build.mutation({
      query: (id) => ({
        url: `/api/v1/session/${id}`,
        method: 'DELETE',
      }),
    }),

    // session approve from the admin
    approveSession: build.mutation({
      query: (id) => ({
        url: `api/v1/session/approve/${id}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useAllUserQuery,
  useAllTutorQuery,
  useCreateNoteMutation,
  useUserNoteQuery,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
  useUpdateUserMutation,
  useAllSessionQuery,
  useDeleteSessionMutation,
  useApproveSessionMutation,
  usePostSessionMutation
} = EduNestApi;
