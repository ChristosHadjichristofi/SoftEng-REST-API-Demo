const { pool } = require('../utils/database');
const { validateFields } = require('../utils/missingParams')

exports.getAll = async (req, res, next) => {
    let limit = undefined;
    if (req.query.limit) {
        limit = Number(req.query.limit);
        if (!Number.isInteger(limit)) return res.status(400).json({ message: 'Limit query param should be an integer' });
    }

    const query = 'SELECT * FROM charging_stations' + (limit ? ' LIMIT ?' : '');
    
    pool.getConnection((err, connection) => {
        connection.query(query, [limit], (err, rows) => {
            connection.release();
            if (err) return res.status(500).json({ message: 'Internal server error' });

            return res.status(200).json(rows);
        });
    });
};

exports.getDataByMunicipalityName = async (req, res, next) => {
    const name = req.params.name;
    let limit = undefined;
    if (req.query.limit) {
        limit = Number(req.query.limit);
        if (!Number.isInteger(limit)) return res.status(400).json({ message: 'Limit query param should be an integer' });
    }

    const query = 'SELECT * FROM charging_stations WHERE municipality = ?' + (limit ? ' LIMIT ?' : '');
    
    pool.getConnection((err, connection) => {
        connection.query(query, [name, limit], (err, rows) => {
            connection.release();
            if (err) return res.status(500).json({ message: 'Internal server error' });

            return res.status(200).json(rows);
        });
    });
}

exports.getMunicipalities = async (req, res, next) => {
    let limit = undefined;
    if (req.query.limit) {
        limit = Number(req.query.limit);
        if (!Number.isInteger(limit)) return res.status(400).json({ message: 'Limit query param should be an integer' });
    }

    const query = 'SELECT DISTINCT municipality FROM charging_stations' + (limit ? ' LIMIT ?' : '');
    
    const municipalities = [];
    pool.getConnection((err, connection) => {
        connection.query(query, [limit], (err, rows) => {
            connection.release();
            if (err) return res.status(500).json({ message: 'Internal server error' });

            for (let row of rows) municipalities.push(row.municipality);
            return res.status(200).json({ municipalities: municipalities });
        })
    });
}

exports.getNames = async (req, res, next) => {
    let limit = undefined;
    if (req.query.limit) {
        limit = Number(req.query.limit);
        if (!Number.isInteger(limit)) return res.status(400).json({ message: 'Limit query param should be an integer' });
    }

    const query = 'SELECT DISTINCT name FROM charging_stations' + (limit ? ' LIMIT ?' : '');

    const names = [];
    pool.getConnection((err, connection) => {
        connection.query(query, [limit], (err, rows) => {
            connection.release();
            if (err) {
                console.log(err)
                return res.status(500).json({ message: 'Internal server error' });
            }

            for (let row of rows) names.push(row.name);
            return res.status(200).json({ names: names });
        });
    });
}

exports.getDataByStationName = async (req, res, next) => {
    const name = req.params.name;
    let limit = undefined;
    if (req.query.limit) {
        limit = Number(req.query.limit);
        if (!Number.isInteger(limit)) return res.status(400).json({ message: 'Limit query param should be an integer' });
    }

    const query = 'SELECT * FROM charging_stations WHERE name = ?' + (limit ? ' LIMIT ?' : '');
    
    pool.getConnection((err, connection) => {
        connection.query(query, [name, limit], (err, rows) => {
            connection.release();
            if (err) return res.status(500).json({ message: 'Internal server error' });

            return res.status(200).json(rows);
        });
    });
}

exports.postStation = async (req, res, next) => {
    const municipality = req.body.municipality;
    const name = req.body.name;
    const address = req.body.address;
    const operation = req.body.operation;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const capacity = req.body.capacity;

    const requiredFields = ['municipality', 'name', 'address', 'operation', 'latitude', 'longitude', 'capacity'];
    const missingFields = validateFields(req, "body", requiredFields);

    if (missingFields.length > 0) return res.status(400).json({ message: `Missing body parameters: ${missingFields.join(', ')}` });

    const checkQuery = 'SELECT * FROM charging_stations WHERE Name = ?';
    const query = 'INSERT INTO charging_stations (Municipality, Name, Address, Operation, Latitude, Longitude, Capacity) VALUES (?, ?, ?, ?, ?, ?, ?)';

    pool.getConnection((err, connection) => {
        connection.query(checkQuery, [name], (err, rows) => {
            connection.release();
            if (rows.length > 0) {
                connection.release();
                return res.status(409).json({ message: 'Station already exists' });
            }
        });

        connection.query(query, [municipality, name, address, operation, latitude, longitude, capacity], (err, rows) => {
            connection.release();
            if (err) {
                console.log(err)
                return res.status(500).json({ message: 'Internal server error' });
            }

            return res.status(201).json({ message: 'Station created', station: req.body });
        });
    });
};

exports.deleteStation = async (req, res, next) => {
    const id = req.params.id;

    if (!id) return res.status(400).json({ message: 'Missing parameters' });

    const query = 'DELETE FROM charging_stations WHERE id = ?';

    pool.getConnection((err, connection) => {
        connection.query(query, [id], (err, rows) => {
            connection.release();
            if (err) return res.status(500).json({ message: 'Internal server error' });

            return res.status(200).json({ message: `Station with ID = ${id} deleted successfully.` });
        });
    });
};

exports.getNearby = async (req, res, next) => {
    const lat = req.query.latitude;
    const long = req.query.longitude;
    const radius = req.query.radius;

    const requiredParams = ['latitude', 'longitude', 'radius'];
    const missingParams = validateFields(req, 'query', requiredParams);

    if (missingParams.length > 0) return res.status(400).json({ message: `Missing query parameters: ${missingParams.join(', ')}` });

    const query = 'SELECT * FROM charging_stations WHERE (6371 * acos(cos(radians(?)) * cos(radians(Latitude)) * cos(radians(Longitude) - radians(?)) + sin(radians(?)) * sin(radians(Latitude))) <= ?)';

    pool.getConnection((err, connection) => {
        connection.query(query, [lat, long, lat, radius], (err, rows) => {
            connection.release();
            if (err) return res.status(500).json({ message: 'Internal server error' });

            return res.status(200).json(rows);
        });
    });
};