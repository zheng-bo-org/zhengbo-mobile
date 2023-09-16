/**
 * A theme is an abstraction for colors from user perspective
 * There are only four color types exists, The difference between those four types is the percent used to a screen.
 * The presents are 40% 30% 20% 10%.
 * 40%: should not be noticed by user at all, It should make user fell something, like fells "night" or "day" or "warm"
 * 30%: should be noticed by user a little bit from 40%, it's hard to describe when to use it, but you'll know that if you're an artist.
 * 20%: Users should notice 20% a little bit from 30%,
 * 10%: should absolutely be noticed by users.
 *
 * You can find more themes on this website: https://colorhunt.co/
 */
export type Theme = {
    "40%": string,
    "30%": string,
    "20%": string,
    "10%": string
}

export type Themes = "White" | "Pink";
export type ThemeDef = {
   theme: Theme
   code: Themes,
   name: string,
   desc: string
}

export const pinkThemeDef:ThemeDef = {
    desc: "Pink theme",
    code: "Pink",
    name: "Pink",
    theme: {
        "40%": "rgb(244, 249, 249)",
        "30%": "rgb(241, 209, 208)",
        "20%": "rgb(251, 172, 204)",
        "10%": "rgb(248, 117, 170)"
    }
}

export const whiteThemeDef: ThemeDef = {
    desc: "White theme",
    code: "White",
    name: "White",
    theme: {
        "40%": "rgb(255, 255, 255)",
        "30%": "rgb(249, 246, 247)",
        "20%": "rgb(255, 232, 214)",
        "10%": "rgb(255, 151, 29)"
    }
}

export function loadThemeDefs(): ThemeDef[] {
    return [pinkThemeDef, whiteThemeDef]
}