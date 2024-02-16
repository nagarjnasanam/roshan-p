export const barNumberUIFormat = (barNumber: string): string => {
    const number = barNumber.trim().replace(/[^0-9]/g, "");
    if (number.length === 0) return number;
    let newNumber = '('

    for (let i = 0; i < number.length; i++) {
        if (i === 3) {
            newNumber += ') '
        }
        if (i === 6) {
            newNumber += '-'
        }
        newNumber += number[i];

    }
    return newNumber
};

export const barNumberAPIFormat = (barNumber: string): string => {
    return barNumber.replaceAll(/[^0-9]/g, '')
};

export const getLatestComment = (comment?: string): string => {
    if (comment) return  comment.split("::").pop() as string
    return comment ?? ''
};

export const addComment = (comment?: string, newComment?: string): string => {
    return `${comment || ""}::${newComment || ""}`
};