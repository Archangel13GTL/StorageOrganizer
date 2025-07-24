// Shed Organization Planner - Construction Tools
// Application Configuration and State Management

const APP_CONFIG = {
    SHED_WIDTH: 1680, // 14 feet * 120 pixels per foot
    SHED_HEIGHT: 1200, // 10 feet * 120 pixels per foot
    GRID_SIZE: 120, // 12 inches per grid square (1 foot)
    PIXEL_PER_INCH: 10, // 10 pixels per inch for precise positioning
    MIN_WALKWAY: 360, // 36 inches minimum walkway for safety
    STORAGE_UNITS: {
        cabinet: { width: 360, height: 240, color: '#8B4513', type: 'cabinet', drawers: 4 },
        shelf: { width: 420, height: 360, color: '#696969', type: 'shelf', levels: 3 },
        moveable_shelf: { width: 240, height: 420, color: '#4682B4', type: 'moveable_shelf', mobile: true }
    }
};

// Construction Tool Categories - Focused on carpentry, plumbing, electrical
const TOOL_CATEGORIES = {
    "Hand Tools": {
        color: "#FF6B6B",
        items: [
            { name: "Hammer", symbol: "🔨" },
            { name: "Screwdriver Set", symbol: "🪛" },
            { name: "Wrench Set", symbol: "🔧" },
            { name: "Pliers", symbol: "🔧" },
            { name: "Measuring Tape", symbol: "📏" },
            { name: "Level", symbol: "📐" },
            { name: "Utility Knife", symbol: "🔪" },
            { name: "Chisel Set", symbol: "🔨" },
            { name: "Hand Saw", symbol: "🪚" },
            { name: "Square", symbol: "📐" }
        ]
    },
    "Power Tools": {
        color: "#4ECDC4",
        items: [
            { name: "Drill", symbol: "🪛" },
            { name: "Circular Saw", symbol: "🪚" },
            { name: "Jigsaw", symbol: "🪚" },
            { name: "Sander", symbol: "⚙️" },
            { name: "Router", symbol: "⚙️" },
            { name: "Nail Gun", symbol: "🔫" },
            { name: "Angle Grinder", symbol: "⚙️" },
            { name: "Reciprocating Saw", symbol: "🪚" },
            { name: "Impact Driver", symbol: "🪛" }
        ]
    },
    "Plumbing": {
        color: "#45B7D1",
        items: [
            { name: "Pipe Wrench", symbol: "🔧" },
            { name: "PVC Pipes", symbol: "🟫" },
            { name: "Pipe Fittings", symbol: "⚙️" },
            { name: "Plumber's Putty", symbol: "🧴" },
            { name: "Drain Snake", symbol: "🐍" },
            { name: "Pipe Cutter", symbol: "✂️" },
            { name: "Torch", symbol: "🔥" },
            { name: "Copper Pipe", symbol: "🟫" },
            { name: "Flux", symbol: "🧴" }
        ]
    },
    "Electrical": {
        color: "#F7DC6F",
        items: [
            { name: "Wire", symbol: "🔌" },
            { name: "Outlets", symbol: "🔌" },
            { name: "Wire Strippers", symbol: "✂️" },
            { name: "Multimeter", symbol: "📊" },
            { name: "Electrical Tape", symbol: "📼" },
            { name: "Conduit", symbol: "🟫" },
            { name: "Wire Nuts", symbol: "🔩" },
            { name: "Breakers", symbol: "⚡" },
            { name: "Switches", symbol: "🔌" }
        ]
    },
    "Fasteners": {
        color: "#BB8FCE",
        items: [
            { name: "Nails", symbol: "📎" },
            { name: "Screws", symbol: "🔩" },
            { name: "Bolts", symbol: "🔩" },
            { name: "Washers", symbol: "⭕" },
            { name: "Brackets", symbol: "📐" },
            { name: "Hinges", symbol: "🚪" },
            { name: "Anchors", symbol: "⚓" },
            { name: "Nuts", symbol: "🔩" }
        ]
    },
    "Paints & Chemicals": {
        color: "#58D68D",
        items: [
            { name: "Spray Paint", symbol: "🎨" },
            { name: "Wood Stain", symbol: "🟫" },
            { name: "Motor Oil", symbol: "🛢️" },
            { name: "WD-40", symbol: "🧴" },
            { name: "Paint Brushes", symbol: "🖌️" },
            { name: "Cleaning Supplies", symbol: "🧽" },
            { name: "Primer", symbol: "🎨" },
            { name: "Caulk", symbol: "🧴" },
            { name: "Solvents", symbol: "🧴" }
        ]
    },
    "Safety Equipment": {
        color: "#F39C12",
        items: [
            { name: "Safety Glasses", symbol: "🥽" },
            { name: "Work Gloves", symbol: "🧤" },
            { name: "Dust Masks", symbol: "😷" },
            { name: "Hard Hat", symbol: "⛑️" },
            { name: "First Aid Kit", symbol: "🏥" },
            { name: "Ear Protection", symbol: "🎧" },
            { name: "Fire Extinguisher", symbol: "🧯" }
        ]
    },
    "Large Equipment": {
        color: "#85929E",
        items: [
            { name: "Air Compressor", symbol: "💨" },
            { name: "Miter Saw", symbol: "🪚" },
            { name: "Table Saw", symbol: "🪚" },
            { name: "Shop Vacuum", symbol: "🌪️" },
            { name: "Extension Cords", symbol: "🔌" },
            { name: "Work Light", symbol: "💡" },
            { name: "Ladder", symbol: "🪜" },
            { name: "Sawhorses", symbol: "🪵" }
        ]
    }
};

// Drawer color options for cabinet organization
const DRAWER_COLORS = [
    { name: "Red", value: "#FF6B6B" },
    { name: "Blue", value: "#4ECDC4" },
    { name: "Green", value: "#58D68D" },
    { name: "Yellow", value: "#F7DC6F" },
    { name: "Purple", value: "#BB8FCE" },
    { name: "Orange", value: "#F39C12" },
    { name: "Gray", value: "#85929E" },
    { name: "Pink", value: "#FF69B4" }
];

// Application State
let appState = {
    storageUnits: [],
    currentTool: null,
    selectedUnit: null,
    isGridVisible: true,
    zoomLevel: 1,
    dragState: null,
    history: [],
    historyIndex: -1,
    customTools: [],
    currentCategory: 'Hand Tools'
};

// DOM Elements Cache
let elements = {};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeCanvas();
    initializeEventListeners();
    loadToolCategory('Hand Tools');
    updateOptimizationStatus();
    saveState();
    showMessage('Shed Organization Planner loaded successfully!', 'success');
});

function initializeElements() {
    elements = {
        canvas: document.getElementById('canvas'),
        storageUnits: document.getElementById('storageUnits'),
        gridOverlay: document.getElementById('gridOverlay'),
        toolList: document.getElementById('toolList'),
        propertiesPanel: document.getElementById('propertiesPanel'),
        optimizationStatus: document.getElementById('optimizationStatus'),
        optimizationSuggestions: document.getElementById('optimizationSuggestions'),
        statusText: document.getElementById('statusText'),
        mouseCoords: document.getElementById('mouseCoords'),
        zoomLevel: document.getElementById('zoomLevel'),
        notesArea: document.getElementById('notesArea'),
        fileInput: document.getElementById('fileInput')
    };
}

function initializeCanvas() {
    // Set up canvas dimensions and styling
    elements.canvas.style.width = APP_CONFIG.SHED_WIDTH + 'px';
    elements.canvas.style.height = APP_CONFIG.SHED_HEIGHT + 'px';
    
    // Add mouse tracking for coordinates
    elements.canvas.addEventListener('mousemove', function(e) {
        const rect = elements.canvas.getBoundingClientRect();
        const x = Math.round((e.clientX - rect.left) / APP_CONFIG.PIXEL_PER_INCH);
        const y = Math.round((e.clientY - rect.top) / APP_CONFIG.PIXEL_PER_INCH);
        elements.mouseCoords.textContent = `Position: ${x}", ${y}"`;
    });
    
    // Make canvas droppable for storage units and tools
    elements.canvas.addEventListener('dragover', handleCanvasDragOver);
    elements.canvas.addEventListener('drop', handleCanvasDrop);
}

function initializeEventListeners() {
    // Tool category tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadToolCategory(this.dataset.category);
        });
    });
    
    // Storage palette items - Fixed drag functionality
    document.querySelectorAll('.palette-item').forEach(item => {
        item.addEventListener('dragstart', handlePaletteDragStart);
        item.setAttribute('draggable', 'true');
    });
    
    // Toolbar buttons
    document.getElementById('optimizeBtn').addEventListener('click', showOptimizationModal);
    document.getElementById('saveBtn').addEventListener('click', saveLayout);
    document.getElementById('loadBtn').addEventListener('click', () => elements.fileInput.click());
    document.getElementById('exportPdfBtn').addEventListener('click', exportToPDF);
    document.getElementById('exportJsonBtn').addEventListener('click', exportToJSON);
    document.getElementById('undoBtn').addEventListener('click', undo);
    document.getElementById('redoBtn').addEventListener('click', redo);
    
    // Canvas controls
    document.getElementById('zoomIn').addEventListener('click', () => zoom(1.2));
    document.getElementById('zoomOut').addEventListener('click', () => zoom(0.8));
    document.getElementById('toggleGrid').addEventListener('click', toggleGrid);
    document.getElementById('clearAllBtn').addEventListener('click', clearAll);
    
    // Custom tool button - Fixed functionality
    document.getElementById('addCustomToolBtn').addEventListener('click', function() {
        showModal('customToolModal');
    });
    
    // File input
    elements.fileInput.addEventListener('change', handleFileLoad);
    
    // Modal events
    setupModalEvents();
    
    // Canvas click to deselect
    elements.canvas.addEventListener('click', function(e) {
        if (e.target === elements.canvas || e.target === elements.storageUnits) {
            deselectAllUnits();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

function loadToolCategory(category) {
    appState.currentCategory = category;
    const categoryData = TOOL_CATEGORIES[category];
    if (!categoryData) return;
    
    elements.toolList.innerHTML = '';
    
    // Add category tools
    categoryData.items.forEach(tool => {
        const toolElement = createToolElement(tool);
        elements.toolList.appendChild(toolElement);
    });
    
    // Add custom tools for this category
    appState.customTools
        .filter(tool => tool.category === category)
        .forEach(tool => {
            const toolElement = createToolElement(tool, true);
            elements.toolList.appendChild(toolElement);
        });
}

function createToolElement(tool, isCustom = false) {
    const toolElement = document.createElement('div');
    toolElement.className = 'tool-item';
    toolElement.draggable = true;
    toolElement.dataset.tool = JSON.stringify(tool);
    toolElement.dataset.category = appState.currentCategory;
    
    toolElement.innerHTML = `
        <span class="tool-symbol">${tool.symbol}</span>
        <span class="tool-name">${tool.name}</span>
        ${isCustom ? '<span class="custom-badge">Custom</span>' : ''}
    `;
    
    // Fixed drag start handler
    toolElement.addEventListener('dragstart', function(e) {
        const toolData = JSON.parse(this.dataset.tool);
        const data = {
            type: 'tool',
            tool: toolData,
            category: this.dataset.category
        };
        e.dataTransfer.setData('text/plain', JSON.stringify(data));
        e.dataTransfer.effectAllowed = 'copy';
        this.style.opacity = '0.5';
        setTimeout(() => this.style.opacity = '1', 100);
    });
    
    return toolElement;
}

function handlePaletteDragStart(e) {
    const data = {
        type: 'storage-unit',
        unitType: this.dataset.type,
        width: parseInt(this.dataset.width) * APP_CONFIG.PIXEL_PER_INCH,
        height: parseInt(this.dataset.height) * APP_CONFIG.PIXEL_PER_INCH
    };
    e.dataTransfer.setData('text/plain', JSON.stringify(data));
    e.dataTransfer.effectAllowed = 'copy';
    this.style.opacity = '0.5';
    setTimeout(() => this.style.opacity = '1', 100);
}

function handleCanvasDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

function handleCanvasDrop(e) {
    e.preventDefault();
    
    try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const rect = elements.canvas.getBoundingClientRect();
        
        if (data.type === 'storage-unit') {
            const x = Math.round((e.clientX - rect.left) / APP_CONFIG.GRID_SIZE) * APP_CONFIG.GRID_SIZE;
            const y = Math.round((e.clientY - rect.top) / APP_CONFIG.GRID_SIZE) * APP_CONFIG.GRID_SIZE;
            
            const newUnit = createStorageUnit(data.unitType, x, y, data.width, data.height);
            appState.storageUnits.push(newUnit);
            elements.storageUnits.appendChild(newUnit.element);
            selectStorageUnit(newUnit);
            saveState();
            updateStatusText(`Added ${data.unitType.replace('_', ' ')} to shed`);
        } else if (data.type === 'tool') {
            updateStatusText('Drag tools onto storage units to organize them');
        }
    } catch (error) {
        console.error('Error handling drop:', error);
        updateStatusText('Error processing drop operation');
    }
}

function createStorageUnit(type, x, y, width = null, height = null) {
    const config = APP_CONFIG.STORAGE_UNITS[type];
    const unitWidth = width || config.width;
    const unitHeight = height || config.height;
    
    const element = document.createElement('div');
    element.className = `storage-unit storage-unit--${type}`;
    element.style.left = x + 'px';
    element.style.top = y + 'px';
    element.style.width = unitWidth + 'px';
    element.style.height = unitHeight + 'px';
    
    // Add unit label
    const label = document.createElement('div');
    label.className = 'unit-label';
    label.textContent = type.replace('_', ' ').toUpperCase();
    element.appendChild(label);
    
    // Add resize handles
    const handles = ['nw', 'ne', 'sw', 'se'];
    handles.forEach(handle => {
        const resizeHandle = document.createElement('div');
        resizeHandle.className = `resize-handle resize-handle--${handle}`;
        element.appendChild(resizeHandle);
    });
    
    // Add items container
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'items-container';
    element.appendChild(itemsContainer);
    
    const unitData = {
        id: 'unit_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        type: type,
        x: x,
        y: y,
        width: unitWidth,
        height: unitHeight,
        element: element,
        items: [],
        name: type.replace('_', ' ').toUpperCase(),
        drawers: type === 'cabinet' ? createDefaultDrawers() : null
    };
    
    setupStorageUnitEvents(unitData);
    
    return unitData;
}

function createDefaultDrawers() {
    return [
        { id: 1, label: 'Drawer 1', color: '#FF6B6B', items: [] },
        { id: 2, label: 'Drawer 2', color: '#4ECDC4', items: [] },
        { id: 3, label: 'Drawer 3', color: '#58D68D', items: [] },
        { id: 4, label: 'Drawer 4', color: '#F7DC6F', items: [] }
    ];
}

function setupStorageUnitEvents(unitData) {
    const element = unitData.element;
    
    // Click to select
    element.addEventListener('click', function(e) {
        e.stopPropagation();
        selectStorageUnit(unitData);
    });
    
    // Double-click for special actions - Fixed cabinet drawer modal
    element.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        if (unitData.type === 'cabinet') {
            showDrawerModal(unitData);
        } else {
            renameUnit(unitData);
        }
    });
    
    // Drag functionality
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    
    element.addEventListener('mousedown', function(e) {
        if (e.target.classList.contains('resize-handle')) return;
        
        isDragging = true;
        element.classList.add('dragging');
        dragStart.x = e.clientX - unitData.x;
        dragStart.y = e.clientY - unitData.y;
        
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
        e.preventDefault();
    });
    
    function dragMove(e) {
        if (!isDragging) return;
        
        const canvasRect = elements.canvas.getBoundingClientRect();
        let newX = e.clientX - canvasRect.left - dragStart.x;
        let newY = e.clientY - canvasRect.top - dragStart.y;
        
        // Snap to grid
        newX = Math.round(newX / APP_CONFIG.GRID_SIZE) * APP_CONFIG.GRID_SIZE;
        newY = Math.round(newY / APP_CONFIG.GRID_SIZE) * APP_CONFIG.GRID_SIZE;
        
        // Constrain to canvas bounds
        newX = Math.max(0, Math.min(newX, APP_CONFIG.SHED_WIDTH - unitData.width));
        newY = Math.max(0, Math.min(newY, APP_CONFIG.SHED_HEIGHT - unitData.height));
        
        unitData.x = newX;
        unitData.y = newY;
        element.style.left = newX + 'px';
        element.style.top = newY + 'px';
        
        updateStatusText(`Moving ${unitData.name} to ${Math.round(newX/APP_CONFIG.PIXEL_PER_INCH)}", ${Math.round(newY/APP_CONFIG.PIXEL_PER_INCH)}"`);
    }
    
    function dragEnd() {
        if (!isDragging) return;
        
        isDragging = false;
        element.classList.remove('dragging');
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', dragEnd);
        
        updateOptimizationStatus();
        saveState();
        updateStatusText('Ready');
    }
    
    // Enable dropping tools on storage units - Fixed functionality
    element.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        element.classList.add('dragging-over');
    });
    
    element.addEventListener('dragleave', function(e) {
        element.classList.remove('dragging-over');
    });
    
    element.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('dragging-over');
        
        try {
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            if (data.type === 'tool') {
                addToolToStorageUnit(unitData, data.tool);
            }
        } catch (error) {
            console.error('Error handling tool drop:', error);
        }
    });
    
    setupResizeHandles(unitData);
}

function setupResizeHandles(unitData) {
    const handles = unitData.element.querySelectorAll('.resize-handle');
    
    handles.forEach(handle => {
        handle.addEventListener('mousedown', function(e) {
            e.stopPropagation();
            
            const handleType = handle.className.split('--')[1];
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = unitData.width;
            const startHeight = unitData.height;
            const startLeft = unitData.x;
            const startTop = unitData.y;
            
            function resizeMove(e) {
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                
                let newWidth = startWidth;
                let newHeight = startHeight;
                let newX = startLeft;
                let newY = startTop;
                
                switch(handleType) {
                    case 'se':
                        newWidth = Math.max(120, startWidth + deltaX);
                        newHeight = Math.max(120, startHeight + deltaY);
                        break;
                    case 'sw':
                        newWidth = Math.max(120, startWidth - deltaX);
                        newHeight = Math.max(120, startHeight + deltaY);
                        newX = startLeft + (startWidth - newWidth);
                        break;
                    case 'ne':
                        newWidth = Math.max(120, startWidth + deltaX);
                        newHeight = Math.max(120, startHeight - deltaY);
                        newY = startTop + (startHeight - newHeight);
                        break;
                    case 'nw':
                        newWidth = Math.max(120, startWidth - deltaX);
                        newHeight = Math.max(120, startHeight - deltaY);
                        newX = startLeft + (startWidth - newWidth);
                        newY = startTop + (startHeight - newHeight);
                        break;
                }
                
                // Snap to grid
                newWidth = Math.round(newWidth / APP_CONFIG.GRID_SIZE) * APP_CONFIG.GRID_SIZE;
                newHeight = Math.round(newHeight / APP_CONFIG.GRID_SIZE) * APP_CONFIG.GRID_SIZE;
                newX = Math.round(newX / APP_CONFIG.GRID_SIZE) * APP_CONFIG.GRID_SIZE;
                newY = Math.round(newY / APP_CONFIG.GRID_SIZE) * APP_CONFIG.GRID_SIZE;
                
                unitData.width = newWidth;
                unitData.height = newHeight;
                unitData.x = newX;
                unitData.y = newY;
                
                unitData.element.style.width = newWidth + 'px';
                unitData.element.style.height = newHeight + 'px';
                unitData.element.style.left = newX + 'px';
                unitData.element.style.top = newY + 'px';
                
                updateStatusText(`Resizing ${unitData.name}: ${Math.round(newWidth/APP_CONFIG.PIXEL_PER_INCH)}" × ${Math.round(newHeight/APP_CONFIG.PIXEL_PER_INCH)}"`);
            }
            
            function resizeEnd() {
                document.removeEventListener('mousemove', resizeMove);
                document.removeEventListener('mouseup', resizeEnd);
                updatePropertiesPanel();
                saveState();
                updateStatusText('Ready');
            }
            
            document.addEventListener('mousemove', resizeMove);
            document.addEventListener('mouseup', resizeEnd);
        });
    });
}

function addToolToStorageUnit(unit, tool) {
    const item = {
        id: 'item_' + Date.now(),
        name: tool.name,
        symbol: tool.symbol,
        category: appState.currentCategory,
        x: Math.random() * (unit.width - 40),
        y: Math.random() * (unit.height - 40)
    };
    
    unit.items.push(item);
    renderStorageUnitItems(unit);
    updatePropertiesPanel();
    saveState();
    updateStatusText(`Added ${tool.name} to ${unit.name}`);
}

function renderStorageUnitItems(unit) {
    const container = unit.element.querySelector('.items-container');
    container.innerHTML = '';
    
    unit.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'storage-item';
        itemElement.style.left = item.x + 'px';
        itemElement.style.top = item.y + 'px';
        itemElement.innerHTML = `
            <span class="item-symbol">${item.symbol}</span>
            <span class="item-name">${item.name}</span>
        `;
        
        // Make items draggable within the storage unit
        itemElement.addEventListener('mousedown', function(e) {
            e.stopPropagation();
            let isDragging = true;
            const startX = e.clientX - item.x;
            const startY = e.clientY - item.y;
            
            function moveItem(e) {
                if (!isDragging) return;
                
                const rect = unit.element.getBoundingClientRect();
                let newX = e.clientX - rect.left - startX;
                let newY = e.clientY - rect.top - startY;
                
                // Constrain within storage unit
                newX = Math.max(0, Math.min(newX, unit.width - 40));
                newY = Math.max(0, Math.min(newY, unit.height - 40));
                
                item.x = newX;
                item.y = newY;
                itemElement.style.left = newX + 'px';
                itemElement.style.top = newY + 'px';
            }
            
            function stopDragging() {
                isDragging = false;
                document.removeEventListener('mousemove', moveItem);
                document.removeEventListener('mouseup', stopDragging);
                saveState();
            }
            
            document.addEventListener('mousemove', moveItem);
            document.addEventListener('mouseup', stopDragging);
        });
        
        container.appendChild(itemElement);
    });
}

function selectStorageUnit(unit) {
    deselectAllUnits();
    unit.element.classList.add('selected');
    appState.selectedUnit = unit;
    updatePropertiesPanel();
    updateStatusText(`Selected: ${unit.name}`);
}

function deselectAllUnits() {
    appState.storageUnits.forEach(unit => {
        unit.element.classList.remove('selected');
    });
    appState.selectedUnit = null;
    updatePropertiesPanel();
}

function updatePropertiesPanel() {
    if (!appState.selectedUnit) {
        elements.propertiesPanel.innerHTML = `
            <div class="no-selection">
                <p>Select a storage unit to edit properties</p>
                <p><small>Double-click cabinets to manage drawers</small></p>
            </div>
        `;
        return;
    }
    
    const unit = appState.selectedUnit;
    const widthInches = Math.round(unit.width / APP_CONFIG.PIXEL_PER_INCH);
    const heightInches = Math.round(unit.height / APP_CONFIG.PIXEL_PER_INCH);
    const xInches = Math.round(unit.x / APP_CONFIG.PIXEL_PER_INCH);
    const yInches = Math.round(unit.y / APP_CONFIG.PIXEL_PER_INCH);
    
    elements.propertiesPanel.innerHTML = `
        <div class="property-group">
            <label class="property-label">Unit Name</label>
            <input type="text" class="property-input" id="unitName" value="${unit.name}">
        </div>
        <div class="property-group">
            <label class="property-label">Position (inches)</label>
            <div class="flex gap-8">
                <input type="number" class="property-input" id="unitX" value="${xInches}" placeholder="X">
                <input type="number" class="property-input" id="unitY" value="${yInches}" placeholder="Y">
            </div>
        </div>
        <div class="property-group">
            <label class="property-label">Size (inches)</label>
            <div class="flex gap-8">
                <input type="number" class="property-input" id="unitWidth" value="${widthInches}" placeholder="Width">
                <input type="number" class="property-input" id="unitHeight" value="${heightInches}" placeholder="Height">
            </div>
        </div>
        <div class="property-group">
            <label class="property-label">Type</label>
            <select class="property-input" id="unitType">
                <option value="cabinet" ${unit.type === 'cabinet' ? 'selected' : ''}>Cabinet with Drawers</option>
                <option value="shelf" ${unit.type === 'shelf' ? 'selected' : ''}>Fixed Shelf</option>
                <option value="moveable_shelf" ${unit.type === 'moveable_shelf' ? 'selected' : ''}>Mobile Shelf</option>
            </select>
        </div>
        ${unit.type === 'cabinet' ? `
        <div class="property-group">
            <button class="btn btn--primary btn--full-width" onclick="showDrawerModalForUnit('${unit.id}')">
                🗂️ Manage Drawers (${unit.drawers ? unit.drawers.length : 4})
            </button>
        </div>
        ` : ''}
        <div class="property-group">
            <label class="property-label">Items (${unit.items.length})</label>
            <div class="items-list">
                ${unit.items.map(item => `
                    <div class="item-entry">
                        <span>${item.symbol} ${item.name}</span>
                        <button class="btn btn--sm" onclick="removeItemFromUnit('${unit.id}', '${item.id}')">Remove</button>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="property-group">
            <button class="btn btn--secondary btn--full-width" onclick="deleteStorageUnit('${unit.id}')">
                🗑️ Delete Unit
            </button>
        </div>
    `;
    
    // Add event listeners
    document.getElementById('unitName').addEventListener('change', updateUnitProperties);
    document.getElementById('unitX').addEventListener('change', updateUnitProperties);
    document.getElementById('unitY').addEventListener('change', updateUnitProperties);
    document.getElementById('unitWidth').addEventListener('change', updateUnitProperties);
    document.getElementById('unitHeight').addEventListener('change', updateUnitProperties);
    document.getElementById('unitType').addEventListener('change', updateUnitProperties);
}

function updateUnitProperties() {
    if (!appState.selectedUnit) return;
    
    const unit = appState.selectedUnit;
    const nameInput = document.getElementById('unitName');
    const xInput = document.getElementById('unitX');
    const yInput = document.getElementById('unitY');
    const widthInput = document.getElementById('unitWidth');
    const heightInput = document.getElementById('unitHeight');
    const typeInput = document.getElementById('unitType');
    
    if (nameInput && nameInput.value !== unit.name) {
        unit.name = nameInput.value;
        unit.element.querySelector('.unit-label').textContent = unit.name;
    }
    
    if (xInput && yInput) {
        const newX = parseInt(xInput.value) * APP_CONFIG.PIXEL_PER_INCH;
        const newY = parseInt(yInput.value) * APP_CONFIG.PIXEL_PER_INCH;
        if (newX !== unit.x || newY !== unit.y) {
            unit.x = newX;
            unit.y = newY;
            unit.element.style.left = unit.x + 'px';
            unit.element.style.top = unit.y + 'px';
        }
    }
    
    if (widthInput && heightInput) {
        const newWidth = parseInt(widthInput.value) * APP_CONFIG.PIXEL_PER_INCH;
        const newHeight = parseInt(heightInput.value) * APP_CONFIG.PIXEL_PER_INCH;
        if (newWidth !== unit.width || newHeight !== unit.height) {
            unit.width = newWidth;
            unit.height = newHeight;
            unit.element.style.width = unit.width + 'px';
            unit.element.style.height = unit.height + 'px';
        }
    }
    
    if (typeInput && typeInput.value !== unit.type) {
        unit.type = typeInput.value;
        unit.element.className = `storage-unit storage-unit--${unit.type} selected`;
        if (unit.type === 'cabinet' && !unit.drawers) {
            unit.drawers = createDefaultDrawers();
        }
    }
    
    saveState();
}

function showDrawerModal(unit) {
    if (!unit.drawers) {
        unit.drawers = createDefaultDrawers();
    }
    
    const modal = document.getElementById('drawerModal');
    const drawersList = document.getElementById('drawersList');
    
    drawersList.innerHTML = `
        <div class="drawer-list">
            ${unit.drawers.map(drawer => `
                <div class="drawer-item" data-drawer-id="${drawer.id}">
                    <div class="drawer-header">
                        <div class="drawer-color-picker" style="background-color: ${drawer.color}" onclick="toggleColorOptions(${drawer.id})"></div>
                        <input type="text" class="drawer-label-input" value="${drawer.label}" 
                               onchange="updateDrawerLabel(${drawer.id}, this.value)">
                        <span class="drawer-item-count">${drawer.items ? drawer.items.length : 0} items</span>
                    </div>
                    <div class="color-options hidden" id="colors-${drawer.id}">
                        ${DRAWER_COLORS.map(color => `
                            <div class="color-option" style="background-color: ${color.value}" 
                                 onclick="updateDrawerColor(${drawer.id}, '${color.value}')" 
                                 title="${color.name}"></div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    showModal('drawerModal');
}

function updateOptimizationStatus() {
    // Analyze current layout for safety and efficiency
    const suggestions = [];
    let safetyScore = 'Good';
    let heavyItemsScore = 'Good';
    let workflowScore = 'Optimal';
    
    // Check for adequate pathways
    const hasAdequatePathways = checkPathways();
    if (!hasAdequatePathways) {
        safetyScore = 'Issues';
        suggestions.push('Ensure 36" minimum walkways for safe movement');
    }
    
    // Check heavy item placement
    const heavyItemsLow = checkHeavyItemPlacement();
    if (!heavyItemsLow) {
        heavyItemsScore = 'Review';
        suggestions.push('Place heavy items (air compressor, large tools) on lower shelves');
    }
    
    // Check tool grouping
    const goodGrouping = checkToolGrouping();
    if (!goodGrouping) {
        workflowScore = 'Review';
        suggestions.push('Group related tools together (e.g., all electrical tools in one area)');
    }
    
    // Add general suggestions
    if (suggestions.length === 0) {
        suggestions.push('Keep frequently used tools at eye level (48-60 inches)');
        suggestions.push('Store chemicals and paints in well-ventilated areas');
        suggestions.push('Keep safety equipment easily accessible near the entrance');
    }
    
    // Update status display
    const statusItems = elements.optimizationStatus.querySelectorAll('.status-item .status');
    if (statusItems.length >= 3) {
        statusItems[0].textContent = safetyScore;
        statusItems[0].className = `status status--${safetyScore === 'Good' ? 'success' : 'error'}`;
        statusItems[1].textContent = heavyItemsScore;
        statusItems[1].className = `status status--${heavyItemsScore === 'Good' ? 'success' : 'warning'}`;
        statusItems[2].textContent = workflowScore;
        statusItems[2].className = `status status--${workflowScore === 'Optimal' ? 'success' : 'warning'}`;
    }
    
    elements.optimizationSuggestions.innerHTML = suggestions
        .map(suggestion => `<div class="suggestion"><strong>Tip:</strong> ${suggestion}</div>`)
        .join('');
}

function checkPathways() {
    // Simplified check - ensure units aren't blocking major pathways
    return appState.storageUnits.length === 0 || appState.storageUnits.every(unit => 
        unit.x > 0 && unit.y > 0 && 
        unit.x + unit.width < APP_CONFIG.SHED_WIDTH && 
        unit.y + unit.height < APP_CONFIG.SHED_HEIGHT
    );
}

function checkHeavyItemPlacement() {
    // Check if heavy items are placed on lower areas
    const heavyItems = ['Air Compressor', 'Table Saw', 'Miter Saw'];
    return appState.storageUnits.every(unit => {
        return unit.items.every(item => {
            if (heavyItems.includes(item.name)) {
                return unit.y + item.y > APP_CONFIG.SHED_HEIGHT * 0.6; // Lower 40% of shed
            }
            return true;
        });
    });
}

function checkToolGrouping() {
    // Basic check for tool organization
    return true; // Simplified for now
}

function showOptimizationModal() {
    const modal = document.getElementById('optimizeModal');
    const results = document.getElementById('optimizationResults');
    
    results.innerHTML = `
        <div class="optimization-result">
            <h3>🎯 Layout Analysis & Suggestions</h3>
            <ul>
                <li><strong>Heavy Equipment:</strong> Place air compressor, large saws on floor or bottom shelves</li>
                <li><strong>Frequently Used Tools:</strong> Keep daily tools at eye level (48-60 inches)</li>
                <li><strong>Safety Access:</strong> Maintain 36" walkways, keep fire extinguisher accessible</li>
                <li><strong>Chemical Storage:</strong> Store paints/chemicals away from heat sources</li>
                <li><strong>Tool Organization:</strong> Group by trade - electrical, plumbing, carpentry</li>
                <li><strong>Cabinet Drawers:</strong> Use color coding for different tool categories</li>
            </ul>
        </div>
    `;
    
    showModal('optimizeModal');
}

function setupModalEvents() {
    // Close buttons
    document.getElementById('closeOptimizeModal').addEventListener('click', () => hideModal('optimizeModal'));
    document.getElementById('closeDrawerModal').addEventListener('click', () => hideModal('drawerModal'));
    document.getElementById('closeCustomToolModal').addEventListener('click', () => hideModal('customToolModal'));
    
    // Apply optimization
    document.getElementById('applyOptimization').addEventListener('click', function() {
        hideModal('optimizeModal');
        updateStatusText('Optimization suggestions noted');
    });
    
    // Save drawers
    document.getElementById('saveDrawers').addEventListener('click', function() {
        hideModal('drawerModal');
        updatePropertiesPanel();
        saveState();
        updateStatusText('Drawer configuration saved');
    });
    
    // Add custom tool
    document.getElementById('addCustomTool').addEventListener('click', addCustomTool);
    
    // Symbol picker
    document.querySelectorAll('.symbol-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.symbol-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Close on background click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
            }
        });
    });
}

function addCustomTool() {
    const name = document.getElementById('customToolName').value.trim();
    const category = document.getElementById('customToolCategory').value;
    const notes = document.getElementById('customToolNotes').value.trim();
    const selectedSymbol = document.querySelector('.symbol-option.selected');
    
    if (!name || !selectedSymbol) {
        showMessage('Please enter a name and select a symbol', 'error');
        return;
    }
    
    const customTool = {
        name: name,
        symbol: selectedSymbol.dataset.symbol,
        category: category,
        notes: notes,
        isCustom: true
    };
    
    appState.customTools.push(customTool);
    
    // Clear form
    document.getElementById('customToolName').value = '';
    document.getElementById('customToolNotes').value = '';
    document.querySelector('.symbol-option.selected')?.classList.remove('selected');
    
    hideModal('customToolModal');
    
    // Refresh tool list if current category matches
    if (appState.currentCategory === category) {
        loadToolCategory(category);
    }
    
    showMessage(`Added ${name} to ${category}`, 'success');
    saveState();
}

// File operations
function saveLayout() {
    const layout = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        shed: {
            width: APP_CONFIG.SHED_WIDTH,
            height: APP_CONFIG.SHED_HEIGHT
        },
        storageUnits: appState.storageUnits.map(unit => ({
            id: unit.id,
            type: unit.type,
            x: unit.x,
            y: unit.y,
            width: unit.width,
            height: unit.height,
            name: unit.name,
            items: unit.items,
            drawers: unit.drawers
        })),
        customTools: appState.customTools,
        notes: elements.notesArea.value
    };
    
    localStorage.setItem('shedLayout', JSON.stringify(layout));
    showMessage('Layout saved to browser storage', 'success');
}

function exportToJSON() {
    const layout = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        shed: {
            width: APP_CONFIG.SHED_WIDTH,
            height: APP_CONFIG.SHED_HEIGHT
        },
        storageUnits: appState.storageUnits.map(unit => ({
            id: unit.id,
            type: unit.type,
            x: unit.x,
            y: unit.y,
            width: unit.width,
            height: unit.height,
            name: unit.name,
            items: unit.items,
            drawers: unit.drawers
        })),
        customTools: appState.customTools,
        notes: elements.notesArea.value
    };
    
    const dataStr = JSON.stringify(layout, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `shed-layout-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    showMessage('Layout exported as JSON file', 'success');
}

function exportToPDF() {
    // Simple PDF export using browser print
    const originalTitle = document.title;
    document.title = 'Shed Organization Layout';
    
    // Hide non-essential elements for printing
    document.body.classList.add('print-mode');
    
    window.print();
    
    // Restore after printing
    setTimeout(() => {
        document.title = originalTitle;
        document.body.classList.remove('print-mode');
    }, 1000);
    
    showMessage('Print dialog opened for PDF export', 'success');
}

function handleFileLoad(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const layout = JSON.parse(e.target.result);
            loadLayoutData(layout);
            showMessage('Layout loaded successfully', 'success');
        } catch (error) {
            showMessage('Error loading layout file: ' + error.message, 'error');
        }
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
}

function loadLayoutData(layout) {
    // Clear existing units
    appState.storageUnits.forEach(unit => unit.element.remove());
    appState.storageUnits = [];
    
    // Load storage units
    if (layout.storageUnits) {
        layout.storageUnits.forEach(unitData => {
            const unit = createStorageUnit(unitData.type, unitData.x, unitData.y, unitData.width, unitData.height);
            unit.id = unitData.id;
            unit.name = unitData.name;
            unit.items = unitData.items || [];
            unit.drawers = unitData.drawers || (unitData.type === 'cabinet' ? createDefaultDrawers() : null);
            
            unit.element.querySelector('.unit-label').textContent = unit.name;
            renderStorageUnitItems(unit);
            
            appState.storageUnits.push(unit);
            elements.storageUnits.appendChild(unit.element);
        });
    }
    
    // Load custom tools
    if (layout.customTools) {
        appState.customTools = layout.customTools;
    }
    
    // Load notes
    if (layout.notes) {
        elements.notesArea.value = layout.notes;
    }
    
    updateOptimizationStatus();
    updatePropertiesPanel();
}

// Utility functions
function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

function showMessage(text, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = text;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function updateStatusText(text) {
    elements.statusText.textContent = text;
}

function zoom(factor) {
    appState.zoomLevel *= factor;
    appState.zoomLevel = Math.max(0.5, Math.min(appState.zoomLevel, 2));
    elements.canvas.style.transform = `scale(${appState.zoomLevel})`;
    elements.zoomLevel.textContent = Math.round(appState.zoomLevel * 100) + '%';
}

function toggleGrid() {
    appState.isGridVisible = !appState.isGridVisible;
    elements.gridOverlay.style.display = appState.isGridVisible ? 'block' : 'none';
    document.getElementById('toggleGrid').textContent = appState.isGridVisible ? '📏 Grid' : '📏 Grid (Off)';
}

function clearAll() {
    if (confirm('Are you sure you want to clear all storage units? This cannot be undone.')) {
        appState.storageUnits.forEach(unit => unit.element.remove());
        appState.storageUnits = [];
        appState.selectedUnit = null;
        updatePropertiesPanel();
        updateOptimizationStatus();
        saveState();
        showMessage('All storage units cleared', 'success');
    }
}

function renameUnit(unit) {
    const newName = prompt('Enter new name for this unit:', unit.name);
    if (newName && newName.trim() && newName.trim() !== unit.name) {
        unit.name = newName.trim();
        unit.element.querySelector('.unit-label').textContent = unit.name;
        updatePropertiesPanel();
        saveState();
    }
}

function saveState() {
    const state = {
        storageUnits: appState.storageUnits.map(unit => ({
            id: unit.id,
            type: unit.type,
            x: unit.x,
            y: unit.y,
            width: unit.width,
            height: unit.height,
            name: unit.name,
            items: unit.items,
            drawers: unit.drawers
        })),
        customTools: appState.customTools,
        notes: elements.notesArea.value
    };
    
    appState.history = appState.history.slice(0, appState.historyIndex + 1);
    appState.history.push(JSON.stringify(state));
    appState.historyIndex++;
    
    // Limit history size
    if (appState.history.length > 50) {
        appState.history.shift();
        appState.historyIndex--;
    }
}

function undo() {
    if (appState.historyIndex > 0) {
        appState.historyIndex--;
        const state = JSON.parse(appState.history[appState.historyIndex]);
        loadLayoutData(state);
        showMessage('Undo successful', 'success');
    }
}

function redo() {
    if (appState.historyIndex < appState.history.length - 1) {
        appState.historyIndex++;
        const state = JSON.parse(appState.history[appState.historyIndex]);
        loadLayoutData(state);
        showMessage('Redo successful', 'success');
    }
}

function handleKeyboardShortcuts(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 's':
                e.preventDefault();
                saveLayout();
                break;
            case 'o':
                e.preventDefault();
                elements.fileInput.click();
                break;
            case 'z':
                e.preventDefault();
                if (e.shiftKey) {
                    redo();
                } else {
                    undo();
                }
                break;
            case 'p':
                e.preventDefault();
                exportToPDF();
                break;
        }
    }
    
    // Delete selected unit
    if (e.key === 'Delete' && appState.selectedUnit) {
        deleteStorageUnit(appState.selectedUnit.id);
    }
    
    // Escape to deselect
    if (e.key === 'Escape') {
        deselectAllUnits();
    }
}

// Global functions for onclick handlers
window.removeItemFromUnit = function(unitId, itemId) {
    const unit = appState.storageUnits.find(u => u.id === unitId);
    if (unit) {
        unit.items = unit.items.filter(item => item.id !== itemId);
        renderStorageUnitItems(unit);
        updatePropertiesPanel();
        saveState();
        showMessage('Item removed', 'success');
    }
};

window.deleteStorageUnit = function(unitId) {
    if (confirm('Are you sure you want to delete this storage unit and all its contents?')) {
        const unitIndex = appState.storageUnits.findIndex(unit => unit.id === unitId);
        if (unitIndex !== -1) {
            const unit = appState.storageUnits[unitIndex];
            unit.element.remove();
            appState.storageUnits.splice(unitIndex, 1);
            appState.selectedUnit = null;
            updatePropertiesPanel();
            updateOptimizationStatus();
            saveState();
            showMessage('Storage unit deleted', 'success');
        }
    }
};

window.showDrawerModalForUnit = function(unitId) {
    const unit = appState.storageUnits.find(u => u.id === unitId);
    if (unit) {
        showDrawerModal(unit);
    }
};

window.updateDrawerLabel = function(drawerId, label) {
    if (appState.selectedUnit && appState.selectedUnit.drawers) {
        const drawer = appState.selectedUnit.drawers.find(d => d.id === drawerId);
        if (drawer) {
            drawer.label = label;
            saveState();
        }
    }
};

window.updateDrawerColor = function(drawerId, color) {
    if (appState.selectedUnit && appState.selectedUnit.drawers) {
        const drawer = appState.selectedUnit.drawers.find(d => d.id === drawerId);
        if (drawer) {
            drawer.color = color;
            document.querySelector(`[data-drawer-id="${drawerId}"] .drawer-color-picker`).style.backgroundColor = color;
            hideColorOptions(drawerId);
            saveState();
        }
    }
};

window.toggleColorOptions = function(drawerId) {
    const colorOptions = document.getElementById(`colors-${drawerId}`);
    if (colorOptions) {
        colorOptions.classList.toggle('hidden');
    }
};

window.hideColorOptions = function(drawerId) {
    const colorOptions = document.getElementById(`colors-${drawerId}`);
    if (colorOptions) {
        colorOptions.classList.add('hidden');
    }
};

// Load saved layout on startup
window.addEventListener('load', function() {
    const savedLayout = localStorage.getItem('shedLayout');
    if (savedLayout) {
        try {
            const layout = JSON.parse(savedLayout);
            loadLayoutData(layout);
            showMessage('Previous layout restored', 'success');
        } catch (error) {
            console.error('Error loading saved layout:', error);
        }
    }
});