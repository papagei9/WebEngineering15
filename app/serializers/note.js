import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    primaryKey: '_id',
    attrs: {
      owner: {
        deserialize: 'records',
        serialize: false
      },
      project: {
        deserialize: 'records',
        serialize: false
      },
    }
});

