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

  // 1. Build the header with an empty placeholder for the logo
  var headerHtml = [
    '<nav class="navbar">',
    '  <div class="navbar-inner">',
    '    <a class="navbar-brand" href="index.html">',
    '      <div id="dynamic-nav-icon"></div>',
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
    '    <div class="header-logo-wrap" id="dynamic-logo-container">',
    '      ',
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

  // Insert Header and Footer into the DOM
  document.body.insertAdjacentHTML('afterbegin', headerHtml);
  document.body.insertAdjacentHTML('beforeend', footerHtml);

  // 2. Fetch the logo and icon from css/logo.html
  fetch('css/logo.html')
    .then(function(response) {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then(function(html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      
      // Inject Main Logo Card
      var maroonLogo = doc.querySelector('.logo-card.maroon');
      var logoContainer = document.getElementById('dynamic-logo-container');
      if (maroonLogo && logoContainer) {
        logoContainer.appendChild(maroonLogo);
      }
      
      // Inject Navbar Icon
      // Finds the first Maroon icon box, clones it, and scales it to 36px for the navbar
      var maroonIcon = doc.querySelector('.icon-box.maroon');
      var iconContainer = document.getElementById('dynamic-nav-icon');
      if (maroonIcon && iconContainer) {
        var clonedIcon = maroonIcon.cloneNode(true);
        clonedIcon.className = 'icon-box maroon icon-36'; // Apply the specific 36px size
        iconContainer.appendChild(clonedIcon);
      }
    })
    .catch(function(error) {
      console.error('Error fetching the brand assets:', error);
    });

})();