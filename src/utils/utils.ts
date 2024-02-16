export const isEven = (num: number) => (num + 1) % 2 === 0;

interface DynamoDBItem {
    [key: string]: {
        S?: string;
        N?: string;
        BOOL?: boolean;
        [key: string]: string | boolean | undefined; // Index signature to allow dynamic keys
    };
}

type NormalObject = Record<string, string | boolean | number | undefined>;

export function unmarshallDynamoDBItem(dynamoDBItem: DynamoDBItem): NormalObject {
    const normalObject: NormalObject = {};

    for (const key in dynamoDBItem) {
        if (Object.prototype.hasOwnProperty.call(dynamoDBItem, key)) {
            const attribute = dynamoDBItem[key];
            const attributeType = Object.keys(attribute)[0];
            const attributeValue = attribute[attributeType];

            switch (attributeType) {
                case 'S':
                    normalObject[key] = attributeValue;
                    break;
                case 'N':
                    normalObject[key] = Number(attributeValue);
                    break;
                case 'BOOL':
                    normalObject[key] = attributeValue === 'true'; // Adjust as needed
                    break;
                // Add other cases for different types if necessary
                default:
                    normalObject[key] = attributeValue as string | undefined;
            }
        }
    }

    return normalObject;
}

import { CSSProperties } from "react";

/**
 * Description
 * @param {Date} currentDate:Date
 * @param {Date} expDate:Date
 * @returns {boolean}
 */
export function isBefore(currentDate: Date, expDate: Date): boolean {
    return currentDate < expDate;
}

/**
 * Debounce
 * @param {any} func:(...args:unknown[]
 * @returns {any}
 */
export function debounce<T extends unknown[]>(
    func: (...args: T) => void,
    delay: number
): (...args: T) => void {
    let timer: ReturnType<typeof setTimeout> | null;

    return (...args: T) => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            func(...args);
            timer = null;
        }, delay);
    };
}

export const tryParseJson = (str: string, returnErr: any) => {
    try {
        const getObject = JSON.parse(str)
        return getObject
    } catch {
        return returnErr
    }
}

export const allowedExtensions = tryParseJson(import.meta.env.VITE_ALLOWED_EXTENSIONS, ["m4a", "mp4", "mp3", "wav", "pdf", "jpg", "jpeg", "png", "tiff", "tif", "pict", "gif"]) ?? ["m4a", "mp4", "mp3", "wav", "pdf", "jpg", "jpeg", "png", "tiff", "tif", "pict", "gif"]

export const documentExtensions = [
    // Microsoft Windows
    "docx",
    "doc",
    "txt",
    "rtf",
    "odt",

    // Linux
    "odt",
    "tex",
    "md",

    // macOS
    "docx",
    "doc",
    "rtf",
    "odt",
    "pages",

    // Microsoft Office
    "xlsx", // Excel spreadsheet
    "xls",  // Excel spreadsheet (97-2003)
    "pptx", // PowerPoint presentation
    "ppt",  // PowerPoint presentation (97-2003)
    "pub",  // Publisher document
    "accdb", // Access database,
    "csv"
];

/**
 * Delay
 * @param {any} ms:number
 * @returns {any}
 */
export function waitTimer(ms: number): any {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


export enum Typename {
    "date",
    "string",
    "number",
}

export interface SortConfig {
    key: string;
    direction: boolean; // true is asc and false is desc
    type: Typename;
}

export function sortArrayOfObjects(
    arr: Record<string, string>[],
    sortConfig: SortConfig
): Record<string, string>[] {
    const { key, direction } = sortConfig;
    // remove undefined
    const undefinedArray: Record<string, string>[] = [];
    const undefinedStrippedArray: Record<string, string>[] = [];
    arr.forEach((x) => {
        if (x[key] === undefined) undefinedArray.push(x);
        else undefinedStrippedArray.push(x);
    });

    const sortedUndefinedStrippedArray = undefinedStrippedArray.sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];

        if (sortConfig.type === Typename.string) {
            // Handle string comparisons
            if (direction) {
                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
            } else {
                if (valueA > valueB) return -1;
                if (valueA < valueB) return 1;
            }
        } else if (sortConfig.type === Typename.date) {
            // Handle date comparisons
            if (direction) {
                return new Date(valueA).getTime() - new Date(valueB).getTime();
            } else {
                return new Date(valueB).getTime() - new Date(valueA).getTime();
            }
        } else {
            // Handle number comparisons
            if (direction) {
                return Number(valueA) - Number(valueB);
            } else {
                return Number(valueB) - Number(valueA);
            }
        }

        return 0;
    });
    if (sortConfig.direction) {
        return sortedUndefinedStrippedArray.concat(undefinedArray);
    } else {
        return undefinedArray.concat(sortedUndefinedStrippedArray);
    }
}

export function dynamicSortBy(key: string, order: "asc" | "desc") {
    if (order === "desc") {
        return function (a: any, b: any) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const valueA = a[key];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const valueB = b[key];

            if (valueA === undefined && valueB === undefined) {
                return 0;
            } else if (valueA === undefined) {
                return 1;
            } else if (valueB === undefined) {
                return -1;
            }

            if (typeof valueA === "number" && typeof valueB === "number") {
                return valueB - valueA; // Reverse the order for numbers
            } else if (typeof valueA === "string" && typeof valueB === "string") {
                return valueB.localeCompare(valueA); // Reverse the order for strings
            } else if (typeof valueA === "number") {
                return 1; // Move undefined values and strings to the end
            } else {
                return -1; // Move undefined values and strings to the end
            }
        };
    }
    return function (a: any, b: any) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const valueA = a[key];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const valueB = b[key];

        if (valueA === undefined && valueB === undefined) {
            return 0;
        } else if (valueA === undefined) {
            return 1;
        } else if (valueB === undefined) {
            return -1;
        }

        if (typeof valueA === "number" && typeof valueB === "number") {
            return valueA - valueB;
        } else if (typeof valueA === "string" && typeof valueB === "string") {
            return valueA.localeCompare(valueB);
        } else if (typeof valueA === "number") {
            return -1;
        } else {
            return 1;
        }
    };
}

export function sortByKey(data: any[], key: string, order?: "asc" | "desc") {
    if (!order) return data;

    const sortedData = [...data];

    sortedData.sort(dynamicSortBy(key, order));
    // if (key === "exhibit_number") {
    //   sortedData = sortArrayOfObjects(data, {
    //     key,
    //     direction: true,
    //     type: Typename.number,
    //   });
    // }
    return sortedData;
}

export function parseJSONSafely(str: string) {
    try {
        return JSON.parse(str);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        // Return a default object, or null based on use case.
        return {};
    }
}

export const getIconColor = (
    status?: string,
    role?: any
): {
    edit: CSSProperties["color"];
    delete: CSSProperties["color"];
    history: CSSProperties["color"];
    exhibitNumber: CSSProperties["color"];
} => {
    if (role === undefined)
        return {
            edit: "#d3d3d3",
            delete: "#d3d3d3",
            history: "#d3d3d3",
            exhibitNumber: "#d3d3d3",
        };
    if (role === "attorney") {
        if (status === "pending")
            return {
                edit: "#000",
                delete: "#000",
                history: "#d3d3d3",
                exhibitNumber: "#d3d3d3",
            };
        if (status === "proposed")
            return {
                edit: "#d3d3d3",
                delete: "#d3d3d3",
                history: "#d3d3d3",
                exhibitNumber: "#d3d3d3",
            };
        if (
            status !== undefined &&
            [
                "accepted",
                "offered",
                "Admitted",
                "not received",
                "received_with_limitations",
            ].includes(status)
        )
            return {
                edit: "#d3d3d3",
                delete: "#d3d3d3",
                history: "#d3d3d3",
                exhibitNumber: "#d3d3d3",
            };
        if (status === "Request to Resubmit")
            return {
                edit: "#000",
                delete: "#000",
                history: "#d3d3d3",
                exhibitNumber: "#d3d3d3",
            };
    }
    if (role === "court reporter") {
        if (status === "pending")
            return {
                edit: "#000",
                delete: "#000",
                history: "#000",
                exhibitNumber: "#d3d3d3",
            };
        if (status === "proposed")
            return {
                edit: "#000",
                delete: "#000",
                history: "#000",
                exhibitNumber: "#d3d3d3",
            };
        if (
            status !== undefined &&
            [
                "accepted",
                "offered",
                "Admitted",
                "not received",
                "received_with_limitations",
            ].includes(status)
        )
            return {
                edit: "#d3d3d3",
                delete: "#d3d3d3",
                history: "#000",
                exhibitNumber: "#000",
            };
        if (status === "Request to Resubmit")
            return {
                edit: "#000",
                delete: "#000",
                history: "#d3d3d3",
                exhibitNumber: "#d3d3d3",
            };
    }
    return {
        edit: "#000",
        delete: "#000",
        history: "#d3d3d3",
        exhibitNumber: "#d3d3d3",
    };
};

export function truncateString(str: string, maxLength: number) {
    if (str && str?.length > maxLength) {
        return str.slice(0, maxLength) + "..."; // Cut the string and add an ellipsis
    } else {
        return str; // The string is within the desired length
    }
}

export const signOut = () => {
    localStorage.clear();
    window.location.assign('/')
}

export const toBoolean = (str = '') => (String(str).toLowerCase() === 'true')


export function capitalizeFirstLetter(string?: string) {
    if (!string || typeof string !== 'string') return string
    return string.charAt(0).toUpperCase() + string.slice(1);
}



export function once<T, R>(this: any, fn: ((...args: T[]) => R) | null, context?: any): (...args: T[]) => R | undefined {
    let result: R | undefined;
    return function (this: any, ...args: T[]): R | undefined {
        if (fn) {
            result = fn.apply(context || this, args);
            fn = null;
        }
        return result;
    };
}



/**
 * Extracts the first name, last name, and the initial of the last name from a full name.
 * @param {string} fullName - The full name to extract parts from
 * @returns {{
 *  firstName: string,
 *  lastName: string,
 * lastNameInitial: string
 * }}
 */
export function extractNameParts(fullName: string): {
    firstName: string;
    lastName: string;
    lastNameInitial: string;
} {
    // Split the full name into an array of words
    const nameParts: string[] = fullName.split(' ');

    // Extract the first name
    const firstName: string = nameParts[0];

    // Extract the last name and its initial
    let lastName = '';
    let lastNameInitial = '';

    // Check if there is a last name
    if (nameParts.length > 1) {
        lastName = nameParts[nameParts.length - 1];
        lastNameInitial = lastName.charAt(0);
    }

    return {
        firstName,
        lastName,
        lastNameInitial
    };
}
