const express = require('express')
const cors = require('cors');
const morgan = require('morgan');

const upload = require('../back/utils/multerConfig');

const menuRouter = require('./routes/menu/menu.routes')
const tagsRouter = require('./routes/tags/tags.routes')
const categoryRouter = require('./routes/category/category.routes')
const countryRouter = require('./routes/country/country.routes')
const designRouter = require('./routes/design/design.routes')
const brandRouter = require('./routes/brand/brand.routes')
const catalogRouter = require('./routes/catalog/catalog.router')
const stockRouter = require('./routes/stock/stock.routes')
const facilitiesRouter = require('./routes/facilities/facilities.routes')
const clientRouter = require('./routes/client/client.routes')
const orderRouter = require('./routes/order/order.routes')

const PORT = process.env.PORT || 8080
const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(upload.single('menu_image'));

app.use(morgan('dev'));
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use('/api', menuRouter, tagsRouter, designRouter, stockRouter, clientRouter,
    categoryRouter, countryRouter, brandRouter, catalogRouter, facilitiesRouter, orderRouter)

app.listen(PORT, () => console.log(`SERVER STARTED on ${PORT}`))

module.exports = app;