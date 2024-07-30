/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("c6qntdsfsevukwl");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "c6qntdsfsevukwl",
    "created": "2024-03-09 12:01:15.984Z",
    "updated": "2024-03-09 12:01:34.818Z",
    "name": "webusers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "clq4p5cm",
        "name": "username",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "wdxnx0fx",
        "name": "password",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
