const urlCleaner = (req, res, next) => {
    const queryParameters = Object.getOwnPropertyNames(req.query);
    let redirect = false;
    queryParameters.forEach(parameter => {
        if(req.query[parameter] == ""){
            delete req.query[parameter];
            const fullParameter = parameter + "=";
            const parameterIndex = req.originalUrl.indexOf(fullParameter);            
            req.originalUrl = req.originalUrl.replace(fullParameter, "");
            redirect = true
        }
    });
    while(req.originalUrl.includes("&&")){
        req.originalUrl = req.originalUrl.replace("&&","");
    }
    if(req.originalUrl[req.originalUrl.length - 1] === "&")    {
        req.originalUrl = req.originalUrl.slice(0, -1)
    }
    if(redirect){
        return res.redirect(req.originalUrl)
    }
    next();
}

module.exports = urlCleaner;