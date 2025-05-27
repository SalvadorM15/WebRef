const API_URL = '../../backend/server.php?module=students';

const studentAPI = 
{
    async fetchAll() 
    {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("No se pudieron obtener los estudiantes");
        return await res.json();
    },

    async create(student) 
    {
        return await sendJSON('POST', student);
    },

    async update(student) 
    {
        return await sendJSON('PUT', student);
    },

    async remove(id) 
    {
        return await sendJSON('DELETE', { id });
    }
};

async function sendJSON(method, data) 
{
    const res = await fetch(API_URL, 
    {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`Error en ${method}`);
    return await res.json();
}
