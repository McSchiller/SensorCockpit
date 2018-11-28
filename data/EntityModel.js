// Define Odata model of the resource entity i.e. Product. 
// The metadata is defined using OData type system called the Entity Data Model (EDM),
// consisting of EntitySets, Entities, ComplexTypes and Scalar Types.
var EntityModel = {
    namespace: "SensorCockpit",
    entityTypes: {
        "Roomdata": {
            "_id": {
                "type": "Edm.String",
                key: true
            },
            "SensorID": {
                "type": "Edm.Int32"
            },
            "Temp": {
                "type": "Edm.Double"
            },
            "Hum": {
                "type": "Edm.Double"
            },
            "Timestamp": {
                "type": "Edm.DateTime"
            }
        }
    },
    entitySets: {
        "Roomdatas": {
            entityType: "SensorCockpit.Roomdata"
        }
    }
};

module.exports = EntityModel;