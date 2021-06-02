const mongoose = require('mongoose');
require('dotenv').config();

//Map global promise
mongoose.Promise = global.Promise;

//Connect to db
const db = mongoose.connect('mongodb+srv://tester:abc123456@cluster0.tv3cj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

//Import models
const Circle = require('./models/circle');
const Square = require('./models/square');
const Rectangle = require('./models/rectangle');
const Triangle = require('./models/triangle');
const Donut = require('./models/donut');
 

// Circle
const addCircle = (circle) => {
    Circle.create(circle).then(circle => {
        console.info(`_id: ${circle._id}`);
        let n = parseInt(process.env.NBShape);
        console.info(`Shape ${++n}: Circle with center at (${circle.x}, ${circle.y}) and radius ${circle.radius}`);
        mongoose.connection.close();
    });
}

const deleteCircle = (_id) => {
    Circle.deleteOne(_id).then(circle => {
        console.info('Circle Removed');
        mongoose.connection.close();
    });
}

//Square
const addSquare= (square) => {
    Square.create(square).then(square => {
        console.info(`_id: ${square._id}`);
        let n = parseInt(process.env.NBShape);
        console.info(`Shape ${++n}: Square with corner (${square.x}, ${square.y}) and length of the side ${square.length}`);
        mongoose.connection.close();
    });
}

const deleteSquare = (_id) => {
    Circle.deleteOne(_id).then(square => {
        console.info('Square Removed');
        mongoose.connection.close();
    });
}

//Rectangle
const addRectangle = (rectangle) => {
    Rectangle.create(rectangle).then(rectangle => {
        console.info(`_id: ${rectangle._id}`);
        let n = parseInt(process.env.NBShape);
        console.info(`Shape ${++n}: Rectangle with corner (${rectangle.x}, ${rectangle.y}) and side1 ${rectangle.side1} and side2 ${rectangle.side2}`);
        mongoose.connection.close();
    });
}

const deleteRectangle = (_id) => {
    Circle.deleteOne(_id).then(rectangle => {
        console.info('Rectangle Removed');
        mongoose.connection.close();
    });
}

//Triangle
const addTriangle = (triangle) => {
    Triangle.create(triangle).then(triangle => {
        console.info(`_id: ${triangle._id}`);
        let n = parseInt(process.env.NBShape);
        console.info(`Shape ${++n}: Triangle with point1 (${triangle.x1}, ${triangle.y1}) and point2 (${triangle.x2}, ${triangle.y2}) and point3 (${triangle.x3}, ${triangle.y3})`);
        mongoose.connection.close();
    });
}

const deleteTriangle = (_id) => {
    Circle.deleteOne(_id).then(triangle => {
        console.info('Triangle Removed');
        mongoose.connection.close();
    });
}

//Donut
const addDonut = (donut) => {
    Donut.create(donut).then(donut => {
        console.info(`_id: ${donut._id}`);
        let n = parseInt(process.env.NBShape);
        console.info(`Shape ${++n}: Donut with center at (${donut.x}, ${donut.y}) and radius1 ${circle.radius1} and radius2 ${circle.radius2}`);
        mongoose.connection.close();
    });
}

const deleteDonut = (_id) => {
    Circle.deleteOne(_id).then(donut => {
        console.info('Donut Removed');
        mongoose.connection.close();
    });
}

//Find a shape
const findShape = (point) => {
    let totalArea = 0;
    const pi = 3.14159265359;
    Circle.find()
    .then( circles => {
        circles.forEach( (circle) => {
            var xs = point.x - circle.x, ys = point.y - circle.y;
            xs *= xs;
            ys *= ys;
            const distance = Math.sqrt( xs + ys );
            if(distance <= circle.radius){
            const surface = pi * circle.radius * circle.radius;
            totalArea += surface;
            console.info(`Circle with center at (${circle.x}, ${circle.y}) and radius ${circle.radius} and surface ${surface}  and Total Area ${totalArea}`);
            }else{
                console.info('The Given Point is Outside the Shape');  
            }
            //mongoose.connection.close();
        });
    });

    Square.find()
    .then( squares => {
        squares.forEach( (square) => {
            var xs = point.x - square.x, ys = point.y - square.y;
            xs *= xs;
            ys *= ys;
            const distance = Math.sqrt( xs + ys );
            if(distance <= (square.length / 2)){
            const surface = square.length * square.length;
            totalArea += surface;
            console.info(`Square with center at (${square.x}, ${square.y}) and side ${square.length} and surface ${surface}  and Total Area ${totalArea}`);
            }else{
                console.info('The Given Point is Outside the Shape');  
            }
            //mongoose.connection.close();
        });
    });

    Rectangle.find()
    .then( rectangles => {
        rectangles.forEach( (rectangle) => {
            const x = point.x;
            const y = point.y;
            const x1 = rectangle.x;
            const y1 = rectangle.y;
            const x2 = x1 + rectangle.side1;
            const y2 = y1 + rectangle.side2;
            const pointInRect = ({x1, y1, x2, y2}, {x, y}) => (
                (x > x1 && x < x2) && (y > y1 && y < y2)
              );

            if(pointInRect){
            const surface = rectangle.side1 * rectangle.side2;
            totalArea += surface;
            console.info(`Rectangle with Corner (${rectangle.x}, ${rectangle.y}) and side1 ${rectangle.side1} and side2 ${rectangle.side2} and surface ${surface}  and Total Area ${totalArea}`);
            }else{
                console.info('The Given Point is Outside the Shape');  
            }
            //mongoose.connection.close();
        });
    });

    Triangle.find()
    .then( triangles => {
        triangles.forEach( (triangle) => {
            /*const side1 = Math.sqrt(Math.pow((triangle.x2 - triangle.x1), 2) + Math.pow((triangle.y2 - triangle.y1), 2) );
            const side2 = Math.sqrt(Math.pow((triangle.x3 - triangle.x2), 2) + Math.pow((triangle.y3 - triangle.y2), 2) );
            const side3 = Math.sqrt(Math.pow((triangle.x1 - triangle.x3), 2) + Math.pow((triangle.y1 - triangle.y3), 2) );

            const s = (side1 + side2 + side3) / 2;

            const surface = Math.sqrt(s * (s - side1) * (s - side2) * (s-side3)) * 0.5;*/

            function area(x1, y1, x2, y2, x3, y3){return Math.abs((x1*(y2-y3) + x2*(y3-y1)+ x3*(y1-y2))/2.0);}
            
            function isInside(x1, y1, x2, y2, x3, y3, x, y){
                /* Calculate area of triangle ABC */
                let A = area (x1, y1, x2, y2, x3, y3);
                /* Calculate area of triangle PBC */
                let A1 = area (x, y, x2, y2, x3, y3);
                /* Calculate area of triangle PAC */
                let A2 = area (x1, y1, x, y, x3, y3);
                /* Calculate area of triangle PAB */   
                let A3 = area (x1, y1, x2, y2, x, y);
                    
                /* Check if sum of A1, A2 and A3 is same as A */
                return (A == A1 + A2 + A3);
            }

            if(isInside(triangle.x1, triangle.y1, triangle.x2, triangle.y2, triangle.x3, triangle.y3, point.x, point.y)){
            const surface = area(triangle.x1, triangle.y1, triangle.x2, triangle.y2, triangle.x3, triangle.y3);
            totalArea += surface;
            console.info(`Triangle with point1 (${triangle.x1}, ${triangle.y1}) and point2 (${triangle.x2}, ${triangle.y2}) and point3 (${triangle.x3}, ${triangle.y3} and surface ${surface}  and Total Area ${totalArea}`);
            }else{
                console.info('The Given Point is Outside the Shape');  
            }
            mongoose.connection.close();
        });
        mongoose.connection.close();
    });
    
}


//Export All Methods
module.exports = {
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
}