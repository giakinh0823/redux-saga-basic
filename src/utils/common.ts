

export const capabilitiesString = (str: string) => {
    if(!str) return "";
    return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
}

export const getMarkColor = (mark: number): string => {
    if(mark >=8) return "green";
    if(mark >= 4) return "goldenrod";
    return "red";
}