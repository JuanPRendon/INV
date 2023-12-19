import axios from "axios";

const Api = axios.create({
    baseURL: 'http://localhost:4000/',
    withCredentials: true
})

export const validateLoginGrupo = async(grupo,pass) => {
    const res = await Api.post('/loginGrupo',{grupo,pass})
    return res.data
}

export const validateLoginUser = async(user,pass) => {
    const res = await Api.post('/loginUser',{user,pass})
    return res.data
}

export const getLoginGrupos = async() => {
    const res = await Api.get('/loginGrupo') 
    return res.data
}

export const getGrupos = async() => {
    const res = await Api.get('/grupo') 
    return res.data
}

export const crearGrupo = async(usuario,pass,almacen,conteo) => {
    const res = await Api.post('/grupo',{usuario,pass,almacen,conteo}) 
    return res.data
}

export const editGrupo = async(idGrupo,usuario,pass,almacen,conteo) => {
    const res = await Api.put('/grupo',{idGrupo,usuario,pass,almacen,conteo}) 
    return (res.data)
}

export const deleteGrupo = async(idGrupo) =>{
    const res = await Api.delete('/grupo',{
        params:{id: idGrupo}
    });
    return (res.data)
}

export const getMateriales = async() => {
    const res = await Api.get('/materiales') 
    return res.data
}

export const getConteo = async() => {
    const res  = await Api.get('/conteo')
    return res.data
}

export const CrearConteo = async(material,ubicacion,numeroLote,cantidad,almacen,grupo) => {
    const res = await Api.post("/conteo",{material,ubicacion,numeroLote,cantidad,almacen,grupo})
    return (res.data)
}

export const editConteo = async(idConteo,material,ubicacion,numeroLote,cantidad,almacen,grupo) => {
    const res = await Api.put("/conteo",{idConteo,material,ubicacion,numeroLote,cantidad,almacen,grupo})
    return (res.data)
}

export const deleteConteo = async(idConteo) => {
    const res = await Api.delete('/conteo',{
        params:{id: idConteo}
    });
    return (res.data)
}
