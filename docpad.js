var docpadConfig = {
	checkVersion: false,
    //regenerateEvery: 10,
	collections: {
  		pages: function(database){
  			return this.getCollection("html").findAllLive({relativeOutDirPath: 'pages'},[{name:1}])
  		}
  	} 
}

module.exports = docpadConfig