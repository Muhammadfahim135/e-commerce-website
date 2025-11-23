// ✅ CATEGORY FILTER - VERIFICATION SCRIPT
// Copy this into browser console (F12) on products.html to verify it's working

console.log('%c========================================', 'color: blue; font-weight: bold');
console.log('%c🧪 CATEGORY FILTER VERIFICATION', 'color: blue; font-weight: bold; font-size: 16px');
console.log('%c========================================', 'color: blue; font-weight: bold');

// Check 1: Verify products.js is loaded
console.log('\n✓ Check 1: Is products.js loaded?');
if (typeof filterProductsByCategory === 'function') {
    console.log('  ✅ YES - filterProductsByCategory function exists');
} else {
    console.log('  ❌ NO - products.js not loaded properly');
}

// Check 2: Count total product cards
console.log('\n✓ Check 2: How many products on page?');
const allProducts = document.querySelectorAll('.product-card');
console.log(`  ✅ Total products found: ${allProducts.length}`);

// Check 3: Check category distribution
console.log('\n✓ Check 3: Products per category:');
const categories = ['electronics', 'fashion', 'home', 'sports', 'books'];
categories.forEach(cat => {
    const count = document.querySelectorAll(`[data-category="${cat}"]`).length;
    console.log(`  📦 ${cat}: ${count} products`);
});

// Check 4: Verify category filter dropdown exists
console.log('\n✓ Check 4: Category filter dropdown exists?');
const categoryFilter = document.querySelector('#category-filter');
if (categoryFilter) {
    console.log('  ✅ YES - Category dropdown found');
    console.log(`  Current value: "${categoryFilter.value}"`);
} else {
    console.log('  ❌ NO - Category dropdown not found');
}

// Check 5: Test filtering function
console.log('\n✓ Check 5: Testing filter function...');
console.log('  Filtering to "electronics"...');
filterProductsByCategory('electronics');
setTimeout(() => {
    const visible = Array.from(allProducts).filter(p => p.style.display !== 'none').length;
    console.log(`  ✅ Visible products after filter: ${visible}`);
    
    console.log('\n  Resetting to "all"...');
    filterProductsByCategory('all');
    setTimeout(() => {
        const visibleAll = Array.from(allProducts).filter(p => p.style.display !== 'none').length;
        console.log(`  ✅ Visible products (all): ${visibleAll}`);
        
        console.log('\n%c========================================', 'color: green; font-weight: bold');
        console.log('%c✅ VERIFICATION COMPLETE!', 'color: green; font-weight: bold; font-size: 16px');
        console.log('%c========================================', 'color: green; font-weight: bold');
        console.log('\n💡 TIP: Try these URLs:');
        console.log('   products.html?category=electronics');
        console.log('   products.html?category=fashion');
        console.log('   products.html?category=home');
    }, 500);
}, 500);
