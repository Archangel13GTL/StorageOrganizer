# ðŸ  Shed Organization Planner

A mobile-first web application designed to help organize construction tool sheds with precision and efficiency. Built specifically for carpentry, plumbing, electrical work, and general construction tools.

## ðŸ“± Live Demo

**[ðŸ”— Try the App Now](https://your-domain.com/shed-organizer)**

*Optimized for mobile devices, especially Google Pixel 8 Pro and similar smartphones.*

## âœ¨ Features

### ðŸŽ¯ **Core Functionality**
- **ðŸ“ Precise Shed Layout**: 10' Ã— 14' shed with exact storage unit dimensions
- **ðŸ—„ï¸ 4 Cabinets** (36" Ã— 24") with individual drawer organization
- **ðŸ“š 3 Fixed Shelves** (42" Ã— 36") for power tools and equipment  
- **ðŸšš 2 Moveable Center Shelves** (24" Ã— 42") with drag-and-drop repositioning
- **ðŸ› ï¸ 8 Tool Categories** optimized for construction work

### ðŸ“± **Mobile-Optimized Experience**
- **ðŸ‘† Touch-Friendly Interface**: Large buttons (44px+) for easy thumb access
- **ðŸ”„ Long-Press Drag**: 500ms long-press activation for precise tool placement
- **ðŸ“± Responsive Design**: Works perfectly on phones, tablets, and desktop
- **ðŸŽ¨ High-Contrast Colors**: Improved visibility and accessibility
- **âš¡ Smooth Performance**: Optimized for mobile processors and touch screens

### ðŸŽ›ï¸ **Advanced Organization**
- **ðŸ—„ï¸ Drawer-Level Organization**: Click cabinets to organize individual drawers
- **ðŸ·ï¸ Custom Labeling**: Double-tap any item to rename and customize
- **ðŸ“¦ Miscellaneous Items**: Add custom tools like air compressors, specific saws
- **ðŸŽ¯ Smart Optimization**: AI-powered safety and efficiency suggestions
- **âš ï¸ Safety Checks**: Chemical separation, ergonomic placement, walkway clearance

### ðŸ’¾ **Save & Share**
- **ðŸ’¾ Browser Storage**: Automatic saving to local storage
- **ðŸ“„ PDF Export**: Printable layout plans with measurements
- **ðŸ“¤ JSON Export**: Share layouts or create backups
- **ðŸ“¥ Import Function**: Load previously saved layouts
- **ðŸ”„ Multiple Slots**: Save different layout versions

## ðŸ› ï¸ Tool Categories

### ðŸ”¨ **Hand Tools**
Hammers, screwdrivers, wrenches, pliers, measuring tape, levels, hand saws, utility knives

### âš¡ **Power Tools**
Drills, circular saws, routers, sanders, jigsaws, impact drivers, angle grinders, nail guns

### ðŸš° **Plumbing**
Pipe wrenches, PVC fittings, plumbing snakes, pipe cutters, soldering kits, valve parts

### âš¡ **Electrical**
Wire nuts, electrical wire, outlets, switches, multimeters, wire strippers, conduit

### ðŸ”© **Fasteners & Hardware**
Screws, nails, bolts, washers, brackets, anchors, hinges, hardware kits

### ðŸŽ¨ **Paints & Chemicals**
Spray paints, wood stains, WD-40, cleaners, adhesives, primers, solvents

### ðŸ¦º **Safety Equipment**
Safety glasses, work gloves, dust masks, hard hats, knee pads, first aid kits

### ðŸ“¦ **Miscellaneous**
Air compressor, miter saw, table saw, shop vacuum, extension cords, toolboxes

## ðŸš€ Quick Start Guide

### **Step 1: Basic Setup**
1. Open the app on your mobile device
2. Familiarize yourself with the 10' Ã— 14' shed layout
3. Note the storage units: cabinets, shelves, and moveable units

### **Step 2: Add Tools**
1. **Tap a category** (e.g., "ðŸ”¨ Hand Tools")
2. **Long-press a tool** (hold for 500ms)
3. **Drag to storage unit** and release
4. **Repeat** for all your tools

### **Step 3: Organize Drawers**
1. **Tap any cabinet** to open drawer view
2. **Drag tools into specific drawers**
3. **Label drawers** as needed
4. **Close drawer view** when done

### **Step 4: Optimize Layout**
1. **Tap "ðŸŽ¯ Optimize Layout"** for suggestions
2. **Review safety recommendations**
3. **Adjust placement** based on tips
4. **Re-run optimization** until satisfied

### **Step 5: Save & Export**
1. **Tap "ðŸ’¾ Save Layout"** to store locally
2. **Export PDF** for printing reference
3. **Export JSON** to share with others
4. **Import** to load saved layouts

## ðŸ“‹ Installation

### **Option 1: Direct Use (Recommended)**
No installation required! Simply open the link in any modern web browser.

### **Option 2: Self-Hosting**
```bash
# Clone the repository
git clone https://github.com/yourusername/shed-organizer.git

# Navigate to directory
cd shed-organizer

# Open in browser
open index.html
```

### **Option 3: GitHub Pages**
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Access via: `https://yourusername.github.io/shed-organizer`

## ðŸ’» Technical Specifications

### **Browser Compatibility**
- âœ… Chrome Mobile 70+
- âœ… Safari Mobile 12+
- âœ… Firefox Mobile 68+
- âœ… Samsung Internet 10+
- âœ… Desktop browsers (Chrome, Firefox, Safari, Edge)

### **Device Support**
- **ðŸ“± Primary**: Google Pixel 8 Pro
- **ðŸ“± Optimized**: All Android phones (5"+ screens)
- **ðŸ“± Compatible**: iPhones, tablets, desktop computers
- **ðŸ“ Minimum**: 320px width, touch screen recommended

### **Performance**
- âš¡ **Load Time**: < 2 seconds on 3G
- ðŸ”‹ **Battery Optimized**: Minimal CPU usage
- ðŸ’¾ **Storage**: < 1MB local storage usage
- ðŸŒ **Offline**: Works without internet after initial load

## ðŸŽ¨ Customization

### **Adding Custom Tools**
```javascript
// Add to miscellaneous category
const customTool = {
    name: 'Custom Tool Name',
    symbol: 'ðŸ”§', // Choose appropriate emoji
    category: 'miscellaneous'
};
```

### **Modifying Shed Dimensions**
Update the shed grid dimensions in the CSS:
```css
.shed-grid {
    aspect-ratio: 10/14; /* Width/Height ratio */
}
```

### **Color Themes**
Modify the CSS custom properties:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #4CAF50;
}
```

## ðŸ”§ Development

### **File Structure**
```
shed-organizer/
â”œâ”€â”€ index.html          # Main application file
â”œâ”€â”€ README.md          # This documentation
â”œâ”€â”€ sw.js              # Service worker (PWA)
â”œâ”€â”€ manifest.json      # Web app manifest
â””â”€â”€ assets/
    â”œâ”€â”€ icons/         # App icons
    â””â”€â”€ screenshots/   # App screenshots
```

### **Local Development**
1. Edit `index.html` for modifications
2. Test on multiple devices and browsers
3. Use browser dev tools for mobile simulation
4. Test touch interactions thoroughly

### **Contributing**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ðŸ“š Usage Examples

### **Example 1: Basic Tool Organization**
```
1. Select "ðŸ”¨ Hand Tools" category
2. Long-press "Hammer" â†’ Drag to "Cabinet 1"
3. Tap "Cabinet 1" â†’ Open drawer view
4. Drag "Hammer" to "Drawer 1"
5. Label drawer as "Daily Hand Tools"
```

### **Example 2: Safety Optimization**
```
1. Place chemicals in right-side cabinet (away from door)
2. Store heavy items (air compressor) on floor level
3. Keep frequently used tools at eye level
4. Run optimization check for safety suggestions
```

### **Example 3: Project-Based Organization**
```
1. Group plumbing tools in one section
2. Keep electrical supplies separate
3. Create "Active Project" area on moveable shelves
4. Store seasonal items in less accessible areas
```

## ðŸ›¡ï¸ Safety Features

### **Automated Safety Checks**
- âš ï¸ **Heavy Item Alerts**: Warns if heavy tools stored too high
- ðŸ”¥ **Chemical Separation**: Ensures chemicals away from heat sources
- ðŸ“ **Walkway Clearance**: Maintains 36" minimum pathways
- ðŸŽ¯ **Ergonomic Placement**: Suggests optimal heights for tool access

### **Best Practice Recommendations**
- **Eye Level**: Most frequently used tools
- **Waist Level**: Moderately used tools
- **Floor Level**: Heavy equipment and bulk storage
- **High Storage**: Rarely used, lightweight items
- **Secure Storage**: Hazardous materials and valuables

## ðŸ“– FAQ

### **Q: Does this work offline?**
A: Yes! After the initial load, the app works completely offline.

### **Q: Can I use this for different shed sizes?**
A: The app is optimized for 10'Ã—14' but can be adapted for other sizes with code modifications.

### **Q: How do I backup my layouts?**
A: Use the "ðŸ“¤ Export JSON" feature to save layouts as files.

### **Q: Is my data secure?**
A: All data is stored locally on your device. Nothing is sent to external servers.

### **Q: Can multiple people collaborate on a layout?**
A: Yes! Export/import JSON files to share layouts between devices.

## ðŸŽ¯ Optimization Tips

### **Efficiency Guidelines**
1. **Most Used â†’ Eye Level**: Hammer, screwdriver, drill, measuring tape
2. **Medium Use â†’ Waist Level**: Power tools, toolboxes, supplies
3. **Least Used â†’ High/Low**: Seasonal items, specialty tools
4. **Heavy Items â†’ Floor**: Air compressor, large saws, lumber

### **Safety Priorities**
1. **Chemicals separate** from heat/spark sources
2. **Sharp tools secured** and easily accessible
3. **Heavy items stable** and low to ground
4. **Emergency equipment** clearly marked and accessible

### **Workflow Optimization**
1. **Group by project type**: Plumbing section, electrical section
2. **Create staging areas**: Use moveable shelves for active projects
3. **Maintain clear paths**: 36" minimum walkways
4. **Label everything**: Clear, large labels for quick identification

## ðŸ“ž Support

### **Issues & Bug Reports**
- ðŸ› [Report bugs on GitHub Issues](https://github.com/yourusername/shed-organizer/issues)
- ðŸ’¡ [Request features](https://github.com/yourusername/shed-organizer/issues/new)
- ðŸ“§ Email: your-email@domain.com

### **Documentation**
- ðŸ“– [Full Documentation](https://github.com/yourusername/shed-organizer/wiki)
- ðŸŽ¥ [Video Tutorials](https://youtube.com/playlist/shed-organizer)
- ðŸ’¬ [Community Discussions](https://github.com/yourusername/shed-organizer/discussions)

## ðŸ“„ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ðŸ™ Acknowledgments

- Built for practical construction tool organization
- Inspired by professional workshop layouts
- Optimized for mobile-first usage
- Designed with safety and efficiency in mind

---

**Made with â¤ï¸ for organized workshops and efficient tool management**

*Perfect for contractors, DIY enthusiasts, and anyone who wants a perfectly organized tool shed!*
