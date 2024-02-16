import { AxiosResponse } from 'axios';


class ApplicationError extends Error {
    constructor(message: string | undefined) {
        super(message);

        this.name = this.constructor.name;
    }
}

class APIError extends ApplicationError {
    // message: string;
    reason?: string;
    status: number;

    constructor(message: string, code = 400, reason?: string) {
        super(message);

        this.name = this.constructor.name;

        // captureStackTrace(this);

        this.reason = reason;

        this.status = code;
    }

    statusCode(): number {
        return this.status;
    }
}

class NetworkError extends ApplicationError {
    message = 'Network Error';
    status = 500;
    response: Pick<AxiosResponse, 'status' | 'statusText' | 'request' | 'data'>;
    constructor(error: string | undefined) {
        super(error);
        this.name = this.constructor.name;

        // captureStackTrace(this);
        this.status = 500;
        this.response = {
            data: {
                success: false,
                message: 'Network Error'
            },
            status: 500,
            statusText: 'failed',
            request: null
        };
    }

    statusCode(): number {
        return this.status;
    }
}


const ErrorFilterMessages = {
    court_type: 'Court Type is Not Selected',
    case_number: "Case Number is Not Selected" ,
    case_category: "Case Category is Not Selected",
    county_name: "County Name is Not Selected",
    case_year: "Case Yesr is Not Selected",
  };

export { ApplicationError, APIError, NetworkError, ErrorFilterMessages };
