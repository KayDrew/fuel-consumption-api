import pgPromise from 'pg-promise';
import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import flash from 'express-flash';
import session from 'express-session';
import FuelConsumption from './fuel-consumption.js';
import FuelConsumptionAPI from './fuel-consumption-api.js';
import routes from './routes/routes.js';

const app = express();
app.use(express.static('public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.static('images'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(session({
  secret: "no secret",
  resave: false,
  saveInitialized: false
}));
app.use(flash());
const pgp = pgPromise();

const connectionOptions = {
    connectionString: process.env.DATABASE_URL || "postgres://fjlohoqv:uvm6zdQ2FgsBttHsjdBHFL4RbiTSvWWt@silly.db.elephantsql.com/fjlohoqv",
    ssl: process.env.NODE_ENV === 'production', // Enable SSL in production
};

const db = pgp(connectionOptions);

const fuelConsumption = FuelConsumption(db);
const fuelConsumptionAPI = FuelConsumptionAPI(fuelConsumption)
const route= routes(fuelConsumption);

const PORT = process.env.PORT || 5432;

app.use(express.json());


app.get("/",route.home);
app.post('/vehicle', route.addVehicle);
app.get("/vehicles",route.vehicles);


app.get('/api/vehicles', fuelConsumptionAPI.vehicles);
app.get('/api/vehicle', fuelConsumptionAPI.vehicle);
app.post('/api/vehicle', fuelConsumptionAPI.addVehicle);
app.post('/api/refuel', fuelConsumptionAPI.refuel);

app.listen(PORT, () => console.log(`App started on port: ${PORT}`));

