export const normalizeString = (string) => {
    return string.toLowerCase().replace(/[čćšđž]/g, (match) => {
        switch (match) {
            case "č": return "c";
            case "ć": return "c";
            case "š": return "s";
            case "đ": return "d";
            case "ž": return "z";
            default: return match;
        }
    })
}