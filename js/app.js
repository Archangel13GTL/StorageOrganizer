// Professional Shed Layout Organizer - Enhanced Mobile Touch Support
// Optimized for Android Chrome and Pixel 8 Pro

class ShedOrganizer {
    constructor() {
        this.initializeProperties();
        this.setupEventListeners();
        this.initializeGrid();
        this.initializeServiceWorker();
        this.loadSavedData();
    }

    initializeProperties() {
        // Core properties
        this.shedWidth = config.shedWidth;
        this.shedHeight = config.shedHeight;
        this.placedItems = [];
        this.selectedStorageUnit = null;
        this.isPlacementMode = false;
        this.isDragging = false;
        this.draggedElement = null;
        this.touchStartTime = 0;
        this.longPressTimeout = null;
        this.is3DView = false;
        this.currentCabinetId = null;

        // Touch handling properties
        this.lastTap = 0;
        this.doubleTapDelay = 300;
        this.longPressDelay = 200;
        this.touchStartPos = { x: 0, y: 0 };

        // History for undo/redo
        this.history = [];
        this.historyIndex = -1;
        this.maxHistorySize = 50;

        // Storage unit configurations
        this.storageConfig = config.storageConfig;

        // Tool data with correct icons
        this.toolData = config.toolData;
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        
        // View toggle
        document.getElementById('viewToggle').addEventListener('click', () => this.toggleView());
        
        // Menu toggle
        document.getElementById('menuToggle').addEventListener('click', () => this.toggleMenu());

        // Action bar buttons
        document.getElementById('undoBtn').addEventListener('click', () => this.undo());
        document.getElementById('redoBtn').addEventListener('click', () => this.redo());
        document.getElementById('saveBtn').addEventListener('click', () => this.saveLayout());
        document.getElementById('loadBtn').addEventListener('click', () => this.loadLayout());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportLayout());

        // Storage unit touch events with proper Android handling
        document.querySelectorAll('.storage-unit').forEach(unit => {
            this.setupStorageUnitEvents(unit);
        });

        // Tool item events
        document.querySelectorAll('.tool-item').forEach(tool => {
            this.setupToolEvents(tool);
        });

        // Category toggles - Fixed implementation
        document.querySelectorAll('.category-header').forEach(header => {
            header.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleCategory(header.closest('.category'));
            });
            
            // Also handle touch events for mobile
            header.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleCategory(header.closest('.category'));
            });
        });

        // Grid events
        this.setupGridEvents();

        // Modal events
        this.setupModalEvents();

        // 3D controls
        this.setup3DControls();

        // Prevent default touch behaviors only within the grid area
        const grid = document.getElementById('shedGrid');
        grid.addEventListener('touchstart', (e) => {
            if (e.target.closest('.grid-cell')) {
                e.preventDefault();
            }
        }, { passive: false });

        grid.addEventListener('touchmove', (e) => {
            if (this.isDragging) {
                e.preventDefault();
            }
        }, { passive: false });

        // Voice commands setup
        this.setupVoiceCommands();
    }

    setupStorageUnitEvents(unit) {
        let tapCount = 0;
        let tapTimeout = null;

        // Enhanced touch handling for Android
        unit.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            this.addTouchFeedback(e.touches[0]);
            this.touchStartTime = Date.now();
            this.touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            
            // Handle double-tap detection
            tapCount++;
            if (tapCount === 1) {
                tapTimeout = setTimeout(() => {
                    tapCount = 0;
                }, this.doubleTapDelay);
            } else if (tapCount === 2) {
                clearTimeout(tapTimeout);
                tapCount = 0;
                this.handleStorageUnitDoubleTap(unit);
            }

            // Haptic feedback if available
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        }, { passive: false });

        unit.addEventListener('touchend', (e) => {
            e.preventDefault();
            const touchDuration = Date.now() - this.touchStartTime;
            
            if (touchDuration < 100) {
                // Quick tap - visual feedback only
                unit.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    unit.style.transform = '';
                }, 100);
            }
        }, { passive: false });

        // Fallback click event for non-touch devices
        unit.addEventListener('click', (e) => {
            if (!('ontouchstart' in window)) {
                this.handleStorageUnitDoubleTap(unit);
            }
        });
    }

    setupToolEvents(tool) {
        let isDragging = false;
        let startPos = { x: 0, y: 0 };

        tool.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.addTouchFeedback(e.touches[0]);
            
            startPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            this.touchStartTime = Date.now();
            
            // Long press for drag
            this.longPressTimeout = setTimeout(() => {
                isDragging = true;
                tool.classList.add('dragging');
                this.isDragging = true;
                this.draggedElement = tool;
                
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }, this.longPressDelay);

        }, { passive: false });

        tool.addEventListener('touchmove', (e) => {
            if (isDragging) {
                e.preventDefault();
                const touch = e.touches[0];
                const moveDistance = Math.abs(touch.clientX - startPos.x) + Math.abs(touch.clientY - startPos.y);
                
                if (moveDistance > 10) {
                    clearTimeout(this.longPressTimeout);
                    this.createDragGhost(tool, touch);
                }
            }
        }, { passive: false });

        tool.addEventListener('touchend', (e) => {
            e.preventDefault();
            clearTimeout(this.longPressTimeout);
            
            if (isDragging) {
                this.handleToolDrop(e.changedTouches[0]);
                tool.classList.remove('dragging');
                this.removeDragGhost();
                isDragging = false;
                this.isDragging = false;
                this.draggedElement = null;
            }
        }, { passive: false });
    }

    setupGridEvents() {
        const grid = document.getElementById('shedGrid');
        
        grid.addEventListener('touchstart', (e) => {
            if (this.isPlacementMode && this.selectedStorageUnit) {
                e.preventDefault();
                const touch = e.touches[0];
                const cell = this.getCellFromTouch(touch);
                if (cell) {
                    this.placementPreview(cell);
                }
            }
        }, { passive: false });

        grid.addEventListener('touchend', (e) => {
            if (this.isPlacementMode && this.selectedStorageUnit) {
                e.preventDefault();
                const touch = e.changedTouches[0];
                const cell = this.getCellFromTouch(touch);
                if (cell) {
                    this.placeStorageUnit(cell);
                }
            }
        }, { passive: false });

        // Fallback for non-touch devices
        grid.addEventListener('click', (e) => {
            if (!('ontouchstart' in window) && this.isPlacementMode && this.selectedStorageUnit) {
                const cell = e.target.closest('.grid-cell');
                if (cell) {
                    this.placeStorageUnit(cell);
                }
            }
        });
    }

    initializeGrid() {
        const grid = document.getElementById('shedGrid');
        grid.innerHTML = '';

        for (let row = 0; row < this.shedHeight; row++) {
            for (let col = 0; col < this.shedWidth; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                grid.appendChild(cell);
            }
        }
    }

    handleStorageUnitDoubleTap(unit) {
        // Clear any previous selection
        document.querySelectorAll('.storage-unit').forEach(u => {
            u.classList.remove('selected', 'placement-mode');
        });
        
        // Select the current unit with enhanced visual feedback
        unit.classList.add('selected', 'placement-mode');
        this.selectedStorageUnit = {
            type: unit.dataset.type,
            width: parseFloat(unit.dataset.width),
            height: parseFloat(unit.dataset.height),
            element: unit
        };
        
        this.isPlacementMode = true;
        this.showToast('✨ Placement mode activated! Tap grid to place unit');
        
        // Visual feedback on grid
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.classList.add('highlight');
        });

        // Auto-exit placement mode after 10 seconds
        setTimeout(() => {
            if (this.isPlacementMode) {
                this.exitPlacementMode();
            }
        }, 10000);
    }

    getCellFromTouch(touch) {
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        return element?.closest('.grid-cell');
    }

    placementPreview(cell) {
        // Clear previous previews
        document.querySelectorAll('.grid-cell').forEach(c => {
            c.classList.remove('highlight', 'invalid');
        });

        if (!this.selectedStorageUnit) return;

        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const width = Math.ceil(this.selectedStorageUnit.width);
        const height = Math.ceil(this.selectedStorageUnit.height);

        let canPlace = true;

        // Check if placement is valid
        for (let r = row; r < row + height; r++) {
            for (let c = col; c < col + width; c++) {
                const targetCell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                if (!targetCell || this.isCellOccupied(r, c)) {
                    canPlace = false;
                }
            }
        }

        // Highlight cells
        for (let r = row; r < row + height; r++) {
            for (let c = col; c < col + width; c++) {
                const targetCell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                if (targetCell) {
                    targetCell.classList.add(canPlace ? 'highlight' : 'invalid');
                }
            }
        }
    }

    placeStorageUnit(cell) {
        if (!this.selectedStorageUnit) return;

        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const width = Math.ceil(this.selectedStorageUnit.width);
        const height = Math.ceil(this.selectedStorageUnit.height);

        // Validate placement
        if (!this.canPlaceUnit(row, col, width, height)) {
            this.showToast('❌ Cannot place here - check for obstacles');
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
            return;
        }

        const unitId = Date.now().toString();
        const unitType = this.selectedStorageUnit.type;

        // Create placed unit with proper configuration
        const placedUnit = this.createPlacedUnitElement({
            id: unitId,
            type: unitType,
            row: row,
            col: col,
            width: width,
            height: height,
            tools: unitType === 'cabinet' ? { 1: [], 2: [], 3: [], 4: [] } : []
        });

        // Add to DOM
        document.getElementById('placedItems').appendChild(placedUnit);

        // Add to placed items array
        this.placedItems.push({
            id: unitId,
            type: unitType,
            row: row,
            col: col,
            width: width,
            height: height,
            tools: unitType === 'cabinet' ? { 1: [], 2: [], 3: [], 4: [] } : []
        });

        // Save state for undo
        this.saveState();

        // Success feedback
        this.showToast('✅ Storage unit placed successfully!');
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
        }

        // Exit placement mode
        this.exitPlacementMode();
        this.updateCapacityDisplay();
        this.autoSave();
    }

    setupPlacedUnitEvents(unit) {
        // Double-tap to open cabinet organization
        let tapCount = 0;
        let tapTimeout = null;

        unit.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            tapCount++;
            if (tapCount === 1) {
                tapTimeout = setTimeout(() => {
                    tapCount = 0;
                }, this.doubleTapDelay);
            } else if (tapCount === 2) {
                clearTimeout(tapTimeout);
                tapCount = 0;
                
                if (unit.dataset.type === 'cabinet') {
                    this.openCabinetModal(unit.dataset.id);
                }
            }
        }, { passive: false });

        // Long press to delete
        let longPressTimeout;
        unit.addEventListener('touchstart', (e) => {
            longPressTimeout = setTimeout(() => {
                if (confirm('Delete this storage unit?')) {
                    this.removeStorageUnit(unit);
                }
            }, 1000);
        });

        unit.addEventListener('touchend', () => {
            clearTimeout(longPressTimeout);
        });

        unit.addEventListener('touchmove', () => {
            clearTimeout(longPressTimeout);
        });

        // Fallback for non-touch devices
        unit.addEventListener('dblclick', () => {
            if (unit.dataset.type === 'cabinet') {
                this.openCabinetModal(unit.dataset.id);
            }
        });
    }

    canPlaceUnit(row, col, width, height) {
        // Check boundaries
        if (row + height > this.shedHeight || col + width > this.shedWidth) {
            return false;
        }

        // Check for occupied cells
        for (let r = row; r < row + height; r++) {
            for (let c = col; c < col + width; c++) {
                if (this.isCellOccupied(r, c)) {
                    return false;
                }
            }
        }

        return true;
    }

    isCellOccupied(row, col) {
        return this.placedItems.some(item => {
            return row >= item.row && row < item.row + item.height &&
                   col >= item.col && col < item.col + item.width;
        });
    }

    exitPlacementMode() {
        this.isPlacementMode = false;
        this.selectedStorageUnit = null;
        
        document.querySelectorAll('.storage-unit').forEach(u => {
            u.classList.remove('selected', 'placement-mode');
        });
        document.querySelectorAll('.grid-cell').forEach(c => {
            c.classList.remove('highlight', 'invalid');
        });
    }

    // Fixed category toggle functionality
    toggleCategory(category) {
        const tools = category.querySelector('.category-tools');
        const toggle = category.querySelector('.category-toggle');
        
        if (tools.classList.contains('hidden')) {
            tools.classList.remove('hidden');
            toggle.textContent = '▼';
            toggle.setAttribute('aria-expanded', 'true');
        } else {
            tools.classList.add('hidden');
            toggle.textContent = '▶';
            toggle.setAttribute('aria-expanded', 'false');
        }
    }

    createDragGhost(tool, touch) {
        // Remove existing ghost
        this.removeDragGhost();

        const ghost = document.createElement('div');
        ghost.className = 'drag-ghost';
        
        const icon = tool.querySelector('.tool-icon').textContent;
        const name = tool.querySelector('.tool-name').textContent;
        ghost.innerHTML = `${icon} ${name}`;

        document.body.appendChild(ghost);
        this.dragGhost = ghost;

        this.updateDragGhost(touch);
    }

    updateDragGhost(touch) {
        if (this.dragGhost) {
            this.dragGhost.style.left = touch.clientX + 'px';
            this.dragGhost.style.top = touch.clientY + 'px';
        }
    }

    removeDragGhost() {
        if (this.dragGhost) {
            document.body.removeChild(this.dragGhost);
            this.dragGhost = null;
        }
    }

    handleToolDrop(touch) {
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropTarget = element?.closest('.placed-unit, .drawer-tools');
        
        if (dropTarget && this.draggedElement) {
            const toolData = {
                name: this.draggedElement.querySelector('.tool-name').textContent,
                icon: this.draggedElement.querySelector('.tool-icon').textContent,
                category: this.draggedElement.closest('.category').dataset.category
            };

            if (dropTarget.classList.contains('placed-unit')) {
                this.addToolToStorage(dropTarget.dataset.id, toolData);
            } else if (dropTarget.classList.contains('drawer-tools')) {
                this.addToolToDrawer(dropTarget.closest('.drawer').dataset.drawer, toolData);
            }

            this.showToast(`✅ ${toolData.name} added successfully!`);
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        }
    }

    addToolToStorage(storageId, toolData) {
        const storage = this.placedItems.find(item => item.id === storageId);
        if (storage) {
            if (storage.type === 'cabinet') {
                // Add to first available drawer
                for (let drawer = 1; drawer <= 4; drawer++) {
                    if (storage.tools[drawer].length < 12) {
                        storage.tools[drawer].push(toolData);
                        break;
                    }
                }
            } else {
                storage.tools.push(toolData);
            }
            this.saveState();
            this.updateCapacityDisplay();
            this.autoSave();
        }
    }

    addToolToDrawer(drawerNumber, toolData) {
        if (this.currentCabinetId) {
            const cabinet = this.placedItems.find(item => item.id === this.currentCabinetId);
            if (cabinet && cabinet.tools[drawerNumber].length < 12) {
                cabinet.tools[drawerNumber].push(toolData);
                this.renderDrawerTools();
                this.saveState();
                this.updateCapacityDisplay();
                this.autoSave();
            }
        }
    }

    // Fixed cabinet modal functionality
    openCabinetModal(cabinetId) {
        this.currentCabinetId = cabinetId;
        const modal = document.getElementById('cabinetModal');
        modal.classList.remove('hidden');
        this.renderDrawerTools();
        this.showToast('🗂️ Cabinet organization opened');
    }

    renderDrawerTools() {
        const cabinet = this.placedItems.find(item => item.id === this.currentCabinetId);
        if (!cabinet) return;

        for (let drawer = 1; drawer <= 4; drawer++) {
            const drawerTools = document.querySelector(`[data-drawer="${drawer}"] .drawer-tools`);
            drawerTools.innerHTML = '';

            cabinet.tools[drawer].forEach((tool, index) => {
                const toolElement = document.createElement('div');
                toolElement.className = 'drawer-tool';
                toolElement.innerHTML = `
                    <span>${tool.icon}</span>
                    <span>${tool.name}</span>
                    <button onclick="shedOrganizer.removeToolFromDrawer(${drawer}, ${index})">×</button>
                `;
                drawerTools.appendChild(toolElement);
            });
        }
    }

    removeToolFromDrawer(drawerNumber, toolIndex) {
        const cabinet = this.placedItems.find(item => item.id === this.currentCabinetId);
        if (cabinet) {
            cabinet.tools[drawerNumber].splice(toolIndex, 1);
            this.renderDrawerTools();
            this.saveState();
            this.updateCapacityDisplay();
            this.autoSave();
            this.showToast('Tool removed from drawer');
        }
    }

    setupModalEvents() {
        document.getElementById('closeCabinetModal').addEventListener('click', () => {
            document.getElementById('cabinetModal').classList.add('hidden');
            this.currentCabinetId = null;
        });

        // Close modal when clicking outside
        document.getElementById('cabinetModal').addEventListener('click', (e) => {
            if (e.target.id === 'cabinetModal') {
                document.getElementById('cabinetModal').classList.add('hidden');
                this.currentCabinetId = null;
            }
        });
    }

    toggleView() {
        this.is3DView = !this.is3DView;
        const viewToggle = document.getElementById('viewToggle');
        const threeDView = document.getElementById('threeDView');
        
        if (this.is3DView) {
            threeDView.classList.remove('hidden');
            viewToggle.innerHTML = '<span class="view-icon">📐</span> 3D';
            this.render3DView();
            this.showToast('🎯 Switched to 3D view');
        } else {
            threeDView.classList.add('hidden');
            viewToggle.innerHTML = '<span class="view-icon">📐</span> 2D';
            this.showToast('📋 Switched to 2D view');
        }
    }

    render3DView() {
        const canvas = document.getElementById('threeDCanvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = canvas.offsetWidth * window.devicePixelRatio || canvas.offsetWidth;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio || canvas.offsetHeight;
        canvas.style.width = canvas.offsetWidth + 'px';
        canvas.style.height = canvas.offsetHeight + 'px';
        ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw isometric grid
        this.drawIsometricGrid(ctx, canvas.offsetWidth, canvas.offsetHeight);
        
        // Draw placed items in 3D
        this.placedItems.forEach(item => {
            this.drawIsometricUnit(ctx, item, canvas.offsetWidth, canvas.offsetHeight);
        });
    }

    drawIsometricGrid(ctx, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const cellSize = 20;
        
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-border');
        ctx.lineWidth = 1;
        
        // Draw isometric grid lines
        for (let i = -this.shedWidth; i <= this.shedWidth; i++) {
            ctx.beginPath();
            ctx.moveTo(centerX + i * cellSize, centerY - this.shedHeight * cellSize * 0.5);
            ctx.lineTo(centerX + i * cellSize, centerY + this.shedHeight * cellSize * 0.5);
            ctx.stroke();
        }
        
        for (let j = -this.shedHeight; j <= this.shedHeight; j++) {
            ctx.beginPath();
            ctx.moveTo(centerX - this.shedWidth * cellSize, centerY + j * cellSize * 0.5);
            ctx.lineTo(centerX + this.shedWidth * cellSize, centerY + j * cellSize * 0.5);
            ctx.stroke();
        }
    }

    drawIsometricUnit(ctx, item, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const cellSize = 20;
        const unitHeight = 30;
        
        const x = centerX + (item.col - this.shedWidth/2) * cellSize;
        const y = centerY + (item.row - this.shedHeight/2) * cellSize * 0.5;
        
        // Draw 3D box
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
        ctx.fillRect(x, y - unitHeight, item.width * cellSize, unitHeight);
        
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-hover');
        ctx.fillRect(x, y, item.width * cellSize, item.height * cellSize * 0.5);
        
        // Add label
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-text');
        ctx.font = '12px var(--font-family-base)';
        ctx.textAlign = 'center';
        ctx.fillText(item.type.replace('_', ' '), x + item.width * cellSize / 2, y + 15);
    }

    setup3DControls() {
        document.getElementById('rotateLeft').addEventListener('click', () => {
            this.showToast('↺ Rotating left...');
            setTimeout(() => this.render3DView(), 100);
        });
        
        document.getElementById('rotateRight').addEventListener('click', () => {
            this.showToast('↻ Rotating right...');
            setTimeout(() => this.render3DView(), 100);
        });
        
        document.getElementById('zoomIn').addEventListener('click', () => {
            this.showToast('🔍 Zooming in...');
            setTimeout(() => this.render3DView(), 100);
        });
        
        document.getElementById('zoomOut').addEventListener('click', () => {
            this.showToast('🔍 Zooming out...');
            setTimeout(() => this.render3DView(), 100);
        });
    }

    // Fixed theme toggle functionality
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 
                            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        
        localStorage.setItem('theme', newTheme);
        this.showToast(`🎨 Switched to ${newTheme} mode`);
        
        // Re-render 3D view if active to use new colors
        if (this.is3DView) {
            setTimeout(() => this.render3DView(), 100);
        }
    }

    saveState() {
        const state = {
            placedItems: [...this.placedItems],
            timestamp: Date.now()
        };
        
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(state);
        
        if (this.history.length > this.maxHistorySize) {
            this.history.shift();
        } else {
            this.historyIndex++;
        }
        
        this.updateUndoRedoButtons();
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.restoreState(this.history[this.historyIndex]);
            this.showToast('↶ Undone');
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.restoreState(this.history[this.historyIndex]);
            this.showToast('↷ Redone');
        }
    }

    restoreState(state) {
        this.placedItems = [...state.placedItems];
        this.renderPlacedItems();
        this.updateCapacityDisplay();
        this.updateUndoRedoButtons();
    }

    renderPlacedItems() {
        const container = document.getElementById('placedItems');
        container.innerHTML = '';
        
        this.placedItems.forEach(item => {
            const element = this.createPlacedUnitElement(item);
            container.appendChild(element);
        });
    }

    createPlacedUnitElement(item) {
        const placedUnit = document.createElement('div');
        placedUnit.className = 'placed-unit';
        placedUnit.dataset.type = item.type;
        placedUnit.dataset.row = item.row;
        placedUnit.dataset.col = item.col;
        placedUnit.dataset.width = item.width;
        placedUnit.dataset.height = item.height;
        placedUnit.dataset.id = item.id;

        const cellWidth = 100 / this.shedWidth;
        const cellHeight = 100 / this.shedHeight;
        
        placedUnit.style.left = `${item.col * cellWidth}%`;
        placedUnit.style.top = `${item.row * cellHeight}%`;
        placedUnit.style.width = `${item.width * cellWidth}%`;
        placedUnit.style.height = `${item.height * cellHeight}%`;

        // Use consistent storage configuration
        const config = this.storageConfig[item.type];
        if (!config) {
            console.error('Unknown storage type:', item.type);
            return placedUnit;
        }

        const icon = document.createElement('span');
        icon.className = 'unit-icon';
        icon.textContent = config.icon;
        
        const name = document.createElement('span');
        name.className = 'unit-name';
        name.textContent = config.name;

        placedUnit.appendChild(icon);
        placedUnit.appendChild(name);

        this.setupPlacedUnitEvents(placedUnit);
        return placedUnit;
    }

    updateUndoRedoButtons() {
        document.getElementById('undoBtn').disabled = this.historyIndex <= 0;
        document.getElementById('redoBtn').disabled = this.historyIndex >= this.history.length - 1;
    }

    updateCapacityDisplay() {
        let totalCapacity = 0;
        let usedCapacity = 0;
        
        this.placedItems.forEach(item => {
            const config = this.storageConfig[item.type];
            if (config) {
                totalCapacity += config.capacity;
                
                if (item.type === 'cabinet') {
                    Object.values(item.tools).forEach(drawer => {
                        usedCapacity += drawer.length;
                    });
                } else {
                    usedCapacity += item.tools.length;
                }
            }
        });
        
        document.getElementById('totalCapacity').textContent = totalCapacity;
        document.getElementById('usedCapacity').textContent = usedCapacity;
    }

    saveLayout() {
        const layout = {
            placedItems: this.placedItems,
            timestamp: Date.now(),
            version: '1.0'
        };

        localStorage.setItem('shedLayout', JSON.stringify(layout));
        this.showToast('💾 Layout saved successfully!');
        this.getAISuggestions(layout);
    }

    loadLayout() {
        const saved = localStorage.getItem('shedLayout');
        if (saved) {
            try {
                const layout = JSON.parse(saved);
                this.placedItems = layout.placedItems || [];
                this.renderPlacedItems();
                this.updateCapacityDisplay();
                this.saveState();
                this.showToast('📁 Layout loaded successfully!');
            } catch (error) {
                this.showToast('❌ Error loading layout');
                console.error('Load error:', error);
            }
        } else {
            this.showToast('📁 No saved layout found');
        }
    }

    autoSave() {
        const layout = {
            placedItems: this.placedItems,
            timestamp: Date.now(),
            version: '1.0'
        };
        
        localStorage.setItem('shedLayoutAutoSave', JSON.stringify(layout));
    }

    loadSavedData() {
        // Load theme preference
        const savedTheme = localStorage.getItem('theme') || 
                          (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-color-scheme', savedTheme);
        document.querySelector('.theme-icon').textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        
        // Load auto-saved layout
        const autoSaved = localStorage.getItem('shedLayoutAutoSave');
        if (autoSaved) {
            try {
                const layout = JSON.parse(autoSaved);
                this.placedItems = layout.placedItems || [];
                this.renderPlacedItems();
                this.updateCapacityDisplay();
            } catch (error) {
                console.error('Auto-load error:', error);
            }
        }
        
        // Initialize state
        this.saveState();
    }

    exportLayout() {
        this.showLoadingIndicator();
        
        setTimeout(() => {
            const exportData = {
                layout: this.placedItems,
                metadata: {
                    exportDate: new Date().toISOString(),
                    totalItems: this.placedItems.length,
                    totalCapacity: document.getElementById('totalCapacity').textContent,
                    usedCapacity: document.getElementById('usedCapacity').textContent
                }
            };
            
            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `shed-layout-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            
            URL.revokeObjectURL(url);
            this.hideLoadingIndicator();
            this.showToast('📤 Layout exported successfully!');
        }, 1000);
    }

    removeStorageUnit(unit) {
        const id = unit.dataset.id;
        this.placedItems = this.placedItems.filter(item => item.id !== id);
        unit.remove();
        this.saveState();
        this.updateCapacityDisplay();
        this.autoSave();
        this.showToast('🗑️ Storage unit removed');
    }

    addTouchFeedback(touch) {
        const feedback = document.createElement('div');
        feedback.className = 'touch-feedback';
        feedback.style.left = touch.clientX - 20 + 'px';
        feedback.style.top = touch.clientY - 20 + 'px';
        feedback.style.width = '40px';
        feedback.style.height = '40px';
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.textContent = message;
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    showLoadingIndicator() {
        document.getElementById('loadingIndicator').classList.remove('hidden');
    }

    hideLoadingIndicator() {
        document.getElementById('loadingIndicator').classList.add('hidden');
    }

    async getAISuggestions(layout) {
        try {
            this.showLoadingIndicator();
            const getSuggestions = firebase.functions().httpsCallable('getAISuggestions');
            const result = await getSuggestions({ layout });
            const suggestions = result.data && result.data.suggestions;
            if (suggestions && suggestions.length) {
                this.showToast(`🤖 ${suggestions.join(' ')}`);
            } else {
                this.showToast('🤖 No suggestions available');
            }
        } catch (error) {
            console.error('AI suggestion error:', error);
            this.showToast('⚠️ Failed to get AI suggestions');
        } finally {
            this.hideLoadingIndicator();
        }
    }

    setupVoiceCommands() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                this.processVoiceCommand(command);
            };

            this.recognition.onerror = (event) => {
                console.warn('Speech recognition error:', event.error);
            };
        }
    }

    processVoiceCommand(command) {
        if (command.includes('save layout')) {
            this.saveLayout();
        } else if (command.includes('load layout')) {
            this.loadLayout();
        } else if (command.includes('toggle 3d') || command.includes('three d')) {
            this.toggleView();
        } else if (command.includes('undo')) {
            this.undo();
        } else if (command.includes('redo')) {
            this.redo();
        } else if (command.includes('export')) {
            this.exportLayout();
        } else {
            this.showToast('🎤 Voice command not recognized');
        }
    }

    toggleMenu() {
        // Start voice recognition if available
        if (this.recognition) {
            this.recognition.start();
            this.showToast('🎤 Listening for voice commands...');
        } else {
            this.showToast('🎤 Voice commands not supported');
        }
    }

    initializeServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('SW registered:', registration);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        }
    }
}

// Initialize the application
let shedOrganizer;

document.addEventListener('DOMContentLoaded', () => {
    shedOrganizer = new ShedOrganizer();
});

// PWA install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button or notification
    const installBtn = document.createElement('button');
    installBtn.textContent = '📱 Install App';
    installBtn.className = 'btn btn--primary';
    installBtn.style.position = 'fixed';
    installBtn.style.top = '10px';
    installBtn.style.right = '10px';
    installBtn.style.zIndex = '1000';
    
    installBtn.addEventListener('click', () => {
        installBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
        });
    });
    
    document.body.appendChild(installBtn);
});

// Handle app install
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
});

