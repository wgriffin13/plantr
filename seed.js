const {db, Gardener, Plot, Vegetable } = require('./models')
const PlotVegetable = db.model('plot_vegetable')

db.sync({force: true})
    .then(() => {
        console.log('Database synced!')
        // db.close() // only if using a version of node without `finally`
        //const createVeg = Promise.all([
            Vegetable.create({ name: 'carrot', color: 'orange', planted_on: new Date(Date.UTC(2018, 12, 2)) })
                .then((veg) => {
                    return Gardener.create( {name: 'John', age: '53', favoriteVegetableId: veg.id} )
                })
                .then( (gard) => {
                    return Plot.create( {size: 400, shaded: true, gardenerId: gard.id} )
                })

            Vegetable.create({ name: 'onion', color: 'white', planted_on: new Date(Date.UTC(2018, 12, 5)) })
            Vegetable.create({ name: 'kale', color: 'green', planted_on: new Date(Date.UTC(2018, 12, 6)) })

                .then((veg) => {
                    return Promise.all( [ Gardener.create( {name: 'Sam', age: '23', favoriteVegetableId: veg.id} ),
                        Gardener.create( {name: 'George', age: '41', favoriteVegetableId: veg.id} ) ])
                })

                .then((gard) => {
                    const [g1, g2] = gard;
                    Plot.create({size: 1000, shaded: false, gardenerId: g1.id})
                    Plot.create({size: 1200, shaded: false, gardenerId: g2.id})
                })
            //return carrot.addPlot(plot1)
        //]);
    })
    .catch(err => {
        console.log('Disaster! Something went wrong! ')
        console.log(err)
        // db.close() // only if using a version of node without `finally`
    });
