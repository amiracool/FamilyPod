// Initialize Konva Stage and Layer
const stage = new Konva.Stage({
    container: 'container',
    width: 1000,
    height: 600,
  });
  
  const layer = new Konva.Layer();
  stage.add(layer);
  
  let currentMode = null;
  
  // Helper to create shapes with editable text
  function createShape(type) {
    let shape;
    const posX = Math.random() * 800 + 50;
    const posY = Math.random() * 500 + 50;
  
    // Create the shape
    if (type === 'circle') {
      shape = new Konva.Circle({
        x: posX,
        y: posY,
        radius: 30,
        fill: 'pink',
        draggable: true,
      });
    } else if (type === 'square') {
      shape = new Konva.Rect({
        x: posX - 30,
        y: posY - 30,
        width: 60,
        height: 60,
        fill: 'lightblue',
        draggable: true,
      });
    } else if (type === 'diamond') {
      shape = new Konva.RegularPolygon({
        x: posX,
        y: posY,
        sides: 4,
        radius: 40,
        fill: 'lightgreen',
        draggable: true,
        rotation: 45,
      });
    }
  
    // Create editable text
    const text = new Konva.Text({
      x: posX - 40,
      y: posY + 40,
      text: 'Edit Me',
      fontSize: 14,
      fill: 'black',
      draggable: true,
      editable: true,
    });
  
    // Event listener for text editing
    text.on('dblclick', () => {
      const input = document.createElement('input');
      input.value = text.text();
      input.style.position = 'absolute';
      input.style.top = stage.container().offsetTop + text.y() + 'px';
      input.style.left = stage.container().offsetLeft + text.x() + 'px';
      document.body.appendChild(input);
  
      input.focus();
      input.addEventListener('blur', () => {
        text.text(input.value);
        layer.draw();
        document.body.removeChild(input);
      });
    });
  
    // Group the shape and text
    const group = new Konva.Group({
      draggable: true,
    });
    group.add(shape);
    group.add(text);
  
    // Add group to layer
    layer.add(group);
    layer.draw();
  }
  
  // Add a resizable and rotatable line
  function addLine() {
    // Create the line
    const line = new Konva.Line({
      points: [100, 100, 300, 300], // Starting points
      stroke: 'black',
      strokeWidth: 2,
    });
  
    // Wrap the line in a group to allow transformations
    const group = new Konva.Group({
      draggable: true,
    });
    group.add(line);
  
    // Add transformer for rotation and resizing
    const transformer = new Konva.Transformer({
      nodes: [group],
      enabledAnchors: ['middle-left', 'middle-right'], // Anchors for resizing
      rotateEnabled: true, // Allow rotation
    });
    layer.add(transformer);
  
    // Add group to layer
    layer.add(group);
    layer.draw();
  
    // Update transformer on click
    group.on('click', () => {
      transformer.nodes([group]);
      layer.draw();
    });
  
    // Deselect transformer when clicking outside
    stage.on('click', (e) => {
      if (e.target === stage) {
        transformer.nodes([]);
        layer.draw();
      }
    });
  }
  
  // Event Listeners for Buttons
  document.getElementById('add-circle').addEventListener('click', () => {
    createShape('circle');
  });
  
  document.getElementById('add-square').addEventListener('click', () => {
    createShape('square');
  });
  
  document.getElementById('add-diamond').addEventListener('click', () => {
    createShape('diamond');
  });
  
  document.getElementById('add-line').addEventListener('click', () => {
    currentMode = 'add-line';
    addLine();
  });
  
  document.getElementById('cross-out').addEventListener('click', () => {
    currentMode = 'cross-out';
  });
  function addLine() {
    // Create the visible line
    const line = new Konva.Line({
      points: [100, 100, 300, 300], // Starting points
      stroke: 'black',
      strokeWidth: 2,
    });
  
    // Add an invisible hit area for easier selection
    const hitArea = new Konva.Line({
      points: [100, 100, 300, 300],
      stroke: 'transparent',
      strokeWidth: 10, // Larger hit area
    });
  
    // Wrap the line and hit area in a group
    const group = new Konva.Group({
      draggable: true,
    });
    group.add(hitArea);
    group.add(line);
  
    // Add transformer for rotation and resizing
    const transformer = new Konva.Transformer({
      nodes: [group],
      enabledAnchors: ['middle-left', 'middle-right'], // Anchors for resizing
      rotateEnabled: true, // Allow rotation
    });
  
    layer.add(transformer);
  
    // Add group to layer
    layer.add(group);
    layer.draw();
  
    // Update transformer on click
    group.on('click', () => {
      transformer.nodes([group]);
      layer.draw();
    });
  
    // Add hover effect to the line for better UX
    group.on('mouseover', () => {
      document.body.style.cursor = 'pointer'; // Change cursor to indicate interactivity
      line.strokeWidth(4); // Highlight the line
      layer.draw();
    });
  
    group.on('mouseout', () => {
      document.body.style.cursor = 'default'; // Revert cursor
      line.strokeWidth(2); // Reset line thickness
      layer.draw();
    });
  
    // Deselect transformer when clicking outside
    stage.on('click', (e) => {
      if (e.target === stage) {
        transformer.nodes([]);
        layer.draw();
      }
    });
  }
  