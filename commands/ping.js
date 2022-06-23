
module.exports = {
    category: 'Testing',
    description: 'Returns a Pong GIF.',

    slash: true,
    testOnly: false, // False=Global which takes one hour to populate.
    

    callback: ({}) => {
        return 'https://media.giphy.com/media/l41lIvPtFdU3cLQjK/giphy.gif'
    }
}
