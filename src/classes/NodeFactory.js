const labels = require('./labels');
const Relationship = require('./Relationship');

class NodeFactory {
  constructor() {
    this.types = {};
  }

  add(label, data) {
    const Node = labels[label];
    const node = new Node(data);

    const state = this.types[label];
    if (!state) {
      // This is the first time a node with this label has been created
      node.writeHeader();
      const stream = node.createStream();
      node.writeRow(stream);

      const existing = new Set([node.id]);
      this.types[label] = { stream, existing };
    } else {
      const { stream, existing } = state;

      if (!existing.has(node.id)) {
        existing.add(node.id);
        node.writeRow(stream);
      }
    }

    return node.id;
  }

  relate(start, type, end, role) {
    const relationship = new Relationship(start, type, end, role);

    const state = this.types['Relationship'];
    if (!state) {
      // This is the first time a relationship has been created
      relationship.writeHeader();
      const stream = relationship.createStream();
      relationship.writeRow(stream);

      this.types['Relationship'] = { stream };
    } else {
      const { stream } = state;

      relationship.writeRow(stream);
    }
  }
}

module.exports = NodeFactory;
