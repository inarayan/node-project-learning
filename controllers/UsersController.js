module.exports.user = function(req, res){
    //A controller will tell the page name to which information needs to be rendered
    //using res.render(viewName, anyObject)
    res.render('usersProfile', {title:"A profile Page"});
}