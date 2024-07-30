/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("vmipsq9y707zv5r");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "vmipsq9y707zv5r",
    "created": "2024-03-09 15:32:16.834Z",
    "updated": "2024-03-09 15:32:16.834Z",
    "name": "work",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "s7jwt8hk",
        "name": "field",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
