const urlCleaner = (req, res, next) => {
    const queryParameters = Object.getOwnPropertyNames(req.query);
    console.log(req.query)
    let redirect = false;
    queryParameters.forEach(parameter => {
        console.log("query" + req.query[parameter])
        if(req.query[parameter] == ""){
            //console.log("parameter: " + parameter)
            //console.log("query" + req.query[parameter])
            delete req.query[parameter];
            const fullParameter = parameter + "=";
            const parameterIndex = req.originalUrl.indexOf(fullParameter);            
            req.originalUrl = req.originalUrl.replace(fullParameter, "");
            redirect = true
        }
    });
    req.originalUrl = req.originalUrl.replace("&&","");
    console.log(req.originalUrl)
    if(redirect){
        res.redirect(req.originalUrl)
    }
    next();
}

module.exports = urlCleaner;