/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3b2yd0u8s3tryuz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ghq6d52x",
    "name": "user",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3b2yd0u8s3tryuz")

  // remove
  collection.schema.removeField("ghq6d52x")

  return dao.saveCollection(collection)
})
