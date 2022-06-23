
module.exports = {
    category: 'Testing',
    description: 'Returns a Pong GIF.',

    slash: true,
    testOnly: true,
    

    callback: ({}) => {
        return 'https://media.giphy.com/media/l41lIvPtFdU3cLQjK/giphy.gif'
    }
}