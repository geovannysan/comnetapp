import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.t-ickets.com/mikroti' }),
    endpoints: (builder) => ({

        getClientes: builder.query({
            query: (body) => ({
                url: '/ListarClientes',
                method: 'GET',
                body,
            }),
        }),
    }),
});

export const { useGetCliente } = api
export default api