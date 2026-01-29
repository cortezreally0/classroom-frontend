import {createDataProvider, CreateDataProviderOptions} from "@refinedev/rest";
import {BACKEND_BASE_URL} from "@/constants";
import {ListResponse} from "@/types";

const options: CreateDataProviderOptions = {
    getList: {
        getEndpoint: ({ resource }) => resource,

        // Search Params
        buildQueryParams: async ({ resource, pagination, filters }) => {
            const page = pagination?.currentPage ?? 1;
            const pageSize = pagination?.pageSize ?? 10;

            const params: Record<string, string | number> = {page, limit: pageSize};

            filters?.forEach((filter) => {
                const field = 'field' in filter ? filter.field : '';

                const value = String(filter.value);

                if(resource === 'subjects') {
                    if (field === 'department') params.departments = value;
                    if (field === 'name' || field === 'code') params.search = value;
                }
            })

            return params;
        },

        // Get Data in DB
        mapResponse: async (response) => {
            const payload: ListResponse = await response.clone().json();

            return payload.data ?? [];
        },

        // Get totalData in DB/ pagination
        getTotalCount: async (response) => {
            const payload: ListResponse = await response.clone().json();

            return payload.pagination?.total ?? payload.data?.length ?? 0;
        }
    }
}

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export { dataProvider };