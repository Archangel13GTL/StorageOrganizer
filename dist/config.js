"use strict";

var config = {
  shedWidth: 14,
  shedHeight: 10,
  storageConfig: {
    cabinet: {
      icon: '🗄️',
      name: 'Cabinet',
      capacity: 50,
      drawers: 4
    },
    fixed_shelf: {
      icon: '📚',
      name: 'Fixed Shelf',
      capacity: 75,
      drawers: 0
    },
    mobile_shelf: {
      icon: '🛒',
      name: 'Mobile Shelf',
      capacity: 40,
      drawers: 0
    }
  },
  toolData: {
    hand_tools: {
      name: "Hand Tools",
      icon: "🔨",
      color: "#FF6B6B",
      tools: [{
        name: "Hammer",
        icon: "🔨",
        size: "medium"
      }, {
        name: "Screwdriver Set",
        icon: "🪛",
        size: "small"
      }, {
        name: "Wrench Set",
        icon: "🔧",
        size: "medium"
      }, {
        name: "Pliers",
        icon: "🗜️",
        size: "small"
      }, {
        name: "Measuring Tape",
        icon: "📏",
        size: "small"
      }, {
        name: "Level",
        icon: "📐",
        size: "large"
      }, {
        name: "Hand Saw",
        icon: "🪚",
        size: "large"
      }]
    },
    power_tools: {
      name: "Power Tools",
      icon: "⚡",
      color: "#4ECDC4",
      tools: [{
        name: "Drill",
        icon: "🔩",
        size: "medium",
        heavy: true
      }, {
        name: "Circular Saw",
        icon: "⚙️",
        size: "large",
        heavy: true
      }, {
        name: "Jigsaw",
        icon: "🪚",
        size: "medium",
        heavy: true
      }, {
        name: "Sander",
        icon: "🧽",
        size: "medium",
        heavy: true
      }, {
        name: "Router",
        icon: "⚡",
        size: "medium",
        heavy: true
      }, {
        name: "Nail Gun",
        icon: "🔫",
        size: "medium",
        heavy: true
      }, {
        name: "Angle Grinder",
        icon: "⚙️",
        size: "medium",
        heavy: true
      }]
    },
    plumbing: {
      name: "Plumbing",
      icon: "🔧",
      color: "#45B7D1",
      tools: [{
        name: "Pipe Wrench",
        icon: "🔧",
        size: "large"
      }, {
        name: "PVC Pipes",
        icon: "🟢",
        size: "large"
      }, {
        name: "Torch",
        icon: "🔥",
        size: "medium"
      }, {
        name: "Fixtures",
        icon: "🚿",
        size: "medium"
      }]
    },
    electrical: {
      name: "Electrical",
      icon: "⚡",
      color: "#F7DC6F",
      tools: [{
        name: "Wire",
        icon: "⚡",
        size: "medium"
      }, {
        name: "Outlets",
        icon: "🔌",
        size: "small"
      }, {
        name: "Multimeter",
        icon: "📏",
        size: "small"
      }, {
        name: "Light Bulbs",
        icon: "💡",
        size: "small"
      }]
    }
  }
};