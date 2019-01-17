module.exports = (config) => {
    let Information = config.models.Information;

    function getInformation(id){
        return new Promise(resolve => {
            Information.findOne({
                where: {
                    id: id
                }
            }).then(information => {
                resolve(information);
            }).catch(err => {
                throw err;
            });
        });
    }

    function getAllInformation(){
        return new Promise(resolve => {
            Information.findAll().then(information => {
                resolve(information);
            }).catch(err => {
                throw err;
            })
        });
    }

    function updateInformation(id, query){
        return new Promise(resolve => {
            Information.update(query, {where: { id: id }}).then(response => {
                resolve(response);
            }).catch(err => {
                throw err;
            })
        });
    }

    function deleteInformation(id){
        return new Promise(resolve => {
            Information.destroy({
                where: {
                    id: id
                }
            }).then(result => {
                resolve(result);
            }).catch(err => {
                throw err;
            })
        });
    }

    function addInformation(data){
        return new Promise(resolve => {
            if(data.title && data.body){
                Information.create({
                    title: data.title,
                    body: data.body
                }).then(information => {
                    resolve(information);
                }).catch(err => {
                    throw err;
                })
            } else {
                throw Error("No data and/or body elements in data");
            }
        });
    }

    function getLatestInformation(){
        return new Promise(resolve => {
            Information.findAll({
                order: [
                    ['id', 'desc']
                ],
                limit: 4
            }).then(information => {
                resolve(information);
            }).catch(err => {
                throw err;
            })
        });
    }

    return {
        getInformation,
        getAllInformation,
        updateInformation,
        deleteInformation,
        addInformation,
        getLatestInformation
    };
}