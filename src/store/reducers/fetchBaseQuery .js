import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.t-ickets.com/mikroti' }),
    endpoints: (builder) => ({
        
        getFactura: builder.query({
            query: (body) => ({
                url: '/listarfactura',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useEndpointsQuery }=api
export default api