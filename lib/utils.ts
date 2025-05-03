import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function markSubstr(
    str: string,
    substr: string,
    specialSymbol: string = "\n"
) {
    const regex = new RegExp(substr, "i");
    let htmlStr = "";

    const actualSubstr = str.slice(
        str.toLowerCase().indexOf(substr.toLowerCase()),
        str.toLowerCase().indexOf(substr.toLowerCase()) + substr.length
    );
    str = str.replace(regex, specialSymbol);

    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === specialSymbol) {
            htmlStr += `<b>${actualSubstr}</b>`;

            continue;
        }

        htmlStr += str.charAt(i);
    }

    return htmlStr;
}
