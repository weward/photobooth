const save = (payload) => {
    return new Promise((resolve, reject) => {
        console.log("successfully saved")

        resolve()
    })
}

const crud = {
    save
}


export default crud