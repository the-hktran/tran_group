(function () {
  var activePage = document.body && document.body.dataset ? document.body.dataset.page : 'home';

  var navItems = [
    { href: 'index.html', label: 'Home', pageKey: 'home' },
    { href: 'index.html#members', label: 'Members', pageKey: '' },
    { href: 'index.html#research', label: 'Research', pageKey: '' },
    { href: 'publications.html', label: 'Publications', pageKey: 'publications' }
  ];

  var footerLinks = [
    { href: 'https://www.chemistry.msstate.edu/', label: 'MSU Chemistry' },
    { href: 'https://scholar.google.com/citations?user=qfHo0uAAAAAJ&hl=en', label: 'Google Scholar' },
    { href: 'https://github.com/the-hktran', label: 'GitHub' }
  ];

  function navLink(href, label, pageKey) {
    var activeClass = activePage === pageKey ? ' class="active" aria-current="page"' : '';
    return '<li><a href="' + href + '"' + activeClass + '>' + label + '</a></li>';
  }

  function listItems(items) {
    return items.map(function (item) {
      return '<li><a href="' + item.href + '" target="_blank" rel="noopener">' + item.label + '</a></li>';
    }).join('\n');
  }

  var headerHtml = [
    '<nav class="navbar">',
    '  <div class="navbar-inner">',
    '    <a class="navbar-brand" href="index.html">',
    '      <img class="nav-icon" src="images/tran_group_icon_maroon_512.png" alt="Tran Group icon" />',
    '      <span>Tran Group</span>',
    '    </a>',
    '    <button class="navbar-toggle" id="navToggle" aria-label="Toggle navigation">',
    '      <span></span><span></span><span></span>',
    '    </button>',
    '    <ul class="navbar-links" id="navLinks">',
    navItems.map(function (item) {
      return navLink(item.href, item.label, item.pageKey);
    }).join('\n'),
    '    </ul>',
    '  </div>',
    '</nav>',
    '<header class="site-header">',
    '  <div class="header-inner">',
    '    <div class="header-logo-wrap">',
    '      <img src="images/tran_group_logo_maroon_fuzzy.png" alt="Tran Group logo" />',
    '    </div>',
    '    <div class="header-text">',
    '      <h1>The Tran Group</h1>',
    '      <p class="subtitle">Theoretical Chemistry at <em>Mississippi State University</em></p>',
    '    </div>',
    '  </div>',
    '</header>'
  ].join('\n');

  var footerHtml = [
    '<footer class="site-footer">',
    '  <div class="footer-inner">',
    '    <span class="footer-copy">&copy; Tran Group &mdash; Mississippi State University</span>',
    '    <ul class="footer-links">',
    listItems(footerLinks),
    '    </ul>',
    '  </div>',
    '</footer>'
  ].join('\n');

  document.body.insertAdjacentHTML('afterbegin', headerHtml);
  document.body.insertAdjacentHTML('beforeend', footerHtml);

  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }
})();