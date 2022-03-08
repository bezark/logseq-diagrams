var cy = cytoscape({

  container: document.getElementById('cy'), // container to render in

  elements: [ // list of graph elements to start with
    // { // node a
    //   data: { id: 'a' }
    // },
    // { // node b
    //   data: { id: 'b' }
    // },
    // { // edge ab
    //   data: { id: 'ab', source: 'a', target: 'b' }
    // }
  ],

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        
        'label': 'data(name)',
        "text-wrap": "wrap",
        "text-justification": "left",
        "text-max-width": "250px",
        "text-valign": "center",
        "text-halign": "center",
        "shape":"round-rectangle",
        
        "background-color":"white",
        "border-width": "1px",
        "border-color": "black",
        "width": "label",
        "height": "label",
        "padding ": 5,
        // "padding-relative-to":"average",
      }
    },
    {
      selector: ':parent',
      css: {
        'text-valign': 'top',
        'text-halign': 'center',
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier'
      }
    },

    // some style for the extension
    {
      selector: '.eh-handle',
      style: {
        'background-color': 'red',
        'width': 12,
        'height': 12,
        'shape': 'ellipse',
        'overlay-opacity': 0,
        'border-width': 12, // makes the handle easier to hit
        'border-opacity': 0
      }
    },

    {
      selector: '.eh-hover',
      style: {
        'background-color': 'red'
      }
    },

    {
      selector: '.eh-source',
      style: {
        'border-width': 2,
        'border-color': 'red'
      }
    },

    {
      selector: '.eh-target',
      style: {
        'border-width': 2,
        'border-color': 'red'
      }
    },

    {
      selector: '.eh-preview, .eh-ghost-edge',
      style: {
        'background-color': 'red',
        'line-color': 'red',
        'target-arrow-color': 'red',
        'source-arrow-color': 'red'
      }
    },
    {
      selector: '.eh-ghost-edge.eh-preview-active',
      style: {
        'opacity': 0
      }
    }
  ],

  layout: {
    name: 'grid',
    rows: 1
  }

});

let defaults = {
  canConnect: function( sourceNode, targetNode ){
    // whether an edge can be created between source and target
    return !sourceNode.same(targetNode); // e.g. disallow loops
  },
  edgeParams: function( sourceNode, targetNode ){
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for edge
    return {};
  },
  hoverDelay: 150, // time spent hovering over a target node before it is considered selected
  snap: true, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
  snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
  snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
  noEdgeEventsInDraw: true, // set events:no to edges during draws, prevents mouseouts on compounds
  disableBrowserGestures: true // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
};

let eh = cy.edgehandles( defaults );

// const options = {
//   grabbedNode: node => true, // filter function to specify which nodes are valid to grab and drop into other nodes
//   dropTarget: (dropTarget, grabbedNode) => true, // filter function to specify which parent nodes are valid drop targets
//   dropSibling: (dropSibling, grabbedNode) => true, // filter function to specify which orphan nodes are valid drop siblings
//   newParentNode: (grabbedNode, dropSibling) => ({}), // specifies element json for parent nodes added by dropping an orphan node on another orphan (a drop sibling). You can chose to return the dropSibling in which case it becomes the parent node and will be preserved after all its children are removed.
//   boundingBoxOptions: { // same as https://js.cytoscape.org/#eles.boundingBox, used when calculating if one node is dragged over another
//     includeOverlays: false,
//     includeLabels: true
//   },
//   overThreshold: 10, // make dragging over a drop target easier by expanding the hit area by this amount on all sides
//   outThreshold: 10 // make dragging out of a drop target a bit harder by expanding the hit area by this amount on all sides
// };
// const cdnd = cy.compoundDragAndDrop(options);

function newGraph(page, content){
  cy.$().remove();
  addNodes(content)

}
function addNodes(blocks, parent){
  console.log(blocks)
  // cy.elements = []
  for (const block of blocks) {
    cy.add({
      group: 'nodes',
      data: { id: block.id, name: block.content, parent: parent },
      position: { x: getRandomInt(1000), y: getRandomInt(1000) },
      // removed: false,
      // selected: false,
      // selectable: true,
      // locked: false,
      // grabbed: false,
      // grabbable: true,
  });
    if(block.children.length>0){
     
      addNodes(block.children, block.id)
      
    }
  }
}
// 
let drawingEnabeled = false;
document.addEventListener('keydown', function (e) {
    
  switch (e.key) {
    case "Shift":
        if(!drawingEnabeled){
          console.log('enabled');  
          eh.enableDrawMode()
        }else{
          eh.disableDrawMode()
          console.log('disabeled');
        }
        drawingEnabeled = !drawingEnabeled
      break;
  
    default:
      break;
  }
  
})
 
// document.addEventListener('keyup', function (e) {
    
//   switch (e.key) {
//     case "Shift":
//         eh.disableDrawMode()
//         eh.enable()
//       break;
  
//     default:
//       break;
//   }
  
// })



// eh.enableDrawMode();


//   eh.disableDrawMode();
// });

// document.querySelector('#start').addEventListener('click', function() {
//   eh.start( cy.$('node:selected') );
// });

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
