# Canvelete MCP Server - Usage Examples

This document provides practical examples of using the Canvelete MCP server.

**🔗 Related Resources:**
- **[Canvelete Platform](https://canvelete.com)** - Create and edit designs online
- **[Documentation](https://docs.canvelete.com)** - Full platform and API documentation
- **[API Reference](https://docs.canvelete.com/api)** - Detailed API documentation

## Example 1: Create a Social Media Post

```typescript
// Create a design for Instagram
const design = await create_design({
  name: "Summer Sale Instagram Post",
  width: 1080,
  height: 1080,
  description: "Promotional post for summer sale"
});

// Add a colorful background
await add_element({
  designId: design.id,
  element: {
    type: "rectangle",
    x: 0,
    y: 0,
    width: 1080,
    height: 1080,
    fill: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  }
});

// Add main heading
await add_element({
  designId: design.id,
  element: {
    type: "text",
    text: "SUMMER SALE",
    x: 100,
    y: 300,
    width: 880,
    height: 200,
    fontSize: 96,
    fontFamily: "Poppins",
    fill: "#FFFFFF",
    fontWeight: "bold"
  }
});

// Add sub text
await add_element({
  designId: design.id,
  element: {
    type: "text",
    text: "Up to 50% OFF",
    x: 100,
    y: 550,
    width: 880,
    height: 100,
    fontSize: 48,
    fontFamily: "Inter",
    fill: "#FFFFFF"
  }
});

// Export as PNG
const exportResult = await export_design({
  designId: design.id,
  format: "png",
  quality: 100
});
```

## Example 2: Using Templates

```typescript
// List available templates
const templates = await list_templates({
  category: "social",
  limit: 10
});

// Create a new design from a template
const design = await create_design({
  name: "My New Design",
  width: 1920,
  height: 1080
});

// Apply template
await apply_template({
  designId: design.id,
  templateId: templates.templates[0].id
});

// Customize the design
await update_element({
  designId: design.id,
  elementId: "text-element-id",
  updates: {
    text: "My Custom Text",
    fill: "#FF0000"
  }
});
```

## Example 3: Working with Assets

```typescript
// List user's images
const assets = await list_assets({
  type: "IMAGE",
  limit: 20
});

// Create design
const design = await create_design({
  name: "Product Showcase",
  width: 1200,
  height: 800
});

// Add image from asset library
await add_element({
  designId: design.id,
  element: {
    type: "image",
    src: assets.assets[0].url,
    x: 100,
    y: 100,
    width: 400,
    height: 300
  }
});
```

## Example 4: Batch Operations

```typescript
// Create multiple text elements
const design = await create_design({
  name: "Infographic",
  width: 1080,
  height: 1920
});

const sections = [
  { title: "Introduction", y: 100 },
  { title: "Key Points", y: 500 },
  { title: "Statistics", y: 900 },
  { title: "Conclusion", y: 1300 }
];

for (const section of sections) {
  await add_element({
    designId: design.id,
    element: {
      type: "text",
      text: section.title,
      x: 50,
      y: section.y,
      width: 980,
      height: 100,
      fontSize: 48,
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fill: "#333333"
    }
  });
}
```

## Example 5: Design Duplication

```typescript
// Duplicate an existing design
const duplicate = await duplicate_design({
  designId: "original-design-id",
  newName: "Modified Version"
});

// Modify the duplicate
await update_element({
  designId: duplicate.id,
  elementId: "element-to-change",
  updates: {
    fill: "#00FF00"
  }
});
```

## Example 6: Canvas Management

```typescript
// Create a design
const design = await create_design({
  name: "Test Canvas",
  width: 800,
  height: 600
});

// Add several elements
for (let i = 0; i < 5; i++) {
  await add_element({
    designId: design.id,
    element: {
      type: "circle",
      x: 100 + i * 150,
      y: 250,
      width: 100,
      height: 100,
      fill: `hsl(${i * 60}, 70%, 50%)`
    }
  });
}

// Resize canvas
await resize_canvas({
  designId: design.id,
  width: 1200,
  height: 800
});

// Clear everything and start over
await clear_canvas({
  designId: design.id
});
```

## Example 7: Using Prompts

With Claude Desktop, you can use prompts:

**User**: "Use the create_social_post prompt for Instagram with message 'New Product Launch'"

**Claude**: *Uses the prompt to guide design creation*

This will automatically:
1. Set up the correct dimensions (1080x1080)
2. Create a design with proper Instagram formatting
3. Add your message with appropriate styling

## Example 8: Accessing Design Information

```typescript
// Get user profile
const profile = await read_resource("canvelete://user/profile");
console.log(`Credits remaining: ${profile.subscription.creditBalance}`);

// List all designs
const designs = await read_resource("canvelete://designs/list");
console.log(`Total designs: ${designs.pagination.total}`);

// Get specific design details
const design = await read_resource(`canvelete://design/${designId}`);
console.log(`Canvas has ${design.canvasData.elements.length} elements`);

// Get canvas elements
const canvas = await read_resource(`canvelete://canvas/${designId}/elements`);
canvas.elements.forEach(el => {
  console.log(`${el.type} at (${el.x}, ${el.y})`);
});
```

## Tips for AI Assistants

When using the MCP server with AI assistants like Claude:

1. **Start with resources** to understand what's available
2. **Create designs** with appropriate dimensions for the use case
3. **Add elements** one at a time, checking results
4. **Use templates** when available to speed up design creation
5. **Export** only when the design is complete
6. **Handle errors** gracefully and inform the user

## Common Patterns

### Pattern 1: Template-Based Design
1. List templates in desired category
2. Create new design
3. Apply template
4. Customize specific elements

### Pattern 2: From-Scratch Design
1. Create design with specific dimensions
2. Add background element
3. Add content elements (text, images, shapes)
4. Fine-tune positioning and styling
5. Export in desired format

### Pattern 3: Asset-Driven Design
1. List user assets
2. Create design
3. Add asset as image element
4. Add supporting elements around the image
5. Export

## Error Handling

Always handle errors appropriately:

```typescript
try {
  const design = await create_design({
    name: "My Design",
    width: 1920,
    height: 1080
  });
} catch (error) {
  if (error.code === 'VALIDATION_ERROR') {
    // Handle validation errors
  } else if (error.code === 'PERMISSION_ERROR') {
    // Handle permission errors
  } else {
    // Handle other errors
  }
}
```
