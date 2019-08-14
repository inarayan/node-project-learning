module.exports.home = function(req, res){
    
    //res.send('Welcome to Home Controller via router');
    return res.render('home', {
        "title":"Page"
    })
}