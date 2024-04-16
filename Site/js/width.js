function adjustContentWidth() {
    var sidebar = document.querySelector('.sidebar');
    var content = document.querySelector('.content');
    var sidebarWidth = sidebar.offsetWidth;
    
    if (sidebar.classList.contains('active')) {
      content.style.marginLeft = sidebarWidth + 'px';
    } else {
      content.style.marginLeft = '0';
    }
  }
  