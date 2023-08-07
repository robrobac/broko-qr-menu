export const removeDuplicates = (array) => {
    const seen = new Set();

    const uniqueIds = array.filter(item => {
        const duplicate = seen.has(item.id)
        seen.add(item.id)
        return !duplicate
    })

    return uniqueIds
};