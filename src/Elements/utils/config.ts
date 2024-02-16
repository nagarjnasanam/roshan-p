import { toBoolean } from "./utils";

export const config = {
    base_route:  import.meta.env.VITE_base_route ?? 'api',
    APP_ENV_PROD:  toBoolean(import.meta.env.VITE_APP_ENV_PROD) ?? false,
    STAGING: toBoolean(import.meta.env.VITE_STAGING) ?? false,
    PROD_URL() {
        if(this.STAGING) {
            return import.meta.env.VITE_PROD_URL_STAGING ?? 'https://nebpvrbus3.execute-api.us-east-2.amazonaws.com/prod/'
        }
        return this.APP_ENV_PROD ? import.meta.env.VITE_PROD_URL_PROD ?? "https://5f5spz1c03.execute-api.us-east-2.amazonaws.com/prod/" : import.meta.env.VITE_PROD_URL_DEV ?? 'https://vyhpaqnle7.execute-api.us-east-2.amazonaws.com/prod/';
    },
    BUCKET_NAME() {
        if(this.STAGING){
           return import.meta.env.VITE_BUCKET_NAME_STAGING ?? 'nebraska-cdk-stack-nbstagedeploy0056bde6-2osgyv5u636k'
        }

        if(this.APP_ENV_PROD) {
            return import.meta.env.VITE_BUCKET_NAME_PROD ?? "nebraska-cdk-stack-nbproddeploy670de350-1prp210hdxjm1"
        }

        return import.meta.env.VITE_BUCKET_NAME_DEV ?? "test-nb-lifecyclepolicy-bucket"
    },
    WEBSOCKET_URL: 'wss://22w9j7469f.execute-api.us-east-2.amazonaws.com/prod'
};
