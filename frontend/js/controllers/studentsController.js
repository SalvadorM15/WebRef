document.addEventListener('DOMContentLoaded', () => 
{
    loadStudents();
    setupFormHandler();
}); 

// si todo la informacion en html esta correctamente cargada ejecuta Loadstudents() & setupformHandler();

  
function setupFormHandler()
{
    const form = document.getElementById('studentForm');  //guarda en una variable el formulario con ID studentform
    form.addEventListener('submit', async e =>  //Ante el evento submit entra en la funcion flecha
    {
        e.preventDefault();
        const student = getFormData(); // Guarda toda la informacion del estudiante en la variable form_info
        model = 'student';
        try 
        {
            if (student.id)  // si el estudiante existe lo actualiza, sino lo crea
            {
            await ModelAPI.update(student); 
            } 
            else 
            {
            await ModelAPI.create(student);
            }
            clearForm(); // vacia el formulario
            loadStudents();
        }
        catch (err)
        {
            console.error(err.message);
        }
    });
}
  
function getFormData()  // funcion que recopila todos los campos del formulario
{
    return {
        id: document.getElementById('studentId').value.trim(),
        fullname: document.getElementById('fullname').value.trim(),
        email: document.getElementById('email').value.trim(),
        age: parseInt(document.getElementById('age').value.trim(), 10)
    };
}
  
function clearForm() // resetea lps valores del formulario
{
    document.getElementById('studentForm').reset();
    document.getElementById('studentId').value = '';
}
  
async function loadStudents() //carga los estudiantes desde la base de datos
{
    try 
    {
        const students = await ModelAPI.fetchAll();
        renderStudentTable(students);
    } 
    catch (err) 
    {
        console.error('Error cargando estudiantes:', err.message);
    }
}
  
function renderStudentTable(students) 
{
    const tbody = document.getElementById('studentTableBody');
    tbody.replaceChildren();
  
    students.forEach(student => 
    {
        const tr = document.createElement('tr');
    
        tr.appendChild(createCell(student.fullname));
        tr.appendChild(createCell(student.email));
        tr.appendChild(createCell(student.age.toString()));
        tr.appendChild(createActionsCell(student));
    
        tbody.appendChild(tr);
    });
}
  
function createCell(text) // crea celda de la tabla del formulario
{
    const td = document.createElement('td');
    td.textContent = text;
    return td;
}
  
function createActionsCell(student) // rellena celda de la tabla de formulario
{
    const td = document.createElement('td');
  
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.className = 'w3-button w3-blue w3-small';
    editBtn.addEventListener('click', () => fillForm(student));
  
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Borrar';
    deleteBtn.className = 'w3-button w3-red w3-small w3-margin-left';
    deleteBtn.addEventListener('click', () => confirmDelete(student.id));
  
    td.appendChild(editBtn);
    td.appendChild(deleteBtn);
    return td;
}
  
function fillForm(student) // rellena el campo del fomrulario
{
    document.getElementById('studentId').value = student.id;
    document.getElementById('fullname').value = student.fullname;
    document.getElementById('email').value = student.email;
    document.getElementById('age').value = student.age;
}
  
async function confirmDelete(id) // funcion de confirmacion de eliminacion de un elemento en la tabla
{
    if (!confirm('¿Estás seguro que deseas borrar este estudiante?')) return;
  
    try 
    {
        await ModelAPI.remove(id);
        loadStudents();
    } 
    catch (err) 
    {
        console.error('Error al borrar:', err.message);
    }
}
  