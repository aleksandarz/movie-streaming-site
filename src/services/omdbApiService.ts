import { APIParamsInterface } from "../intefaces/APIParamsInterface";
import { APIResponseInterface } from "../intefaces/APIResponseInterface";
import axios from "axios";
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

function buildURL(params: APIParamsInterface[]): string
{
    const url = API_URL + "apikey=" + API_KEY;
    let searchParams = "";

    params.forEach((param) => {
        searchParams += `&${param.key}=${param.value}`;
    });

    return url + searchParams;
}

export async function callOMDBApi(params: APIParamsInterface[]): Promise<APIResponseInterface>
{
    const url = buildURL(params);
    return await axios.get(url);
}


