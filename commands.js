#!/usr/bin/env node

const program = require('commander');

const {
    addCircle,
    deleteCircle,
    addSquare,
    deleteSquare,
    addRectangle,
    deleteRectangle,
    addTriangle,
    deleteTriangle,
    addDonut,
    deleteDonut,
    findShape
} = require('./index');


program
    .version('1.0.0')

    program
    .command('circle <x> <y> <radius>')
    .alias('c')
    .description('Add new Circle')
    .action((x, y, radius) => {
        addCircle({x, y, radius});
    });

    program
    .command('circle-remove')
    .alias('c-r')
    .description('Remove Circle')
    .action(_id => deleteCircle(_id));

    program
    .command('square <x> <y> <length>')
    .alias('s')
    .description('Add new Square')
    .action((x, y, length) => {
        addSquare({x, y, length});
    });

    program
    .command('square-remove')
    .alias('s-r')
    .description('Remove Square')
    .action(_id => deleteSquare(_id));
    
    program
    .command('rectangle <x> <y> <side1> <side2>')
    .alias('r')
    .description('Add new Rectangle')
    .action((x, y, side1, side2) => {
        addRectangle({x, y, side1, side2});
    });

    program
    .command('rectangle-remove')
    .alias('r-r')
    .description('Remove Rectangle')
    .action(_id => deleteRectangle(_id));
    
    program
    .command('triangle <x1> <y1> <x2> <y2> <x3> <y3>')
    .alias('t')
    .description('Add new Triangle')
    .action((x1, y1, x2, y2, x3, y3) => {
        addTriangle({x1, y1, x2, y2, x3, y3});
    });

    program
    .command('triangle-remove')
    .alias('t-r')
    .description('Remove Triangle')
    .action(_id => deleteTriangle(_id));
    
    program
    .command('donut <x> <y> <radius1> <radius2>')
    .alias('d')
    .description('Add new Donut')
    .action((x, y, radius1, radius2) => {
        addDonut({x, y, radius1, radius2});
    }); 
    
    program
    .command('donut-remove')
    .alias('d-r')
    .description('Remove Donut')
    .action(_id => deleteDonut(_id));

    program
    .command('find <x> <y>')
    .alias('f')
    .description('Find a shape for given point')
    .action((x, y) => {
        findShape({x, y});
    });

    
program.parse(process.argv);