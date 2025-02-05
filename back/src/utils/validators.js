export const isGoodPassword = (value) => {
    // Entre 6 y 12 caracteres, mínimmo un dígito numérico, una letra minúscula y una mayúscula.
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/
    return regex.test(value)  
}