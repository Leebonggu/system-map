import React, { Component, Fragment } from 'react';
import Graph from 'vis-react';

const options = {
  autoResize: true,
  nodes: {
    fixed: {
      x: false,
      y: false
    },
    shape: "dot",
    size: 13,
    borderWidth: 1.5,
    borderWidthSelected: 2,
    font: {
      size: 15,
      align: "center",
      bold: {
        color: "#bbbdc0",
        size: 15,
        vadjust: 0,
        mod: "bold"
      }
    }
  },
  edges: {
    width: 0.01,
    color: {
      color: "#D3D3D3",
      highlight: "#797979",
      hover: "#797979",
      opacity: 1.0
    },
    arrows: {
      to: { enabled: true, scaleFactor: 1, type: "arrow" },
      middle: { enabled: false, scaleFactor: 1, type: "arrow" },
      from: { enabled: true, scaleFactor: 1, type: "arrow" }
    },
    smooth: {
      type: "diagonalCross",
      roundness: 0.5,
    }
  },
  groups: {
    경제: {
      color: {
        background: "#ffffff",
        border: "#acdbae",
        highlight: {
          border: "#acdbae",
          background: "#ffffff"
        },
        hover: {
          border: "#acdbae",
          background: "#ffffff"
        }
      }
    },
    사회: {
      color: {
        background: "#ffffff",
        border: "#f3bd86",
        highlight: {
          border: "#f3bd86",
          background: "#ffffff"
        },
        hover: {
          border: "#f3bd86",
          background: "#ffffff"
        }
      }
    },
    기술: {
      color: {
        background: "#ffffff",
        border: "#c89dc8",
        highlight: {
          border: "#c89dc8",
          background: "#ffffff"
        },
        hover: {
          border: "#c89dc8",
          background: "#ffffff"
        }
      }
    },
  },
  interaction: {
    hover: true,
    hoverConnectedEdges: true,
    hoverEdges: true,
    selectable: false,
    selectConnectedEdges: false,
    zoomView: false,
    dragView: false
  }
};


class VisSystemMap extends Component {
  componentWillMount() {
    this.mounted = true;
  }
  constructor(props) {
    super(props);
    this.events = {
      select: function(event) {
        var { nodes, edges } = event;
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
      },
    }
    const {
      currentNodes,
      currentEdges,
    } = this.props;
    let nodes = [];
    let edges = [];
    // console.log('nodes', currentNodes);
    // console.log('edges', currentEdges);
    currentNodes.forEach(node => {
      nodes.push({
        id: node.identity,
        label: node.properties.node,
        group: node.labels[0],
        subject: node.labels[0],
      });
    });
    currentEdges.forEach(edge => {
      edges.push({
        arrows: "to",
        from: edge[0].start.identity,
        to: edge[0].end.identity,
        direction: edge[0].segments[0].relationship.type,
        color: edge[0].segments[0].relationship.type === "POSITIVE" ? 'red': 'blue',
        smooth: true,
      })
    })

    let newGraph = {};
    newGraph.nodes = nodes;
    newGraph.edges = edges;
    this.state = {
      graph: newGraph,
      style: { width: "100%", height: "100%" },
      network: null,
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getNetwork = data => {
    this.setState({ network: data });
  };
  getEdges = data => {
    console.log(data);
  };
  getNodes = data => {
    console.log(data);
  };

  render() {
    console.log(this.network);
    return (
      <Fragment>
        <Graph
          graph={this.state.graph}
          style={this.state.style}
          options={options}
          getNetwork={this.getNetwork}
          getEdges={this.getEdges}
          getNodes={this.getNodes}
          events={this.events}
          vis={vis => (this.vis = vis)}
        />
      </Fragment>
    );
  }
}

export default VisSystemMap;
