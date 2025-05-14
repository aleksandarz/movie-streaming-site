export interface OMDbMovie
{
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface OMDbResponse
{
    Search?: OMDbMovie[];
    totalResults?: string;
    Response: string;
    Error?: string;
}

export interface ApiResponseInterface
{
    config: any;
    data: OMDbResponse;
    headers: any;
    request: any;
    status: number;
    statusText: string;
}
