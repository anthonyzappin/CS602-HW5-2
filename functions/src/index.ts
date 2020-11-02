import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore()
import jsonData = require('./restaurants.json');
const cors = require('cors')({origin: true});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', "*")
  response.send("Hello from Firebase!");
});

export const read = functions.https.onRequest((request, response) => {
    // send the restaurant.json data
    // parae json data
    // response.send(restaurant object)
    cors(request, response, () => {
        response.set('Access-Control-Allow-Origin', "*")
        let data = JSON.stringify(jsonData);
        response.send(data);
    })
  });

  export const create = functions.https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', "*")

    cors(request, response, async ()  => {
        let name = JSON.parse(JSON.stringify(request.body.name))
        let building = JSON.parse(JSON.stringify(request.body.building))
        let coordinate = JSON.parse(JSON.stringify(request.body.coordinate))
        let street = JSON.parse(JSON.stringify(request.body.street))
        let zip = JSON.parse(JSON.stringify(request.body.zip))
        let borough = JSON.parse(JSON.stringify(request.body.borough))
        let cuisine = JSON.parse(JSON.stringify(request.body.cuisine))
        let grade = JSON.parse(JSON.stringify(request.body.grade))

        await firestore.collection("/restaurant/").doc(name.toString()).set({
           name: name.toString(),
           address: {
            building: building.toString(),
            coord: coordinate.toString(),
            street: street.toString(),
            zip: zip.toString()
        },
           borough: borough.toString(),
           cuisine: cuisine.toString(),
           grade: grade.toString(),
           created: Date().toLocaleString()
       })
       response.status(201).send(name.toString() + " stored a restaurant")
    })
               
  });

  export const getById = functions.https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', "*")
    const restaurantId = request.query.restaurantId;
    const snapshot = await firestore
        .collection("/restaurant/")
        .where('restaurantId', '==', restaurantId)
        .get()
        response.json(snapshot.docs.map((doc: any) => doc.data()))
})

export const deleteById = functions.https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', "*")

    cors(request, response, async () => {
        const restaurantId = request.query.restaurantId;
        const snapshot = await firestore
        .collection("/restaurant/")
        .where('restaurantId', '==', restaurantId)
        .get()

        const batch = firestore.batch();

        snapshot.forEach((doc: any) => {
            batch.delete(doc.ref);
          });

          await batch.commit()

        response.json("The following ID " + restaurantId + " was deleted.")
    })

})

export const getByName = functions.https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', "*")

    cors(request, response, async () => {
            const name = request.query.name;
            const snapshot = await firestore
                .collection("/restaurant/")
                .where('name', '==', name)
                .limit(5)
                .get()
                response.json(snapshot.docs.map((doc: any) => doc.data()))
        })
    })

    export const getByBorough = functions.https.onRequest(async (request, response) => {
        response.set('Access-Control-Allow-Origin', "*")
    
        cors(request, response, async () => {
                const borough = request.query.borough;
                const snapshot = await firestore
                    .collection("/restaurant/")
                    .where('borough', '==', borough)
                    .limit(5)
                    .get()
                    response.json(snapshot.docs.map((doc: any) => doc.data()))
            })
        })


  export const bootstrap = functions.https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', "*")

    let list: string[] = [];

    jsonData.forEach(element => {
        list.push(element.restaurant_id);
        cors(request, response, async ()  => {
            let name = JSON.parse(JSON.stringify(element.name))
            // let address = JSON.stringify(element.address)
            let building = JSON.stringify(element.address.building)
            let coord = JSON.stringify(element.address.coord)
            let street = JSON.stringify(element.address.street)
            let zip = JSON.stringify(element.address.zipcode)
            let borough = JSON.stringify(element.borough)
            let cuisine = JSON.stringify(element.cuisine)
            let grade = JSON.stringify(element.grades)
           
            let restaurantId = JSON.stringify(element.restaurant_id)
            
            await firestore.collection("/restaurant/").doc(name.toString()).set({
               name: name,
               address: {
                   building: building.toString(),
                   coord: coord.toString(),
                   street: street.toString(),
                   zip: zip.toString()
               },
               burough: borough,
               cuisine: cuisine,
               grades: grade.toString(),
               restaurantId: restaurantId,
           })
           response.status(201).send(name.toString() + " bootstrap")
        })
    });
   
  });
  
  

