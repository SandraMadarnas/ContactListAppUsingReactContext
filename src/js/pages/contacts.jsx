import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Contactos = () => {
    const { store, actions } = useContext(Context)
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [lista, setLista] = useState(store.listaContactos)
    const [refresh, setRefresh] = useState(false)
    const [estadoTemporal, setEstadotemporal] = useState({})

    useEffect(() => { //cuando cargo la página me trae toda la lista
        let funcionCarga = async () => {
            // let { respuestaJson, response } = await actions.useFetch("/apis/fake/contact/agenda/agenda_de_sandra", null)
            // console.log(respuestaJson)
            // setLista(respuestaJson)
            actions.funcionCarga()
        }
        funcionCarga() //aquí llamo a la función asíncrona

    }, [refresh])

    useEffect(() => { }, [lista, nombre])

    return (<>
        <div className="container-fluid ms-2">
            <div className="row p-5">
                <div className="col-md-12 d-flex justify-content-end">
                    <button className="btn btn-success">
                        <Link to="/add-contact" style={{ color: 'white' }}>Add a New Contact</Link>
                    </button>
                </div>
            </div>
            <div className="row d-flex justify-content-center w-100">
                <div className="col-12 col-md-8 col-lg-6 w-100 border">
                    <ul className="list-group">
                        {store.listaContactos && store.listaContactos.length > 0 ? (
                            store.listaContactos.map((item, index) => {
                                return (
                                    <div key={index} className="row border-bottom py-3">
                                        <div className="col-2">
                                            <img className="img-thumbnail" src="https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2023/03/09/bad-bunny.jpeg"></img>
                                        </div>
                                        <div className="col-8">
                                            <h3 className="mb-3">{item.full_name}</h3>
                                            <p className="text-secondary"><i class="fas fa-map-marker-alt"></i><span className="ms-3">{item.address}</span></p>
                                            <p className="text-secondary"><i class="fas fa-at"></i><span className="ms-3">{item.email}</span></p>
                                            <p className="text-secondary"><i class="fas fa-phone"></i><span className="ms-3">{item.phone}</span></p>
                                        </div>
                                        <div className="col-2 d-flex align-items-center justify-content-end">
                                            <button
                                                className="btn btn-lg text-success m-2"
                                                button="button"
                                                onClick={() => {
                                                    console.log(item.full_name);
                                                    const nombrePrompt = prompt("Enter new name:", item["full_name"]);
                                                    const emailPrompt = prompt("Enter new email:", item.email);
                                                    const phonePrompt = prompt("Enter new phone number:", item.phone);
                                                    const addressPrompt = prompt("Enter new address:", item.address);
                                                    let obj = {
                                                        "full_name": nombrePrompt,
                                                        "email": emailPrompt,
                                                        "agenda_slug": "agenda_de_sandra",
                                                        "address": addressPrompt,
                                                        "phone": phonePrompt
                                                    }
                                                    actions.putFetch(item.id, obj);
                                                }}
                                            >
                                                <i class="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                className="btn btn-lg m-2 text-danger"
                                                type="button"
                                                onClick={async () => {
                                                    actions.deleteContact(item.id);
                                                    /*if (window.confirm("Are you sure you want to delete this contact?")) {
                                                        actions.useFetch(`/apis/fake/contact/${item.id}`, null, "DELETE");
                                                        const updatedLista = lista.filter((contact) => contact.id !== item.id);
                                                        setLista(updatedLista);
                                                    }*/
                                                }}
                                            >
                                                <i class="fas fa-trash"></i>
                                            </button>

                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-3">
                                <i class="fas fa-sad-tear fa-lg"></i>
                                This Contact List Is Empty
                                <i class="fas fa-sad-tear fa-lg"></i></div>
                        )}
                    </ul>
                </div>
            </div>
        </div >
    </>)
}

export default Contactos;