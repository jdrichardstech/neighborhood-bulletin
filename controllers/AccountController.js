var ProfileController = require('./ProfileController')
var Promise = require('bluebird')


module.exports = {

currentUser: function(req){
	return new Promise(function(resolve, reject){
		if(req.session==null){
			resolve(null)
			return
		}

		if(req.session.user==null){
			resolve(null)
			return
		}
		ProfileController.findById(req.session.user,function(err, result){
			if(err){
				reject(err)
				return
			}
			resolve(result)
		})
	})



	// currentUser: function(req,callback){
	// 	if(req.session==null){
	// 		callback({message:"User not logged in"},null)
	// 		return
	// 	}
	//
	// 	if(req.session.user==null){
	// 		callback({message:"User not logged in"},null)
	// 		return
	// 	}
	//
	// 	ProfileController.findById(req.session.user, function(err, result){
	// 		if(err){
	// 			callback(err, null)
	// 			return
	// 		}
	// 			callback(null, result)
	// 		})
	// }
	// currentUser: function(req){
	// 	return new Promise(function(resolve, reject){
		// 	if(req.session==null){
		// 		resolve(null)
		// 		return
		// 	}
		//
		// 	if(req.session.user==null){
		// 		resolve(null)
		// 		return
		// 	}
		// })
	//
	// 	var userId=req.session.user
	// 	ProfileController.findById(userId, function(err, result){
	// 		if(err){
	// 			reject(err)
	// 			return
	// 		}
	// 		resolve(result)
	// 	})
	// }
}
}
