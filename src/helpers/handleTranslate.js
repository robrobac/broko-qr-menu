export const handleTranslate = (trans, lang) => {

    if (lang?.language === "hr") {
        return false
    } else if (lang?.language === "en") {
        if (trans) {
            return true
        } else {
            return false
        }
    }
}