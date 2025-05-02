export const sendToken = (user, statusCode , message) => {
    const token = user.getJWTToken()
    const options ={
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24 * 60 * 60 * 1000
        )
    }
}