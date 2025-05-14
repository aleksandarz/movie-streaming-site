import { ApiParamsInterface } from "../intefaces/api-params-interface";
import { ApiResponseInterface } from "../intefaces/api-response-interface";
import axios from "axios";

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

function buildURL(params: ApiParamsInterface[]): string
{
    const url = API_URL + "apikey=" + API_KEY;
    let searchParams = "";

    params.forEach((param) => {
        searchParams += `&${param.key}=${param.value}`;
    });

    return url + searchParams;
}

export async function callOMDBApi(params: ApiParamsInterface[]): Promise<ApiResponseInterface>
{
    const url = buildURL(params);
    return await axios.get(url);
}


