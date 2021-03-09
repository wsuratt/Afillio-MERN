const checkAdminAuth = () => {
    
    if (typeof window == "undefined")
        return false

    if (sessionStorage.getItem('jwt')){
        let auth = JSON.parse(sessionStorage.getItem('jwt'))
        if (auth.user._id === "6046ad1ae8391d369de34d8d")
            return true
        else
            return false
    }
    else
        return false
}
export default checkAdminAuth;