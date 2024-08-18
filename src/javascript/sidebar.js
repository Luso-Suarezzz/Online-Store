const btnToggle = document.getElementById('toggle-btn');
const toggleCerrar = document.getElementById('toggle-cerrar');

toggleCerrar.addEventListener('click', function () {
    console.log('clik')
    let sidebar = document.getElementById('sidebar');
    sidebar.className = "h-[600px] flex justify-center items-center md:relative md:h-full md:-right-0 absolute top-0 -right-full w-2/3 bg-gris transition-all duration-500"
    console.log(document.getElementById('sidebar'))
  });

btnToggle.addEventListener('click', function () {
  console.log('clik')
  let sidebar = document.getElementById('sidebar');
  sidebar.className = "h-[600px] flex justify-center items-center md:relative md:h-full md:-right-0 absolute top-0 right-0 w-2/3 bg-gris transition-all duration-500"
  console.log(document.getElementById('sidebar'))
});