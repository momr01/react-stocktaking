const routes = {
    home: '/',
    login: '/login',
    new: (type, id) => (type ? `/add/${type}/${id}` : `/add/:type/:id`),
    list: '/all',
    services: (id) => (id ? `/services/${id}` : `/services/:id`),
    edit: (id) => (id ? `/edit/${id}` : '/edit/:id')
}

export default routes;