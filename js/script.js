function toggleSidebar() {
  var sidebar = document.getElementById("sidebar");
  if (sidebar.style.left === "" || sidebar.style.left === "-200px") {
    sidebar.style.left = "0px"; // Deploy the sidebar
  } else {
    sidebar.style.left = "-200px"; // Retract the sidebar
  }
  sidebar.classList.toggle('active');
  adjustContentWidth();
}
