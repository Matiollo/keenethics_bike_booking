# Backend for Bike Booking App

To start the server:
1. Make sure all the dependencies are installed
2. Add .env file where you should include DATABASE_URL which would allow to connect to your own MongoDB database
3. Run 'npm run dev' from the server folder


### API

Getting bikes:
- Method: GET
- URL: localhost:5000/bikes/
- Response json example: [{
    "_id": "65944324dd107a22aad8f10f",
    "name": "nike lightweight",
    "type": "lightweight",
    "color": "blue",
    "wheel_size": 12,
    "price": 300,
    "description": "suitable for roads",
    "availability": "busy",
    "__v": 0
}]

Creating a new bike: 
- Method: POST
- URL: localhost:5000/bikes/
- Request json example: {
    "name":"nike lightweight", 
    "type":"lightweight", 
    "color":"blue",
    "wheel_size":12,
    "price":300,
    "description":"suitable for roads"
}


Changing bike status:
- Method: PATCH
- URL: localhost:5000/bikes/:id
- Request json example: {
        "availability": "busy"
    }
- Posible availability statuses: available / busy / unavailable

Deleting a bike: 
- Method: DELETE
- URL: localhost:5000/bikes/:id

Getting statistics (number of bicycles, number of available bicycles, number of booked bicycles, average price of a bicycle):
- Method: GET
- URL: localhost:5000/bikes/stats
- Response json example: {
    "countAll": 3,
    "countAvailable": 2,
    "countBusy": 1,
    "averagePrice": "366.67"
}
 
