module.exports = (config) => {
    let cloudinary = config.cloudinary;
    let Image = config.models.Image;

    function CloudinaryUpload(req) {
        // get all the image keys
        var imageKeys = Object.keys(req.files);
        var files = req.files;
        var propertyId = req.body.propertyId;
        var promises = [];

        // check if the correct request was made
        if(imageKeys.length === 0){
            return res.json({message: "No files uplaoded"});
        }

        // loop through each image
        imageKeys.forEach(key => {
            // check if the image is of valid sizze
            if(files[key].size > 0) {
                // push a new promise to the promise array
                promises.push(new Promise((resolve, reject) => {
                    // define uploading 
                    cloudinary.uploader.upload(files[key].path, (result) => {
                        if(result.url){
                            Image.create({
                                url: result.url,
                                propertyId: propertyId
                            }).then((result) => {
                                // resolve the promise if success
                                resolve(result.get());
                            }).catch((err) => {
                                // reject the promise if error
                                reject(err);
                            });
                        } else {
                            // reject the promise if result does not respond with url
                            reject(err);
                        }
                    })
                }));
            }
        }); // end foreach

        // execute the promises created
        return new Promise(resolve => {
            Promise.all(promises).then((obj) => {
                resolve(obj);
            }).catch((err) => {
                throw err;
            });
        });
        
    }
    
    return {CloudinaryUpload};
}