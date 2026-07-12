// ===== Archive Page Filters =====
(function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const articleList = document.getElementById('article-list');
  const articleCount = document.getElementById('article-count');

  if (!filterBtns.length || !articleList) return;

  const activeFilters = {
    lang: 'all',
    year: 'all',
    topic: 'all'
  };

  function updateCount() {
    const visible = articleList.querySelectorAll('.archive-item:not([style*="display: none"])');
    if (articleCount) {
      articleCount.textContent = visible.length;
    }
  }

  function applyFilters() {
    const items = articleList.querySelectorAll('.archive-item');
    items.forEach(function(item) {
      const lang = item.getAttribute('data-lang');
      const year = item.getAttribute('data-year');
      const topic = item.getAttribute('data-topic');

      const langMatch = activeFilters.lang === 'all' || lang === activeFilters.lang;
      const yearMatch = activeFilters.year === 'all' || year === activeFilters.year;
      const topicMatch = activeFilters.topic === 'all' || topic === activeFilters.topic;

      item.style.display = (langMatch && yearMatch && topicMatch) ? '' : 'none';
    });
    updateCount();
  }

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const filterType = btn.getAttribute('data-filter');
      const filterValue = btn.getAttribute('data-value');

      // Update active state for this filter group
      const siblings = document.querySelectorAll('.filter-btn[data-filter="' + filterType + '"]');
      siblings.forEach(function(s) { s.classList.remove('active'); });
      btn.classList.add('active');

      // Update active filters
      activeFilters[filterType] = filterValue;

      applyFilters();
    });
  });
})();