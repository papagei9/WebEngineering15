import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    primaryKey: '_id',
    attrs: {
      user: {
        deserialize: 'records',
        serialize: false
      },
      task: {
        deserialize: 'records',
        serialize: false,
      }
    }
});

