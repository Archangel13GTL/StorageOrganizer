"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Professional Shed Layout Organizer - Enhanced Mobile Touch Support
// Optimized for Android Chrome and Pixel 8 Pro
var ShedOrganizer = /*#__PURE__*/function () {
  function ShedOrganizer() {
    _classCallCheck(this, ShedOrganizer);
    this.initializeProperties();
    this.setupEventListeners();
    this.initializeGrid();
    this.initializeServiceWorker();
    this.loadSavedData();
  }
  return _createClass(ShedOrganizer, [{
    key: "initializeProperties",
    value: function initializeProperties() {
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
      this.touchStartPos = {
        x: 0,
        y: 0
      };

      // History for undo/redo
      this.history = [];
      this.historyIndex = -1;
      this.maxHistorySize = 50;

      // Storage unit configurations
      this.storageConfig = config.storageConfig;

      // Tool data with correct icons
      this.toolData = config.toolData;
    }
  }, {
    key: "setupEventListeners",
    value: function setupEventListeners() {
      var _this = this;
      // Theme toggle
      document.getElementById('themeToggle').addEventListener('click', function () {
        return _this.toggleTheme();
      });

      // View toggle
      document.getElementById('viewToggle').addEventListener('click', function () {
        return _this.toggleView();
      });

      // Menu toggle
      document.getElementById('menuToggle').addEventListener('click', function () {
        return _this.toggleMenu();
      });

      // Action bar buttons
      document.getElementById('undoBtn').addEventListener('click', function () {
        return _this.undo();
      });
      document.getElementById('redoBtn').addEventListener('click', function () {
        return _this.redo();
      });
      document.getElementById('saveBtn').addEventListener('click', function () {
        return _this.saveLayout();
      });
      document.getElementById('loadBtn').addEventListener('click', function () {
        return _this.loadLayout();
      });
      document.getElementById('exportBtn').addEventListener('click', function () {
        return _this.exportLayout();
      });

      // Storage unit touch events with proper Android handling
      document.querySelectorAll('.storage-unit').forEach(function (unit) {
        _this.setupStorageUnitEvents(unit);
      });

      // Tool item events
      document.querySelectorAll('.tool-item').forEach(function (tool) {
        _this.setupToolEvents(tool);
      });

      // Category toggles - Fixed implementation
      document.querySelectorAll('.category-header').forEach(function (header) {
        header.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          _this.toggleCategory(header.closest('.category'));
        });

        // Also handle touch events for mobile
        header.addEventListener('touchend', function (e) {
          e.preventDefault();
          e.stopPropagation();
          _this.toggleCategory(header.closest('.category'));
        });
      });

      // Grid events
      this.setupGridEvents();

      // Modal events
      this.setupModalEvents();

      // 3D controls
      this.setup3DControls();

      // Prevent default touch behaviors that interfere with our custom handling
      document.addEventListener('touchstart', function (e) {
        if (e.target.closest('.shed-grid, .storage-unit, .tool-item')) {
          e.preventDefault();
        }
      }, {
        passive: false
      });
      document.addEventListener('touchmove', function (e) {
        if (_this.isDragging) {
          e.preventDefault();
        }
      }, {
        passive: false
      });

      // Voice commands setup
      this.setupVoiceCommands();
    }
  }, {
    key: "setupStorageUnitEvents",
    value: function setupStorageUnitEvents(unit) {
      var _this2 = this;
      var tapCount = 0;
      var tapTimeout = null;

      // Enhanced touch handling for Android
      unit.addEventListener('touchstart', function (e) {
        e.preventDefault();
        e.stopPropagation();
        _this2.addTouchFeedback(e.touches[0]);
        _this2.touchStartTime = Date.now();
        _this2.touchStartPos = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };

        // Handle double-tap detection
        tapCount++;
        if (tapCount === 1) {
          tapTimeout = setTimeout(function () {
            tapCount = 0;
          }, _this2.doubleTapDelay);
        } else if (tapCount === 2) {
          clearTimeout(tapTimeout);
          tapCount = 0;
          _this2.handleStorageUnitDoubleTap(unit);
        }

        // Haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate(10);
        }
      }, {
        passive: false
      });
      unit.addEventListener('touchend', function (e) {
        e.preventDefault();
        var touchDuration = Date.now() - _this2.touchStartTime;
        if (touchDuration < 100) {
          // Quick tap - visual feedback only
          unit.style.transform = 'scale(0.95)';
          setTimeout(function () {
            unit.style.transform = '';
          }, 100);
        }
      }, {
        passive: false
      });

      // Fallback click event for non-touch devices
      unit.addEventListener('click', function (e) {
        if (!('ontouchstart' in window)) {
          _this2.handleStorageUnitDoubleTap(unit);
        }
      });
    }
  }, {
    key: "setupToolEvents",
    value: function setupToolEvents(tool) {
      var _this3 = this;
      var isDragging = false;
      var startPos = {
        x: 0,
        y: 0
      };
      tool.addEventListener('touchstart', function (e) {
        e.preventDefault();
        _this3.addTouchFeedback(e.touches[0]);
        startPos = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
        _this3.touchStartTime = Date.now();

        // Long press for drag
        _this3.longPressTimeout = setTimeout(function () {
          isDragging = true;
          tool.classList.add('dragging');
          _this3.isDragging = true;
          _this3.draggedElement = tool;
          if (navigator.vibrate) {
            navigator.vibrate(50);
          }
        }, _this3.longPressDelay);
      }, {
        passive: false
      });
      tool.addEventListener('touchmove', function (e) {
        if (isDragging) {
          e.preventDefault();
          var touch = e.touches[0];
          var moveDistance = Math.abs(touch.clientX - startPos.x) + Math.abs(touch.clientY - startPos.y);
          if (moveDistance > 10) {
            clearTimeout(_this3.longPressTimeout);
            _this3.createDragGhost(tool, touch);
          }
        }
      }, {
        passive: false
      });
      tool.addEventListener('touchend', function (e) {
        e.preventDefault();
        clearTimeout(_this3.longPressTimeout);
        if (isDragging) {
          _this3.handleToolDrop(e.changedTouches[0]);
          tool.classList.remove('dragging');
          _this3.removeDragGhost();
          isDragging = false;
          _this3.isDragging = false;
          _this3.draggedElement = null;
        }
      }, {
        passive: false
      });
    }
  }, {
    key: "setupGridEvents",
    value: function setupGridEvents() {
      var _this4 = this;
      var grid = document.getElementById('shedGrid');
      grid.addEventListener('touchstart', function (e) {
        if (_this4.isPlacementMode && _this4.selectedStorageUnit) {
          e.preventDefault();
          var touch = e.touches[0];
          var cell = _this4.getCellFromTouch(touch);
          if (cell) {
            _this4.placementPreview(cell);
          }
        }
      }, {
        passive: false
      });
      grid.addEventListener('touchend', function (e) {
        if (_this4.isPlacementMode && _this4.selectedStorageUnit) {
          e.preventDefault();
          var touch = e.changedTouches[0];
          var cell = _this4.getCellFromTouch(touch);
          if (cell) {
            _this4.placeStorageUnit(cell);
          }
        }
      }, {
        passive: false
      });

      // Fallback for non-touch devices
      grid.addEventListener('click', function (e) {
        if (!('ontouchstart' in window) && _this4.isPlacementMode && _this4.selectedStorageUnit) {
          var cell = e.target.closest('.grid-cell');
          if (cell) {
            _this4.placeStorageUnit(cell);
          }
        }
      });
    }
  }, {
    key: "initializeGrid",
    value: function initializeGrid() {
      var grid = document.getElementById('shedGrid');
      grid.innerHTML = '';
      for (var row = 0; row < this.shedHeight; row++) {
        for (var col = 0; col < this.shedWidth; col++) {
          var cell = document.createElement('div');
          cell.className = 'grid-cell';
          cell.dataset.row = row;
          cell.dataset.col = col;
          grid.appendChild(cell);
        }
      }
    }
  }, {
    key: "handleStorageUnitDoubleTap",
    value: function handleStorageUnitDoubleTap(unit) {
      var _this5 = this;
      // Clear any previous selection
      document.querySelectorAll('.storage-unit').forEach(function (u) {
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
      document.querySelectorAll('.grid-cell').forEach(function (cell) {
        cell.classList.add('highlight');
      });

      // Auto-exit placement mode after 10 seconds
      setTimeout(function () {
        if (_this5.isPlacementMode) {
          _this5.exitPlacementMode();
        }
      }, 10000);
    }
  }, {
    key: "getCellFromTouch",
    value: function getCellFromTouch(touch) {
      var element = document.elementFromPoint(touch.clientX, touch.clientY);
      return element === null || element === void 0 ? void 0 : element.closest('.grid-cell');
    }
  }, {
    key: "placementPreview",
    value: function placementPreview(cell) {
      // Clear previous previews
      document.querySelectorAll('.grid-cell').forEach(function (c) {
        c.classList.remove('highlight', 'invalid');
      });
      if (!this.selectedStorageUnit) return;
      var row = parseInt(cell.dataset.row);
      var col = parseInt(cell.dataset.col);
      var width = Math.ceil(this.selectedStorageUnit.width);
      var height = Math.ceil(this.selectedStorageUnit.height);
      var canPlace = true;

      // Check if placement is valid
      for (var r = row; r < row + height; r++) {
        for (var c = col; c < col + width; c++) {
          var targetCell = document.querySelector("[data-row=\"".concat(r, "\"][data-col=\"").concat(c, "\"]"));
          if (!targetCell || this.isCellOccupied(r, c)) {
            canPlace = false;
          }
        }
      }

      // Highlight cells
      for (var _r = row; _r < row + height; _r++) {
        for (var _c = col; _c < col + width; _c++) {
          var _targetCell = document.querySelector("[data-row=\"".concat(_r, "\"][data-col=\"").concat(_c, "\"]"));
          if (_targetCell) {
            _targetCell.classList.add(canPlace ? 'highlight' : 'invalid');
          }
        }
      }
    }
  }, {
    key: "placeStorageUnit",
    value: function placeStorageUnit(cell) {
      if (!this.selectedStorageUnit) return;
      var row = parseInt(cell.dataset.row);
      var col = parseInt(cell.dataset.col);
      var width = Math.ceil(this.selectedStorageUnit.width);
      var height = Math.ceil(this.selectedStorageUnit.height);

      // Validate placement
      if (!this.canPlaceUnit(row, col, width, height)) {
        this.showToast('❌ Cannot place here - check for obstacles');
        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 100]);
        }
        return;
      }
      var unitId = Date.now().toString();
      var unitType = this.selectedStorageUnit.type;

      // Create placed unit with proper configuration
      var placedUnit = this.createPlacedUnitElement({
        id: unitId,
        type: unitType,
        row: row,
        col: col,
        width: width,
        height: height,
        tools: unitType === 'cabinet' ? {
          1: [],
          2: [],
          3: [],
          4: []
        } : []
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
        tools: unitType === 'cabinet' ? {
          1: [],
          2: [],
          3: [],
          4: []
        } : []
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
  }, {
    key: "setupPlacedUnitEvents",
    value: function setupPlacedUnitEvents(unit) {
      var _this6 = this;
      // Double-tap to open cabinet organization
      var tapCount = 0;
      var tapTimeout = null;
      unit.addEventListener('touchstart', function (e) {
        e.preventDefault();
        e.stopPropagation();
        tapCount++;
        if (tapCount === 1) {
          tapTimeout = setTimeout(function () {
            tapCount = 0;
          }, _this6.doubleTapDelay);
        } else if (tapCount === 2) {
          clearTimeout(tapTimeout);
          tapCount = 0;
          if (unit.dataset.type === 'cabinet') {
            _this6.openCabinetModal(unit.dataset.id);
          }
        }
      }, {
        passive: false
      });

      // Long press to delete
      var longPressTimeout;
      unit.addEventListener('touchstart', function (e) {
        longPressTimeout = setTimeout(function () {
          if (confirm('Delete this storage unit?')) {
            _this6.removeStorageUnit(unit);
          }
        }, 1000);
      });
      unit.addEventListener('touchend', function () {
        clearTimeout(longPressTimeout);
      });
      unit.addEventListener('touchmove', function () {
        clearTimeout(longPressTimeout);
      });

      // Fallback for non-touch devices
      unit.addEventListener('dblclick', function () {
        if (unit.dataset.type === 'cabinet') {
          _this6.openCabinetModal(unit.dataset.id);
        }
      });
    }
  }, {
    key: "canPlaceUnit",
    value: function canPlaceUnit(row, col, width, height) {
      // Check boundaries
      if (row + height > this.shedHeight || col + width > this.shedWidth) {
        return false;
      }

      // Check for occupied cells
      for (var r = row; r < row + height; r++) {
        for (var c = col; c < col + width; c++) {
          if (this.isCellOccupied(r, c)) {
            return false;
          }
        }
      }
      return true;
    }
  }, {
    key: "isCellOccupied",
    value: function isCellOccupied(row, col) {
      return this.placedItems.some(function (item) {
        return row >= item.row && row < item.row + item.height && col >= item.col && col < item.col + item.width;
      });
    }
  }, {
    key: "exitPlacementMode",
    value: function exitPlacementMode() {
      this.isPlacementMode = false;
      this.selectedStorageUnit = null;
      document.querySelectorAll('.storage-unit').forEach(function (u) {
        u.classList.remove('selected', 'placement-mode');
      });
      document.querySelectorAll('.grid-cell').forEach(function (c) {
        c.classList.remove('highlight', 'invalid');
      });
    }

    // Fixed category toggle functionality
  }, {
    key: "toggleCategory",
    value: function toggleCategory(category) {
      var tools = category.querySelector('.category-tools');
      var toggle = category.querySelector('.category-toggle');
      if (tools.classList.contains('hidden')) {
        tools.classList.remove('hidden');
        toggle.textContent = '▼';
      } else {
        tools.classList.add('hidden');
        toggle.textContent = '▶';
      }
    }
  }, {
    key: "createDragGhost",
    value: function createDragGhost(tool, touch) {
      // Remove existing ghost
      this.removeDragGhost();
      var ghost = document.createElement('div');
      ghost.className = 'drag-ghost';
      var icon = tool.querySelector('.tool-icon').textContent;
      var name = tool.querySelector('.tool-name').textContent;
      ghost.innerHTML = "".concat(icon, " ").concat(name);
      document.body.appendChild(ghost);
      this.dragGhost = ghost;
      this.updateDragGhost(touch);
    }
  }, {
    key: "updateDragGhost",
    value: function updateDragGhost(touch) {
      if (this.dragGhost) {
        this.dragGhost.style.left = touch.clientX + 'px';
        this.dragGhost.style.top = touch.clientY + 'px';
      }
    }
  }, {
    key: "removeDragGhost",
    value: function removeDragGhost() {
      if (this.dragGhost) {
        document.body.removeChild(this.dragGhost);
        this.dragGhost = null;
      }
    }
  }, {
    key: "handleToolDrop",
    value: function handleToolDrop(touch) {
      var element = document.elementFromPoint(touch.clientX, touch.clientY);
      var dropTarget = element === null || element === void 0 ? void 0 : element.closest('.placed-unit, .drawer-tools');
      if (dropTarget && this.draggedElement) {
        var toolData = {
          name: this.draggedElement.querySelector('.tool-name').textContent,
          icon: this.draggedElement.querySelector('.tool-icon').textContent,
          category: this.draggedElement.closest('.category').dataset.category
        };
        if (dropTarget.classList.contains('placed-unit')) {
          this.addToolToStorage(dropTarget.dataset.id, toolData);
        } else if (dropTarget.classList.contains('drawer-tools')) {
          this.addToolToDrawer(dropTarget.closest('.drawer').dataset.drawer, toolData);
        }
        this.showToast("\u2705 ".concat(toolData.name, " added successfully!"));
        if (navigator.vibrate) {
          navigator.vibrate(30);
        }
      }
    }
  }, {
    key: "addToolToStorage",
    value: function addToolToStorage(storageId, toolData) {
      var storage = this.placedItems.find(function (item) {
        return item.id === storageId;
      });
      if (storage) {
        if (storage.type === 'cabinet') {
          // Add to first available drawer
          for (var drawer = 1; drawer <= 4; drawer++) {
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
  }, {
    key: "addToolToDrawer",
    value: function addToolToDrawer(drawerNumber, toolData) {
      var _this7 = this;
      if (this.currentCabinetId) {
        var cabinet = this.placedItems.find(function (item) {
          return item.id === _this7.currentCabinetId;
        });
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
  }, {
    key: "openCabinetModal",
    value: function openCabinetModal(cabinetId) {
      this.currentCabinetId = cabinetId;
      var modal = document.getElementById('cabinetModal');
      modal.classList.remove('hidden');
      this.renderDrawerTools();
      this.showToast('🗂️ Cabinet organization opened');
    }
  }, {
    key: "renderDrawerTools",
    value: function renderDrawerTools() {
      var _this8 = this;
      var cabinet = this.placedItems.find(function (item) {
        return item.id === _this8.currentCabinetId;
      });
      if (!cabinet) return;
      var _loop = function _loop(drawer) {
        var drawerTools = document.querySelector("[data-drawer=\"".concat(drawer, "\"] .drawer-tools"));
        drawerTools.innerHTML = '';
        cabinet.tools[drawer].forEach(function (tool, index) {
          var toolElement = document.createElement('div');
          toolElement.className = 'drawer-tool';
          toolElement.innerHTML = "\n                    <span>".concat(tool.icon, "</span>\n                    <span>").concat(tool.name, "</span>\n                    <button onclick=\"shedOrganizer.removeToolFromDrawer(").concat(drawer, ", ").concat(index, ")\">\xD7</button>\n                ");
          drawerTools.appendChild(toolElement);
        });
      };
      for (var drawer = 1; drawer <= 4; drawer++) {
        _loop(drawer);
      }
    }
  }, {
    key: "removeToolFromDrawer",
    value: function removeToolFromDrawer(drawerNumber, toolIndex) {
      var _this9 = this;
      var cabinet = this.placedItems.find(function (item) {
        return item.id === _this9.currentCabinetId;
      });
      if (cabinet) {
        cabinet.tools[drawerNumber].splice(toolIndex, 1);
        this.renderDrawerTools();
        this.saveState();
        this.updateCapacityDisplay();
        this.autoSave();
        this.showToast('Tool removed from drawer');
      }
    }
  }, {
    key: "setupModalEvents",
    value: function setupModalEvents() {
      var _this0 = this;
      document.getElementById('closeCabinetModal').addEventListener('click', function () {
        document.getElementById('cabinetModal').classList.add('hidden');
        _this0.currentCabinetId = null;
      });

      // Close modal when clicking outside
      document.getElementById('cabinetModal').addEventListener('click', function (e) {
        if (e.target.id === 'cabinetModal') {
          document.getElementById('cabinetModal').classList.add('hidden');
          _this0.currentCabinetId = null;
        }
      });
    }
  }, {
    key: "toggleView",
    value: function toggleView() {
      this.is3DView = !this.is3DView;
      var viewToggle = document.getElementById('viewToggle');
      var threeDView = document.getElementById('threeDView');
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
  }, {
    key: "render3DView",
    value: function render3DView() {
      var _this1 = this;
      var canvas = document.getElementById('threeDCanvas');
      var ctx = canvas.getContext('2d');

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
      this.placedItems.forEach(function (item) {
        _this1.drawIsometricUnit(ctx, item, canvas.offsetWidth, canvas.offsetHeight);
      });
    }
  }, {
    key: "drawIsometricGrid",
    value: function drawIsometricGrid(ctx, width, height) {
      var centerX = width / 2;
      var centerY = height / 2;
      var cellSize = 20;
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-border');
      ctx.lineWidth = 1;

      // Draw isometric grid lines
      for (var i = -this.shedWidth; i <= this.shedWidth; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX + i * cellSize, centerY - this.shedHeight * cellSize * 0.5);
        ctx.lineTo(centerX + i * cellSize, centerY + this.shedHeight * cellSize * 0.5);
        ctx.stroke();
      }
      for (var j = -this.shedHeight; j <= this.shedHeight; j++) {
        ctx.beginPath();
        ctx.moveTo(centerX - this.shedWidth * cellSize, centerY + j * cellSize * 0.5);
        ctx.lineTo(centerX + this.shedWidth * cellSize, centerY + j * cellSize * 0.5);
        ctx.stroke();
      }
    }
  }, {
    key: "drawIsometricUnit",
    value: function drawIsometricUnit(ctx, item, width, height) {
      var centerX = width / 2;
      var centerY = height / 2;
      var cellSize = 20;
      var unitHeight = 30;
      var x = centerX + (item.col - this.shedWidth / 2) * cellSize;
      var y = centerY + (item.row - this.shedHeight / 2) * cellSize * 0.5;

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
  }, {
    key: "setup3DControls",
    value: function setup3DControls() {
      var _this10 = this;
      document.getElementById('rotateLeft').addEventListener('click', function () {
        _this10.showToast('↺ Rotating left...');
        setTimeout(function () {
          return _this10.render3DView();
        }, 100);
      });
      document.getElementById('rotateRight').addEventListener('click', function () {
        _this10.showToast('↻ Rotating right...');
        setTimeout(function () {
          return _this10.render3DView();
        }, 100);
      });
      document.getElementById('zoomIn').addEventListener('click', function () {
        _this10.showToast('🔍 Zooming in...');
        setTimeout(function () {
          return _this10.render3DView();
        }, 100);
      });
      document.getElementById('zoomOut').addEventListener('click', function () {
        _this10.showToast('🔍 Zooming out...');
        setTimeout(function () {
          return _this10.render3DView();
        }, 100);
      });
    }

    // Fixed theme toggle functionality
  }, {
    key: "toggleTheme",
    value: function toggleTheme() {
      var _this11 = this;
      var currentTheme = document.documentElement.getAttribute('data-color-scheme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-color-scheme', newTheme);
      var themeIcon = document.querySelector('.theme-icon');
      themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      localStorage.setItem('theme', newTheme);
      this.showToast("\uD83C\uDFA8 Switched to ".concat(newTheme, " mode"));

      // Re-render 3D view if active to use new colors
      if (this.is3DView) {
        setTimeout(function () {
          return _this11.render3DView();
        }, 100);
      }
    }
  }, {
    key: "saveState",
    value: function saveState() {
      var state = {
        placedItems: _toConsumableArray(this.placedItems),
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
  }, {
    key: "undo",
    value: function undo() {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.restoreState(this.history[this.historyIndex]);
        this.showToast('↶ Undone');
      }
    }
  }, {
    key: "redo",
    value: function redo() {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.restoreState(this.history[this.historyIndex]);
        this.showToast('↷ Redone');
      }
    }
  }, {
    key: "restoreState",
    value: function restoreState(state) {
      this.placedItems = _toConsumableArray(state.placedItems);
      this.renderPlacedItems();
      this.updateCapacityDisplay();
      this.updateUndoRedoButtons();
    }
  }, {
    key: "renderPlacedItems",
    value: function renderPlacedItems() {
      var _this12 = this;
      var container = document.getElementById('placedItems');
      container.innerHTML = '';
      this.placedItems.forEach(function (item) {
        var element = _this12.createPlacedUnitElement(item);
        container.appendChild(element);
      });
    }
  }, {
    key: "createPlacedUnitElement",
    value: function createPlacedUnitElement(item) {
      var placedUnit = document.createElement('div');
      placedUnit.className = 'placed-unit';
      placedUnit.dataset.type = item.type;
      placedUnit.dataset.row = item.row;
      placedUnit.dataset.col = item.col;
      placedUnit.dataset.width = item.width;
      placedUnit.dataset.height = item.height;
      placedUnit.dataset.id = item.id;
      var cellWidth = 100 / this.shedWidth;
      var cellHeight = 100 / this.shedHeight;
      placedUnit.style.left = "".concat(item.col * cellWidth, "%");
      placedUnit.style.top = "".concat(item.row * cellHeight, "%");
      placedUnit.style.width = "".concat(item.width * cellWidth, "%");
      placedUnit.style.height = "".concat(item.height * cellHeight, "%");

      // Use consistent storage configuration
      var config = this.storageConfig[item.type];
      if (!config) {
        console.error('Unknown storage type:', item.type);
        return placedUnit;
      }
      var icon = document.createElement('span');
      icon.className = 'unit-icon';
      icon.textContent = config.icon;
      var name = document.createElement('span');
      name.className = 'unit-name';
      name.textContent = config.name;
      placedUnit.appendChild(icon);
      placedUnit.appendChild(name);
      this.setupPlacedUnitEvents(placedUnit);
      return placedUnit;
    }
  }, {
    key: "updateUndoRedoButtons",
    value: function updateUndoRedoButtons() {
      document.getElementById('undoBtn').disabled = this.historyIndex <= 0;
      document.getElementById('redoBtn').disabled = this.historyIndex >= this.history.length - 1;
    }
  }, {
    key: "updateCapacityDisplay",
    value: function updateCapacityDisplay() {
      var _this13 = this;
      var totalCapacity = 0;
      var usedCapacity = 0;
      this.placedItems.forEach(function (item) {
        var config = _this13.storageConfig[item.type];
        if (config) {
          totalCapacity += config.capacity;
          if (item.type === 'cabinet') {
            Object.values(item.tools).forEach(function (drawer) {
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
  }, {
    key: "saveLayout",
    value: function saveLayout() {
      var layout = {
        placedItems: this.placedItems,
        timestamp: Date.now(),
        version: '1.0'
      };
      localStorage.setItem('shedLayout', JSON.stringify(layout));
      this.showToast('💾 Layout saved successfully!');
    }
  }, {
    key: "loadLayout",
    value: function loadLayout() {
      var saved = localStorage.getItem('shedLayout');
      if (saved) {
        try {
          var layout = JSON.parse(saved);
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
  }, {
    key: "autoSave",
    value: function autoSave() {
      var layout = {
        placedItems: this.placedItems,
        timestamp: Date.now(),
        version: '1.0'
      };
      localStorage.setItem('shedLayoutAutoSave', JSON.stringify(layout));
    }
  }, {
    key: "loadSavedData",
    value: function loadSavedData() {
      // Load theme preference
      var savedTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.setAttribute('data-color-scheme', savedTheme);
      document.querySelector('.theme-icon').textContent = savedTheme === 'dark' ? '☀️' : '🌙';

      // Load auto-saved layout
      var autoSaved = localStorage.getItem('shedLayoutAutoSave');
      if (autoSaved) {
        try {
          var layout = JSON.parse(autoSaved);
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
  }, {
    key: "exportLayout",
    value: function exportLayout() {
      var _this14 = this;
      this.showLoadingIndicator();
      setTimeout(function () {
        var exportData = {
          layout: _this14.placedItems,
          metadata: {
            exportDate: new Date().toISOString(),
            totalItems: _this14.placedItems.length,
            totalCapacity: document.getElementById('totalCapacity').textContent,
            usedCapacity: document.getElementById('usedCapacity').textContent
          }
        };
        var dataStr = JSON.stringify(exportData, null, 2);
        var dataBlob = new Blob([dataStr], {
          type: 'application/json'
        });
        var url = URL.createObjectURL(dataBlob);
        var link = document.createElement('a');
        link.href = url;
        link.download = "shed-layout-".concat(new Date().toISOString().split('T')[0], ".json");
        link.click();
        URL.revokeObjectURL(url);
        _this14.hideLoadingIndicator();
        _this14.showToast('📤 Layout exported successfully!');
      }, 1000);
    }
  }, {
    key: "removeStorageUnit",
    value: function removeStorageUnit(unit) {
      var id = unit.dataset.id;
      this.placedItems = this.placedItems.filter(function (item) {
        return item.id !== id;
      });
      unit.remove();
      this.saveState();
      this.updateCapacityDisplay();
      this.autoSave();
      this.showToast('🗑️ Storage unit removed');
    }
  }, {
    key: "addTouchFeedback",
    value: function addTouchFeedback(touch) {
      var feedback = document.createElement('div');
      feedback.className = 'touch-feedback';
      feedback.style.left = touch.clientX - 20 + 'px';
      feedback.style.top = touch.clientY - 20 + 'px';
      feedback.style.width = '40px';
      feedback.style.height = '40px';
      document.body.appendChild(feedback);
      setTimeout(function () {
        if (feedback.parentNode) {
          feedback.parentNode.removeChild(feedback);
        }
      }, 300);
    }
  }, {
    key: "showToast",
    value: function showToast(message) {
      var toast = document.getElementById('toast');
      var toastMessage = document.getElementById('toastMessage');
      toastMessage.textContent = message;
      toast.classList.remove('hidden');
      setTimeout(function () {
        toast.classList.add('hidden');
      }, 3000);
    }
  }, {
    key: "showLoadingIndicator",
    value: function showLoadingIndicator() {
      document.getElementById('loadingIndicator').classList.remove('hidden');
    }
  }, {
    key: "hideLoadingIndicator",
    value: function hideLoadingIndicator() {
      document.getElementById('loadingIndicator').classList.add('hidden');
    }
  }, {
    key: "setupVoiceCommands",
    value: function setupVoiceCommands() {
      var _this15 = this;
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
        this.recognition.onresult = function (event) {
          var command = event.results[0][0].transcript.toLowerCase();
          _this15.processVoiceCommand(command);
        };
        this.recognition.onerror = function (event) {
          console.warn('Speech recognition error:', event.error);
        };
      }
    }
  }, {
    key: "processVoiceCommand",
    value: function processVoiceCommand(command) {
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
  }, {
    key: "toggleMenu",
    value: function toggleMenu() {
      // Start voice recognition if available
      if (this.recognition) {
        this.recognition.start();
        this.showToast('🎤 Listening for voice commands...');
      } else {
        this.showToast('🎤 Voice commands not supported');
      }
    }
  }, {
    key: "initializeServiceWorker",
    value: function initializeServiceWorker() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
          console.log('SW registered:', registration);
        }).catch(function (error) {
          console.log('SW registration failed:', error);
        });
      }
    }
  }]);
}(); // Initialize the application
var shedOrganizer;
document.addEventListener('DOMContentLoaded', function () {
  shedOrganizer = new ShedOrganizer();
});

// PWA install prompt
var deferredPrompt;
window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault();
  deferredPrompt = e;

  // Show install button or notification
  var installBtn = document.createElement('button');
  installBtn.textContent = '📱 Install App';
  installBtn.className = 'btn btn--primary';
  installBtn.style.position = 'fixed';
  installBtn.style.top = '10px';
  installBtn.style.right = '10px';
  installBtn.style.zIndex = '1000';
  installBtn.addEventListener('click', function () {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function (choiceResult) {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      deferredPrompt = null;
    });
  });
  document.body.appendChild(installBtn);
});

// Handle app install
window.addEventListener('appinstalled', function () {
  console.log('PWA was installed');
});

// Export for global access
window.shedOrganizer = shedOrganizer;