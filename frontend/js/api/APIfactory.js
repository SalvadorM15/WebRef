//La api URL ira directamente a server.php

function GetAPI_URL(model){
    switch(model){
        case 'students':
            API_URL = '../../backend/server.php?module=students';
        case 'studentsSubjets':
            API_URL = '../../backend/server.php?module=studentSubjets';
        case 'subjets':
            API_URL = '../../backend/server.php?module=subjects';       
    }
    return API_URL;
} 

const API_URL = GetAPI_URL(model);

const ModelAPI = 
{
    async fetchAll() 
    {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("No se pudo obtener la informacion");
        return await res.json();
    },

    async create(form_info) 
    {
        return await sendJSON('POST', form_info);
    },

    async update(form_info) 
    {
        return await sendJSON('PUT', form_info);
    },

    async remove(model,id)
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