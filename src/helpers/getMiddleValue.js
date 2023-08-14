//  Calculating a middle timestamp value in order to put moving item inbetween two compared timestamps.
export const getMiddleValue = (num1, num2) => {
    const sum = num1 + num2
    const number = sum / 2
    return number
}