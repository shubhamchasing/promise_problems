const Books = require('./PromiseProblem');

const signIn = (userName) => {
    return new Promise((resolve, reject) => {

        const current = new Date().getSeconds()
        console.log(current)
        if (current > 3) {

            resolve(current)
        }
        else {

            reject({reason: "Service failure/", responseCode: 401})
        }
    })
}

const getBooks = () => {

    return new Promise((resolve, reject) => {

        let randomInt = Math.floor(Math.random() * 2)

        if (randomInt === 1) {
            let booksList = Books.reduce((result, curr) => {
                result.push(curr['name'])
                return result
            }, [])

            resolve(booksList)
        }
        else {
            reject({reason: "Service failure/", responseCode: 500})
        }
    })
}

let log = {}

const logData = (userName, data) => {

    return new Promise((resolve) => {

        setTimeout(() => {

            if (!log[userName]) {
                log[userName] = []
            }

            log[userName].push(data)
            resolve(data)

        }, 1000)
    })
}

const execute = (userName) => {

    return signIn(userName).then(() => {
        return logData(userName, 'Sign In - Success')
    }).then(() => {
        return getBooks()
    }).then(() => {
        return logData(userName, 'GetBooks - Success')
    }).catch((err) =>{
        let temp;
        if(err['responseCode'] === 401){

            temp = 'Sign In - '
        }
        else{
            temp = 'GetBooks - '
        }
        return logData(userName, temp + 'Failure')
    }).then(() =>{ console.log(log)})

}
/* 
execute('Mary')
.then(() => {
    execute('Emily');
    
})
 */
const output = async () => {
    await execute('Mary')
    await execute('Emily')
}

output()