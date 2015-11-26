import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    primaryKey: '_id',
    attrs: {
      owner: { embedded: 'always' },
      members: { embedded: 'always' }
      //comments: { serialize: 'ids' }
    }
});
