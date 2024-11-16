export function parseAssignments(query:string){
    const params = new URLSearchParams(query);
    const result:{[date: string]: string[]} = {};
    
    for (const [key, value] of params.entries()) {
        result[key] = value.split(',');
    }
    return result;
}