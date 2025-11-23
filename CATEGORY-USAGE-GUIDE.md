# Category Filter - Quick Usage Guide

## 🎯 For End Users

### Method 1: Use the Search Bar
1. Click on the search bar at the top of any page
2. Type a category name (e.g., "electronics", "fashion", "home", "sports", "books")
3. You'll see matching products in the dropdown
4. Press **Enter** or click the highlighted category header to view all products in that category

**Supported Search Terms:**
- **Electronics**: electronics, electronic, tech, device
- **Fashion**: fashion, clothing, wear, apparel
- **Home & Living**: home, living, house, decor
- **Sports & Outdoors**: sport, sports, outdoor, fitness, exercise
- **Books**: book, books, reading

### Method 2: Use Navigation Menu
1. Hover over or click **"Categories"** in the navigation menu
2. Click on any category (Electronics, Fashion, Home & Living, Sports & Outdoors, Books)
3. You'll be taken to the products page showing only that category

### Method 3: Use Filter Dropdown on Products Page
1. Go to the Products page
2. Look for the **"Category:"** dropdown in the filter section
3. Select your desired category
4. Products will instantly filter to show only that category

### Method 4: Direct URL
You can also use direct links:
- Electronics: `products.html?category=electronics`
- Fashion: `products.html?category=fashion`
- Home & Living: `products.html?category=home`
- Sports & Outdoors: `products.html?category=sports`
- Books: `products.html?category=books`

## 🔧 For Developers

### Adding a New Category

1. **Update HTML** (`products.html`):
   - Add product cards with the appropriate `data-category` attribute:
   ```html
   <div class="product-card" data-category="yourcategory">
       <!-- Product content -->
   </div>
   ```

2. **Update Filter Dropdown**:
   ```html
   <select class="filter-select" name="category" id="category-filter">
       <option value="yourcategory">Your Category</option>
   </select>
   ```

3. **Update Search Keywords** (`js/search.js`):
   ```javascript
   const categories = [
       { name: 'yourcategory', keywords: ['keyword1', 'keyword2', 'keyword3'] }
   ];
   ```

4. **Update Category Map** (`js/products.js`):
   ```javascript
   const categoryMap = {
       'yourcategory': 'yourcategory',
       'your-category': 'yourcategory'
   };
   ```

5. **Update Navigation Menu**:
   ```html
   <li><a href="products.html?category=yourcategory">Your Category</a></li>
   ```

### API Integration (Future)

If connecting to a backend API, modify `js/products.js`:

```javascript
async function loadProductsFromAPI(category) {
    try {
        const response = await fetch(`/api/products?category=${category}`);
        const data = await response.json();
        displayProducts(data.products);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}
```

## 🎨 Customization

### Change Category Colors

In your CSS, add category-specific styles:

```css
.product-card[data-category="electronics"] .product-badge {
    background-color: #3b82f6; /* Blue */
}

.product-card[data-category="fashion"] .product-badge {
    background-color: #ec4899; /* Pink */
}
```

### Modify Filter Behavior

In `js/products.js`, customize the `filterProductsByCategory` function:

```javascript
function filterProductsByCategory(category) {
    // Your custom logic here
    // Example: Add animation delays
    productCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.display = shouldShow ? 'block' : 'none';
        }, index * 50); // Stagger animation
    });
}
```

## 📊 Examples

### Example 1: Search for Electronics
```
User Action: Types "electronic" in search bar
System Response: 
- Shows electronics products in dropdown
- Shows "View all Electronics products (10+)" header
- Clicking takes user to products.html?category=electronics
- Page displays only electronics products
```

### Example 2: Click Category Link
```
User Action: Clicks "Fashion" in navigation menu
System Response:
- URL becomes products.html?category=fashion
- Page header shows "Fashion Products"
- Displays "Showing X fashion products"
- Only fashion products are visible
```

### Example 3: Use Filter Dropdown
```
User Action: Selects "Sports & Outdoors" from dropdown
System Response:
- Products instantly filter (no page reload)
- URL updates to products.html?category=sports
- Page header updates
- Only sports products visible
```

## 🐛 Troubleshooting

### Products Not Filtering
**Problem**: Clicking category doesn't filter products
**Solution**: 
1. Check browser console for errors
2. Verify `data-category` attribute matches exactly (case-sensitive)
3. Ensure `js/products.js` is loaded after the DOM

### Search Not Working
**Problem**: Searching for category doesn't work
**Solution**:
1. Check that `js/search.js` is included in HTML
2. Verify search input has class `.search-input`
3. Check browser console for JavaScript errors

### Wrong Products Showing
**Problem**: Category shows wrong products
**Solution**:
1. Verify `data-category` attributes on HTML elements
2. Check URL parameter is correct format
3. Clear browser cache and reload

### Empty Page
**Problem**: Category page shows no products
**Solution**:
1. Check if products exist for that category
2. Look for "No Products Found" message
3. Click "View All Products" to reset filters

## 🚀 Performance Tips

1. **Lazy Load Images**: Products use lazy loading for better performance
2. **Debounced Search**: Search waits 300ms before filtering (prevents excessive updates)
3. **CSS Animations**: Uses GPU-accelerated transforms for smooth animations
4. **Event Delegation**: Efficiently handles clicks on multiple products

## 📱 Mobile Considerations

- Touch-friendly filter dropdowns
- Responsive search suggestions
- Optimized for smaller screens
- Swipe gestures for category navigation (future enhancement)

---

**Need Help?** Check the main documentation or contact the development team.
