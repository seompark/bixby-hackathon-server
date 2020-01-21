const Hapi = require('@hapi/hapi')
const Boom = require('@hapi/boom')
const data = require('./testdata')

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    })

    server.route({
      method: 'GET',
      path: '/{name}',
      handler: async (request, h) => {
        const v = data[request.params.name]
        if (!v) {
          throw Boom.notFound()
        }

        return v
      }
    })

    await server.start()
    console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()
