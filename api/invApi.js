import axios from "axios";

const Api = axios.create({
    baseURL: 'http://192.168.2.182:4000/',
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

export const crearGrupo = async(grupo,pass,almacen,conteo) => {
    const res = await Api.post('/grupo',{grupo,pass,almacen,conteo}) 
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

export const getAlmacenes = async() => {
    const res = await Api.get('/almacenes')
    return res.data
}

export const recuento = async () => {
    const res = await Api.get('/recuento')
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


export const getUsuarios= async () => {
    const res = await Api.get('/usuario')
    return res.data
}

export const crearUsuario = async(user,pass) => {
    const res = await Api.post('/usuario',{user,pass}) 
    return res.data
}

export const editUsuario = async (idUser,user,pass) =>{
    const res = await Api.put('/usuario',{idUser,user,pass})
    return (res.data)
}

export const deleteUsuario = async(idUser) =>{
    const res = await Api.delete('/usuario',{
        params:{id: idUser}
    });
    return (res.data)
}